import {
  MdPauseCircleFilled,
  MdSkipPrevious,
  MdSkipNext,
  MdPlayCircleFilled,
  MdShuffle,
  MdShuffleOn,
  MdRepeat,
  MdRepeatOn,
  MdVolumeUp
} from 'react-icons/md'


export default function Controls({ currentlyPlaying }) {
  return (
    <div className="flex items-center justify-between h-12 drop-shadow border-t border-gray-300 bg-zinc-100 fixed bottom-12 left-0 right-0">
      <div className='h-1 w-full absolute top-0 after:h-1 after:contents'></div>
      <div className="flex items-center flex-row text-xs">
        <img src={currentlyPlaying} className='w-12 h-12' />
        <div>
          <div className="flex pl-1">
            <p className="font-bold">Porcelen</p>
          </div>
          <div>
            <span className="pl-1">Moby</span>
          </div>
        </div>
      </div>
      <div className='flex items-center justify-center mr-4'>
        {/* <button><MdSkipPrevious size="1.5em" className="mr-2 text-gray-800" /></button> */}
        <button><MdPlayCircleFilled size="2em" className="text-gray-700 drop-shadow-lg" /></button>
        {/* <button><MdSkipNext size="1.5em" className="ml-2 text-gray-800" /></button> */}
      </div>
    </div>
  )
}
