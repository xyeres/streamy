import Link from "next/link"

export default function SongResultListItem() {
  return (
    <>
      <Link href="/song/239dfskl32">
        <a>
          <li className="hover:bg-gray-200 hover:rounded-md p-[6px] flex flex-row text-sm">
            <div
              alt="cover image"
              className="w-12 h-12 mr-3 shadow-sm bg-yellow-300 object-cover aspect-square rounded-md"
            ></div>
            <div className="flex flex-col justify-center w-full">
              <p className="font-bold">Clouds on Sunset</p>
              <p className="text-gray-500 text-xs">Moby</p>
            </div>
          </li>
        </a>
      </Link>
      <Link href="/song/dgflk56t2">
        <a>
          <li className="hover:bg-gray-200 hover:rounded-md p-[6px] flex flex-row text-sm">
            <div
              alt="cover image"
              className="w-12 h-12 mr-3 shadow-sm bg-orange-300 object-cover aspect-square rounded-md"
            ></div>
            <div className="flex flex-col justify-center w-full">
              <p className="font-bold">The Sun Never Stops Setting</p>
              <p className="text-gray-500 text-xs">Moby</p>
            </div>
          </li>
        </a>
      </Link>
      <Link href="/song/3242f324">
        <a>
          <li className="hover:bg-gray-200 hover:rounded-md p-[6px] flex flex-row text-sm">
            <div
              alt="cover image"
              className="w-12 h-12 mr-3 shadow-sm bg-purple-300 object-cover aspect-square rounded-md"
            ></div>
            <div className="flex flex-col justify-center w-full">
              <p className="font-bold">My Baby Sunshine</p>
              <p className="text-gray-500 text-xs">Moby</p>
            </div>
          </li>
        </a>
      </Link>
    </>
  )
}
