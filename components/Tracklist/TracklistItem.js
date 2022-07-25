import Image from 'next/image';
import { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { loadFromList, addToQueue, play, selectCurrentlyPlaying, selectIsPlaying, selectQueue, selectUrl, selectPrevPlayed } from "../Player/playerSlice";
import { CgLoadbarSound } from 'react-icons/cg'
import { MdMoreHoriz, MdQueue } from 'react-icons/md'
import secondsToTime from '../Player/secondsToTime';
import useComponentVisible from '../../hooks/useComponentVisible';


export default function TracklistItem({ song, index, listId, listSongs, thumbnail }) {
  const dispatch = useDispatch()

  const queue = useSelector(selectQueue)
  const prevPlayed = useSelector(selectPrevPlayed)
  const url = useSelector(selectUrl)
  const currentlyPlaying = useSelector(selectCurrentlyPlaying)
  const isPlaying = useSelector(selectIsPlaying)

  console.log('QUEUE', queue)
  console.log('PREVPLAYED', prevPlayed)
  console.log('currentlyPlaying', currentlyPlaying)

  const { dropDownRef, isComponentVisible, setIsComponentVisible } = useComponentVisible(false)

  const handleItemClick = () => {
    dispatch(loadFromList({ index, listId, listSongs }))
    dispatch(play())
  }

  const handleMoreBtnClick = (e) => {
    e.stopPropagation()
    setIsComponentVisible(true)
  }

  const handleAddToQueueClick = (e) => {
    e.stopPropagation()
    setIsComponentVisible(false)
    if (queue.length === 0 && url ===  null) {
      dispatch(loadFromList({ index, listId, listSongs }))
      dispatch(play())
      return;
    }
    dispatch(addToQueue(song))
  }
  
  



  const trackNo = useMemo(() => index + 1, [index])
  const duration = useMemo(() => secondsToTime(song.format.duration), [song])


  return (
    <li onClick={handleItemClick} className="list-none cursor-pointer hover:bg-gray-100 transition-colors duration-200 
    flex flex-row text-xs p-2 items-center lg:py-3 relative">
      <span className="text-xs w-3 mr-3 text-right">
        {(currentlyPlaying.slug === song.slug && isPlaying) ? <CgLoadbarSound size="2em" className="animate-pulse" /> : trackNo}
      </span>

      {thumbnail &&
        <div className="p-1">
          <Image data-testid="thumbnail-image" width={28} height={28} className="rounded-none flex-grow object-cover h-7 w-7" src={song.coverUrl} alt={song.album} />
        </div>
      }
      <div className="flex-grow flex items-center justify-between ml-2">
        <div className='w-full pr-2'>
          <div className="flex items-start justify-between">
            <p className="truncate font-semibold max-w-[190px] sm:max-w-[390px]">
              {song.title}
            </p>
          </div>
          <div>
            <span className="truncate max-w-[190px] sm:max-w-[390px] text-neutral-500">{song.artist}</span>
          </div>
        </div>
        {/* {!!thumbnail &&
          (<span className="pr-3 w-full justify-self-start">
            {song.album.length > 22 ? song.album.slice(0, 22) + '...' : song.album}
          </span>)
        } */}
        <span aria-expanded={false} onClick={handleMoreBtnClick} className='inline mr-5 p-[2px] active:bg-gray-200 rounded-full'>
          <MdMoreHoriz size={'1.65em'} />
        </span>
        <div ref={dropDownRef} className='z-50 drop-shadow-md bg-white rounded-sm absolute top-10 right-14'>
          {isComponentVisible && (
            <ul>
              <li onClick={handleAddToQueueClick} className='hover:bg-gray-400 hover:text-white p-4 px-5 flex rounded-sm group'>
                <MdQueue className='text-gray-600 mr-2 group-hover:text-white' size="1.15rem" /> Add to queue</li>
            </ul>
          )}
        </div>
        <span className="">{duration}</span>
      </div>
    </li>
  );
}
