import { Link } from "react-router-dom"
import CoverImage from '../../img/lfas-cover.png'
import { MdChevronRight } from "react-icons/md"

export default function AlbumResultListItem() {
  return (
    <Link to="/">
      <li className="hover:bg-gray-200 hover:rounded-md p-[6px] group flex flex-row text-sm">
        <img
          alt="cover image"
          className="w-12 h-12 mr-3 shadow-sm object-cover aspect-square rounded-full"
          src={CoverImage}
        />
        <div className="flex flex-row content-between w-full">
          <div className="self-center">
            <p className="font-bold">Water</p>
            <p className="text-gray-500 text-xs">WhosWhoOfWho</p>
          </div>
          <MdChevronRight size="1.5em" className="text-gray-500 self-center ml-auto" />
        </div>
      </li>
      <li className="hover:bg-gray-200 hover:rounded-md p-[6px] group flex flex-row text-sm">
        <img
          alt="cover image"
          className="w-12 h-12 mr-3 shadow-sm object-cover aspect-square rounded-full"
          src={CoverImage}
        />
        <div className="flex flex-row content-between w-full">
          <div className="self-center">
            <p className="font-bold">Stand By</p>
            <p className="text-gray-500 text-xs">machinedrum</p>
          </div>
          <MdChevronRight size="1.5em" className="text-gray-500 self-center ml-auto" />
        </div>
      </li>
      <li className="hover:bg-gray-200 hover:rounded-md p-[6px] group flex flex-row text-sm">
        <img
          alt="cover image"
          className="w-12 h-12 mr-3 shadow-sm object-cover aspect-square rounded-full"
          src={CoverImage}
        />
        <div className="flex flex-row content-between w-full">
          <div className="self-center">
            <p className="font-bold">Looking for Sunshine</p>
            <p className="text-gray-500 text-xs">WhosWhoOfWho</p>
          </div>
          <MdChevronRight size="1.5em" className="text-gray-500 self-center ml-auto" />
        </div>
      </li>
    </Link>
  )
}
