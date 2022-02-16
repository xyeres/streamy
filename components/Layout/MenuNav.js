import { MdHomeFilled, MdSearch, MdLibraryMusic } from 'react-icons/md'
import Link from 'next/link';

export default function MenuNav({ home, search, library }) {
  let homeIsActive = (page) => {
    return page ? "drop-shadow-lg text-gray-900" : "text-gray-700"
  };
  return (
    <div className="flex px-4 items-center justify-around h-12 border-t border-gray-300 bg-white fixed scroll bottom-0 left-0 right-0">
      <Link href="/">
        <a>
          <MdHomeFilled size="1.25em" className={`${homeIsActive(home)}`} />
        </a>
      </Link>
      <Link href="/search">
        <a>
          <MdSearch size="1.25em" className={`${homeIsActive(search)}`} />
        </a>
      </Link>
      <Link href="/library">
        <a>
          <MdLibraryMusic size="1.25em" className={`${homeIsActive(library)}`} />
        </a>
      </Link>
    </div>
  );
}
