import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import Hero from "../Pages/Hero"
import Fitur from "../Pages/Fitur"
import Contact from "../Pages/Contact"

const MainLayout = () => {
    return(
        <div className="min-h-screen flex flex-col bg-white w-full">
            <Navbar/>
            <main className="flex-grow overflow-x-hidden pt-20">
                <section id="home">
                    <Hero/>
                </section>
                <Fitur/>
                <Contact/>
            </main>
            <Footer/>
        </div>
    )
}

export default MainLayout