import { useEffect, useState } from "react";
import axios from "axios";

function Updates() {
    const [updates, setUpdates] = useState([]);
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)
                const response = await axios.get(`${import.meta.env.VITE_API_ENDPOINT}/server/updates`);
                
                const parseDate = (str) => {
                    const [date, time] = str.replace(' UTC', '').split(' ');
                    const [day, month, year] = date.split('/');
                    return new Date(`20${year}-${month}-${day}T${time}:00Z`);
                };

                const sortedUpdates = response.data.sort((a, b) => parseDate(b.date) - parseDate(a.date));
                setUpdates(sortedUpdates);
                setLoading(false)
            } catch (error) {
                console.log(error)
                setError(error)
                setLoading(false)
            }
        };
        fetchData()
    }, []);

        // Helper function to format text with line breaks
    const formatTextWithLineBreaks = (text) => {
        if (!text) return '';
        return text.split('\n').map((line, index) => (
            <span key={index}>
                {line}
                {index < text.split('\n').length - 1 && <br />}
            </span>
        ));
    };
    
  return (
    <div className="p-2">
        <div className="">
            <p className="text-white font-bold font-roboto text-4xl mt-4 md:mt-10 lg:text-6xl text-center">Updates</p>
            
            <div className="mt-[10%] md:mt-[5%] grid grid-cols-1 gap-6 lg:gap-10 max-w-4xl mx-auto">
                {updates.map(update => 
                    <article key={update.id} className="text-white bg-gray-900/30 rounded-xl p-6 md:p-8 border border-gray-700/50 shadow-lg hover:shadow-xl transition-shadow duration-300 font-inter backdrop-blur-sm">
                        {/* Header Section */}
                        <header className="mb-6">
                            <h2 className="font-bold text-2xl lg:text-4xl mb-4 font-roboto text-gray-100 leading-tight">
                                {update.title}
                            </h2>
                            
                            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-300">
                                <time className="flex items-center gap-2">
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                                    </svg>
                                    {update.date} AEST
                                </time>
                                <div className="flex items-center gap-2 bg-gray-800/60 px-3 py-1.5 rounded-full border border-gray-600/50">
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                    </svg>
                                    {update.author}
                                </div>
                            </div>
                        </header>

                        {/* Subtitle Section */}
                        {update.subTitle && (
                            <div className="mb-6 pb-4 border-b border-gray-700/50">
                                <div className="text-lg font-semibold text-blue-300 leading-relaxed">
                                    {formatTextWithLineBreaks(update.subTitle)}
                                </div>
                            </div>
                        )}

                        {/* Message Section */}
                        {update.message && (
                            <div className="prose prose-invert max-w-none">
                                <div className="text-gray-200 leading-relaxed text-base lg:text-lg">
                                    {formatTextWithLineBreaks(update.message)}
                                </div>
                            </div>
                        )}
                    </article>
                )}
            </div>
        </div>
    </div>
  )
}

export default Updates