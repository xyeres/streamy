import { useState } from "react";
import { Outlet } from "react-router-dom";
import MenuBar from "../MenuBar/MenuBar";
import Player from "../Player/Player";

export default function Layout() {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative w-screen h-screen overflow-clip">
      <main className="w-full h-full flex overflow-auto flex-col sm:flex-row gap-2 sm:gap-7">
        <Outlet />
      </main>
      <Player open={open} setOpen={setOpen} />
      <MenuBar />
    </div>
  );
}
