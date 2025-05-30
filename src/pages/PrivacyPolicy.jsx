

function PrivacyPolicy() {
  return (
    <div className="text-center">
        <div className="mt-[200px] md:mt-[250px] max-w-[920px] m-auto">
            <p className="text-5xl font-bold text-white">Privacy Policy</p> 

            <ul className="md:m-12">
                <li className="text-gray-300 m-6">1. <span className="font-bold text-lg underline decoration-cyan-300">Analytics:</span> We use Google Analytics to collect data and analytics to check the following: Active Users, New Users, Active Users by Country, Views per Active Users & Average Engagement Time. This data helps us see whether users are responding well and happy with our services.</li>
                <li className="text-gray-300 m-6">2. <span className="font-bold text-lg underline decoration-cyan-300">Data:</span> The only data that is stored permanently within our databases are the links in which a user enters into our URL Shortener application, this is so that our API can determine whether it needs to create a new short URL for the user or retreive one from the database that already uses the original link. <span className="font-bold">MP4 &gt; MP3</span> data (the video in which the user is having converted) is stored for a brief second, before being deleted.</li>
            </ul>
        </div>
    </div>
  )
}

export default PrivacyPolicy