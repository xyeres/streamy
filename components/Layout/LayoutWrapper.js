import Player from "../Player/Player";
import MenuNav from "./MenuNav";
import Link from 'next/link';

import { MdSearch } from 'react-icons/md'


export default function LayoutWrapper({ children, home, search, library }) {
  return (
    <div className={`w-full min-h-screen lg:flex lg:justify-center`}>
      {children}
      <Player />
      <nav>
        <MenuNav home={home} search={search} library={library} />
      </nav>
    </div>
  )
}
