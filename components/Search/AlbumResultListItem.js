import Link from "next/link"
import Image from "next/image"
import { MdChevronRight } from "react-icons/md"

export default function AlbumResultListItem() {
  return (
    <Link href="/">
      <a>
        <li className="hover:bg-gray-200 hover:rounded-md p-[6px] group flex flex-row text-sm">
          <Image
            priority
            alt="album cover"
            className="w-12 h-12 mr-3 shadow-sm object-cover aspect-square rounded-full"
            height={48}
            width={48}
            src="/images/lfas-cover.png"
          />
          <div className="flex flex-row ml-3 content-between w-full">
            <div className="self-center">
              <p className="font-bold">Water</p>
              <p className="text-gray-500 text-xs">WhosWhoOfWho</p>
            </div>
            <MdChevronRight size="1.5em" className="text-gray-500 self-center ml-auto" />
          </div>
        </li>
        <li className="hover:bg-gray-200 hover:rounded-md p-[6px] group flex flex-row text-sm">
          <Image
            priority
            alt="album cover"
            className="w-12 h-12 mr-3 shadow-sm object-cover aspect-square rounded-full"
            height={48}
            width={48}
            src="/images/lfas-cover.png"
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
         <Image
            priority
            alt="album cover"
            className="w-12 h-12 mr-3 shadow-sm object-cover aspect-square rounded-full"
            height={48}
            width={48}
            src="/images/lfas-cover.png"
          />
          <div className="flex flex-row content-between w-full">
            <div className="self-center">
              <p className="font-bold">Looking for Sunshine</p>
              <p className="text-gray-500 text-xs">WhosWhoOfWho</p>
            </div>
            <MdChevronRight size="1.5em" className="text-gray-500 self-center ml-auto" />
          </div>
        </li>
      </a>
    </Link>
  )
}
