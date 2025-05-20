import React from 'react'
import { useState } from 'react';


function DocConverter() {
      const [file, setFile] = useState(null);
      const [preview, setPreview] = useState('');
      const [fromFormat, setFromFormat] = useState('');
      const [toFormat, setToFormat] = useState('');
      const [loading, setLoading] = useState(false);
      const [error, setError] = useState('');
      const [success, setSuccess] = useState(false);
  return (
    <div className={"max-w-[1000px] m-auto bg-main rounded-lg text-center p-8" + (success ? ' border border-green-400' : "")}>
      <p className='absolute font-inter text-xs md:text-sm font-extralight text-white '>Powered By: Linkify</p>
      <p className="font-inter text-white mb-4 mt-4 md:mt-0 text-sm md:text-base">Upload your Doc &gt; Select your options &gt; click "Convert"</p>
      <p className='font-inter text-white mb-4'>We support: <span className='text-blue-400'>{SupportedFileTypes.map(fileType => {
        return `${fileType} `
      })}</span></p>
      
      <div className='md:flex justify-center items-center mb-4'>
        <input 
          type="file"
          onChange={handleFileChange}
          className='file:p-2 md:file:text-lg text-sm md:m-2 file:hover:bg-stone-700 file:rounded file:border-gray-400 file:border-solid file:border-[1px] file:bg-main file:text-white file:cursor-pointer text-white'
          name="fileInput"
        />
        <p className='text-white text-sm md:text-base m-1 md:m-0'>Convert to</p>
        <Select 
          value={toFormat}
          onChange={(_, newValue) => setToFormat(newValue)}
          className="m-1 p-2 text-sm md:text-base rounded border border-gray-400 hover:bg-stone-700 text-white"
          placeholder="Select Format"
        >
          <div className="absolute rounded bg-[#3D4A48] text-start md:text-base text-xs md:w-[250px] w-[100px] font-inter text-white shadow-md mt-1">
            <div className='grid grid-cols-2 justify-between '>
              <Option value="pdf" className="p-3 md:w-[50%] hover:brightness-75 cursor-pointer">PDF</Option>   
            </div>
          </div>
        </Select>
        <button onClick={resetState}  className='p-2 rounded text-white  hover:bg-gray-600'>
          <GrPowerReset />
        </button>
      </div>
      
      {preview && (
        <div className='md:w-[275px] w-[250px] border border-dashed mx-auto mb-4'>
          <img src={preview} alt="Preview" className=' max-w-full mx-auto object-contain' />
        </div>
      )}

      <button 
        onClick={convertImage} 
        disabled={loading}
        className='p-2 w-full bg-sky-800 rounded text-white hover:bg-sky-600 active:bg-sky-700 disabled:bg-gray-400'
      >
        {loading ? <BarLoader /> : 'Convert'}
      </button>

      {error && (
            <div className=" mt-2">
              <p className="text-lg text-center font-bold text-red-400 font-inter">An Error occurred: {error}</p>
            </div>
      )}
      {success && (
          <div className=" mt-2">
            <p className="text-xl text-center font-bold text-green-400 font-inter">Successfully Converted.</p>
          </div>
      )}
    </div>
  )
}

export default DocConverter