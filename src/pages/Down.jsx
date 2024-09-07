import Showcase from "../components/Showcase"

function Down() {
  return (
    <div>
        <Showcase/>
        <div className="m-auto max-w-[1000px] bg-main p-10 rounded-b-lg">
            <div className="text-white font-inter text-center text-lg">
                <p className="text-3xl">API DOWN FOR MAINTENANCE</p>
                <p className="m-2">Apologies for any inconvenience</p>
            </div>
        </div>
    </div>
  )
}

export default Down