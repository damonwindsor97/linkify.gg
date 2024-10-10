import { useEffect } from "react"

import Converter from "../components/Converter"
import ImageConverter from "../components/ImageConverter"

function ConvertCarousel() {

  useEffect(() => {
    let tabs = document.querySelectorAll(".tab")
    let indicator = document.querySelector(".indicator")
    let panels = document.querySelectorAll(".tab-panel")
    
    indicator.style.width = tabs[0].getBoundingClientRect().width + 'px'
    indicator.style.left = tabs[0].getBoundingClientRect().left - tabs[0].parentElement.getBoundingClientRect().left + 'px'

    tabs.forEach(tab =>{
      tab.addEventListener("click", ()=>{
        let tabTarget = tab.getAttribute('aria-controls')

        indicator.style.width = tab.getBoundingClientRect().width + 'px'
        indicator.style.left = tab.getBoundingClientRect().left - tab.parentElement.getBoundingClientRect().left + 'px'

        panels.forEach(panel => {
          let panelId = panel.getAttribute("id")
          if(tabTarget === panelId){
            panel.classList.remove("invisible", "opacity-0")
            panel.classList.add("visible", "opacity-100")
          } else {
            panel.classList.add("invisible", "opacity-0")
          }
        })
      })
    })

  }, [])
  return (
    <div className="min-h-[250px]  items-center">
      <div className=" mx-auto px-8 sm:px-0"></div>
        <div className=" sm:m-auto">
          <div
            role="tablist"
            aria-label="tabs"
            className="relative w-max mx-auto h-12 grid grid-cols-3 rounded-full overflow-hidden shadow-2xl px-[3px] items-center border border-slate-400/20 shadow-900/20 transition font-roboto"
          ><div className="absolute w-32 h-11 my-auto bottom-0 top-0 left-0 rounded-full bg-main shadow-md indicator"> </div>
            <button
              role="tab"
              aria-selected="true"
              aria-controls="panel-1"
              id="tab-1"
              tabIndex="0"
              className="relative black h-10 px-6 tab rounded-full"
            >
              <span className="text-gray-300">Links / URLs</span>
            </button>
            <button
              role="tab"
              aria-selected="false"
              aria-controls="panel-2"
              id="tab-2"
              tabIndex="-1"
              className="relative black h-10 px-6 tab rounded-full"
            >
              <span className="text-gray-300">Images</span>
            </button>
            <button
              role="tab"
              aria-selected="false"
              aria-controls="panel-3"
              id="tab-3"
              tabIndex="-1"
              className="relative black h-10 px-6 tab rounded-full"
            >
              <span className="text-gray-300">Nothing</span>
            </button>
          </div>
          <div className="relative">
            <div
              role="tabpanel"
              id="panel-1"
              className="tab-panel pt-6 transition duration-300"
            >
              <Converter/>
            </div>
            <div
              role="tabpanel"
              id="panel-2"
              className="absolute w-full top-0 invisible tab-panel pt-6 transition duration-300"
            >
              <ImageConverter/>
            </div>
            <div
              role="tabpanel"
              id="panel-3"
              className="absolute w-full top-0 invisible tab-panel p-6 transition duration-300"
            >
              
            </div>
          </div>
        </div>
    </div>
  )
}

export default ConvertCarousel