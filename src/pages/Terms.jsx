import { Helmet } from "react-helmet"

function Terms() {
  return (
<div className="flex justify-center items-center min-h-[70vh] px-4">
      <Helmet>
        <title>Terms of Service</title>
        <description>Terms of Service & Fair Use for Linkify.gg | Convert MP4, YouTube & Soundcloud to Mp3 and more with `Linkify`.</description>
        <keywords>link, url, shorten, utilities, oasis, youtube, to, mp3, convert, YouTube, YT, MP3, audio, YouTube, link oasis, utils for links, utilities for links, linkify.gg, linkify, free online, converter, free, online, free online converter, tools, tool, spotify download, Spotify, Soundcloud, download, downloader, image convert, jpg, png, gif, icon, ico, privacy, policy, privacy policy, terms of service, tos, terms, of, service</keywords>
      </Helmet>
  <div className="text-center max-w-4xl">
    <p className="text-5xl font-bold text-white">Terms of Service / Fair Use</p>

    <ul className="md:m-12">
      <li className="text-gray-300 m-6">1. <span className="font-bold text-lg underline decoration-cyan-300">Copyright: </span> By using our ("Linkify.gg") application you agree to adhere to all International Copyright Laws (more so those that apply to your Country) and here-by agree to having the artist(s) permission to download their material; otherwise said material should no longer be covered under any DMCA / Copyright laws. Any such behaviour that goes outside of these permissions are strictly prohibited.</li>
      <li className="text-gray-300 m-6">2. <span className="font-bold text-lg underline decoration-cyan-300">NSFW Content: </span> By using our application you agree to not use our platform ("Linkify.gg") or any other associated Platforms to download, distribute, share, store, or interact with any material that is deemed <span className="font-bold">Not Safe For Work (NSFW)</span> content.</li>
    </ul>
  </div>
</div>
  )
}

export default Terms