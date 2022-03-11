import AlbumCoverPlaceholder from "./AlbumCoverPlaceholder";
export default function LoadingGrid() {
  return (
    <div className="flex overflow-x-hidden flex-nowrap flex-row py-4">
      <ul className="opacity-60 flex animate-pulse flex-row flex-shrink-0 text-neutral-300">
        <li className="list-none w-32 mr-3 first:ml-4 transition-transform relative">
          <AlbumCoverPlaceholder />
          <p className="text-sm font-bold mt-3">Sun and Moon</p>
        </li>
        <li className="list-none w-32 mr-3 first:ml-4 transition-transform relative">
          <AlbumCoverPlaceholder />
          <p className="text-sm font-bold mt-3">A Plane in the Sky</p>
        </li>
        <li className="list-none w-32 mr-3 first:ml-4 transition-transform relative">

          <AlbumCoverPlaceholder />
          <p className="text-sm font-bold mt-3">Floating Lotus</p>
        </li>
        <li className="list-none w-32 mr-3 first:ml-4 transition-transform relative">
          <AlbumCoverPlaceholder />
          <p className="text-sm font-bold mt-3">Mystic River</p>
        </li>
      </ul>
    </div>
  )
}
