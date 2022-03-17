import { MdHourglassBottom } from "react-icons/md";
import PlayOrPause from "./PlayOrPause";

export default function LoadingOrPlay({isLoading, playPauseIconSize, loadIconSize, playOrPauseStyles, loadIconStyles}) {
  return (
    <>
      {isLoading ? <PlayOrPause styles={playOrPauseStyles} size={playPauseIconSize} />
        : (<MdHourglassBottom className={loadIconStyles} size={loadIconSize} />)
      }
    </>
  )
}
