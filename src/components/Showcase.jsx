import LinkifyLogo from '../assets/linkify-logo-white.png'

function Showcase() {
  return (
    <div className="items-center justify-center font-inter md:h-[480px] h-[400px] myGrid">
            <div className="text-center">
                <img src={LinkifyLogo} alt="Linkify" className='w-[250px] md:w-[300px] m-auto'/>
                <p className='text-4xl font-roboto underline text-blue-500 cursor-pointer'>Free Online URL Converter</p>
            </div>
    </div>
  )
}

export default Showcase