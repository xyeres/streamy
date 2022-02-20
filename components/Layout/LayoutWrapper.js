import { useSelector } from "react-redux";
import Player from "../Player/Player";
import { selectIsOpen } from "../Player/playerSlice";
import MenuNav from "./MenuNav";

export default function LayoutWrapper({ children, home, search, library, bareBones }) {
  return (
    <div className={`
      w-full
      min-h-screen
    `}>

      {children}

      <Player />
      <nav>
        <MenuNav home={home} search={search} library={library} />
      </nav>
    </div>
  )
}
