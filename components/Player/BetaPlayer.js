import { useEffect } from 'react';
import ReactAudioPlayer from 'react-audio-player';
import { useSelector } from 'react-redux';

export default function BetaPlayer({ playerRef }) {
  const src = useSelector(state => state.player.betaUrl)
  console.log('player src', src)

  useEffect(() => {

    if (src != null) {
      playerRef.current.audioEl.current.src = src
      playerRef.current.audioEl.current.load()
      playerRef.current.audioEl.current.play()
    }

  }, [src])

  const handlePlayPause = () => {
    if (playerRef.current.audioEl.current.paused === true) {
      playerRef.current.audioEl.current.play()
    } else {
      playerRef.current.audioEl.current.pause()
    }
  }

  return (
    <div className="bottom-24 p-12 right-0 left-0 fixed flex justify-center items-center bg-opacity-80 bg-black">
      <button onClick={handlePlayPause} className="bg-slate-200 p-3 py-5">Play/Pause</button>
      <ReactAudioPlayer
        ref={playerRef}
        src={src}
        className="hidden"
      />
    </div>
  )
}
