import { useState, useEffect } from 'react';

import { Select } from '@mui/base/Select';
import { Option } from '@mui/base/Option';
import { GrPowerReset } from "react-icons/gr";
import { BarLoader } from 'react-spinners';


const ImageConverter = () => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState('');
  const [fromFormat, setFromFormat] = useState('');
  const [toFormat, setToFormat] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);


  const SupportedFileTypes = [
    "jpg", "jpeg", "png", "webp", "x-icon", "gif"
  ];

  const handleFileChange = (e) => {
    // get the file that's been selected
    const selectedFile = e.target.files[0];
    // console.log(selectedFile)

    if (selectedFile) {
      // get the file type after image/
      const fileType = selectedFile.type.split('/')[1];
      // If the file type matches one of our supported file types, run this
      if (SupportedFileTypes.includes(fileType.toLowerCase())) {
        setFile(selectedFile);
        setPreview(URL.createObjectURL(selectedFile));
        setFromFormat(fileType);
        setError('');
      } else {
        setError('File type is not supported.');
        setFile(null);
        setPreview('');
        setFromFormat('');
      }
    }
  };

  const resetState = () => {
    const inputField = document.getElementsByName('fileInput')[0];
    if(inputField){
      inputField.value = '';
    }

    setFile(null);
    setPreview('');
    setFromFormat('');
    setToFormat('');
    setError('');
    setSuccess(false);
  };

  const convertImage = async () => {
    // Simple error handling to make sure there is a file and a format
    if (!file || !toFormat) {
      setError("Please select a file and format.");
      return;
    }

    setLoading(true);
    setError('');
    setSuccess(false);
  
    try {
      // Initiate a promise which will eventually hold a blob object
      const blob = await new Promise((resolve, reject) => {
        // create FileReader object, used to read contents of the file
        const reader = new FileReader();
        // setup event handler for the file reader
        reader.onload = function(event) {
          // Creating an image object to load image data into
          const img = new Image();

          img.onload = function() {
            // create a canvas element and set its dimensions to match the uploaded image
            const canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            // Get back 2d rendering context of canvas, allows us to draw on the canvas
            const ctx = canvas.getContext('2d');
            // draw loaded image onto our canvas with position top-0 left-0
            ctx.drawImage(img, 0, 0);
            // convert our convas to a blob with the specified name
            canvas.toBlob(resolve, `image/${toFormat.toLowerCase()}`);
          };
          // error handler for the image loading
          img.onerror = reject;
          img.src = event.target.result;
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
  
      // Create a download link for the user
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');

      // Take away last 4 characters from name, usually is the old extension
      const fileName = file.name.slice(0, -4)
      // Attach our block/url to the anchor tag
      a.href = url;
      // Create the name for the download & then 'click' download for the user / auto download
      a.download = `${fileName}.${toFormat.toLowerCase()}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
  
      setSuccess(true);
    } catch (error) {
      console.error('Conversion failed:', error);
      setError('Conversion failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className={"max-w-[1000px] m-auto bg-main rounded-lg text-center p-8" + (success ? ' border border-green-400' : "")}>
      <p className='absolute font-inter text-xs md:text-sm font-extralight text-white '>Powered By: Linkify</p>
      <p className="font-inter text-white mb-4 mt-4 md:mt-0 text-sm md:text-base">Upload your image &gt; Select your options &gt; click "Convert"</p>
      <p className='font-inter text-white mb-4'>We support: <span className='text-blue-400'>{SupportedFileTypes.map(fileType => {
        return `${fileType} `
      })}</span></p>
      
      <div className='flex justify-center items-center mb-4'>
        <input 
          type="file"
          onChange={handleFileChange}
          className='md:file:p-2 md:file:text-lg text-sm md:m-2 file:hover:bg-stone-700 file:rounded file:border-gray-400 file:border-solid file:border-[1px] file:bg-main file:text-white file:cursor-pointer text-white'
          name="fileInput"
        />
        <p className='text-white text-sm md:text-base m-1 md:m-0'>Convert to</p>
        <Select 
          value={toFormat}
          onChange={(_, newValue) => setToFormat(newValue)}
          className="md:m-1 md:p-2 text-sm md:text-base rounded border border-gray-400 hover:bg-stone-700 text-white"
          placeholder="Select Format"
        >
          <div className="absolute rounded bg-[#3D4A48] text-start md:text-base text-xs md:w-[250px] w-[100px] font-inter text-white shadow-md mt-1">
            <div className='grid grid-cols-2 justify-between '>
              <Option value="PNG" className="p-3 md:w-[50%] hover:brightness-75 cursor-pointer">PNG</Option>   
              <Option value="JPG" className="p-3 md:w-[50%] hover:brightness-75 cursor-pointer">JPG</Option>   
              <Option value="WEBP" className="p-3 md:w-[50%] hover:brightness-75 cursor-pointer">WEBP</Option>   
              <Option value="ico" className="p-3 md:w-[50%] hover:brightness-75 cursor-pointer">ICO</Option> 
            </div>
          </div>
        </Select>
        <button onClick={resetState}  className='p-2 rounded text-white  hover:bg-gray-600'>
          <GrPowerReset />
        </button>
      </div>
      
      {preview && (
        <div className='w-[275px] border border-dashed mx-auto mb-4'>
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
  );
};

export default ImageConverter