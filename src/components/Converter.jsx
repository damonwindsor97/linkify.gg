import { useState } from 'react';
import axios from 'axios';

import { Select } from '@mui/base/Select';
import { Option } from '@mui/base/Option';
import { BarLoader } from 'react-spinners';
import { GrPowerReset } from "react-icons/gr";

import SoundcloudLogo from '../assets/soundcloud-white.png'
import YouTubeLogo from '../assets/yt-white.png'
import SpotifyLogo from '../assets/spotify-white.png'

function Converter() {
    const [url, setUrl] = useState('');
    const [selectedUtility, setSelectedUtility] = useState(null);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();
    const [errorMessage, setErrorMessage] = useState('')
    const [success, setSuccess] = useState(false);

    const [tinyURL, setTinyURL] = useState(null);
    const [soundcloudURL, setSoundcloudUrl] = useState(null)
    const [youtubeURL, setYoutubeURL] = useState(null)

  
    const handleUrlChange = (e) => {
      setUrl(e.target.value);
    };
  
    const handleUtilityChange = (event, newValue) => {
      setSelectedUtility(newValue);
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      
      if (!url || selectedUtility === null) {
        alert('Please enter a URL and select a utility.');
        return;
      }
  
      switch (selectedUtility) {
        case 10:
          shortenUrl(url);
          break;
        case 20:
          convertYoutubeToMp3(url);
          break;
        case 30:
          convertYoutubeToMp4(url);
          break;
        case 40:
          convertSoundcloudToMp3(url);
          break;
        case 50:
          convertSpotifyToMp3(url);
          break;
        default:
          alert('Please select a valid utility.');
      }
    };

    const resetState = () => {
      setUrl('');
      setSelectedUtility(null)
      setError(false);
      setSuccess(false);
      setSoundcloudUrl(null);
      setTinyURL(null);
      setYoutubeURL(null);
    }

    const extractYoutubeId = (url) => {
      const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
      const match = url.match(regExp);
      return (match && match[2].length === 11) ? match[2] : null;
    };
    
    const shortenUrl = async () => {
        const longURL = document.getElementById("linkInput").value;
        try {
          setSuccess(false);
          setError(false);
          setTinyURL(null);
          setLoading(true);
          setSoundcloudUrl(null);
          setYoutubeURL(null);
          setErrorMessage(' ')
    
          const response = await fetch(`http://localhost:5000/api/url/shorten`, {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              url: longURL,
            })
          });
    
          const data = await response.json();
          console.log(data)
    
          if (data.short) {
            setTinyURL(data.short);
            setLoading(false);
            setSuccess(true)
          } else {
            throw new Error("Unable to process, please try again");
          }
        } catch (error) {
          console.error("Error:", error);
          setErrorMessage(error.message || 'An error occured')
          setLoading(false);
          setError(error);
          setSuccess(false)
        }
    };
  
    const convertYoutubeToMp3 = async () => {
      const youtubeUrl = document.getElementById("linkInput").value;
      
      const videoId = youtubeUrl.includes('youtube.com') || youtubeUrl.includes('youtu.be') 
          ? extractYoutubeId(youtubeUrl) : youtubeUrl;

      const options = {
          method: 'GET',
          url: 'https://youtube-mp36.p.rapidapi.com/dl',
          params: { id: videoId }, 
          headers: {
              'x-rapidapi-key': import.meta.env.VITE_YOUTUBE_MP3_API_KEY,
              'x-rapidapi-host': import.meta.env.VITE_YOUTUBE_MP3_API_HOST
          }
      };

      try {
        setLoading(true)
        setError(false)
        setSuccess(false)
        setSoundcloudUrl(null)
        setTinyURL(null)
        setYoutubeURL(null);
        setErrorMessage(' ');
  
        const response = await axios.request(options);
        console.log(response);

        const link = document.createElement('a');
        link.href = response.data.link;
        link.setAttribute('download', `${response.data.title}.m4a`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link)

        setSuccess(true)
        setLoading(false)
        setYoutubeURL(null)
      } catch (error) {
        setLoading(false)
        setError(true)
        console.log(error)
      }
    };
  
    const convertYoutubeToMp4 = async () => {
      const youtubeUrl = document.getElementById("linkInput").value;

      try {
        setLoading(true)
        setError(false)
        setSuccess(false)
        setSoundcloudUrl(null)
        setTinyURL(null)
        setYoutubeURL(null);
        setErrorMessage(' ');
  

        const response = await axios.post('http://localhost:5000/api/youtube/toMp4', { youtubeUrl }, {
          responseType: 'blob'  
        });

        // Create a URL for the video blob
        const url = URL.createObjectURL(response.data);
        
        // Create a link element and trigger the download
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `title.mp4`);  
        document.body.appendChild(link);
        link.click();


        setSuccess(true);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError(true);
        setYoutubeURL(null);
        console.log(error);
        setErrorMessage(error.message || 'An error occurred')
      }
    };
  
    const convertSoundcloudToMp3 = async () => {
      const soundCloudUrl = document.getElementById("linkInput").value;

      try {
          setLoading(true);
          setError(false);
          setSuccess(false);
          setSoundcloudUrl(false)
          setTinyURL(null)
          setYoutubeURL(null);
          setErrorMessage(' ');

          const response = await axios.post("https://media-download-api.onrender.com/api/soundcloud/downloadMp3", { link: soundCloudUrl }, {
              responseType: 'blob' 
          });
          const title = await axios.post("https://media-download-api.onrender.com/api/soundcloud/getTitle", { link: soundCloudUrl });

          // const response = await axios.post("https://dev-media-download-api.onrender.com/api/soundcloud/downloadMp3", { link: soundCloudUrl }, {
          //     responseType: 'blob' 
          // });


          // const response = await axios.post("http://localhost:5000/api/soundcloud/downloadMp3", { link: soundCloudUrl }, {
          //     responseType: 'blob' 
          // });

          // const title = await axios.post("http://localhost:5000/api/soundcloud/getTitle", { link: soundCloudUrl });

          const blob = new Blob([response.data], { type: 'audio/mpeg' });
          const url = window.URL.createObjectURL(blob);

          const link = document.createElement("a");
          link.href = url;
          link.setAttribute('download', `${title.data}.m4a`);
          document.body.appendChild(link);
          link.click();

          setSuccess(true);
          setSoundcloudUrl(true)
          setLoading(false);
      } catch (error) {
          setErrorMessage(error.message || 'An error occurred')
          setLoading(false);
          setError(true);
      }

    };

    const convertSpotifyToMp3 = async () => {
      const spotifyURL = document.getElementById('linkInput').value;
      
      try {
        setSuccess(false);
        setError(false);
        setTinyURL(null);
        setLoading(true);
        setSoundcloudUrl(null);
        setYoutubeURL(null);
        setErrorMessage(' ')


        // const response = await axios.post('https://dev-media-download-api.onrender.com/spotify/downloadMp3', { link: spotifyURL}, { responseType: 'blob', crossDomain: true});

        const response = await axios.post('https://media-download-api.onrender.com/spotify/downloadMp3', { link: spotifyURL}, { responseType: 'blob', crossDomain: true});
        const title = await axios.post('https://media-download-api.onrender.com/spotify/getTitle', { link: spotifyURL});


        // const response = await axios.post("http://localhost:5000/spotify/downloadMp3", { link: spotifyURL }, {
        //     responseType: 'blob',
        //     crossDomain: true
        // });
        // const title = await axios.post("http://localhost:5000/spotify/getTitle", { link: spotifyURL });


        const blob = new Blob([response.data], { type: 'video/mp4'})
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");

        link.href = url;
        link.setAttribute('download', `${title.data}.m4a`);
        document.body.appendChild(link);
        link.click();
  
        setSuccess(true);
        setLoading(false);
      } catch (error) {
        console.log(error)
        setErrorMessage(error.message || 'An error occurred')
      }
    };
  
    return (
        <div className={"max-w-[1000px] m-auto bg-main rounded-lg text-center p-8" + (success ? ' border border-green-400' : "")}>
          <p className='absolute font-inter text-xs md:text-sm font-extralight text-white '>Powered By:
            {selectedUtility === 10 && " Linkify"}
            {selectedUtility === 20 && " Rapid-API"}
            {selectedUtility === 30 && " Rapid-API"}
            {selectedUtility === 40 && " Linkify"}
            </p>
          <p className="font-inter text-white mb-4 mt-4 md:mt-0 text-sm md:text-base">Upload your image &gt; Select your options &gt; click "Convert"</p>
          <p className='absolute right-0 top-0 cursor-pointer p-1 rounded text-white hover:bg-gray-600 active:bg-gray-700' onClick={resetState}><GrPowerReset/></p>

          <div>
            <form onSubmit={handleSubmit}>
              <div className="flex m-4 text-white">
                <input 
                  className="m-auto w-full bg-[#404040] p-2 rounded-l-lg mr-2 focus:outline-none focus:outline-blue-500"
                  value={url}
                  onChange={handleUrlChange}
                  id="linkInput"
                />
                
                <div className='relative'>
                  <Select 
                    id="UtilitySelect" 
                    className="m-auto p-2 text-xs md:text-base w-[100px] md:w-[300px] rounded-r-lg bg-[#3D4A48] font-inter font-bold active:brightness-90 hover:brightness-95" 
                    placeholder="Select Utility" 
                    onChange={handleUtilityChange}
                  >
                    <div className="absolute rounded-b-lg bg-[#3D4A48] text-start md:text-base text-xs md:w-[300px] font-inter text-white shadow-md mt-1">
                      <Option value={10} className="p-3 border-b hover:brightness-75 cursor-pointer">URL Shortener</Option>   
                      <Option value={20} className="p-3 border-b flex items-center bg-gradient-to-r from-red-700 to-red-900 hover:brightness-75 cursor-pointer"><img src={YouTubeLogo} className='h-6 mr-2 md:block hidden'/> YouTube to MP3</Option>   
                      <Option disabled value={30} className="p-3 border-b flex items-center bg-gradient-to-r from-red-700 to-red-900 brightness-75 cursor-pointer"><img src={YouTubeLogo} className='h-6 mr-2 md:block hidden'/> YouTube to MP4 </Option>   
                      <Option value={40} className="p-3 border-b flex items-center bg-gradient-to-r from-orange-700 to-orange-900 hover:brightness-75 cursor-pointer"><img src={SoundcloudLogo} className='h-3 mr-2 md:block hidden'/> Soundcloud to MP3</Option>   
                      <Option disabled value={50} className="p-3 flex items-center bg-gradient-to-r from-green-700 to-green-900 rounded-b-lg brightness-75 cursor-pointer"><img src={SpotifyLogo} className='h-6 mr-2 md:block hidden'/> Spotify to MP3</Option>   
                    </div>
                  </Select>
                </div>
              </div>
              <button type="submit" className='p-2 w-full bg-sky-800 rounded text-white hover:bg-sky-600 active:bg-sky-700 disabled:bg-gray-400' disabled={loading}>
                  {loading ? <BarLoader /> : "Convert"}
              </button>
            </form>

          </div>

        {youtubeURL && (
          <div className="mt-2">
            <p className="text-sm text-center font-italic text-yellow-500 font-inter">Conversion can take up to 30 seconds, depending on quality & length.</p>
          </div>
        )}
        {error && (
            <div className=" mt-2">
              <p className="text-lg text-center font-bold text-red-400 font-inter">An Error occurred: {errorMessage}</p>
            </div>
        )}
        {success && (
          <div className=" mt-2">
            <p className="text-xl text-center font-bold text-green-400 font-inter">Successfully Converted.</p>
          </div>
        )}
        {tinyURL && (
          <div className=" mt-2">
            <p className="text-xl text-center font-bold text-white font-inter">Your new URL is:</p>
            <a href={tinyURL} ><span  className="text-blue-200 hover:text-blue-600 text-center">{tinyURL}</span></a>
          </div>
        )}
        {selectedUtility === 40 && (
          <div className="">
            <p className="text-sm text-center font-italic text-yellow-500 font-inter">Soundcloud GO songs cannot be processed, it is being looked into.</p>
          </div>
        )}
      </div>
    )
}

export default Converter