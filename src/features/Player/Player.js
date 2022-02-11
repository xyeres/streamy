import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import ReactPlayer from 'react-player'
import {
  selectIsPlaying,
  selectCurrentlyPlaying,
  selectDuration,
  selectUrl,
  selectPlayed,
  playNext,
  setDuration,
  playPrev,
  progressMade,
  selectQueue,
  selectPrevPlayed,
  playPause
} from './playerSlice'

import { MdExpandMore } from 'react-icons/md'
import {
  MdSkipPrevious,
  MdSkipNext,
} from 'react-icons/md'
import PlayOrPause from './PlayOrPause'
import { useRef, useState } from 'react'
import secondsToTime from './secondsToTime'

function Player({ open, setOpen }) {
  const [seeking, setSeeking] = useState(false);
  const isPlaying = useSelector(selectIsPlaying)
  const prevPlayed = useSelector(selectPrevPlayed)
  const played = useSelector(selectPlayed)
  const duration = useSelector(selectDuration)
  const url = useSelector(selectUrl)

  const playerRef = useRef()

  const handleOpen = () => setOpen(!open)
  const dispatch = useDispatch()
  const song = useSelector(selectCurrentlyPlaying)

  const handleSeekChange = (e) => {
    playerRef.current.seekTo(parseFloat(e.target.value))
    dispatch(progressMade(parseFloat(e.target.value)))
  }

  const isPlayerLoaded = url != null 

  const handleSeekMouseDown = (e) => {
    setSeeking(true)
  }

  const handleSeekMouseUp = (e) => {
    setSeeking(false)
  }

  const handleProgress = state => {
    if (!seeking) {
      dispatch(progressMade(state.played))
    }
  }

  const handlePrevSong = () => {
    // Play song from beginning if this is
    // first song in the playlist
    if (prevPlayed.length < 1) {
      playerRef.current.seekTo(parseFloat(0))
      dispatch(playPause())
    } else {
      dispatch(playPrev())
    }
  }

  const handleNextSong = () => {
    dispatch(playNext())
  }

  return (
    <>
      {/* Control Bar */}
      {isPlayerLoaded && (<div onClick={handleOpen} className={open ? "control-bar-hide" : "control-bar-show"}>
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
      </div>)}
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
          {/* <div className="cursor-pointer mt-4 mx-auto bg-opacity-50  bg-gray-400 w-full h-[3px]">
            <div htmlFor='seek' style={{ width: `${song.progress?.fraction?.toFixed(4) * 100}%`}} className="h-full bg-gray-200"></div>
          </div> */}
          <input
            id="seek"
            className='w-full h-[3px]'
            type='range' min={0} max={0.999999} step='any'
            value={played}
            onChange={handleSeekChange}
            onMouseDown={handleSeekMouseDown}
            onMouseUp={handleSeekMouseUp}
          />

          {/* Time Indicators */}
          <div className="flex flex-row justify-between text-xs pt-2">
            <p>{secondsToTime(duration * played)}</p>
            <p>{secondsToTime(duration * (1 - played))}</p>
          </div>
          {/* Icon Controls */}
          <div className="flex items-center px-8 justify-around mt-8 drop-shadow-lg">
            <MdSkipPrevious onClick={handlePrevSong} size="3em" className="cursor-pointer fill-white opacity-90 hover:opacity-100" />
            <PlayOrPause size="3em" styles={"cursor-pointerfill-white opacity-90 hover:opacity-100"} />
            <MdSkipNext onClick={handleNextSong} size="3em" className="cursor-pointer fill-white opacity-90 hover:opacity-100" />
          </div>
        </div>
      </div>
      <ReactPlayer
        ref={playerRef}
        className="hidden"
        progressInterval={250}
        onDuration={(duration) => dispatch(setDuration(duration))}
        onProgress={handleProgress}
        onEnded={() => dispatch(playNext())}
        playing={isPlaying}
        url={url}
      />
    </>
  );
}


Player.propTypes = {
  open: PropTypes.bool,
}

export default Player