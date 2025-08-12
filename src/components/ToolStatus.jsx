function ToolStatus() {
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

  // Split into two columns
  const entries = Object.entries(status);
  const mid = Math.ceil(entries.length / 2);
  const col1 = entries.slice(0, mid);
  const col2 = entries.slice(mid);

  return (
    <div className="overflow-x-auto">
      <table className="bg-zinc-800/80 rounded-lg text-xs text-left relative w-max mx-auto">
        <tbody>
          {Array.from({ length: mid }).map((_, i) => (
            <tr key={i} className="border-b border-zinc-700">
              {/* Column 1 */}
              <td className="px-3 py-2 text-gray-200">
                {col1[i] && col1[i][0]}
              </td>
              <td className="px-3 py-2 flex items-center gap-2">
                {col1[i] && (
                  <>
                    <span
                      className={`inline-block w-3 h-3 rounded-full ${
                        col1[i][1] === "Online" ? "bg-green-400" : "bg-red-400"
                      }`}
                    ></span>
                    <span className={col1[i][1] === "Online" ? "text-green-400" : "text-red-400"}>
                      {col1[i][1]}
                    </span>
                  </>
                )}
              </td>
              {/* Column 2 */}
              <td className="px-3 py-2 text-gray-200">
                {col2[i] && col2[i][0]}
              </td>
              <td className="px-3 py-2 flex items-center gap-2">
                {col2[i] && (
                  <>
                    <span
                      className={`inline-block w-3 h-3 rounded-full ${
                        col2[i][1] === "Online" ? "bg-green-400" : "bg-red-400"
                      }`}
                    ></span>
                    <span className={col2[i][1] === "Online" ? "text-green-400" : "text-red-400"}>
                      {col2[i][1]}
                    </span>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ToolStatus;