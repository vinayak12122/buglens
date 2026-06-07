import React from 'react'
import { SiHelpscout } from "react-icons/si"
import RagPage from '../../pages/landing/RagPage'

const Rag = ({ openRag, setOpenRag }) => {
    return (
        <div className="fixed bottom-10 right-0 sm:right-10 z-50 flex flex-col items-end">
            <div
                className={`fixed bottom-0 right-0 sm:right-10 w-full sm:w-[50vh] md:w-[60vh] h-full sm:h-[90vh] bg-[#d1cfb3] sm:rounded-t-xl shadow-2xl flex flex-col overflow-hidden transition-all duration-500 ease-in-out transform z-50 ${openRag
                    ? 'translate-y-0 opacity-100 pointer-events-auto'
                    : 'translate-y-full opacity-0 pointer-events-none'
                    }`}
            >
                <RagPage openRag={openRag} setOpenRag={setOpenRag} />
            </div>

            <button
                onClick={() => setOpenRag(true)}
                disabled={openRag}
                className={`relative p-2 right-5 rounded-full h-14 w-14 flex justify-center items-center cursor-pointer border outline-none transition-all duration-500
                    
                    /* Light Mode Style */
                    bg-white border-stone-200 text-stone-700 hover:text-black
                    
                    /* Dark Mode Style */
                    dark:bg-zinc-950 dark:border-zinc-800 dark:text-zinc-300 dark:hover:text-white
                    
                    ${openRag
                        ? 'opacity-0 scale-50 pointer-events-none'
                        : 'opacity-100 scale-100 rainbow-spinner-glow'
                    } `}
            >
                {/* Subtle internal pulsing for the icon itself */}
                <SiHelpscout size={24} className="animate-pulse" />
            </button>
        </div>
    )
}

export default Rag