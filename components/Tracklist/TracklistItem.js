import Image from 'next/image';
import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { loadFromList, play } from "../Player/playerSlice";

export default function TracklistItem({ song, index, listId, listSongs, thumbnail }) {
  const dispatch = useDispatch()

  const queue = useSelector(state => state.player.queue)
  const prevPlayed = useSelector(state => state.player.prevPlayed)
  // console.log('queue', queue, 'prevPlayed', prevPlayed)

  const handleItemClick = () => {
    dispatch(loadFromList({ index, listId, listSongs }))
    dispatch(play())
  }
  const trackNo = useMemo(() => index + 1, [index])
  const duration = useMemo(() => (song.format.duration / 60).toFixed(2).replace('.', ':'), [song])

  return (
    <li onClick={handleItemClick} className="list-none cursor-pointer hover:bg-gray-100 transition-colors duration-200 
    flex flex-row text-xs p-2 items-center">
      <span className="text-xs w-3 mr-2 text-right">
        {trackNo}
      </span>

      {thumbnail &&
        <div className="p-1">
          <Image width={28} height={28} className="rounded-none flex-grow object-cover h-7 w-7" src={song.coverUrl} alt={song.album} />
        </div>
      }
      <div className="flex-grow flex items-center justify-between ml-2">
        <div className='w-full pr-2'>
          <div className="flex items-start justify-between">
            <p className="font-bold">
              {song.title.length > 38 ? song.title.slice(0, 38) + '...' : song.title}
            </p>
          </div>
          <div>
            <span className="">{song.artist}</span>
          </div>
        </div>
        {/* {!!thumbnail &&
          (<span className="pr-3 w-full justify-self-start">
            {song.album.length > 22 ? song.album.slice(0, 22) + '...' : song.album}
          </span>)
        } */}
        <span className="">{duration}</span>
      </div>
    </li>
  );
}
