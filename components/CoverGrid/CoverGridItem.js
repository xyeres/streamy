import Image from "next/image";
import Link from "next/link";

export default function CoverGridItem({ item, path }) {
  return (
    <Link href={`${path}/${item.id}`}>
      <a>
        <li className="list-none w-32 transition-all relative hover:translate-y-[1px] lg:w-48
        lg:bg-gray-50 lg:hover:bg-gray-100 lg:p-4 lg:rounded-md
        ">
          <Image
            alt={item.title}
            className="aspect-square object-cover rounded-md"
            src={item.coverUrl}
            width={400}
            height={400}
          />
          <p title={item.title} className="text-xs max-w-[124px] truncate font-bold mt-3 text-neutral-700 lg:max-w-[188px]">
            {item.title}
          </p>
          {item.artist ? <p title={item.artist} className="text-xs text-neutral-500"> {item.artist}</p> : null}
          {item.songs ? <p className="text-xs text-neutral-700"> {item.songs.length} Tracks</p> : null}
        </li>
      </a>
    </Link>
  )
}
