import AlbumCoverPlaceholder from "./AlbumCoverPlaceholder";
export default function LoadingGrid() {
  const titles = [
    'Sun and Moon',
    'A Plane in the Sky',
    'Floating Lotus',
    'Mystic River',
    '40',
    'Junction Mile',
    'Seven Layers',
    'Endless Options',
    'Sunset Arc'
  ]

  const placeHolderAlbums = titles.map((title) => {
    return (
      <li key={title} className="list-none w-32 mr-3 transition-transform relative lg:w-48
        lg:bg-gray-150 lg:hover:bg-gray-100 lg:p-4 lg:rounded-md lg:flex lg:flex-col lg:py-6">
        <AlbumCoverPlaceholder />
        <p className="text-sm font-bold mt-3">{title}</p>
      </li>
    )
  })

  return (
    <div className="flex overflow-x-hidden flex-nowrap flex-row sm:flex-col py-4 pr-4 lg:overflow-x-visible">
      <ul className="opacity-75 gap-4 first:ml-4 flex animate-pulse flex-row flex-shrink-0 text-neutral-300 lg:flex-wrap">
        {placeHolderAlbums}
      </ul>
    </div>
  )
}
