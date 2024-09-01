import { Link } from "react-router-dom"

function Footer() {
  return (
<footer className='bg-main max-w-[1000px] mx-auto rounded-t-lg font-inter p-8 mt-12 md:h-[150px]'>
  <div className="flex justify-between items-center w-full">
    <div>
      <p className="text-2xl font-bold text-white mb-2">Linkify.gg</p>
      <p className="text-base text-gray-300">Free-to-use Online Link Converter.</p>
    </div>
    <div>
      <Link to="https://www.buymeacoffee.com/dwindsor"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" className="h-10" /></Link>
    </div>
  </div>
</footer>
  )
}

export default Footer