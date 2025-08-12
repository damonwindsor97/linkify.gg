import { Link } from 'react-router-dom'
import {useState, useEffect} from 'react'
import { Box, Button, Typography, Modal } from '@mui/material'
import axios from 'axios'

import { HiLink, HiVideoCamera, HiMusicNote } from 'react-icons/hi';
import { MdAudiotrack, MdFormatListBulleted } from 'react-icons/md';
import { FaClock } from "react-icons/fa6";
import { RiFilePaper2Fill } from "react-icons/ri";
import MoonLoader from 'react-spinners/MoonLoader'

 function Navbar() {
  const [open, setOpen] = useState(false);
  const [utilityHistory, setUtilityHistory] = useState([]);
  const [data, setData] = useState()
  const [loading, setLoading] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit', 
            minute: '2-digit',
            hour12: false
        }); // "DD/MM/YYYY, HH:MM"
    };

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                setLoading(true)
                const response = await axios.get(`${import.meta.env.VITE_API_ENDPOINT}/server/anonUtilHistory`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    withCredentials: true,
                });

                const data = response.data;

                if(!data.utilityHistory || data.utilityHistory.length === 0) {
                    setUtilityHistory([]);
                    setData(data);
                    setLoading(false);
                    return
                }
                
                setUtilityHistory(data.utilityHistory || []);
                setData(data)
                setLoading(false)
            } catch (error) {
                console.error('Error fetching history:', error);
            }
        };

        fetchHistory();
    }, []); 
    // Helper function to get icon for each utility type
    const getUtilityIcon = (type) => {
        const iconClass = "w-4 h-4 mr-2";
        switch (type) {
            case "url":
            case "URL Shortener":
            return <HiLink className={iconClass} />;
            case "Soundcloud Converter":
            case "Spotify > mp3 Converter":
            return <MdAudiotrack className={iconClass} />;
            case "Spotify Playlist to .txt Converter":
            return <MdFormatListBulleted className={iconClass} />;
            case "YouTube Converter":
            return <HiVideoCamera className={iconClass} />;
            case "MP4 > MP3 Converter":
            return <HiMusicNote className={iconClass} />;
            default:
            return null;
        }
    };

    // Helper function to truncate long URLs
    const truncateUrl = (url, maxLength = 50) => {
    if (!url || url.length <= maxLength) return url;
    return url.substring(0, maxLength) + '...';
    };

    
  return (
    <div className='p-1 w-full bg-opacity-20 backdrop-blur-sm z-50 '>
        <div className='flex max-w-screen-xl m-auto items-center justify-between'>
            <div className='flex items-center'>
                <Link to="/"><p className="md:text-2xl font-bold mb-2 bg-gradient-to-r from-cyan-500 to-blue-600 inline-block text-transparent bg-clip-text">Linkify<span className="text-white">.gg</span></p></Link>
                <div className='text-white font-inter font-semibold ml-3 md:ml-5'>
                    <ul className='flex '>
                        <Link to="https://discord.gg/9ytVAPNtmz"><li className='p-2 m-1 hover:bg-slate-700 rounded cursor-pointer ease-in-out duration-300'>Support</li></Link>
                    </ul>
                </div>
            </div>

        <button 
        onClick={handleOpen} 
        className="group relative bg-zinc-800/60 hover:bg-blue-600/90 border border-gray-600 hover:border-blue-500 rounded-lg p-3 text-gray-300 hover:text-white float-end transition-all duration-300 ease-in-out transform active:scale-95 active:bg-blue-700 shadow-lg hover:shadow-xl backdrop-blur-sm"
        aria-label="View utility history"
        >
            <div className="flex items-center gap-2">
                <div className="text-left">
                <p className="font-roboto text-sm font-medium leading-tight">guest{data ? data._id : "..."}</p>
                <p className="text-xs font-light text-gray-400 group-hover:text-gray-200 transition-colors">View history</p>
                </div>
            </div>
        </button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >



                <Box className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-zinc-800/95 backdrop-blur-sm border border-zinc-600 rounded-xl shadow-2xl w-[90vw] md:w-[700px] max-h-[80vh] overflow-hidden">

                <div className="bg-zinc-700/50 border-b border-zinc-600 p-4 md:p-6">
                    <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <FaClock color='' className='w-6 h-6 mr-3 text-blue-400'/>
                        <h2 className="font-roboto text-white text-xl md:text-2xl font-semibold">Utility History</h2>
                    </div>
                    </div>
                    

                    <div className="mt-4 flex items-center gap-2 text-sm font-medium p-3 bg-red-500/20 border border-red-500/30 rounded-lg text-red-300">
                    <FaClock className="w-4 h-4 flex-shrink-0" />
                    <span>History expires: {formatDate(data ? data.expiresAt : '...')}</span>
                    </div>
                </div>

                <div className="overflow-y-auto max-h-[calc(80vh-140px)] scroll-smooth">
                    {utilityHistory.length === 0 ? (
                    <div className="text-center py-12 text-gray-400">
                        <RiFilePaper2Fill  className="w-16 h-16 mx-auto mb-4 opacity-50" />
                        <p className="text-lg font-medium">No history available</p>
                        <p className="text-sm mt-2">Your utility usage will appear here</p>
                    </div>
                    ) : (
                    <div className="p-4 md:p-6 space-y-4">
                    {utilityHistory
                        .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
                        .map((entry, index) => (
                        <article key={entry.timestamp} className={`bg-zinc-700/30 rounded-lg p-4 border border-zinc-600/50 hover:bg-zinc-700/50 transition-colors ${index === 0 ? 'ring-2 ring-blue-500/20' : ''}`}>
                            <header className="flex items-start justify-between mb-3">
                            <div className="flex items-center text-white">
                                {getUtilityIcon(entry.type)}
                                <div>
                                <h3 className="font-semibold text-base">{entry.type}</h3>
                                <time className="text-xs text-gray-400 mt-1 block">
                                    {formatDate(entry.timestamp)}
                                </time>
                                </div>
                            </div>
                            {index === 0 && (
                                <span className="text-xs bg-blue-500/20 text-blue-300 px-2 py-1 rounded-full border border-blue-500/30">Latest</span>
                            )}
                            </header>

                            <div className="ml-6 space-y-2 text-sm">
                                {(entry.type === "url" || entry.type === "URL Shortener") && (
                                    <div className="space-y-2">
                                    <div className="flex items-start gap-2">
                                        <span className="text-gray-400 min-w-[70px]">Original:</span>
                                        <Link to={entry.details?.originalUrl} className="text-blue-400 hover:text-blue-300 transition-colors break-all" title={entry.details?.originalUrl}>{truncateUrl(entry.details?.originalUrl)}</Link>
                                    </div>
                                    <div className="flex items-start gap-2">
                                        <span className="text-gray-400 min-w-[70px]">Short:</span>
                                        <Link to={entry.details?.shortUrl} className="text-blue-400 hover:text-blue-300 transition-colors font-medium">{entry.details?.shortUrl}</Link>
                                    </div>
                                    </div>
                                )}

                                {entry.type === "Soundcloud Converter" && (
                                    <div className="space-y-2">
                                    <div className="flex items-start gap-2">
                                        <span className="text-gray-400 min-w-[50px]">Title:</span>
                                        <span className="text-gray-200 font-medium">{entry.details?.title}</span>
                                    </div>
                                    <div className="flex items-start gap-2">
                                        <span className="text-gray-400 min-w-[50px]">Source:</span>
                                        <Link to={entry.details?.source} className="text-blue-400 hover:text-blue-300 transition-colors break-all"title={entry.details?.source}>{truncateUrl(entry.details?.source)}</Link>
                                    </div>
                                    </div>
                                )}

                                {entry.type === "YouTube Converter" && (
                                    <div className="space-y-2">
                                    <div className="flex items-start gap-2">
                                        <span className="text-gray-400 min-w-[50px]">Title:</span>
                                        <span className="text-gray-200 font-medium">{entry.details?.title}</span>
                                    </div>
                                    <div className="flex items-start gap-2">
                                        <span className="text-gray-400 min-w-[50px]">Source:</span>
                                        <Link to={entry.details?.source} className="text-blue-400 hover:text-blue-300 transition-colors break-all"title={entry.details?.source}>{truncateUrl(entry.details?.source)}</Link>
                                    </div>
                                    </div>
                                )}

                                {entry.type === "Spotify Playlist to .txt Converter" && (
                                    <div className="space-y-2">
                                    <div className="flex items-start gap-2">
                                        <span className="text-gray-400 min-w-[60px]">Playlist:</span>
                                        <span className="text-gray-200 font-medium">{entry.details?.playlistName}</span>
                                    </div>
                                    <div className="flex items-start gap-2">
                                        <span className="text-gray-400 min-w-[60px]">URL:</span>
                                        <Link to={entry.details?.playlistUrl} className="text-blue-400 hover:text-blue-300 transition-colors break-all"title={entry.details?.playlistUrl}>{truncateUrl(entry.details?.playlistUrl)}</Link>
                                    </div>
                                    </div>
                                )}

                                {entry.type === "Spotify > mp3 Converter" && (
                                    <div className="space-y-2">
                                    <div className="flex items-start gap-2">
                                        <span className="text-gray-400 min-w-[50px]">Title:</span>
                                        <span className="text-gray-200 font-medium">{entry.details?.title}</span>
                                    </div>
                                    <div className="flex items-start gap-2">
                                        <span className="text-gray-400 min-w-[50px]">Source:</span>
                                        <Link to={entry.details?.source} className="text-blue-400 hover:text-blue-300 transition-colors break-all"title={entry.details?.source}>{truncateUrl(entry.details?.source)}</Link>
                                    </div>
                                    </div>
                                )}

                                {entry.type === "MP4 > MP3 Converter" && (
                                <div className="space-y-2">
                                    <div className="flex items-start gap-2">
                                    <span className="text-gray-400 min-w-[50px]">File:</span>
                                    <span className="text-gray-200 font-medium">{entry.details?.fileName || "Unnamed.mp3"}</span>
                                    </div>
                                </div>
                                )}
                            </div>
                        </article>
                        ))}
                    </div>
                    )}
                </div>
                </Box>
            </Modal>
        </div>
    </div>
  )
}

export default Navbar