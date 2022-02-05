import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { selectCurrentlyPlaying, dequeueAndPlayNext } from './playerSlice'
import { MdExpandMore } from 'react-icons/md'
import {
  MdSkipPrevious,
  MdSkipNext,
} from 'react-icons/md'
import PlayOrPause from './PlayOrPause'
import { useEffect } from 'react'
import secondsToTime from './secondsToTime'

function Player({ open, setOpen }) {
  const handleOpen = () => setOpen(!open)
  const dispatch = useDispatch()
  const song = useSelector(selectCurrentlyPlaying)  
  
  return (
    <>
      {/* Control Bar */}
      <div onClick={handleOpen} className={open ? "control-bar-hide" : "control-bar-show"}>
        <div className="flex items-center justify-between h-12 drop-shadow border-t border-gray-300 bg-zinc-100">
          <div className='h-1 w-full absolute top-0 after:h-1 after:contents'></div>
          <div className="flex items-center flex-row text-xs">
            <img alt="album cover" src={song.coverUrl} className='w-12 h-12' />
            <div>
              <div className="flex pl-1">
                <p className="font-bold">{song.title}</p>
              </div>
              <div>
                <span className="pl-1">{song.artist}</span>
              </div>
            </div>
          </div>
          <div onClick={(e) => e.stopPropagation()} className='flex items-center justify-center mr-4'>
            <PlayOrPause styles="text-gray-800 drop-shadow-lg" size="2em" />
          </div>
        </div>
      </div>
      {/* Full Screen Player */}
      <div className={open ? "player-show" : "player-hide"}>
        <MdExpandMore size="1.75em" onClick={handleOpen} className="cursor-pointer hover:bg-white rounded-2xl hover:fill-black hover:bg-opacity-50 transition-all duration-150 absolute top-[19px] left-4" />
        <div className="absolute top-10 text-xs">
          <p>From Playlist ID: {song.playedFrom.playlistId}</p>
          <p>Track number: {song.track}</p>
        </div>

        <img className="pt-28 px-10" src={song.coverUrl} alt="album cover" />
        <div className="p-8 pt-16 w-full sm:max-w-screen-sm">
          {/* Song Metadata */}
          <div className="text-sm pt-8">
            <p className="font-bold">{song.title}</p>
            <p className="">{song.artist}</p>
          </div>
          {/* Animated Progress Bar */}
          <div className="cursor-pointer mt-4 mx-auto bg-opacity-50  bg-gray-400 w-full h-[3px]">
            <div style={{ width: `${song.progress?.fraction?.toFixed(4) * 100}%`}} className="h-full bg-gray-200"></div>
          </div>
          
          {/* Time Indicators */}
          <div className="flex flex-row justify-between text-xs pt-2">
            <p>{song.progress?.time}</p>
            <p>{secondsToTime(song.duration - song.progress.playedSeconds)}</p>
          </div>
          {/* Icon Controls */}
          <div className="flex items-center px-8 justify-around mt-8 drop-shadow-lg">
            <MdSkipPrevious size="3em" className="cursor-pointer fill-white opacity-90 hover:opacity-100" />
            <PlayOrPause size="3em" styles={"cursor-pointerfill-white opacity-90 hover:opacity-100"} />
            <MdSkipNext onClick={() => dispatch(dequeueAndPlayNext())} size="3em" className="cursor-pointer fill-white opacity-90 hover:opacity-100" />
          </div>
        </div>
      </div>
    </>
  );
}


Player.propTypes = {
  open: PropTypes.bool,
}

export default Player