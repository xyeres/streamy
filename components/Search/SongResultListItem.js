import Image from "next/image"
import { useDispatch } from "react-redux"
import { loadFromList, play } from "../Player/playerSlice"
import { GoPrimitiveDot } from 'react-icons/go'
import Link from "next/link"
export default function SongResultListItem({ song }) {
  const dispatch = useDispatch()

  const handleSongClick = () => {
    dispatch(loadFromList({ index: 0, listId: song.albumSlug, listSongs: [{ ...song }] }))
    dispatch(play())
  }

  const handleLinkClick = (e) => {
    e.stopPropagation()
  }
  
  return (
    <li onClick={handleSongClick} className="hover:bg-gray-200 hover:rounded-md p-[7px] text-sm cursor-pointer">
      <div className="flex flex-row">
        <div className="flex-shrink-0">
          <Link href={`album/${song.albumSlug}`}>
            <a onClick={handleLinkClick}>
              <Image
                width={48}
                height={48}
                alt={`${song.album} album cover`}
                src={song.coverUrl}
                className="shadow-sm flex-shrink-0 bg-yellow-300 object-cover aspect-square rounded-md"
              />
            </a>
          </Link>
        </div>
        <div className="flex flex-col justify-center w-full ml-3">
          <p className="font-bold">{song.title}</p>
          <p className="text-gray-500 text-xs pt-1 flex items-center flex-wrap">
            {song.artist}
            <GoPrimitiveDot className="mx-1" size="0.5em" />
            {song.album}
          </p>
        </div>
      </div>
    </li>
  )
}
