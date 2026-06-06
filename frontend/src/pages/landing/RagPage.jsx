import { Send, X, Sparkles, HelpCircle, Code, Settings, Loader2, Loader } from 'lucide-react'
import React, { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { useRag } from '../../context/RagContext'
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

const RagPage = ({ openRag, setOpenRag }) => {

    const [inputValue, setInputValue] = useState('')
    const { user } = useAuth()
    const { messages, loading, sendMessage } = useRag();

    const starterPrompts = [
        { label: "What is BugLens?" },
        { label: "How to track a bug?" },
        { label: "How to Configure buglens into my site?" }
    ]

    const handleSend = (text) => {
        const trimmed = text.trim();

        if (!trimmed) {
            return;
        }

        setInputValue("");

        void sendMessage(trimmed);
    };

    const cleanMarkdown = (text) => {
        let t = text;

        t = t
            .replace(/ver\s+cel\.app/g, "vercel.app")
            .replace(/https?:\/\/\s+/g, "https://")
            .replace(/\s+\/sdk/g, "/sdk");

        t = t.replace(/###\s*(.+)/g, (_, title) => {
            return `\n\n${title.trim()}\n`;
        });

        t = t.replace(
            /html\s*(<script[\s\S]*?<\/script>)/gi,
            (_, code) => `\n\`\`\`html\n${code.trim()}\n\`\`\`\n`
        );

        t = t.replace(/\*\s+/g, "\n- ");

        t = t.replace(/([a-z])\n([A-Z])/g, "$1\n\n$2");

        return t;
    };

    return (
        <div className='text-app-bg flex flex-col h-full w-full overflow-hidden px-3 py-2 bg-slate-50/50'>

            <div className="flex-none border-b border-gray-200 px-4 py-2">
                <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-lg text-gray-800">BugLens AI</h3>
                    <span className="h-8 w-8 rounded-full flex items-center justify-center hover:bg-slate-800/5 duration-200 cursor-pointer"
                        onClick={() => setOpenRag(false)}
                    >
                        <X size={18} />
                    </span>
                </div>
            </div>

            {/* Main view logic switch */}
            {messages.length > 0 ? (
                /* Chat view when messages exist */
                <div className="grow overflow-y-auto py-4 space-y-4 pr-1 scrollbar-hide">
                    {messages.map((msg, index) => (
                        <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} items-start gap-2`}>
                            {msg.sender === "ai" && (
                                <>
                                    {
                                        loading &&
                                        index === messages.length - 1
                                        && <Loader size={18} className="animate-spin" />

                                    }

                                </>
                            )}
                            <div
                                className={`rounded-2xl p-3 text-sm max-w-[85%] leading-relaxed shadow-sm overflow-hidden ${msg.sender === "user"
                                    ? "bg-black/50 text-white rounded-tr-none"
                                    : "bg-white text-gray-800 border border-gray-100 rounded-tl-none"
                                    }`}
                            >
                                <ReactMarkdown
                                    components={{
                                        code({ node, inline, className, children, ...props }) {
                                            const match = /language-(\w+)/.exec(className || "");

                                            return !inline && match ? (
                                                <SyntaxHighlighter
                                                    style={oneDark}
                                                    language={match[1]}
                                                    PreTag="div"
                                                    {...props}
                                                >
                                                    {String(children).replace(/\n$/, "")}
                                                </SyntaxHighlighter>
                                            ) : (

                                                    <code className="px-1 py-0.5 rounded text-sm break-all whitespace-pre-wrap bg-gray-200 ">
                                                        {children}
                                                    </code>

                                            );
                                        },
                                    }}
                                >
                                    {cleanMarkdown(msg.text)}
                                </ReactMarkdown>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className='grow flex flex-col justify-center items-center px-4 text-center'>
                    {/* <div className="h-12 w-12 bg-purple-600 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-purple-600/20 mb-4 animate-bounce">
                        <Sparkles size={24} />
                    </div> */}
                    <h2 className='text-xl font-bold text-gray-800 tracking-tight'>
                        Hey {user?.name || 'there'}!
                    </h2>
                    <p className="text-sm text-gray-500 mt-1 max-w-70 mb-6">
                        Ask anything about BugLens features, configuration, or workflows.
                    </p>

                    <div className="w-full max-w-[320px] space-y-2">
                        {starterPrompts.map((prompt, index) => (
                            <button
                                key={index}
                                onClick={() => handleSend(prompt.label)}
                                className="w-full flex items-center gap-3 bg-white hover:bg-slate-50 border border-gray-200/80 p-3 rounded-full text-center text-xs font-medium text-gray-700 transition-all duration-200 shadow-sm hover:scale-[1.02] cursor-pointer"
                            >
                                {prompt.icon}
                                <span className="truncate text-center">{prompt.label}</span>
                            </button>
                        ))}
                    </div>
                </div>
            )}


            <form
                onSubmit={(e) => { e.preventDefault(); handleSend(inputValue); }}
                className="flex gap-2 bg-white p-1.5 mb-2 rounded-full items-center border border-gray-200/50"
            >
                <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Ask me a question..."
                    className="grow p-2 text-sm bg-transparent outline-none text-gray-800 pl-4"
                />
                <button
                    type="submit"
                    disabled={loading || !inputValue.trim()}
                    className={`
        p-2.5 rounded-full flex items-center justify-center
        transition-all duration-200
        ${loading || !inputValue.trim()
                            ? "bg-gray-400  cursor-not-allowed"
                            : "bg-blue-600 hover:bg-blue-700 cursor-pointer text-white"}
    `}
                >
                    {loading ? (
                        <Loader2 size={14} className="animate-spin" />
                    ) : (
                        <Send size={14} />
                    )}
                </button>
            </form>
        </div>
    )
}

export default RagPage