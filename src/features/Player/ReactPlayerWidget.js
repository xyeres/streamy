import ReactPlayer from 'react-player'
import { useSelector, useDispatch } from 'react-redux'
import { selectIsPlaying, dequeueAndPlayNext, setDuration, progress } from '../Player/playerSlice'

export default function ReactPlayerWidget() {
  const isPlaying = useSelector(selectIsPlaying)
  const url = useSelector((state) => state.player.url)
  const dispatch = useDispatch()

  return (<ReactPlayer
    className="hidden"
    progressInterval={250}
    onDuration={(duration) => dispatch(setDuration(duration))}
    onProgress={(prog) => dispatch(progress(prog))}
    onStart={() => console.log('onStart')}
    onEnded={() => dispatch(dequeueAndPlayNext())}
    playing={isPlaying}
    url={url}
  />)

}
