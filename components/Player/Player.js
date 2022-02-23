import Image from 'next/image'
import PropTypes from 'prop-types'
import { useEffect, useRef, useState } from 'react'
import { MdExpandMore, MdHourglassBottom, MdSkipNext, MdSkipPrevious } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import {
  openClose, playNext, playPause, playPrev, selectCurrentlyPlaying, selectCurrentTime, selectDuration, selectIsOpen, selectIsPlaying, selectPrevPlayed, selectUrl, setCurrentTime, setDuration
} from './playerSlice'
import PlayOrPause from './PlayOrPause'
import secondsToTime from './secondsToTime'


function Player() {
  const [seeking, setSeeking] = useState(false);
  const [isMediaLoading, setIsMediaLoading] = useState(true)

  const isPlaying = useSelector(selectIsPlaying)
  const isOpen = useSelector(selectIsOpen)
  const prevPlayed = useSelector(selectPrevPlayed)
  const currentTime = useSelector(selectCurrentTime)
  const duration = useSelector(selectDuration)
  const url = useSelector(selectUrl)
  const song = useSelector(selectCurrentlyPlaying)
  const pRef = useRef()
  const progressBarRef = useRef()
  const bufferBarRef = useRef()
  const progBarContainerRef = useRef()

  const isPlayerLoaded = url != null

  const dispatch = useDispatch()

  // Load a song if url changes
  useEffect(() => {
    if (url != null) {
      pRef.current.src = url
      pRef.current.title = `${song.title} by ${song.artist}`
      pRef.current.load()
      pRef.current.play()
    }

  }, [url])

  

  // Play audio if isPlaying changes
  useEffect(() => {
    if (isPlayerLoaded) {
      if (isPlaying) {
        pRef.current.play()
      } else {
        pRef.current.pause()
      }
    }
  }, [isPlaying])

  // Handle various UI clicks
  const handleOpen = () => dispatch(openClose())

  const handleSeekClick = (e) => {
    // Calculate normalized position
    let clickPosition = (e.pageX - progBarContainerRef.current.offsetLeft) / progBarContainerRef.current.offsetWidth
    let clickTime = parseFloat(clickPosition * duration)
    // Update state
    dispatch(setCurrentTime(clickTime))
    // Move playhead to correct pos
    pRef.current.currentTime = clickTime
  }

  const handleProgress = () => {
    // Update State
    dispatch(setCurrentTime(pRef.current.currentTime))

    // Update Progress Bar 
    const percentage = parseFloat((currentTime / duration) * 100)
    progressBarRef.current.style.width = `${percentage}%`
  }

  const handlePrevSong = () => {
    // Play song from beginning if this is
    // first song in the playlist
    if (prevPlayed.length < 1) {
      pRef.current.seekTo(parseFloat(0))
      dispatch(playPause())
    } else {
      dispatch(playPrev())
    }
  }

  const handleNextSong = () => {
    dispatch(playNext())
  }

  const handleDurationChange = () => {
    const audioDuration = pRef.current.duration
    dispatch(setDuration(audioDuration))
  }

  // Data Loading Handlers
  const handleLoadStart = () => {
    setIsMediaLoading(true)
  }

  const handleCanPlay = () => {
    setIsMediaLoading(false)
  }

  const handleOnProgress = () => {
    const audio = pRef.current
    if (duration > 0) {
      for (var i = 0; i < audio.buffered.length; i++) {
        if (audio.buffered.start(audio.buffered.length - 1 - i)
          < audio.currentTime) {
          bufferBarRef.current.style.width =
            (audio.buffered.end(audio.buffered.length - 1 - i) / duration) * 100 + "%";
          break;
        }
      }
    }
  }

  const handleMediaError = (e) => {
    console.log('error', e)
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

  // onProgress = { handleProgress }

  const audioTag = (
    <audio
      src={url}
      ref={pRef}
      onProgress={handleOnProgress}
      onCanPlay={handleCanPlay}
      onLoadStart={handleLoadStart}
      onError={handleMediaError}
      onDurationChange={handleDurationChange}
      onTimeUpdate={handleProgress}
      onEnded={() => dispatch(playNext())}
    >
      Your browser does not support the
      <code>audio</code> element.
    </audio>
  )

  return (
    <>
      {audioTag}
      {isPlayerLoaded && (
        <>
          {/* Control Bar */}
          <div aria-controls="player-controls" aria-expanded={isOpen} onClick={handleOpen}
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
              
                {isMediaLoading ? <MdHourglassBottom className="animate-spin text-gray-700" size="2em" /> : (
                  <PlayOrPause styles="text-gray-800 drop-shadow-lg cursor-pointer" size="2em" />
                )}
              </div>
            </div>
          </div>

          {/* Full Screen Player */}
          <div id="player-controls" className={`${isOpen ? "player-show" : "player-hide"}`}>
            <MdExpandMore size="1.75em" onClick={handleOpen} className="cursor-pointer hover:bg-white rounded-2xl hover:fill-black hover:bg-opacity-50 transition-all duration-150 absolute top-[32px] left-5" />
            <div className="mt-[86px] relative px-8 aspect-square min-w-[240px] min-h-[240px] sm:min-w-[400px] sm:min-h-[400px] max-w-md mx-8">
              <Image priority layout='fill' objectFit='cover' className='my-8' objectPosition="50% 50%" src={song.coverUrl} alt="album cover" />
            </div>
            <div className="px-8 py-2 w-full sm:max-w-screen-sm">
              <div className="text-sm pt-8">
                <p className="font-bold">{song.title}</p>
                <p className="">{song.artist}</p>
              </div>

              {/* Animated Progress Bar */}
              <div onClick={handleSeekClick} ref={progBarContainerRef} className="relative cursor-pointer mt-4 mx-auto bg-opacity-50  bg-gray-400 w-full h-[7px]">
                <div htmlFor='seek' ref={progressBarRef} className="h-full transition-all bg-gray-200"></div>
                <div ref={bufferBarRef} className="h-full absolute top-0 w-0 transition-all opacity-50 bg-gray-700"></div>
              </div>

              {/* Time Indicators */}
              <div className="flex flex-row justify-between text-xs pt-2">
                <p>{secondsToTime(currentTime)}</p>
                <p>{secondsToTime(duration - currentTime)}</p>
              </div>

              {/* Prev/Play/Next Controls */}
              <div className="flex items-center px-8 justify-around mt-5 drop-shadow-lg">
                <MdSkipPrevious onClick={handlePrevSong} size="3em" className="cursor-pointer fill-white opacity-90 hover:opacity-100" />
                <PlayOrPause size="3em" styles={"cursor-pointerfill-white opacity-90 hover:opacity-100"} />
                <MdSkipNext onClick={handleNextSong} size="3em" className="cursor-pointer fill-white opacity-90 hover:opacity-100" />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}


Player.propTypes = {
  open: PropTypes.bool,
}

export default Player