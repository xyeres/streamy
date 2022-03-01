import AlbumCoverPlaceholder from "./AlbumCoverPlaceholder";
export default function LoadingGrid() {
  return (
    <div className="flex overflow-x-hidden sm:mx-4 flex-nowrap flex-row py-4 sm:flex-row sm:gap-4 sm:flex-wrap sm:block sm:columns-2">
      <ul className="opacity-60 flex animate-pulse flex-row flex-shrink-0 sm:block sm:flex-shrink text-neutral-300">
        <li className="list-none sm:mb-5 w-32 sm:w-full mr-3 first:ml-4 sm:first:ml-0 sm:mr-0 transition-transform relative hover:translate-y-1">
          <AlbumCoverPlaceholder />
          <p className="text-sm font-bold mt-3">Sun and Moon</p>
        </li>
        <li className="list-none sm:mb-5 w-32 sm:w-full mr-3 first:ml-4 sm:first:ml-0 sm:mr-0 transition-transform relative hover:translate-y-1">
          <AlbumCoverPlaceholder />
          <p className="text-sm font-bold mt-3">A Plane in the Sky</p>
        </li>
        <li className="list-none sm:mb-5 w-32 sm:w-full mr-3 first:ml-4 sm:first:ml-0 sm:mr-0 transition-transform relative hover:translate-y-1">

          <AlbumCoverPlaceholder />
          <p className="text-sm font-bold mt-3">Floating Lotus</p>
        </li>
        <li className="list-none sm:mb-5 w-32 sm:w-full mr-3 first:ml-4 sm:first:ml-0 sm:mr-0 transition-transform relative hover:translate-y-1">
          <AlbumCoverPlaceholder />
          <p className="text-sm font-bold mt-3">Mystic River</p>
        </li>
      </ul>
    </div>
  )
}
