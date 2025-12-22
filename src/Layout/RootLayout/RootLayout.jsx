import React from 'react'
import { Outlet } from 'react-router'
import Navbar from '../../Components/Sheard/Navbar/Navbar'
import Footer from '../../Components/Sheard/Footer/Footer'

const RootLayout = () => {
  return (
    <div>
      <nav>
        <Navbar/>
      </nav>
      <main>
        <Outlet/>
      </main>
      <footer>
        <Footer/>
      </footer>
    </div>
  )
}

export default RootLayout
