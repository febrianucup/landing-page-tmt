import CTA from "../components/CTA"
import ContactForm from "../components/Contact"

const Contact=()=>{
    return(
        <div className="min-h-screen flex flex-col bg-white w-full">
            <ContactForm/>
            <CTA/>
        </div>
    )
}

export default Contact