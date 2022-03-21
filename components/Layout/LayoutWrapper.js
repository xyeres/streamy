import { Player } from "../Player";
import MenuNav from "./MenuNav";

export default function LayoutWrapper({ children, home, search, library, bareBones }) {
  return (
    <div className={`w-full min-h-screen`}>
      <div className="hidden md:block p-4 bg-purple-400 text-white font-semibold text-center">
        <p>App is not yet optimized for large screens, visit on your phone for best results!</p>
      </div>
      {children}
      <Player />
      <nav>
        <MenuNav home={home} search={search} library={library} />
      </nav>
    </div>
  )
}
