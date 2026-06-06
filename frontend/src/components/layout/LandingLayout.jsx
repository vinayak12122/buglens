import { useState } from "react"
import Rag from "../ui/Rag"
import Footer from "./Footer"
import Header from "./Header"

const LandingLayout = ({children}) =>{
    const [openRag,setOpenRag] = useState(false);
    return(
        <div className='min-h-screen bg-app-bg text-app-text'>
            <Header />
            <main className='pt-15 min-h-screen'>
                {children}
                <div className="fixed bottom-15 sm:right-15 z-100">
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