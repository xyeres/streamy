export default function RoadMap() {
  return (
    <details>
      <summary>Feature Road Map</summary>
      <ol className="relative mt-8 border-l border-gray-200 off:border-gray-700">
        <li className="mb-10 ml-6">
          <span className="flex absolute -left-3 justify-center items-center w-6 h-6 bg-blue-200 rounded-full ring-4 ring-white off:ring-gray-900 off:bg-blue-900">
            <svg className="w-3 h-3 text-blue-600 off:text-blue-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"></path></svg>
          </span>
          <h3 className="flex items-center mb-1 text-lg font-semibold text-gray-900 off:text-white">Fast search <span className="bg-blue-100 text-blue-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded off:bg-blue-200 off:text-blue-800 ml-3">Done</span></h3>
          <time className="block mb-2 text-sm font-normal leading-none text-gray-400 off:text-gray-500">Released on March 10th, 2022</time>
          <p className="mb-4 text-base font-normal text-gray-500 off:text-gray-400">Provide users a super-fast way to find specfic songs based on Artist, Album or Song title</p>
        </li>
        <li className="mb-10 ml-6">
          <span className="flex absolute -left-3 justify-center items-center w-6 h-6 bg-blue-200 rounded-full ring-4 ring-white off:ring-gray-900 off:bg-blue-900">
            <svg className="w-3 h-3 text-blue-600 off:text-blue-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"></path></svg>
          </span>
          <h3 className="mb-1 text-lg font-semibold text-gray-900 off:text-white">Shuffle play</h3>
          <time className="block mb-2 text-sm font-normal leading-none text-gray-400 off:text-gray-500">Planning stage</time>
          <p className="text-base font-normal text-gray-500 off:text-gray-400">Allow users to shuffle play an album or playlist.</p>
        </li>
        <li className="mb-10 ml-6">
          <span className="flex absolute -left-3 justify-center items-center w-6 h-6 bg-blue-200 rounded-full ring-4 ring-white off:ring-gray-900 off:bg-blue-900">
            <svg className="w-3 h-3 text-blue-600 off:text-blue-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"></path></svg>
          </span>
          <h3 className="mb-1 text-lg font-semibold text-gray-900 off:text-white">User Accounts</h3>
          <time className="block mb-2 text-sm font-normal leading-none text-gray-400 off:text-gray-500">Concept stage</time>
          <p className="text-base font-normal text-gray-500 off:text-gray-400">User accounts with social login. This will open up the potential for custom playlists, favorites and more.</p>
        </li>
        <li className="mb-10 ml-6">

          <span className="flex absolute -left-3 justify-center items-center w-6 h-6 bg-blue-200 rounded-full ring-4 ring-white off:ring-gray-900 off:bg-blue-900">
            <svg className="w-3 h-3 text-blue-600 off:text-blue-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"></path></svg>
          </span>
          <h3 className="mb-1 text-lg font-semibold text-gray-900 off:text-white">Have an idea?</h3>

          <p className="text-base font-normal text-gray-500 off:text-gray-400">
            Use the feedback form above to drop us a note! Your vote helps us decide what to add to the app next.
          </p>
        </li>
      </ol>
    </details>
  )
}
