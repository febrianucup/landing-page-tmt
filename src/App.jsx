import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './Pages/Hero'
import MainLayout from './layouts/MainLayout'
// import Aos from 'aos'
// import 'aos/dist/aos.css'
// import { useEffect } from 'react'

function App() {
  // useEffect(()=>{
  //   Aos.init({
  //     duration: 1000,
  //     once: false,
  //     easing: 'ease-in-out',
  //   })
  // }, [])
  return (
    <div className="bg-white min-h-screen text-black">
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<MainLayout/>}>
              <Route index element={<Home/>}/>
            </Route>
        </Routes>
    </BrowserRouter>
    </div>
  )
}

export default App