// import Showcase from "../components/Showcase"
import Showcase2 from "../components/Showcase2"
import ConvertCarousel from "../components/ConvertCarousel"

function Home() {
  return (
    <div className="overflow-hidden">
        <div>
            <Showcase2/>
        </div>

        <div className="flex flex-col space-y-8">


            <div>
                <ConvertCarousel/>
            </div>


        </div>
    </div>
  )
}

export default Home