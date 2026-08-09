import { useState, useEffect } from 'react';
// import Logo from '../assets/logo.png';
// import LoginBtn from './LoginBtn';

const Navbar = () => {
    const [activeSection, setActiveSection] = useState('home');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const sections = ['home', 'fitur', 'kontak'];
            const scrollPosition = window.scrollY + 200;

            for (const sectionId of sections) {
                const element = document.getElementById(sectionId);
                if (element) {
                    const top = element.offsetTop;
                    const height = element.offsetHeight;
                    
                    if (scrollPosition >= top && scrollPosition < top + height) {
                        setActiveSection(sectionId);
                        break;
                    }
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [isMobileMenuOpen]);

    const navItems = [
        { id: 'home', Label: 'Home' },
        { id: 'fitur', Label: 'Fitur' },
        { id: 'kontak', Label: 'Kontak' }
    ];

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <header className="fixed left-0 right-0 top-0 z-50 w-full bg-white/80 backdrop-blur-md transition-all duration-300 border-b border-gray-100">
            <div className="container mx-auto px-4 lg:px-8">
                <div className="flex items-center justify-between h-20 w-full">
                    <div className="flex items-center gap-8">
                        <div className="w-8 h-8 rounded-lg bg-primary text-on-primary flex items-center justify-center flex-shrink-0">
                            <a href='/' className="material-symbols-outlined text-[18px]">school</a>
                        </div>
                        <nav className="hidden lg:flex items-center gap-8 text-sm uppercase tracking-widest">
                            {navItems.map((item) => {
                                const isActive = activeSection === item.id;
                                return (
                                    <a key={item.id} href={`#${item.id}`} className={`relative py-2 text-sm font-medium transition-colors duration-300 group ${isActive ? "text-primary font-semibold" : "text-gray-700 hover:text-primary"}`}>
                                        <span className="inline-block transition-transform duration-300 group-hover:-translate-y-0.5">
                                            {item.Label}
                                        </span>
                                        <span className={`absolute bottom-0 left-0 h-[2px] bg-primary rounded-full transition-all duration-300 ${isActive ? "w-full" : "w-0 group-hover:w-full" }`}/>
                                    </a>
                                );
                            })}
                        </nav>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="hidden lg:block">
                            <a href="#kontak" className="sm:w-auto flex flex-row items-center justify-center gap-2 border border-black text-primary px-4  py-2 uppercase text-xs font-bold hover:bg-primary hover:text-white transition">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                                </svg>
                                Hubungi Kami
                            </a>
                        </div>
                        <button onClick={toggleMobileMenu} className="lg:hidden p-2 text-gray-700 hover:text-primary focus:outline-none" aria-label="Toggle Navigation">
                            <svg className="w-7 h-7 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                {isMobileMenuOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"/>
                                )}
                            </svg>
                        </button>
                    </div>

                </div>
            </div>

            {/* Mobile Navigation Drawer / Menu Dropdown */}
            <div className={`lg:hidden absolute top-full inset-x-0  bg-white/90 backdrop-blur-md border-b border-gray-200 shadow-xl transition-all duration-300 ease-in-out overflow-hidden ${isMobileMenuOpen ? "max-h-[400px] opacity-100 py-6" : "max-h-0 opacity-0 py-0"}`}>
                <div className="container mx-auto px-6 flex flex-col gap-5">
                    {navItems.map((item) => {
                        const isActive = activeSection === item.id;
                        return (
                            <a key={item.id} href={`#${item.id}`} onClick={() => setIsMobileMenuOpen(false)} className={`text-base font-semibold tracking-wider transition-colors duration-200 ${
                                    isActive ? "text-primary pl-2 border-l-4 border-primary" : "text-gray-700 hover:text-primary"}`} >
                                {item.Label}
                            </a>
                        );
                    })}

                    <div className="pt-4 border-t border-gray-100 flex justify-start">
                        <div onClick={() => setIsMobileMenuOpen(false)} className="w-full">
                                <a href="#kontak" className="sm:w-auto flex flex-row items-center justify-center gap-2 border border-black text-primary px-4  py-2 uppercase text-xs font-bold hover:bg-primary hover:text-white transition">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                                    </svg>
                                    Hubungi Kami
                                </a>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Navbar;