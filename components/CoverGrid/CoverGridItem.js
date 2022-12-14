import Image from "next/image";
import Link from "next/link";
import FeaturedPill from "../Home/FeaturedPill";

export default function CoverGridItem({ item, path }) {
  return (
    <Link href={`${path}/${item.id}`}>
      <a>
        <li
          className="list-none w-32 relative group lg:w-44 transition-colors bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-900 dark:hover:bg-neutral-800 p-5
        lg:rounded-md
        "
        >
          <Image
            alt={item.title}
            className="group-hover:opacity-80 shadow-xl transition-opacity aspect-square object-cover rounded-md"
            src={item.coverUrl}
            width={400}
            height={400}
          />
          {item.tags?.includes("new-pill") ? (
            <div className="z-40 absolute -right-4 top-2">
              <FeaturedPill message="new" />
            </div>
          ) : null}
          <div className="hover:underline">
            <p
              title={item.title}
              className="text-xs max-w-[124px] truncate font-bold mt-1 text-neutral-700 dark:text-neutral-50 lg:max-w-[188px]"
            >
              {item.title}
            </p>
            {item.artist ? (
              <p
                title={item.artist}
                className="text-xs text-neutral-500 dark:text-neutral-300"
              >
                {" "}
                {item.artist}
              </p>
            ) : null}
            {item.songs ? (
              <p className="text-xs text-neutral-700 dark:text-neutral-50">
                {" "}
                {item.songs.length} Tracks
              </p>
            ) : null}
          </div>
        </li>
      </a>
    </Link>
  );
}
