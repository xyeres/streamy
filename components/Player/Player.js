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
  selectPrevPlayed,
  playPause,
  openClose,
  selectIsOpen,
  stopAndUnload,
  selectIsMuted
} from './playerSlice'

import { MdExpandMore } from 'react-icons/md'
import {
  MdSkipPrevious,
  MdSkipNext,
} from 'react-icons/md'
import PlayOrPause from './PlayOrPause'
import { useRef, useState } from 'react'
import secondsToTime from './secondsToTime'
import Image from 'next/image'

function Player() {
  const [seeking, setSeeking] = useState(false);
  const [touching, setTouching] = useState(false);

  const isPlaying = useSelector(selectIsPlaying)
  const isMuted = useSelector(selectIsMuted)
  const isOpen = useSelector(selectIsOpen)
  const prevPlayed = useSelector(selectPrevPlayed)
  const played = useSelector(selectPlayed)
  const duration = useSelector(selectDuration)
  const url = useSelector(selectUrl)
  const song = useSelector(selectCurrentlyPlaying)
  const playerRef = useRef()
  const isPlayerLoaded = url != null

  if (isPlayerLoaded) {
    const audioElement = playerRef.current.getInternalPlayer()

    if (isPlaying && audioElement) {
      audioElement.play()
      console.log('play hit')
    } else if (audioElement) {
      console.log('pause hit')
      audioElement.pause()
    }

    // audioElement.pause()

    console.log('property', audioElement)
  }

  const dispatch = useDispatch()
  const handleOpen = () => dispatch(openClose())
  const handleTouchMove = () => setTouching(true)
  const handleTouchEnd = () => {
    if (touching) dispatch(stopAndUnload())
  }

  const handleSeekChange = (e) => {
    playerRef.current.seekTo(parseFloat(e.target.value))
    dispatch(progressMade(parseFloat(e.target.value)))
  }

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

  if (isPlayerLoaded) {
    if (isOpen) {
      document.body.classList.remove("overflow-auto")
      document.body.classList.add("overflow-hidden")
    } else {
      document.body.classList.add("overflow-auto")
      document.body.classList.remove("overflow-hidden")
    }
  }

  return (
    <>
      {isPlayerLoaded && (
        <>
          {/* Control Bar */}
          <div aria-controls="player-controls" onTouchEnd={handleTouchEnd} onTouchMove={handleTouchMove} aria-expanded={isOpen} onClick={handleOpen}
            className={isOpen ? "control-bar-hide" : "control-bar-show"}>
            <span className="sr-only">Player Controls</span>
            <div className="flex items-center justify-between h-12 drop-shadow border-t border-gray-300 bg-zinc-100">
              <div className='h-1 w-full absolute top-0 after:h-1 after:contents'></div>
              <div className="flex items-center flex-row text-xs">
                <Image priority width={48} height={48} alt="album cover" src={song.coverUrl} className='w-12 h-12' />
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
                <PlayOrPause styles="text-gray-800 drop-shadow-lg cursor-pointer" size="2em" />
              </div>
            </div>
          </div>

          {/* Full Screen Player */}
          <div id="player-controls" className={`${isOpen ? "player-show" : "player-hide"}`}>
            <MdExpandMore size="1.75em" onClick={handleOpen} className="cursor-pointer hover:bg-white rounded-2xl hover:fill-black hover:bg-opacity-50 transition-all duration-150 absolute top-[32px] left-5" />
            {/* <div className="absolute bottom-14 left-2 text-xs text-gray-600">
          <p>DEBUG MODE: From Playlist ID: {song.playedFrom.playlistId}</p>
          <p>Track number: {song.track}</p>
        </div> */}
            <div className="mt-[86px] relative px-8 aspect-square min-w-[240px] min-h-[240px] sm:min-w-[400px] sm:min-h-[400px] max-w-md mx-8">
              <Image priority layout='fill' objectFit='cover' className='my-8' objectPosition="50% 50%" src={song.coverUrl} alt="album cover" />
            </div>
            <div className="px-8 py-2 w-full sm:max-w-screen-sm">
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
              <div className="flex items-center px-8 justify-around mt-5 drop-shadow-lg">
                <MdSkipPrevious onClick={handlePrevSong} size="3em" className="cursor-pointer fill-white opacity-90 hover:opacity-100" />
                <PlayOrPause size="3em" styles={"cursor-pointerfill-white opacity-90 hover:opacity-100"} />
                <MdSkipNext onClick={handleNextSong} size="3em" className="cursor-pointer fill-white opacity-90 hover:opacity-100" />
              </div>
            </div>
          </div>
        </>
      )}
      <ReactPlayer
        id="test-id-from-react"
        ref={playerRef}
        className="hidden"
        progressInterval={250}
        onDuration={(duration) => dispatch(setDuration(duration))}
        onProgress={handleProgress}
        onEnded={() => dispatch(playNext())}
        playing={isPlaying}
        url={url}
        muted={isMuted}
        config={{
          file: {
            forceAudio: false,
            attributes: {
              autoPlay: false
            },
          }
        }}
      />
    </>
  );
}


Player.propTypes = {
  open: PropTypes.bool,
}

export default Player