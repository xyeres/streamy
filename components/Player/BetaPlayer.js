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

  return (
    <ReactAudioPlayer
      ref={playerRef}
      src={src}
    />
  )
}
