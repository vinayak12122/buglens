import React, { useState } from 'react'
import { SiHelpscout } from "react-icons/si"
import RagPage from '../../pages/landing/RagPage'
import { X } from 'lucide-react'

const Rag = ({ openRag, setOpenRag }) => {
    const [helpOpen, setHelpOpen] = useState(true);
    return (
        <div className="fixed bottom-10 right-0  z-50 flex flex-col items-end">
            <div
                className={`fixed bottom-0 right-0 sm:right-10 w-full sm:w-[50vh] md:w-[60vh] h-full sm:h-[90vh] bg-white sm:rounded-t- flex flex-col overflow-hidden transition-all duration-500 transform z-50 ${openRag
                    ? 'translate-y-0 opacity-100 pointer-events-auto'
                    : 'translate-y-full opacity-0 pointer-events-none'
                    }`}
            >
                <RagPage openRag={openRag} setOpenRag={setOpenRag} />
            </div>
            <div className='flex flex-col items-end rainbow-spinner-glow'>                
                {helpOpen && 
                <>
                    <div className={`py-2 px-4 bg-app-bg mb-1 text-sm text-app-text  relative right-10 rounded-[20px_20px_0px_20px] border border-app-text/10
                    ${openRag
                            ? 'opacity-0 scale-50 pointer-events-none'
                            : 'opacity-100 scale-100'
                        } 
                    `}>
                        Ask BuglensAI
                    </div>
                    <div
                        className={`absolute right-4 hover:bg-gray-400/20 p-1 rounded-full cursor-pointer
                            ${openRag
                                ? 'opacity-0 scale-50 pointer-events-none'
                                : 'opacity-100 scale-100'
                        }
                            `}

                        onClick={() => setHelpOpen(false)}
                    >

                        <X size={14} />
                    </div>
                </>
                }

                <button
                    onClick={() => setOpenRag(true)}
                    disabled={openRag}
                    className={`relative p-2 right-5 rounded-full h-14 w-14 flex justify-center items-center cursor-pointer border outline-none
                    
                    /* Light Mode Style */
                    bg-white border-stone-200 text-black/80
                    
                    /* Dark Mode Style */
                    dark:bg-zinc-950 dark:border-zinc-800 dark:text-white/80
                    
                    ${openRag
                            ? 'opacity-0 scale-50 pointer-events-none'
                            : 'opacity-100 scale-100'
                        } `}
                >
                    <SiHelpscout size={24} />
                </button>
            </div>
        </div>
    )
}

export default Rag