export default function PlaylistItem({ song, album }) {
  return (
    <li className="list-none cursor-pointer hover:bg-gray-100 transition-colors duration-200 flex flex-row text-xs py-2 items-center">
      {/* <img className="rounded-3xl object-cover h-8 w-8" src={song.coverUrl} alt={song.album} /> */}
      <div className="flex-grow">
        <div className="flex p-1 justify-between">
          <p className="font-bold">{song.title}</p>
        </div>
        <div>
          <span className="p-1">{song.artist}</span>
        </div>
      </div>
    </li>
  );
}
