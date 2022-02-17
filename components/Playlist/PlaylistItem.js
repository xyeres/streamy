import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux'
import { playSongFromPlaylist } from "../Player/playerSlice";

export default function PlaylistItem({ song, playlistId, songsList }) {
  const dispatch = useDispatch()
  const queue = useSelector(state => state.player.queue)
  const prevPlayed = useSelector(state => state.player.prevPlayed)

  return (
    <li onClick={() => dispatch(playSongFromPlaylist({ song, playlistId, songsList }))} className="list-none cursor-pointer hover:bg-gray-100 transition-colors duration-200 flex flex-row text-xs py-2 items-center">
      <Image width={32} height={32} className="rounded-full object-cover h-8 w-8" src={song.coverUrl} alt={song.album} />
      <div className="flex-grow ml-3">
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
