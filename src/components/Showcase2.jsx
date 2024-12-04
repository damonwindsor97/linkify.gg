import ToolsPreview from '../assets/tools-preview.png'


function Showcase2() {
  return (
    <div className="items-center justify-center font-inter md:h-[620px] h-[500px] relative">
      <div className="md:flex mt-[100px] items-center justify-center h-full md:max-w-[1250px] mx-auto ">
        <div className="md:w-[50%] text-center z-10 relative">
          <div>
            <p className='text-7xl p-2 font-semibold bg-gradient-to-r from-cyan-300 to-blue-600 inline-block text-transparent bg-clip-text'>Linkify</p>
            <p className='text-3xl font-light text-gray-300'>Free and Easy converter</p>
          </div>
        </div>

        <div className='md:w-[50%] relative mt-20 w-[350px] m-auto md:m-12'>
          <div className='absolute h-32 w-32 md:h-64 md:w-64 bg-gradient-to-t from-cyan-300 to-blue-600 rounded-full blur-3xl md:right-0 right-40 top-20 md:top-1/2 md:transform md:-translate-y-1/2 -z-10 animate-blob'/>
          <img src={ToolsPreview} className='w-[350px] md:w-[500px] md:absolute top-1/2 right-20 md:right-0 transform md:-translate-y-1/2 z-20 md:rotate-back-12'
          />
        </div>
      </div>
    </div>
  )
}

export default Showcase2