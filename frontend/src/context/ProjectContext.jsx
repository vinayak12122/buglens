import { createContext, useContext, useEffect, useRef, useState } from "react";
import { useToast } from "../components/ui/Toast";
import { useAuth } from "./AuthContext";
// import { getCache,setCache } from "../utils/cache";


const ProjectContext = createContext();

export const ProjectProvider = ({ children }) => {

    const [projects, setProjects] = useState([]);
    const [projectLoading, setProjectLoading] = useState(false);

    const socketRef = useRef(null);

    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const { user, authLoading } = useAuth();
    const toast = useToast();

    const fetchProjects = async () => {

        const cacheKey = "projects_cache";

        // const cached = getCache(cacheKey);

        // if (cached?.data) {
        //     setProjects(cached.data);
        // }

        // if (cached && !cached.expired) {
        //     return;
        // }

        try {
            setProjectLoading(true);
            const res = await fetch(`${backendUrl}/project/projects`, {
                method: 'GET',
                credentials: 'include'
            })

            if (!res.ok) {
                toast("Failed to fetch projects",'error')
            }

            const data = await res.json()

            setProjects(data)
            // console.log(data)
        } catch (error) {
            toast('Error while fetching projects',"error")
        }finally{
            setProjectLoading(false)
        }
    }

    const createProject = async({name,website_url}) =>{
        if(!name.trim() || !website_url.trim()){
            toast("Please fill all the required field")
            return
        }
        try {
            const res = await fetch(`${backendUrl}/project/create`,{
                method:'POST',
                credentials:'include',
                headers:{'Content-Type':'application/json'},
                body:JSON.stringify({name,website_url})
            })
            const data = await res.json()

            if(!res.ok){
                toast(data.detail||"Failed to create project",'error')
                return
            }


            await fetchProjects()
            return data
        } catch (error) {
            toast("Project creation failed",'error')
        }
    }

    const connectionProjectSocket = ()=>{
        if(socketRef.current){
            socketRef.current.close();
        }

        const ws = new WebSocket("ws://localhost:2006/project/global/live");

        ws.onopen = () =>{
            // console.log("Project Stats WS Connected");
        }

        ws.onclose = () => {
            // console.log("Project Stats WS Closed");
        };

        ws.onerror = (error) => {
            // console.log("Project Stats WS Error", error);
        };

        ws.onmessage = (event) =>{
            const data = JSON.parse(event.data)

            if (data.type === "PROJECT_STATS_UPDATE") {
                setProjects(prev => {

                    const updatedProjects = prev.map(project => {

                        if (
                            project.project_id !==
                            data.data.project_id
                        ) {
                            return project;
                        }

                        return {
                            ...project,

                            // issues_count: data.data.issues_count,
                            logs_count: (project.logs_count || 0) + data.data.logs_count
                        };
                    });
                    return updatedProjects;
                });
            }
        }

        socketRef.current = ws;
    }

    const disconnectProjectSocket = () => {

        if (socketRef.current) {
            socketRef.current.close();
            socketRef.current = null;
        }
    };

    useEffect(() => {

        if (authLoading || !user) return;

        fetchProjects();

    }, [user, authLoading]);


    useEffect(() => {

        if (authLoading || !user) return;

        connectionProjectSocket();

        return () => {
            disconnectProjectSocket();
        };

    }, [user, authLoading]);

    useEffect(() => {

        return () => {

            if (socketRef.current) {
                socketRef.current.close();
            }
        };

    }, []);

    return (
        <ProjectContext.Provider
            value={{
                projects,
                projectLoading,
                setProjectLoading,
                fetchProjects,
                createProject
            }}
        >
            {children}
        </ProjectContext.Provider>
    )
}

export const useProject = () => useContext(ProjectContext)