import { useState, useEffect } from 'react';
import axios from 'axios';

import { Select } from '@mui/base/Select';
import { Option } from '@mui/base/Option';


function ImageConverter() {
  const [image, setImage] = useState('');
  const [userImageTo, setUserImageTo] = useState(null)
  const [userImageFrom, setUserImageFrom] = useState(null)

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [errorMessage, setErrorMessage] = useState('')
  const [success, setSuccess] = useState(false);

  return (
    <div className="max-w-[1000px] m-auto bg-main rounded-lg text-center p-8">
      <p className="font-inter text-white">Select your options &gt; Upload your image &gt; click "Convert"</p>
      {/* Converter Options */}
      <div className='text-white'>
        <form>
          <div className='flex w-max mx-auto m-4 items-center'>
              <p className=''>Convert</p>
              <Select 
                id="" 
                className="m-1 p-2 rounded border border-gray-400 hover:bg-stone-700" 
                placeholder="Choose Ext." 

              >
                <div className="absolute rounded bg-[#3D4A48] text-start md:text-base text-xs md:w-[250px] font-inter text-white shadow-md mt-1">
                  <div className='grid grid-cols-2 justify-between '>
                    <Option value="pngFrom" className="p-3 md:w-[50%] hover:brightness-75 cursor-pointer">PNG</Option>   
                    <Option value="jpgFrom" className="p-3 md:w-[50%] hover:brightness-75 cursor-pointer">JPG</Option>   
                    <Option value="jpegFrom" className="p-3 md:w-[50%] hover:brightness-75 cursor-pointer">JPEG</Option>   
                    <Option value="icoFrom" className="p-3 md:w-[50%] hover:brightness-75 cursor-pointer">ICO</Option>   
                    <Option value="webpFrom" className="p-3 md:w-[50%] hover:brightness-75 cursor-pointer">WEBP</Option>   
                    <Option value="gifFrom" className="p-3 md:w-[50%] hover:brightness-75 cursor-pointer">GIF</Option>   
                  </div>
                </div>
              </Select>
              <p>to</p>
              <Select 
                  id="" 
                  className="m-1 p-2 rounded border border-gray-400 hover:bg-stone-700" 
                  placeholder="Choose Ext." 

                >
                  <div className="absolute rounded bg-[#3D4A48] text-start md:text-base text-xs md:w-[300px] font-inter text-white shadow-md mt-1">
                    <Option value="pngTo" className="p-3 hover:brightness-75 cursor-pointer">PNG</Option>   
                  </div>
              </Select>
          </div>
          <input type="file" className='file:p-2 file:text-lg m-2 file:hover:bg-stone-700 file:rounded file:border-gray-400 file:border-solid file:border-[1px] file:bg-main file:text-white file:cursor-pointer text-white'></input>

        <button type="submit" className='p-2 w-full bg-sky-800 rounded text-white hover:bg-sky-600 active:bg-sky-700'>Convert</button>
        </form>
        <div>
        </div>
      </div>
    </div>
  )
}

export default ImageConverter