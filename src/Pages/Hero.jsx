import HeroSection from "../components/Hero"
import Stats from "../components/Stats"

const Hero=()=>{
    return(
        <div className="flex flex-col bg-white w-full">
            <HeroSection/>
            <Stats/>
        </div>
    )
}

export default Hero