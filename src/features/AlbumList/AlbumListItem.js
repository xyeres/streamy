export default function AlbumListItem({ album, setPlaylist }) {
  const handleAlbumClick = () => {
    setPlaylist(album.id)
  }
  return (
    <div className="mb-6 group sm:w-1/3 sm:pr-5 hover:drop-shadow-xl" onClick={handleAlbumClick}>
      <li className="list-none">
        <div className="">
          <img alt={album.artist} className="w-52 h-40 rounded-xl drop-shadow-lg" src={album.coverUrl} />
        </div>
        <p className="font-bold mt-3 text-neutral-800">{album.title}</p>
        {/* <p className="text-xs text-neutral-700"> Tracks</p> */}
      </li>
    </div>
  )
}
