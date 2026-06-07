import { createContext, useContext, useRef, useState } from "react";
import { useToast } from "../components/ui/Toast";

const RagContext = createContext();

export const RagProvider = ({children}) => {

    const [messages,setMessages] = useState([]);
    const [loading,setLoading] = useState(false);

    const messagesRef = useRef([]);

    const toast = useToast();

    const syncMessages = (updater) =>{
        setMessages(prev => {
            const next = typeof updater === 'function' ? updater(prev):updater;

            messagesRef.current = next;
            return next;
        });
    };

    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const sendMessage = async (question) => {
        const trimmed = question?.trim();
        if (!trimmed || loading) return;

        setLoading(true);

        const userMessage = { sender: "user", text: trimmed };
        const aiMessage = { sender: "ai", text: "" };
        const nextMessages = [...messagesRef.current, userMessage, aiMessage];

        syncMessages(nextMessages);

        try {
            const history = nextMessages.slice(0, -1).map((msg) => ({
                role: msg.sender === "user" ? "user" : "assistant",
                content: msg.text,
            }));

            const res = await fetch(`${backendUrl}/rag/ask`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ question: trimmed, history }),
            });

            if (!res.ok) {
                toast(`Request failed (${res.status})`, "error");
                setLoading(false);
                return;
            }

            if (!res.body) {
                toast(`Response Unavailable`, "error");
                setLoading(false);
                return;
            }

            const reader = res.body.getReader();
            const decoder = new TextDecoder();
            let aiText = "";
            let buffer = "";

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;

                buffer += decoder.decode(value, { stream: true });
                const events = buffer.split("\n\n");
                buffer = events.pop() || "";

                for (const event of events) {
                    const lines = event.split("\n");

                    for (const line of lines) {
                        if (!line.startsWith("data:")) continue;

                        // FIX: If it is an exact empty line match ("data:"), it is a true newline block!
                        if (line === "data:") {
                            aiText += "\n";
                            continue;
                        }

                        // FIX: Safely extract data content. 
                        // If it matches "data: ", remove the prefix and the single space.
                        let token = "";
                        if (line.startsWith("data: ")) {
                            token = line.slice(6);
                        } else {
                            token = line.slice(5);
                        }

                        if (token === "[DONE]") continue;

                        // Append the pure token alongside its natural trailing structural line endings
                        aiText += token + "\n";

                        syncMessages((prev) => {
                            const copy = [...prev];
                            copy[copy.length - 1] = {
                                sender: "ai",
                                text: aiText,
                            };
                            return copy;
                        });
                    }
                }
            }
        } catch (error) {
            toast(error?.message, "error");
            syncMessages((prev) => {
                const copy = [...prev];
                copy[copy.length - 1] = {
                    sender: 'ai',
                    text: "Unable to generate response",
                };
                return copy;
            });
        } finally {
            setLoading(false);
        }
    };

    const clearChat = () =>{
        messagesRef.current = [];
        setMessages([]);
    }
 

    return(
        <RagContext.Provider
            value={{
                messages,
                loading,
                sendMessage,
                clearChat,
            }}
        >
            {children}
        </RagContext.Provider>
    )
}

export const useRag = () => {
    const context = useContext(RagContext);

    if (!context) {
        throw new Error(
            "useRag must be used inside RagProvider"
        );
    }

    return context;
};


