import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Aos from 'aos'
import 'aos/dist/aos.css'
import Navbar from '../sections/Navbar'
import Footer from '../sections/Footer'
import useVisitTracking from '../hooks/useVisitTracking'

export default function LandingLayout() {
  const location = useLocation()

  useVisitTracking()

  useEffect(() => {
    Aos.init({ duration: 700, easing: 'ease-out-cubic', once: true, offset: 60 })
  }, [])

  useEffect(() => {
    Aos.refresh()
  }, [location.pathname])

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Navbar />
      <main className="flex-1 pt-16">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
