import { useRef } from 'react'
import ReactPlayer from 'react-player'
import { useSelector, useDispatch } from 'react-redux'
import { selectIsPlaying, playNext, setDuration, progress } from '../Player/playerSlice'

export default function ReactPlayerWidget() {
  const isPlaying = useSelector(selectIsPlaying)
  const url = useSelector((state) => state.player.url)
  const dispatch = useDispatch()
  const ref = useRef()

  return (<ReactPlayer
    ref={ref}
    className="hidden"
    progressInterval={250}
    onDuration={(duration) => dispatch(setDuration(duration))}
    onProgress={(prog) => dispatch(progress(prog))}
    onStart={() => console.log('start')}
    onEnded={() => dispatch(playNext())}
    playing={isPlaying}
    url={url}
  />)

}
