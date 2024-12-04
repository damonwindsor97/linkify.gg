import { Link } from "react-router-dom"

function Footer() {
  return (
<footer className='bg-main bg-opacity-25 mx-auto font-inter p-8 mt-12 md:h-[200px] '>
  <div className="flex justify-between items-center max-w-[1000px] mx-auto">
    <div className="flex flex-col space-y-8">
      <div>
        <p className="text-2xl font-bold text-white mb-2">Linkify.gg</p>
        <p className="text-base text-gray-300">Free-to-use Online Converter.</p>
      </div>
      <Link to="https://www.buymeacoffee.com/dwindsor"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" className="h-8" /></Link>
    </div>
    <div>
      <ul>
        <Link to="/privacypolicy"><li className="text-gray-300 cursor-pointer hover:text-white">Privacy Policy</li></Link>
        <Link to="https://discord.gg/linkify"><li className="text-gray-300 cursor-pointer hover:text-white">Support</li></Link>
      </ul>
    </div>
  </div>
</footer>
  )
}

export default Footer