import { useDispatch } from 'react-redux'
import { playSongFromPlaylist } from "../Player/playerSlice";

export default function PlaylistItem({ song, playlistId, songsList }) {
  const dispatch = useDispatch()

  return (
    <li onClick={() => dispatch(playSongFromPlaylist({ song, playlistId, songsList }))} className="list-none cursor-pointer hover:bg-gray-100 transition-colors duration-200 flex flex-row text-xs py-2 items-center">
      {/* Round little image next to list item */}
      {/* <img className="rounded-3xl object-cover h-8 w-8" src={song.coverUrl} alt={song.album} /> */}
      <div className="flex-grow">

        <div className="flex p-1 justify-between">
          <p className="font-bold">{song.track} {song.title}</p>
        </div>
        <div>
          <span className="p-1">{song.artist}</span>
        </div>
      </div>
    </li>
  );
}
