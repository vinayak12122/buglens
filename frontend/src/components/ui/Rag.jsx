import React from 'react'
import { SiHelpscout } from "react-icons/si"
import RagPage from '../../pages/landing/RagPage'

const Rag = ({ openRag, setOpenRag }) => {
    return (
        <div className="fixed bottom-10 right-0 sm:right-10 z-50 flex flex-col items-end">
            {/* Embedded CSS for the smooth scale up and down animation loop */}
            <style>{`
                @keyframes smoothScale {
                    0%, 100% { transform: scale(0.92); }
                    50% { transform: scale(1.08); }
                }
                .animate-pulse-scale {
                    animation: smoothScale 2.5s infinite ease-in-out;
                }
            `}</style>

            <div
                className={`fixed bottom-0 right-0 sm:right-10 w-full sm:w-[50vh] md:w-[60vh] h-full sm:h-[90vh] bg-[#d1cfb3] sm:rounded-t-xl shadow-2xl flex flex-col overflow-hidden transition-all duration-500 ease-in-out transform z-50 ${openRag
                    ? 'translate-y-0 opacity-100 pointer-events-auto'
                    : 'translate-y-full opacity-0 pointer-events-none'
                    }`}
            >
                <RagPage openRag={openRag} setOpenRag={setOpenRag}/>
            </div>
            <button
                onClick={() => setOpenRag(true)}
                disabled={openRag}
                className={`relative bg-[#d1cfb3] p-2 right-5 rounded-full h-15 w-15 flex justify-center items-center cursor-pointer border border-[#f3ee89] outline-none text-black shadow-lg transition-all duration-300 ${openRag
                        ? 'opacity-0 scale-50 pointer-events-none'
                        : 'opacity-100 scale-100 animate-pulse-scale'
                    } `}
            >
                <SiHelpscout size={24} />
            </button>
        </div>
    )
}

export default Rag
