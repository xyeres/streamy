import { useDispatch, useSelector } from 'react-redux'
import { playPause, selectIsPlaying } from './playerSlice'
import {
  MdPlayCircleFilled,
  MdPauseCircleFilled
} from 'react-icons/md'

export default function PlayOrPause({ size, styles }) {
  const isPlaying = useSelector(selectIsPlaying)

  const dispatch = useDispatch()

  let buttonValue
  if (isPlaying) {
    buttonValue = <MdPauseCircleFilled onClick={() => dispatch(playPause())} size={size} className={styles} />
  } else {
    buttonValue = <MdPlayCircleFilled onClick={() => dispatch(playPause())} size={size} className={styles} />
  }

  return (
    <button>
      <span className="sr-only">{isPlaying ? "Pause" : "Play"}</span>
      {buttonValue}
    </button>
  )

}
