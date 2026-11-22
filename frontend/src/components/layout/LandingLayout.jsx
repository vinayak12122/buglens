import { useState } from "react"
import Rag from "../ui/Rag"
import Footer from "./Footer"
import Header from "./Header"

const LandingLayout = ({ children, openRag, setOpenRag }) =>{
    return(
        <div className='min-h-screen bg-app-bg text-app-text'>
            <Header 
            openRag={openRag}
            setOpenRag={setOpenRag}
            />
            <main className='pt-15 min-h-screen'>
                {children}
                <div className="fixed bottom-15 sm:right-15 z-10">
                    <Rag 
                    openRag={openRag}
                    setOpenRag={setOpenRag}
                    />
                </div>
            </main>
            <Footer />
        </div>
    )
}
export default LandingLayout