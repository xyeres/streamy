import { Outlet } from "react-router-dom";
import MenuNav from "./MenuNav";
import Player from "../Player/Player";

export default function Layout() {
  return (
    <div className="relative w-screen h-screen overflow-clip">
      <main className="w-full h-full pb-12 flex overflow-auto flex-col sm:flex-row gap-2 sm:gap-7">
        <Outlet />
      </main>
      <Player />
      <MenuNav />
    </div>
  );
}
