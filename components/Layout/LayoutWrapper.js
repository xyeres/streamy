import { useSelector } from "react-redux";
import Player from "../Player/Player";
import { selectIsOpen, selectUrl } from "../Player/playerSlice";
import MenuNav from "./MenuNav";

export default function LayoutWrapper({ children, home, search, library, bareBones }) {
  const playerIsOpen = useSelector(selectIsOpen)
  const isPlayerLoaded = useSelector(selectUrl)


  return (
    <div className={`
      relative w-full h-full
      ${playerIsOpen ? "overflow-hidden" : "overflow-auto"} 
      ${isPlayerLoaded ? 'h-[var(--vh-minus-96)]' : 'h-full'}
    `}>

      {children}

      {isPlayerLoaded && <Player />}
      <nav>
        <MenuNav home={home} search={search} library={library} />
      </nav>
    </div>
  )
}
