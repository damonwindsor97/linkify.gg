import { Link } from 'react-router-dom'
import LinkifyLogo from '../../assets/linkify-logo-white.png'

function Navbar() {
  return (
    <div className='absolute w-full bg-opacity-20 backdrop-blur-sm z-50'>
        <div className='flex max-w-screen-xl m-auto items-center'>
            <div className='p-4 mr-6'>
                <img src={LinkifyLogo} className='w-32' alt='Linkify Logo'/>
            </div>

            <div className='text-white font-inter font-semibold'>
                <ul className='flex'>
                    <Link to="/"><li className='p-2 m-2 hover:bg-slate-700 rounded cursor-pointer ease-in-out duration-300'>Home</li></Link>
                    <Link to="https://discord.gg/linkify"><li className='p-2 m-2 hover:bg-slate-700 rounded cursor-pointer ease-in-out duration-300'>Support</li></Link>
                </ul>
            </div>
        </div>
    </div>
  )
}

export default Navbar