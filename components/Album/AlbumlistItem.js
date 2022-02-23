import { useDispatch, useSelector } from 'react-redux';
import { loadFromList, play } from "../Player/playerSlice";

export default function AlbumlistItem({ song, index, listId, listSongs }) {
  const dispatch = useDispatch()

  const queue = useSelector(state => state.player.queue)
  const prevPlayed = useSelector(state => state.player.prevPlayed)

  // console.log('queue', queue, 'prevPlayed', prevPlayed)

  const handleItemClick = () => {
    dispatch(loadFromList({ index, listId, listSongs }))
    dispatch(play())
  }

  return (
    <li onClick={handleItemClick}
      className="list-none cursor-pointer hover:bg-gray-100 transition-colors duration-200 flex flex-row text-xs py-2 items-center">
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
