import {
    createContext,
    useContext,
    useRef,
    useState
} from "react";
import { useToast } from "../components/ui/Toast";
import { mergeIssues } from "../utils/mergeIssue";
import { normalizeIssue } from "../utils/normalizeIssue";
import {getCache,setCache} from "../utils/cache";

const LogContext = createContext();

export const LogProvider = ({ children }) => {
    const [issues, setIssues] = useState([]);
    const [logs, setLogs] = useState([]);
    const [issuesLoading, setIssuesLoading] = useState(false);
    const [logLoading, setLogLoading] = useState(false);

    const toast = useToast();
    const backend_url = import.meta.env.VITE_BACKEND_URL;
    const websocketUrl = import.meta.env.VITE_WEBSOCKET_URL;

    const socketRef = useRef(null);
    const statusTimeoutRef = useRef({}); 

    const syncIssues = (incoming,projectId) => {
        setIssues(prev => {
            const merged = mergeIssues(
                prev,
                incoming
            );

            if (projectId) {
                setCache(
                    `issues_${projectId}`,
                    merged
                );
            }

            return merged;
        });
    };

    const fetchIssues = async (projectId) => {
        if (!projectId) {
            toast("There is no project id", "error");
            return;
        }

        const cacheKey = `issues_${projectId}`;

        const cached = getCache(cacheKey);

        if(cached){
            setIssues(cached);
            return
        }

        setIssuesLoading(true);

        try {
            const fullProjectId = `proj_${projectId}`;

            const res = await fetch(
                `${backend_url}/project/${fullProjectId}/issues`,
                {
                    credentials: "include"
                }
            );

            const data = await res.json();

            if (!res.ok) {
                toast(
                    data.detail ||
                    "Failed to fetch issues",
                    "error"
                );
                return;
            }

            const normalized =
                data.map(issue =>
                    normalizeIssue(issue)
                );

            syncIssues(normalized);

            setCache(
                cacheKey,
                normalized
            );

        } catch {
            toast(
                "Something went wrong while fetching issues",
                "error"
            );
        } finally {
            setIssuesLoading(false);
        }
    };

    const fetchLogs = async (
        projectId,
        logId
    ) => {

        const cacheKey =
            `logs_${projectId}_${logId}`;

        const cached = getCache(cacheKey);

        if (cached) {
            setLogs(cached);
            return;
        }

        setLogLoading(true);

        try {
            const fullProjectId = `proj_${projectId}`;

            const res = await fetch(
                `${backend_url}/project/${fullProjectId}/issues/${logId}/logs`,
                {
                    credentials: "include"
                }
            );

            const data = await res.json();

            if (!res.ok) {
                toast(
                    data.detail ||
                    "Failed to fetch logs",
                    "error"
                );
                return;
            }

            setLogs(data);

            setCache(
                cacheKey,
                data
            );

        } catch {
            toast(
                "Something went wrong while fetching logs",
                "error"
            );
        } finally {
            setLogLoading(false);
        }
    };

    const connectionLiveSocket = (
        projectId
    ) => {
        if (!projectId) return;

        if (
            socketRef.current &&
            (
                socketRef.current.readyState ===
                WebSocket.OPEN ||
                socketRef.current.readyState ===
                WebSocket.CONNECTING
            )
        ) {
            return;
        }

        const ws = new WebSocket(
            `${websocketUrl}/project/${projectId}/live`
        );

        ws.onmessage = (event) => {
            const data = JSON.parse(
                event.data
            );

            // Instant optimistic update
            if (data.type === "LIVE_EVENT") {
                syncIssues([
                    normalizeIssue(
                        data.data,
                        true
                    )
                ]);
            }

            // Backend-confirmed update
            if (
                data.type ===
                "ISSUE_BATCH_UPDATE"
            ) {
                syncIssues(
                    data.data.map(issue =>
                        normalizeIssue(issue)
                    )
                );
            }

            if (data.type === "issue_status_updated"){
                setIssues(prev =>
                    prev.map(issue =>
                        issue.id === data.issue_id
                            ? {
                                ...issue,
                                status: data.status
                            }
                            : issue
                    )
                );
            }
        };

        socketRef.current = ws;
    };

    const updateIssueStatus = (projectId,issueId,status) =>{
        setIssues(prev => {
            const updated = prev.map(issue => issue.id  === issueId ? {...issue,status}:issue);

            setCache(`issues_${projectId}`,updated);

            return updated;
        });

        if(statusTimeoutRef.current[issueId]){
            clearTimeout(statusTimeoutRef.current[issueId]);
        }

        statusTimeoutRef.current[issueId] = setTimeout(async ()=>{
            try {
                const fullProjectId = `proj_${projectId}`;

                const res = await fetch(`${backend_url}/project/${fullProjectId}/issues/${issueId}/status`, {
                    method: "PATCH",
                    credentials: "include",
                    headers: {
                        "Content-Type":
                            "application/json"
                    },
                    body: JSON.stringify({
                        status
                    })
                })

                const data = await res.json();

                if(!res.ok){
                    toast(
                        data.detail ||
                        "Failed to update status",
                        "error"
                    );
                }
            } catch (error) {
                toast(
                    "Failed to sync issue status",
                    "error"
                );
            }
        },3000);
    }

    const disconnectLiveSocket = () => {
        if (socketRef.current) {
            socketRef.current.close();
            socketRef.current = null;
        }
    };

    return (
        <LogContext.Provider
            value={{
                issues,
                issuesLoading,
                fetchIssues,
                logs,
                logLoading,
                fetchLogs,
                connectionLiveSocket,
                disconnectLiveSocket,
                updateIssueStatus
            }}
        >
            {children}
        </LogContext.Provider>
    );
};

export const useLog = () =>
    useContext(LogContext);