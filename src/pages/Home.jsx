import { Helmet } from "react-helmet"
import ConvertCarousel from "../components/ConvertCarousel"

function Home() {
  return (
    <div  className="">
      <Helmet>
        <title>Linkify.gg</title>
        <description>Linkify.gg | Free Online Utilities for URLs - Convert MP4, YouTube & Soundcloud to Mp3, shorten URLs, Convert jpg to png and more with `Linkify`.</description>
        <keywords>link, url, shorten, utilities, oasis, youtube, to, mp3, convert, YouTube, YT, MP3, audio, YouTube, link oasis, utils for links, utilities for links, linkify.gg, linkify, free online, converter, free, online, free online converter, tools, tool, spotify download, Spotify, Soundcloud, download, downloader, image convert, jpg, png, gif, icon, ico</keywords>
        <meta name="author" content="Damon Windsor"></meta>
      </Helmet>
      <div className="mt-[22vh]">
        <ConvertCarousel/>
      </div>

    </div>
  )
}

export default Home