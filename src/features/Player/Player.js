import PropTypes from 'prop-types'
import CoverImage from '../../img/lfas-cover.png'
import ReactPlayer from 'react-player'
import { MdExpandMore } from 'react-icons/md'
import {
  MdSkipPrevious,
  MdSkipNext,
  MdPlayCircleFilled,
} from 'react-icons/md'

function Player({ open, setOpen, playing }) {
  const handleOpen = () => setOpen(!open)
  return (
    <>
      {/* Control Bar */}
      <div onClick={handleOpen} className={open ? "control-bar-hide" : "control-bar-show"}>
        <div className="flex items-center justify-between h-12 drop-shadow border-t border-gray-300 bg-zinc-100">
          <div className='h-1 w-full absolute top-0 after:h-1 after:contents'></div>
          <div className="flex items-center flex-row text-xs">
            <img alt="album cover" src={playing.song.coverUrl} className='w-12 h-12' />
            <div>
              <div className="flex pl-1">
                <p className="font-bold">{playing.song.title}</p>
              </div>
              <div>
                <span className="pl-1">{playing.song.artist}</span>
              </div>
            </div>
          </div>
          <div className='flex items-center justify-center mr-4'>
            <button><MdPlayCircleFilled size="2em" className="text-gray-800 drop-shadow-lg" /></button>
          </div>
        </div>
      </div>
      {/* Full Screen Player */}
      <div className={open ? "player-show" : "player-hide"}>
        <MdExpandMore size="1.75em" onClick={handleOpen} className="cursor-pointer hover:bg-white rounded-2xl hover:fill-black hover:bg-opacity-50 transition-all duration-150 absolute top-[19px] left-4" />
        <img className="pt-28 px-10" src={CoverImage} alt="album cover" />
        <div className="p-8 pt-16 w-full sm:max-w-screen-sm">
          {/* Song Metadata */}
          <div className="text-sm pt-8">
            <p className="font-bold">{playing.song.title}</p>
            <p className="">{playing.song.artist}</p>
          </div>
          {/* Animated Progress Bar */}
          <div className="cursor-pointer mt-4 mx-auto bg-opacity-50  bg-gray-400 w-full h-[2px]">
            <div className="h-full w-0 bg-gray-200 animate-fill"></div>
          </div>
          {/* Time Indicators */}
          <div className="flex flex-row justify-between text-xs pt-1">
            <p>0:00</p>
            <p>4:20</p>
          </div>
          {/* Icon Controls */}
          <div className="flex items-center px-8 justify-around mt-8 drop-shadow-lg">
            <MdSkipPrevious size="3em" className="cursor-pointer fill-white opacity-90 hover:opacity-100" />
            <MdPlayCircleFilled size="3em" className="cursor-pointer fill-white opacity-90 hover:opacity-100" />
            <MdSkipNext size="3em" className="cursor-pointer fill-white opacity-90 hover:opacity-100" />
          </div>
        </div>
      </div>
      <ReactPlayer className="hidden" onReady={() => console.log('onReady')} onStart={() => console.log('onStart')} url={playing.song.songUrl} />
    </>
  );
}

Player.defaultProps = {
  playing: {
    song: {
      artist: "Artist Name",
      title: "Song Title",
      coverUrl: CoverImage,
      songUrl: undefined
    }
  }
}

Player.propTypes = {
  playing: PropTypes.shape({
    song: PropTypes.shape({
      artist: PropTypes.string,
      title: PropTypes.string,
      coverUrl: PropTypes.string,
      songUrl: PropTypes.string
    })
  })
}

export default Player