

function PrivacyPolicy() {
  return (
    <div className="flex justify-center items-center min-h-[70vh] px-4">
      <div className="text-center max-w-4xl">
        <p className="text-5xl font-bold text-white">Privacy Policy</p> 

        <ul className="md:m-12 text-start">
          <li className="text-gray-300 m-6">
            1. <span className="font-bold text-lg underline decoration-cyan-300">Analytics:</span> 
            <span className="font-bold"> a;</span> We use Google Analytics to collect information such as Active Users, New Users, Active Users by Country, Views per Active User, and Average Engagement Time. This data helps us understand how our services are used and improve user experience. We do not share analytics data with any third parties beyond Google Analytics.
          </li>

          <li className="text-gray-300 m-6">
            2. <span className="font-bold text-lg underline decoration-cyan-300">Data Collection and Storage:</span> 
            We store data both temporarily and permanently, depending on its use within the application. Data is stored securely in our databases to enable our utilities and features to function. The types of data we store include:
            <ul className="ml-6 mt-1 text-start">
              <li><span className="font-bold">a;</span> Links entered into our <span className="font-bold">URL Shortener</span> application, so our API can determine whether to create a new short URL or retrieve an existing one.</li>
              <li><span className="font-bold">b;</span> <span className="font-bold">MP4 &gt; MP3:</span> Videos submitted for conversion are stored only briefly for processing and are deleted immediately after conversion is complete.</li>
              <li><span className="font-bold">c;</span> <span className="font-bold">Cookies:</span> We use cookies to track user history and limit usage to prevent abuse. Cookies and related data are stored temporarily and expire exactly 7 days after your first visit.</li>
            </ul>
          </li>

          <li className="text-gray-300 m-6">
            3. <span className="font-bold text-lg underline decoration-cyan-300">User Rights: </span> 
            If you wish to access, correct, or request deletion of your data, please contact us at <span className="underline">support@linkify.gg</span>. We will respond to your request as soon as possible.
          </li>

          <li className="text-gray-300 m-6">
            4. <span className="font-bold text-lg underline decoration-cyan-300">Security: </span> 
            We take reasonable measures to protect your data from unauthorized access, disclosure, or loss. However, no method of transmission over the Internet or electronic storage is 100% secure.
          </li>

          <li className="text-gray-300 m-6">
            5. <span className="font-bold text-lg underline decoration-cyan-300">Changes to This Policy: </span> 
            We may update this privacy policy from time to time. Any changes will be posted on this page with an updated revision date.
          </li>
        </ul>

        <p className="text-gray-400 text-sm mt-8">
          Last updated: <span className="font-semibold">26 July 2025</span>
        </p>

        <p className="text-gray-400 text-sm mt-8">
          If you have any questions or concerns about this privacy policy or your data, please contact us at <span className="underline">support@linkify.gg</span>.
        </p>
      </div>
    </div>
  )
}

export default PrivacyPolicy

