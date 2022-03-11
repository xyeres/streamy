import Image from "next/image";
import Link from "next/link";

export default function CoverGridItem({ item, path }) {
  return (
    <Link href={`${path}/${item.id}`}>
      <a>
        <li className="list-none w-32 transition-transform relative hover:translate-y-[1px]">
          <Image
            alt={item.title}
            className="aspect-square object-cover rounded-md"
            src={item.coverUrl}
            width={400}
            height={400}
          />
          <p className="text-xs font-bold mt-3 text-neutral-700">
            {item.title.length > 17 ? item.title.slice(0, 19) + '...' : item.title}
          </p>
          {item.artist ? <p className="text-xs text-neutral-700"> {item.artist}</p> : null}
          {item.songs ? <p className="text-xs text-neutral-700"> {item.songs.length} Tracks</p> : null}
        </li>
      </a>
    </Link>
  )
}
