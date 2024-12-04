import Navbar from "./Navbar"
import Footer from "./Footer"
import { Outlet } from "react-router-dom"

function Layout() {
  return (
    <div className="app">
        <Navbar/>

        <div className="app-content flex-grow">
            <Outlet/>
        </div>

        <div className="">
            <Footer/>
        </div>
    </div>
  )
}

export default Layout