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
                const response = await axios.get('https://media-download-api.onrender.com/api/v1/server/updates');
                setUpdates(response.data)
                setLoading(false)
            } catch (error) {
                console.log(error)
                setError(error)
                setLoading(false)
            }
        };
        fetchData()
    }, []);
    
  return (
    <div className="p-2">
        <div className="">
            <p className="text-white font-bold font-roboto text-4xl mt-4 md:mt-10 lg:text-6xl text-center">Updates</p>
            
            <div className="mt-[10%] md:mt-[5%] grid grid-cols-1 gap-4 lg:gap-8">
                {updates.map(update => 
                    <div key={update.id} className="text-white max-w-[480px] md:max-w-[600px] lg:max-w-[720px] m-auto border-b border-gray-700 pb-4 md:pb-8 font-inter w-full">
                        <p className="font-bold text-xl lg:text-3xl lg:mb-2 font-roboto">{update.title}</p>

                        <div className="flex space-x-8">
                            <p className="font-extralight text-sm">{update.date} AEST</p>
                            <p className="font-extralight text-sm border p-1 rounded-lg bg-gray-900">{update.author}</p>
                        </div>

                        <p className=" lg:mt-4 font-semibold underline">{update.subTitle}</p>
                        <p className=" mt-2">{update.message}</p>
                    </div>
                )}

            </div>
        </div>
    </div>
  )
}

export default Updates