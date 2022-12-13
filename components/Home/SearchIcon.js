import Link from "next/link";
import React from "react";
import { MdSearch } from "react-icons/md";

function SearchIcon() {
  return (
    <div className="hidden z-50 shadow-md transition-colors hover:text-white bg-gray-200 hover:bg-purple-500 p-2 rounded-full lg:inline fixed right-5 top-4">
      <Link href="/search">
        <a>
          <MdSearch size="1.45em" />
        </a>
      </Link>
    </div>
  );
}

export default SearchIcon;
