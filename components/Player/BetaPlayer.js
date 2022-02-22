import { useEffect, useState } from 'react';
import ReactAudioPlayer from 'react-audio-player';
import { useSelector } from 'react-redux';

export default function BetaPlayer({ playerRef }) {
  const src = useSelector(state => state.player.betaUrl)
  const [isOpen, setIsOpen] = useState(false)

  if (playerRef.current) {
    var audioEl = playerRef.current.audioEl.current;
  }
  useEffect(() => {

    if (src != null) {
      audioEl.src = src
      audioEl.title = 'This is the Song Title!'
      audioEl.load()

      audioEl.play()
    }

  }, [src])

  const handlePlayPause = (e) => {
    e.stopPropagation();

    console.log(audioEl)
    if (audioEl) {
      if (audioEl.paused === true) {
        audioEl.play()
      } else {
        audioEl.pause()
      }
    }
  }

  const handlePlayerOpen = (e) => {
    e.stopPropagation();
    setIsOpen(prevState => !prevState)
  }

  return (
    <div onClick={handlePlayerOpen} className={`${isOpen ? 'translate-x-0' : 'translate-x-[96%]'} transition-transform duration-500 cursor-zoom-in bottom-44 p-4 right-0 left-0 fixed flex justify-center items-center bg-opacity-80 bg-black`}>
      <button onClick={handlePlayPause} className="bg-slate-200 p-1 py-3">play/paus</button>
      <ReactAudioPlayer
        ref={playerRef}
        src={src}
        className="hidden"
      />
    </div>
  )
}
