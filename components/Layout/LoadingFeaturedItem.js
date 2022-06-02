import AlbumCoverPlaceholder from "./AlbumCoverPlaceholder";

export default function LoadingFeaturedItem() {
  return (
    <div className="relative flex animate-pulse cursor-pointer justify-start group hover:bg-opacity-[65%] items-start m-4 sm:mx-4 bg-gray-200 p-4 rounded-lg lg:p-7 my-7 lg:m-7 lg:flex lg:items-center lg:w-full lg:justify-center lg:max-w-screen-xl lg:min-h-[260px]">
      <ul>
        <li className="opacity-40 flex items-center justify-center gap-2">
          <AlbumCoverPlaceholder borderColor="border-gray-700" />
          <div className=" w-full">
            <div className="space-y-2 ml-6 w-32">
              <div className="h-2 bg-slate-400 rounded w-3/5"></div>
              <div className="h-2 bg-slate-400 rounded w-2/5"></div>
              <div className="h-2 bg-slate-400 rounded w-5/6"></div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  )
}
