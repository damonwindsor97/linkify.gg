import Showcase from "../components/Showcase"
import Info from "../components/Info"
import Converter from "../components/Converter"

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
            <div >
                <Converter/>
            </div>
        </div>
    </div>
  )
}

export default Home