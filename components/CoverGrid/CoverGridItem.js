import Image from "next/image";
import Link from "next/link";

export default function CoverGridItem({ item, path }) {
  return (
    <Link href={`${path}/${item.id}`}>
      <a>
        <li className="list-none sm:mb-5 w-32 sm:w-full mr-3 first:ml-4 sm:first:ml-0 sm:mr-0 transition-transform relative hover:translate-y-1">
          <Image
            alt={item.title}
            className="aspect-square drop-shadow-lg object-cover rounded-xl hover:drop-shadow-xl"
            src={item.coverUrl}
            width={400}
            height={400}
          />
          <p className="text-sm font-bold mt-3 text-neutral-700">{item.title}</p>
          {item.songs ? <p className="text-xs text-neutral-700"> {item.songs.length} Tracks</p> : ''}
        </li>
      </a>
    </Link>
  )
}
