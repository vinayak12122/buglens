import Footer from "./Footer"
import Header from "./Header"

const LandingLayout = ({children}) =>{
    return(
        <div className='min-h-screen bg-app-bg text-app-text'>
            <Header />
            <main className='pt-15 min-h-screen'>
                {children}
            </main>
            <Footer />
        </div>
    )
}
export default LandingLayout