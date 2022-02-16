import Player from "../Player/Player";
import Layout from "./Layout";
import MenuNav from "./MenuNav";

export default function LayoutWrapper({ children, home, search, library, bareBones }) {
  return (
    <div className="relative w-screen h-screen overflow-clip">
      {children}
      <Player />
      <nav>
        <MenuNav home={home} search={search} library={library} />
      </nav>
    </div>
  )
}
