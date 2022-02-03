export default function AlbumListItem({ album }) {
  return (
    <a href={`/play/${album.id}`}>
      <li className="list-none sm:mb-5 w-32 sm:w-full mr-3 first:ml-4 sm:first:ml-0 sm:mr-0 transition-transform duration-200 relative hover:translate-y-1">
        <img
          alt={album.title}
          className="aspect-square drop-shadow-lg object-cover  w-full rounded-xl hover:drop-shadow-xl"
          src={album.coverUrl}
        />
        <p className="text-sm font-bold mt-3 text-neutral-700">{album.title}</p>
        {album.songs ? <p className="text-xs text-neutral-700"> album.songs.length Tracks</p> : ''}
      </li>
    </a>
  )
}
