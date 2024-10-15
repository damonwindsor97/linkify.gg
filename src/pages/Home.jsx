import Showcase from "../components/Showcase"
import Info from "../components/Info"
import ConvertCarousel from "../components/ConvertCarousel"

function Home() {
  return (
    <div className="">
        <div>
            <Showcase/>
        </div>

        <div className="flex flex-col space-y-8">
            <div>
                <Info/>
            </div>

            <div>
                <ConvertCarousel/>
            </div>
        </div>
    </div>
  )
}

export default Home