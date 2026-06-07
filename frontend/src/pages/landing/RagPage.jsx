import { Send, X, Sparkles, HelpCircle, Code, Settings, Loader2, Loader, Check, Copy } from 'lucide-react'
import React, { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { useRag } from '../../context/RagContext'
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import remarkGfm from "remark-gfm";

const ChatCodeBlock = ({ language, value }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(value);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error("Failed to copy!", err);
        }
    };

    return (
        <div className="w-full my-4 overflow-hidden rounded-lg border border-slate-700/50 shadow-md bg-[#282c34]">
            <div className="flex items-center justify-between px-4 py-1.5 bg-[#1e222b] text-slate-400 font-sans text-xs select-none border-b border-slate-800">
                <span className="font-semibold tracking-wider text-slate-300">
                    {language ? language.toUpperCase() : "CODE"}
                </span>
                <button
                    onClick={handleCopy}
                    className="flex items-center gap-1.5 py-1 px-2 rounded hover:bg-slate-800 hover:text-slate-100 transition duration-150 cursor-pointer"
                >
                    {copied ? (
                        <>
                            <Check size={13} className="text-green-400" />
                            <span className="text-green-400 font-medium">Copied!</span>
                        </>
                    ) : (
                        <>
                            <Copy size={13} />
                            <span>Copy code</span>
                        </>
                    )}
                </button>
            </div>
            <div className="w-full overflow-x-auto">
                <SyntaxHighlighter
                    style={oneDark}
                    language={language || "text"}
                    PreTag="div"
                    customStyle={{
                        margin: 0,
                        padding: '1.25rem 1rem',
                        background: 'transparent',
                        fontSize: '0.85rem',
                        width: '100%'
                    }}
                >
                    {value}
                </SyntaxHighlighter>
            </div>
        </div>
    );
};

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
        if (!text) return "";
        let t = text;

        t = t
            .replace(/ver\s+cel\.app/g, "vercel.app")
            .replace(/https?:\/\/\s+/g, "https://")
            .replace(/\s+\/sdk/g, "/sdk");

        t = t.replace(/(\d+\.)\s*\n+\s*/g, "$1 ");
        t = t.replace(/^([-\u2022])\s*\n+\s*/gm, "$1 ");

        t = t.replace(/^(##+\s+[A-Za-z0-9_\s]+?)\s+([A-Z].*)$/gm, "$1\n\n$2");
        t = t.replace(/([^\n])\s*(##+\s+[A-Z])/g, "$1\n\n$2");
        t = t.replace(/^(##+\s+.*)\n+(?!#)/gm, "$1\n\n");

        t = t.replace(/([^\n])\s*(```\w*)/g, "$1\n\n$2");
        t = t.replace(/(```)\s*([^\n])/g, "$1\n\n$2");

        t = t.replace(/([^\n])\s+(\d+\.\s+[A-Z])/g, "$1\n\n$2");
        t = t.replace(/([^\n])\s+([-\u2022]\s+[A-Z])/g, "$1\n\n$2");
        t = t.replace(/([^\n])\s*(>\s+[A-Z])/g, "$1\n\n$2");

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
                                className={`rounded-2xl p-3 text-sm max-w-[90%] leading-relaxed overflow-x-auto ${msg.sender === "user"
                                    ? "bg-white/80 text-white rounded-tr-none border border-black/20"
                                    : "bg-white text-gray-800 border border-gray-300 rounded-tl-none "
                                    }`}
                            >
                                <ReactMarkdown
                                    remarkPlugins={[remarkGfm]}
                                    components={{
                                        h1: ({ children }) => <h1 className="text-xl font-bold mt-4 mb-2 text-gray-900 block">{children}</h1>,
                                        h2: ({ children }) => <h2 className="text-lg font-bold mt-4 mb-2 text-gray-900 block">{children}</h2>,
                                        h3: ({ children }) => <h3 className="text-base font-semibold mt-3 mb-2 text-gray-900 block">{children}</h3>,
                                        p: ({ children }) => <div className="mb-2.5 leading-6 text-gray-700 block whitespace-pre-wrap">{children}</div>,
                                        ul: ({ children }) => <ul className="list-disc pl-5 mb-3 space-y-1 text-gray-700 block">{children}</ul>,
                                        ol: ({ children }) => <ol className="list-decimal pl-5 mb-3 space-y-1 text-gray-700 block">{children}</ol>,
                                        blockquote: ({ children }) => (
                                            <blockquote className="border-l-4 border-slate-400 pl-3 italic my-3 bg-slate-50 py-1.5 rounded-r text-gray-600 block">
                                                {children}
                                            </blockquote>
                                        ),
                                        code({ inline, className, children }) {
                                            const match = /language-(\w+)/.exec(className || "");
                                            const codeContent = String(children).replace(/\n$/, "");

                                            if (!inline) {
                                                return (
                                                    <ChatCodeBlock
                                                        language={match ? match[1] : ''}
                                                        value={codeContent}
                                                    />
                                                );
                                            }
                                            return (
                                                <code className="bg-slate-100 border border-slate-200 font-mono text-xs font-semibold px-1.5 py-0.5 rounded text-pink-600 mx-0.5 wrap-break-words">
                                                    {children}
                                                </code>
                                            );
                                        }
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
                            ? "text-gray-400  cursor-not-allowed"
                            : "bg-purple-900 hover:bg-purple-950 text-white cursor-pointer"}
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