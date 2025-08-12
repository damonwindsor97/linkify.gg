import { CheckCircle, Clock } from 'lucide-react';

export default function StatusPage() {
  const status = {
    "URL Shortener": "Online",
    "YouTube > MP3": "Online", 
    "YouTube > MP4": "Offline",
    "Soundcloud Converter": "Online",
    "Spotify > mp3 Converter": "Online",
    "Spotify playlist Lister": "Online",
    "MP4 > MP3 Converter": "Online",
    "Image Converter": "Online"
  };

  // Split into two columns for the table
  const entries = Object.entries(status);
  const mid = Math.ceil(entries.length / 2);
  const col1 = entries.slice(0, mid);
  const col2 = entries.slice(mid);

  const onlineCount = Object.values(status).filter(s => s === "Online").length;
  const totalServices = Object.keys(status).length;
  const uptime = Math.round((onlineCount / totalServices) * 100);

  return (
    <div className="p-6 space-y-6">

      <div className="text-center">
        <div className="flex items-center justify-center mb-2">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 inline-block text-transparent bg-clip-text">Tool Status</h1>
        </div>
        <p className="text-gray-400 text-sm">Real-time monitoring of all services</p>
      </div>


      <div className="bg-zinc-800/60 backdrop-blur-sm border border-zinc-600/50 rounded-lg p-4 shadow-lg">
        <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-white flex items-center">
                <CheckCircle className="w-5 h-5 text-green-400 mr-2" />
                Overall Status
            </h2>
          <div className={`px-3 py-1 rounded-full text-xs font-medium ${uptime === 100 ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'}`}>
            {uptime === 100 ? 'All Systems Operational' : 'Partial Outage'}
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-green-400 mb-1">{onlineCount}</div>
            <div className="text-gray-400 text-xs">Online</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-red-400 mb-1">{totalServices - onlineCount}</div>
            <div className="text-gray-400 text-xs">Offline</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-blue-400 mb-1">{uptime}%</div>
            <div className="text-gray-400 text-xs">Uptime</div>
          </div>
        </div>
      </div>



      <div className="bg-zinc-800/60 backdrop-blur-sm border border-zinc-600/50 rounded-lg p-4 shadow-lg">
        <div className="flex items-center mb-4">
          <Clock className="w-5 h-5 text-blue-400 mr-2" />
          <h2 className="text-lg font-semibold text-white">Service Details</h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="bg-zinc-700/30 rounded-lg text-xs text-left relative w-full border border-zinc-600/30">
            <tbody>
              {Array.from({ length: mid }).map((_, i) => (
                <tr key={i} className="border-b border-zinc-700/30 last:border-b-0">
                  {/* Column 1 */}
                  <td className="px-3 py-2 text-gray-200 font-medium">
                    {col1[i] && col1[i][0]}
                  </td>
                  <td className="px-3 py-2">
                    {col1[i] && (
                      <div className="flex items-center gap-2">
                        <span
                          className={`inline-block w-3 h-3 rounded-full ${
                            col1[i][1] === "Online" ? "bg-green-400" : "bg-red-400"
                          }`}
                        ></span>
                        <span className={`font-medium ${col1[i][1] === "Online" ? "text-green-400" : "text-red-400"}`}>
                          {col1[i][1]}
                        </span>
                      </div>
                    )}
                  </td>
                  {/* Column 2 */}
                  <td className="px-3 py-2 text-gray-200 font-medium border-l border-zinc-700/30">
                    {col2[i] && col2[i][0]}
                  </td>
                  <td className="px-3 py-2">
                    {col2[i] && (
                      <div className="flex items-center gap-2">
                        <span
                          className={`inline-block w-3 h-3 rounded-full ${
                            col2[i][1] === "Online" ? "bg-green-400" : "bg-red-400"
                          }`}
                        ></span>
                        <span className={`font-medium ${col2[i][1] === "Online" ? "text-green-400" : "text-red-400"}`}>
                          {col2[i][1]}
                        </span>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="text-center">
        <p className="text-gray-500 text-xs">Last updated: 13/08/25 12:40am AEST</p>
      </div>
    </div>
  );
}