import { useState, useCallback } from 'react';
import axios from 'axios';

import { Select } from '@mui/base/Select';
import { Option } from '@mui/base/Option';
import { GrPowerReset } from "react-icons/gr";
import { BarLoader } from 'react-spinners';


function VIdeoConverter() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState('');

  const [fromFormat, setFromFormat] = useState('');
  const [toFormat, setToFormat] = useState('');

  const [loading, setLoading] = useState(false);
  const [progressMessage, setProgressMessage] = useState('')
  const [uploadProgess, setUploadProgress] = useState(0);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);



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
    console.log('selected file: ', selectedFile.name)
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
    if (!file || !toFormat) {
      setError("Please select a file and format.");
      return;
    }

    if (file.size > 509715200) {
      setError("No files over 500MBW");
      return;
    }

    setLoading(true);
    setError('');
    setSuccess(false);
    setUploadProgress(0);
    setProgressMessage("Uploading to S3...");

    try {
      const { data } = await axios.get(`${import.meta.env.VITE_API_ENDPOINT}/server/genSignedUrl`, {
        params: {
          filename: file.name,
          contentType: file.type
        }
      });

      const { url, key } = data;

      await axios.put(url, file, {
        headers: {
          'Content-Type': file.type
        },
        onUploadProgress: (progressEvent) => {
          const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setUploadProgress(percent);
          setProgressMessage(`Uploading...`);
        }
      });

      setProgressMessage("Upload complete. Waiting for server to start conversion...");

      const urlResponse = await axios.get(`${import.meta.env.VITE_API_ENDPOINT}/server/downloadSignedUrl`, {
        params: {
          key: key,
          mode: 'download'
        }
      });

      const downloadUrl = urlResponse.data.url;

      const downloadResponse = await axios.post(`${import.meta.env.VITE_API_ENDPOINT}/video/tomp3`, {
        url: downloadUrl,
        key: key,
        filename: file.name 
      },
      {responseType: 'blob', withCredentials: true})

      const blob = new Blob([downloadResponse.data], { type: 'audio/mpeg' });
      const downloadLink = document.createElement('a');
      downloadLink.href = window.URL.createObjectURL(blob); 
      downloadLink.setAttribute('download', `${file.name}.mp3`);;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);

      try {
        await axios.delete(`${import.meta.env.VITE_API_ENDPOINT}/server/deleteS3Object`, {
          params: {
            key: key,
          }
        }, { withCredentials: true });

      } catch (error) {
        console.log('Error deleting object from S3: ')
      }
      setSuccess(true);
    } catch (err) {
      console.error(err);
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
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

      <button onClick={convertVideo} disabled={loading}className='p-2 w-full bg-sky-800 rounded text-white hover:bg-sky-600 active:bg-sky-700 disabled:bg-gray-400'>
        {loading ? <BarLoader /> : 'Convert'}
      </button>

        <div className=" mt-2">
          <p className="text-sm md:text-lg text-center text-yellow-400 font-inter"></p>
        </div>

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
      {loading && (
        <div className="mt-2">
          <p className="text-md text-center font-inter text-white">{progressMessage}</p>
          {uploadProgess > 0 && uploadProgess < 100 && (
            <p className="text-xl text-center font-bold text-green-400 font-inter">{uploadProgess}%</p>
          )}
        </div>
      )}
    </div>
  )
}

export default VIdeoConverter