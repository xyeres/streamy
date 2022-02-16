import { useDispatch, useSelector } from 'react-redux'
import { playPause, selectIsPlaying } from './playerSlice'
import {
  MdPlayCircleFilled,
  MdPauseCircleFilled
} from 'react-icons/md'

export default function PlayOrPause({ size, styles }) {
  const isPlaying = useSelector(selectIsPlaying)

  const dispatch = useDispatch()

  let button
  if (isPlaying) {
    button = <MdPauseCircleFilled onClick={() => dispatch(playPause())} size={size} className={styles} />

  } else {
    button = <MdPlayCircleFilled onClick={() => dispatch(playPause())} size={size} className={styles} />
  }

  return <>{button}</>

}
