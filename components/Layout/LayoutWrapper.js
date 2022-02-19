import { useSelector } from "react-redux";
import Player from "../Player/Player";
import { selectIsOpen, selectUrl } from "../Player/playerSlice";
import MenuNav from "./MenuNav";

export default function LayoutWrapper({ children, home, search, library, bareBones }) {
  const playerIsOpen = useSelector(selectIsOpen)
  const isPlayerLoaded = useSelector(selectUrl)


  if (playerIsOpen) {
    document.body.classList.remove("overflow-auto")
    document.body.classList.add("overflow-hidden")
  } else {
    document.body.classList.add("overflow-auto")
    document.body.classList.remove("overflow-hidden")
  }


return (
  <div className={`
      relative w-full h-full
      
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
