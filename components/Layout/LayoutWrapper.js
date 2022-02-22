import { useRef } from "react";
import BetaPlayer from "../Player/BetaPlayer";
import Player from "../Player/Player";
import MenuNav from "./MenuNav";

export default function LayoutWrapper({ children, home, search, library, bareBones }) {
  const playerRef = useRef()

  return (
    <div className={`
      w-full
      min-h-screen
    `}>

      {children}

      <Player />
      <BetaPlayer playerRef={playerRef} />
      <nav>
        <MenuNav home={home} search={search} library={library} />
      </nav>
    </div>
  )
}
