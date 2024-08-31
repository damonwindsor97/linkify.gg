import Navbar from "./Navbar"
import Footer from "./Footer"
import { Outlet } from "react-router-dom"

function Layout() {
  return (
    <div className="app">
        <div>
            <Navbar/>
        </div>

        <div className="min-h-[80%] flex-1">
            <Outlet/>
        </div>

        <div className="">
            <Footer/>
        </div>
    </div>
  )
}

export default Layout