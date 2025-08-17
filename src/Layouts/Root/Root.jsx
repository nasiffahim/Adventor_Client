import React from 'react'
import Navbar from '../../Components/Navbar/Navbar'
import Home from '../../Pages/Home/Home'
import Footer from '../../Components/Footer/Footer'
import { Outlet } from 'react-router'
import TopNavbar from '../../Components/TopNavbar/TopNavbar'
import StickyNavbar from '../../Components/StickyNavbar/StickyNavbar'

export default function Root() {
  return (
    <div>
        <TopNavbar />
        <Outlet />
        <Footer />

        <StickyNavbar />
    </div>
  )
}
