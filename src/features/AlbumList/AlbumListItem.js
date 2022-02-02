export default function AlbumListItem({ album, setPlaylist }) {
  const handleAlbumClick = () => {
    setPlaylist(album.id)
  }
  return (
    <a className="w-48 sm:w-full mr-6 sm:mr-0 transition-transform duration-200 relative hover:translate-y-1" onClick={handleAlbumClick}>
      <li className="list-none">
        <img
          alt={album.title}
          className="aspect-3/4 sm:aspect-square drop-shadow-lg object-cover  w-full rounded-xl hover:drop-shadow-xl"
          src={album.coverUrl}
        />
        <p className="text-sm font-bold mt-3 text-neutral-700">{album.title}</p>
        {album.songs ? <p className="text-xs text-neutral-700"> album.songs.length Tracks</p> : ''}
      </li>
    </a>
  )
}
