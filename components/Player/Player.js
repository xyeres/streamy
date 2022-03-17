import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { MdExpandMore, MdHourglassBottom, MdSkipNext, MdSkipPrevious } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import {
  openClose,
  loadNext,
  loadPrev,
  selectCurrentlyPlaying,
  selectCurrentTime,
  selectPlayDuration,
  selectDuration,
  selectIsOpen,
  selectIsPlaying,
  selectPrevPlayed,
  selectUrl,
  setCurrentTime,
  setPlayDuration,
  setDuration,
  play,
  pause,
  selectQueue,
  stopAndUnload,
  close
} from './playerSlice'
import PlayOrPause from './PlayOrPause'
import secondsToTime from './secondsToTime'
import { functions } from '../../lib/firebase'
import { httpsCallable } from 'firebase/functions'
import LoadingOrPlay from './LoadingOrPlay'


function Player() {
  const dispatch = useDispatch()
  // Local State
  const [isMediaLoaded, setisMediaLoaded] = useState(false)

  // Selectors
  const isPlaying = useSelector(selectIsPlaying)
  const isOpen = useSelector(selectIsOpen)
  const queue = useSelector(selectQueue)
  const prevPlayed = useSelector(selectPrevPlayed)
  const currentTime = useSelector(selectCurrentTime)
  const playDuration = useSelector(selectPlayDuration)
  const duration = useSelector(selectDuration)
  const url = useSelector(selectUrl)
  const song = useSelector(selectCurrentlyPlaying)

  /* Refs */
  const pRef = useRef()
  const progressBarRef = useRef()
  const bufferBarRef = useRef()
  const progBarContainerRef = useRef()

  /* Logical */
  const isPlayerLoaded = url != null


  /* Helpers */
  function updateMetadata() {
    // Setup media session
    if ('mediaSession' in navigator) {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: song.title,
        artist: song.artist,
        album: song.album,
        artwork: [
          { src: song.coverUrl }
        ]
      })
    }
  }

  function seek(time) {
    // Update state
    dispatch(setCurrentTime(time))

    // Move playhead to correct pos
    pRef.current.currentTime = time
  }

  /* Cloud Function Handler */
  const handleIncrementPlayCount = () => {
    try {
      const songMeta = {
        slug: song.slug,
        id: song.id,
        title: song.title,
        artist: song.artist,
        artistSlug: song.artistSlug,
        album: song.album,
        albumSlug: song.albumSlug
      }

      const incrementPlayCountByOne = httpsCallable(functions, 'incrementPlayCountByOne')
      incrementPlayCountByOne(songMeta)

    } catch (err) {
      console.error('Error incrementing: ', err)
    }
  }

  /* Load Song */
  useEffect(() => {
    if (url != null) {
      pRef.current.src = url
      pRef.current.title = song.title
      pRef.current.load()
    }

    if (url === null) {
      pRef.current.src = ''
    }

  }, [url, song.title])

  /* Manage Play/Pause State */

  const playAudioElement = async () => {
    const audio = pRef.current
    try {
      await audio.play()
      updateMetadata()
    } catch (err) {
      console.error(err)
    }
  }

  const pauseAudioElement = () => {
    const audio = pRef.current
    if (audio.src && !audio.paused) audio.pause()
  }

  useEffect(() => {
    if (isPlayerLoaded && isMediaLoaded) {
      if (isPlaying) {
        navigator.mediaSession.playbackState = 'playing'
        playAudioElement()
      } else {
        navigator.mediaSession.playbackState = 'paused'
        pauseAudioElement()
      }
    }
  }, [isPlaying, isMediaLoaded, isPlayerLoaded])


  /* Handle various UI clicks */
  const handleOpen = () => dispatch(openClose())

  const handleSeekClick = (e) => {
    // Calculate normalized position
    const progBar = progBarContainerRef.current
    let clickPosition = (e.pageX - progBar.offsetLeft) / progBar.offsetWidth
    let clickTime = parseFloat(clickPosition * duration)
    seek(clickTime)
  }


  const handlePrevSong = () => {
    // Play song from beginning if this is
    // first song in the playlist
    if (prevPlayed.length < 1) {
      seek(0.00)
      dispatch(play())
    } else {
      dispatch(loadPrev())
      dispatch(play())
    }
    console.log('prevPlayed', prevPlayed)
  }

  function handleNextSong() {
    if (queue.length < 1) {
      dispatch(close())
      setTimeout(function () {
        dispatch(stopAndUnload())
      }, 350)
    } else {
      dispatch(loadNext())
      dispatch(play())
    }
    console.log('queue', queue)
  }


  const handleTimeUpdate = () => {
    // This handler is called every 250ms

    const updatedPlayDuration = (parseInt(playDuration) + 1) || 0

    // Update State
    dispatch(setCurrentTime(pRef.current.currentTime))
    dispatch(setPlayDuration(updatedPlayDuration))

    // Update Progress Bar 
    const percentage = parseFloat((currentTime / duration) * 100)
    if (progressBarRef.current) {
      progressBarRef.current.style.width = `${percentage}%`
    }

    if (playDuration === 120) { // approx 30 seconds
      handleIncrementPlayCount()
    }
  }

  const handleDurationChange = () => {
    const audioDuration = pRef.current.duration
    dispatch(setDuration(audioDuration))
  }

  // Data Loading Handlers
  const handleLoadStart = () => {
    setisMediaLoaded(false)
  }

  const handleCanPlay = () => {
    setisMediaLoaded(true)
  }

  // This handles load progress, not listen progress
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

  /* For Media Session */
  const handlePlay = () => dispatch(play())
  const handlePause = () => dispatch(pause())
  const handleSeekTo = (details) => {
    const audio = pRef.current
    if (details.fastSeek && ('fastSeek' in audio)) {
      audio.fastSeek(details.seekTime)
      return
    }
    seek(details.seekTime)
    navigator.mediaSession.setPositionState({
      duration: duration,
      playbackRate: pRef.current.playbackRate,
      position: pRef.current.currentTime
    })
  }

  useEffect(() => {
    if (isPlayerLoaded) {
      const actionHandlers = [
        ['play', handlePlay],
        ['pause', handlePause],
        ['previoustrack', handlePrevSong],
        ['nexttrack', handleNextSong],
        ['stop', handlePause],
        ['seekto', handleSeekTo],
      ];

      for (const [action, handler] of actionHandlers) {
        try {
          navigator.mediaSession.setActionHandler(action, handler);
        } catch (error) {
          console.log(`The media session action "${action}" is not supported yet.`);
        }
      }
    }
  }, [isPlayerLoaded, queue, prevPlayed])


  /* Ensure parent document can't 
      scroll when player is open */

  useEffect(() => {
    if (isPlayerLoaded && isOpen) {
      document.body.classList.remove("overflow-auto")
      document.body.classList.add("overflow-hidden")
    } else {
      document.body.classList.add("overflow-auto")
      document.body.classList.remove("overflow-hidden")
    }
  }, [isPlayerLoaded, isOpen])



  /* Build audio element */
  const audioTag = (
    <audio
      src={url}
      ref={pRef}
      onProgress={handleOnProgress}
      onCanPlay={handleCanPlay}
      onLoadStart={handleLoadStart}
      onDurationChange={handleDurationChange}
      onTimeUpdate={handleTimeUpdate}
      onEnded={handleNextSong}
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
                    <p className="font-bold">{song.title.length > 34 ? song.title.slice(0, 34) + '...' : song.title}</p>
                  </div>
                  <div>
                    <span className="pl-1">{song.artist.length > 34 ? song.artist.slice(0, 34) + '...' : song.artist}</span>
                  </div>
                </div>
              </div>
              <div onClick={(e) => e.stopPropagation()} className='flex items-center justify-center mr-4'>
                <LoadingOrPlay
                  isLoading={isMediaLoaded}
                  playPauseIconSize="2em"
                  loadIconSize="1.5em"
                  playOrPauseStyles="text-gray-800 drop-shadow-lg cursor-pointer"
                  loadIconStyles="animate-spin text-gray-700"
                />
              </div>
            </div>
          </div>

          {/* Full Screen Player */}
          <div id="player-controls" className={`${isOpen ? "player-show" : "player-hide"}`}>
            <MdExpandMore size="1.75em" onClick={handleOpen} className="cursor-pointer hover:bg-white rounded-2xl hover:fill-black hover:bg-opacity-50 transition-all duration-150 absolute top-[27px] left-5" />
            <div className="mt-[80px] relative px-8 aspect-square min-w-[240px] min-h-[240px] sm:min-w-[400px] sm:min-h-[400px] max-w-md mx-8">
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
                <div ref={bufferBarRef} className="h-full absolute top-0 transition-all w-0 opacity-50 bg-gray-700"></div>
              </div>

              {/* Time Indicators */}
              <div className="flex flex-row justify-between text-xs pt-2">
                <p>{secondsToTime(currentTime)}</p>
                <p>{secondsToTime(duration - currentTime)}</p>
              </div>

              {/* Prev/Play/Next Controls */}
              <div className="flex items-center px-8 justify-around mt-5 drop-shadow-lg">
                <button aria-label="previous song" onClick={handlePrevSong}>
                  <MdSkipPrevious size="3em" className="cursor-pointer fill-white opacity-90 hover:opacity-100" />
                </button>
                <LoadingOrPlay
                  isLoading={isMediaLoaded}
                  playPauseIconSize="3em"
                  loadIconSize="1.85em"
                  playOrPauseStyles="cursor-pointer fill-white opacity-90 hover:opacity-100"
                  loadIconStyles="animate-spin fill-white"
                />
                <button aria-label="next song" onClick={handleNextSong}>
                  <MdSkipNext size="3em" className="cursor-pointer fill-white opacity-90 hover:opacity-100" />
                </button>
              </div>
            </div>
          </div>
        </>
      )
      }
    </>
  );
}

export default Player