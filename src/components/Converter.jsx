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

    const [toFormat, setToFormat] = useState('');
  
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
          convertYoutube(url);
          break;
        case 40:
          convertSoundcloudToMp3(url);
          break;
        case 50:
          extractSpotifyPlaylist(url)
          break;
        case 60:
          spotifyDownload(url)
          break
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
      setToFormat('')


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
    
          const response = await fetch(`https://mdapi.xyz/api/v1/url/shorten`, {
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
          setLoading(false);
          setError(error);
          setSuccess(false)
        }
    };
  

    const convertYoutube = async () => {
      const youtubeUrl = document.getElementById("linkInput").value;
      if(!toFormat){
        alert('Please enter a Format to convert to');
        return;
      }
    
      if (toFormat === "mp3") {
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
          setError(error)
        }
      } else if (toFormat === "mp4") {
        try {
          setLoading(true);
          setError(false);
          setSuccess(false);
          setSoundcloudUrl(null);
          setTinyURL(null);
          setYoutubeURL(null);
          setErrorMessage(" ");
          setToFormat("");
    
          const response = await fetch(
            `https://media-download-api.onrender.com/api/youtube/downloadMp4`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                link: youtubeUrl,
              }),
            }
          );
    

          const contentDisposition = response.headers.get('Content-Disposition');

          const filenameMatch = contentDisposition?.match(/filename="(.+)"/);
          const filename = filenameMatch ? filenameMatch[1] : 'converted-video.mp4';

          const blob = await response.blob();
          const url = window.URL.createObjectURL(blob);

          const link = document.createElement("a");
          link.href = url;
          // Use the video title in the download
          link.setAttribute("download", filename);
          document.body.appendChild(link);
          link.click();
    
          document.body.removeChild(link);
          window.URL.revokeObjectURL(url);
    
          setSuccess(true);
          setLoading(false);
        } catch (error) {
          setLoading(false);
          setError(error);
        }
      }
    };


    const convertSoundcloudToMp3 = async () => {
      const soundCloudUrl = document.getElementById("linkInput").value;
      if(!toFormat){
        alert('Please enter a Format to convert to');
        return;
      }
      
      try {
          setLoading(true);
          setError(false);
          setSuccess(false);
          setSoundcloudUrl(false)
          setTinyURL(null)
          setYoutubeURL(null);
          setErrorMessage(' ');
          setToFormat('')

          const response = await axios.post("https://media-download-api.onrender.com/api/v1/soundcloud/downloadMp3", { link: soundCloudUrl }, {
              responseType: 'blob' 
          });
          const title = await axios.post("https://media-download-api.onrender.com/api/v1/soundcloud/getTitle", { link: soundCloudUrl });

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
          link.setAttribute('download', `${title.data}.${toFormat}`);
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


    const extractSpotifyPlaylist = async () => {
      const spotifyLink = document.getElementById('linkInput').value;

      try {
        setLoading(true);
        setError(false);
        setSuccess(false);
        setSoundcloudUrl(false)
        setTinyURL(null)
        setYoutubeURL(null);
        setErrorMessage(' ');
        setToFormat('')

        const response = await axios.post('https://media-download-api.onrender.com/api/v1/spotify/playlistInfo', {link: spotifyLink});

        const fileData = response.data
        const blob = new Blob([fileData], {type: 'text/plain'})
        const url = URL.createObjectURL(blob)

        const link = document.createElement('a');
        link.download = "spotify-playlist.txt"
        link.href = url;
        link.click()

        setSuccess(true);
        setSoundcloudUrl(true)
        setLoading(false);
      } catch (error) {
        setErrorMessage(error.message || 'An error occurred')
        setLoading(false);
        setError(error);
      }
    };

    const spotifyDownload = async () => {
      const spotifyLink = document.getElementById('linkInput').value;

      
      try {
        setLoading(true);
        setError(false);
        setSuccess(false);
        setSoundcloudUrl(false)
        setTinyURL(null)
        setYoutubeURL(null);
        setErrorMessage(' ');
        setToFormat('')
        
        const mdaResponse = await axios.post('https://media-download-api.onrender.com/api/v1/spotify/downloadMp3', {link: spotifyLink})
        const videoId = mdaResponse.data;

        const options = {
            method: 'GET',
            url: 'https://youtube-mp36.p.rapidapi.com/dl',
            params: { id: videoId }, 
            headers: {
                'x-rapidapi-key': import.meta.env.VITE_YOUTUBE_MP3_API_KEY,
                'x-rapidapi-host': import.meta.env.VITE_YOUTUBE_MP3_API_HOST
            }
        };
        
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
        setError(error.response.data)
        setErrorMessage(error.response.data)
      }
    }
  
    return (
        <div className={"max-w-[1000px] m-auto bg-main rounded-lg text-center p-8" + (success ? ' border border-green-400' : "")}>
          <p className='absolute font-inter text-xs md:text-sm font-extralight text-white '>Powered By:
            {( selectedUtility === 10 || selectedUtility === 40 || selectedUtility === 50 || selectedUtility === 60 ) && " Linkify"}
            {!selectedUtility || !toFormat ? "" : selectedUtility === 20 && toFormat === 'mp3' ? " Rapid-API" : " Linkify"}
          </p>

          <p className="font-inter text-white mb-4 mt-4 md:mt-0 text-sm md:text-base">Paste your link &gt; Select your options &gt; click "Convert"</p>

          <div>
            <form onSubmit={handleSubmit}>
              <div className="flex m-4 text-white">
                <p className='cursor-pointer p-1 m-1 rounded text-white items-center m-auto hover:bg-gray-600 active:bg-gray-700' onClick={resetState}><GrPowerReset/></p>
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
                      <Option value={10} className="p-3 hover:brightness-75 cursor-pointer">URL Shortener</Option>   

                      <Option value={20} className="p-3 flex items-center bg-gradient-to-r from-red-700 to-red-900 hover:brightness-75 cursor-pointer"><img src={YouTubeLogo} className='h-6 mr-2 md:block hidden'/> YouTube Converter</Option>   
                      <Option value={40} className="p-3 flex items-center bg-gradient-to-r from-orange-700 to-orange-900 hover:brightness-75 cursor-pointer"><img src={SoundcloudLogo} className='h-3 mr-2 md:block hidden'/> Soundcloud Converter</Option>   
                      <Option value={50} className="p-3 flex items-center bg-gradient-to-r from-green-700 to-green-900 hover:brightness-75 cursor-pointer"><img src={SpotifyLogo} className='h-6 mr-2 md:block hidden'/>Spotify Playlist to .txt</Option>   
                      <Option value={60} className="p-3 flex items-center bg-gradient-to-r from-green-700 to-green-900 rounded-b-lg hover:brightness-75 cursor-pointer"><img src={SpotifyLogo} className='h-6 mr-2 md:block hidden'/>Spotify track to mp3</Option>   

                    </div>
                  </Select>
                </div>
              </div>
                {selectedUtility == 20 && (
                  <div className='flex'>
                    <div className='flex m-auto items-center'>
                      <p className='text-white text-sm md:text-xl m-1 '>Convert to</p>
                      <Select 
                        value={toFormat}
                        onChange={(_, newValue) => setToFormat(newValue)}
                        className="m-2 p-2 text-sm md:text-lg rounded border border-gray-400 hover:bg-stone-700 text-white"
                        placeholder="Select Format"
                      >
                        <div className="absolute rounded bg-[#3D4A48] text-start md:text-base text-xs md:w-[250px] w-[100px] font-inter text-white shadow-md mt-1">
                          <div className='grid grid-cols-2 justify-between '>
                            <Option value="mp3" className="p-3 md:w-[50%] hover:brightness-75 cursor-pointer">.mp3</Option>
                            <Option value="mp4" className="p-3 md:w-[50%] hover:brightness-75 cursor-pointer">.mp4</Option>
                          </div>
                        </div>
                      </Select>
                    </div>
                  </div>
                )}
                {selectedUtility == 40 && (
                  <div className='flex'>
                    <div className='flex m-auto items-center'>
                      <p className='text-white text-sm md:text-xl m-1 '>Convert to</p>
                      <Select 
                        value={toFormat}
                        onChange={(_, newValue) => setToFormat(newValue)}
                        className="m-2 p-2 text-sm md:text-lg rounded border border-gray-400 hover:bg-stone-700 text-white"
                        placeholder="Select Format"
                      >
                        <div className="absolute rounded bg-[#3D4A48] text-start md:text-base text-xs md:w-[250px] w-[100px] font-inter text-white shadow-md mt-1">
                          <div className='grid grid-cols-2 justify-between '>
                            <Option value="mp3" className="p-3 md:w-[50%] hover:brightness-75 cursor-pointer">.mp3</Option>
                            <Option value="m4a" className="p-3 md:w-[50%] hover:brightness-75 cursor-pointer">.m4a</Option>
                          </div>
                        </div>
                      </Select>
                    </div>
                  </div>
                )}
              <button type="submit" className='p-2 w-full bg-sky-800 rounded text-white hover:bg-sky-600 active:bg-sky-700 disabled:bg-gray-400' disabled={loading}>
                  {loading ? <BarLoader /> : "Convert"}
              </button>
            </form>

          </div>

        {selectedUtility === 20 && toFormat === 'mp4' ?
          <div className="mt-2">
            <p className="text-sm text-center font-italic text-yellow-500 font-inter">Conversion can take up to 20 seconds, depending on length.</p>
          </div>
        : "" }
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
            <p className="text-sm text-center font-italic text-yellow-500 font-inter">Soundcloud GO songs can no longer be processed.</p>
          </div>
        )}
      </div>
    )
}

export default Converter
