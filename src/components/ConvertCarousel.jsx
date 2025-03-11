import { useEffect, useState } from "react";
import Converter from "../components/Converter";
import ImageConverter from "../components/ImageConverter";
import VideoConverter from "./VIdeoConverter";
import VideoConverter from "../components/VideoConverter";

function ConvertCarousel() {
  const [activeTab, setActiveTab] = useState("panel-1");

  useEffect(() => {
    let tabs = document.querySelectorAll(".tab");
    let indicator = document.querySelector(".indicator");
    
    const updateIndicator = (tab) => {
      indicator.style.width = tab.getBoundingClientRect().width + 'px';
      indicator.style.left = tab.getBoundingClientRect().left - tab.parentElement.getBoundingClientRect().left + 'px';
    };

    updateIndicator(tabs[0]);

    tabs.forEach(tab => {
      tab.addEventListener("click", () => {
        let tabTarget = tab.getAttribute('aria-controls');
        updateIndicator(tab);
        setActiveTab(tabTarget);
      });
    });
  }, []);

  return (
    <div className="flex flex-col min-h-[50%]">
      <div className="flex-grow">
        <div className="mx-auto px-8 sm:px-0">
          <div
            role="tablist"
            aria-label="tabs"
            className="relative w-max mx-auto h-12 grid grid-cols-3 rounded-full overflow-hidden shadow-2xl px-[3px] items-center border border-slate-400/20 shadow-900/20 transition font-roboto"
          >
            <div className="absolute w-32 h-11 my-auto bottom-0 top-0 left-0 rounded-full bg-main shadow-md indicator"></div>
            <button
              role="tab"
              aria-selected={activeTab === "panel-1"}
              aria-controls="panel-1"
              id="tab-1"
              tabIndex="0"
              className="relative black h-10 px-6 tab rounded-full"
              onClick={() => setActiveTab("panel-1")}
            >
              <span className="text-gray-300">Links / URLs</span>
            </button>
            <button
              role="tab"
              aria-selected={activeTab === "panel-2"}
              aria-controls="panel-2"
              id="tab-2"
              tabIndex="-1"
              className="relative black h-10 px-6 tab "
              onClick={() => setActiveTab("panel-2")}
            >
              <span className="text-gray-300">Images</span>
            </button>
            <button
              role="tab"
              aria-selected={activeTab === "panel-3"}
              aria-controls="panel-3"
              id="tab-3"
              tabIndex="-1"
              className="relative black h-10 px-6 tab rounded-full"
              onClick={() => setActiveTab("panel-3")}
            >
              <span className="text-gray-300">Videos</span>
            </button>
          </div>
          <div className="mt-6">
            {activeTab === "panel-1" && (
              <div role="tabpanel" id="panel-1" className="tab-panel">
                <Converter />
              </div>
            )}
            {activeTab === "panel-2" && (
              <div role="tabpanel" id="panel-2" className="tab-panel">
                <ImageConverter />
              </div>
            )}
            {activeTab === "panel-3" && (
              <div role="tabpanel" id="panel-3" className="tab-panel">
                 <VideoConverter/>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConvertCarousel;