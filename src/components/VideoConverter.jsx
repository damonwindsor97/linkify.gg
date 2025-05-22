import { useState, useEffect } from 'react';
import { Select } from '@mui/base/Select';
import { Option } from '@mui/base/Option';
import { GrPowerReset } from "react-icons/gr";
import { BarLoader } from 'react-spinners';

import useProgressSocket from '../scripts/progressListener';

function VIdeoConverter() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState('');

  const [fromFormat, setFromFormat] = useState('');
  const [toFormat, setToFormat] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [progress, setProgress] =useState(0);
  const [progressMessage, setProgressMessage] = useState('')

  useProgressSocket((data) => {
    setProgress(data.percent)
    setProgressMessage(data.message)
  })


  const resetState = () => {
    setFile(null);
    setPreview('');
    setFromFormat('');
    setToFormat('');
    setError('');
    setSuccess(false);
  };

  const SupportedFileTypes = [
    "mp4"
  ];

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0]

    if(selectedFile){
      const fileType = selectedFile.type.split('/')[1];

      if(SupportedFileTypes.includes(fileType.toLowerCase())){
        setFile(selectedFile)
        setFromFormat(fileType)
        setError('')
      }
    };
  };


  const convertVideo = async () => {
    

    if (!file || !toFormat){
      setError("Please select a file and format.");
      alert("Please select a file and format.");
      return;
    }
    // measured in bytes
    if(file.size > 209715200){
      setError("No files over 200MB")
      return
    }

    console.log('file found: ', file.size)
    setLoading(true)
    setError('')
    setSuccess(false)

    try {
      const formData = new FormData();
      formData.append('file', file)

      console.log('calling API')
      const response = await fetch(
        `http://localhost:5000/api/v1/video/tomp3`, {
          method: 'POST',
          body: formData
        }
      );

      console.log('forming blob')
      const blob = await response.blob();

      const url = window.URL.createObjectURL(blob)

      const link = document.createElement('a');
      link.href = url;

      const fileName = file.name.replace(/\.[^/.]+$/, "") + ".mp3";
      link.setAttribute('download', fileName);
      document.body.appendChild(link);
      link.click()

      document.body.removeChild(link);
      window.URL.revokeObjectURL(url)

      setSuccess(true)
      setLoading(false)
    } catch (error) {
      setLoading(false);
      setError(error);
      console.log(error)
    }
  
  };

  return (

    <div className={"max-w-[1000px] m-auto bg-main rounded-lg text-center p-8" + (success ? ' border border-green-400' : "")}>
      <p className='absolute font-inter text-xs md:text-sm font-extralight text-white '>Powered By: Linkify</p>
      <p className="font-inter text-white mb-4 mt-4 md:mt-0 text-sm md:text-base">Upload your video &gt; Select your options &gt; click "Convert"</p>
      <p className='font-inter text-white mb-4'>We support: <span className='text-blue-400'>{SupportedFileTypes.map(fileType => {
        return `${fileType} `
      })}</span></p>
      
      <div className='md:flex justify-center items-center mb-4'>
        <input type="file" onChange={handleFileChange}
          className='file:p-2 md:file:text-lg text-sm md:m-2 file:hover:bg-stone-700 file:rounded file:border-gray-400 file:border-solid file:border-[1px] file:bg-main file:text-white file:cursor-pointer text-white'
          name="fileInput"
          id="fileInput"
        />
        <p className='text-white text-sm md:text-base m-1 md:m-0'>Convert to</p>
        <Select value={toFormat} onChange={(_, newValue) => setToFormat(newValue)}
          className="m-1 p-2 text-sm md:text-base rounded border border-gray-400 hover:bg-stone-700 text-white"
          placeholder="Select Format"
        >
          <div className="absolute rounded bg-[#3D4A48] text-start md:text-base text-xs md:w-[250px] w-[100px] font-inter text-white shadow-md mt-1">
            <div className='grid grid-cols-2 justify-between '>
              <Option value="MP3" className="p-3 md:w-[50%] hover:brightness-75 cursor-pointer">MP3</Option>
            </div>
          </div>
        </Select>
        <button onClick={resetState}  className='p-2 rounded text-white  hover:bg-gray-600'>
          <GrPowerReset />
        </button>
      </div>
      
      {preview && (
        <div className='md:w-[275px] w-[250px] border border-dashed mx-auto mb-4'>
          <video src={preview} alt="Preview" className=' max-w-full mx-auto object-contain' />
        </div>
      )}

      <button 
        onClick={convertVideo} 
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
      {loading && progress ? (
          <div className=" mt-2">
            <p className="text-xl text-center font-bold text-green-400 font-inter">{progressMessage} - {progress}%</p>
          </div>
      ) : ''}
    </div>
  )
}

export default VIdeoConverter