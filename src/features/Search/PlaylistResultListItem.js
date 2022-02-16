import { Link } from "react-router-dom"
import { MdChevronRight } from "react-icons/md"

export default function PlaylistResultListItem() {
  return (
    <>
      <Link to="/">
        <li className="hover:bg-gray-200 hover:rounded-md p-[6px] flex flex-row text-sm">
          <div
            alt="cover image"
            className="w-12 h-12 mr-3 shadow-sm bg-green-300 object-cover aspect-square rounded-md"
          ></div>
          <div className="flex flex-row content-between w-full">
            <div className="self-center">
              <p className="font-bold">Hopkins Inspired</p>
              <p className="text-gray-500 text-xs">Playlist</p>
            </div>
            <MdChevronRight size="1.5em" className="text-gray-500 self-center ml-auto" />
          </div>
        </li>
      </Link>
      <Link to="/">
        <li className="hover:bg-gray-200 hover:rounded-md p-[6px] flex flex-row text-sm">
          <div
            alt="cover image"
            className="w-12 h-12 mr-3 shadow-sm bg-blue-300 object-cover aspect-square rounded-md"
          ></div>
          <div className="flex flex-row content-between w-full">
            <div className="self-center">
              <p className="font-bold">Malibu</p>
              <p className="text-gray-500 text-xs">Playlist</p>
            </div>
            <MdChevronRight size="1.5em" className="text-gray-500 self-center ml-auto" />
          </div>
        </li>
      </Link>

      <Link to="/">

        <li className="hover:bg-gray-200 hover:rounded-md p-[6px] flex flex-row text-sm">
          <div
            alt="cover image"
            className="w-12 h-12 mr-3 shadow-sm bg-pink-300 object-cover aspect-square rounded-md"
          ></div>
          <div className="flex flex-row content-between w-full">
            <div className="self-center">
              <p className="font-bold">Midnight Dinner Party</p>
              <p className="text-gray-500 text-xs">Playlist</p>
            </div>
            <MdChevronRight size="1.5em" className="text-gray-500 self-center ml-auto" />
          </div>
        </li>
      </Link>
    </>
  )
}
