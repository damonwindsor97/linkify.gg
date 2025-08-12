import { Outlet } from "react-router-dom"
import { useEffect } from "react"
import axios from 'axios'

import Navbar from "./Navbar"
import Footer from "./Footer"

function Layout() {

  useEffect(() => {
    const getAnonToken = async () => {
      try {
        await axios.get(`${import.meta.env.VITE_API_ENDPOINT}/server/token`, {
          withCredentials: true,
        });
      } catch (error) {
        console.error('Failed to get anon token:', error);
      }
    };
    
    if (!document.cookie.includes('anon_token')) {
      getAnonToken();
    }
  }, []);

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