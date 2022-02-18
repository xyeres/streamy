import Player from "../Player/Player";
import Layout from "./Layout";
import MenuNav from "./MenuNav";

export default function LayoutWrapper({ children, home, search, library, bareBones }) {
  return (
    // Add overflow-hidden here vs overflow-clip as a POTENTIAL solution to mobile scroll issues
    <div className="relative w-screen h-screen">
      {children}
      <Player />
      <nav>
        <MenuNav home={home} search={search} library={library} />
      </nav>
    </div>
  )
}
