import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';

export default function BetaPlayer() {
  const src = useSelector(state => state.player.betaUrl)
  const [isOpen, setIsOpen] = useState(false)
  let ref = useRef()

  useEffect(() => {
    if (src != null) {
      ref.current.src = src
      ref.current.title = 'This is the Song Title!'
      ref.current.load()
      ref.current.play()
    }
  }, [src])

  const handlePlayPause = (e) => {
    e.stopPropagation();
    if (ref.current.paused === true) {
      ref.current.play()
    } else {
      ref.current.pause()
    }
  }

  const audio = (
    <audio src={src} ref={ref}>
      Your browser does not support the
      <code>audio</code> element.
    </audio>
  )


  const handlePlayerOpen = (e) => {
    e.stopPropagation();
    setIsOpen(prevState => !prevState)
  }

  return (
    <div onClick={handlePlayerOpen} className={`${isOpen ? 'translate-x-0' : 'translate-x-[96%]'} transition-transform duration-500 cursor-zoom-in bottom-44 p-4 right-0 left-0 fixed flex justify-center items-center bg-opacity-80 bg-black`}>
      <button onClick={handlePlayPause} className="bg-slate-200 p-1 py-3">play/pause</button>
      {audio}
    </div>
  )
}
