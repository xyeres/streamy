import { Outlet } from "react-router-dom";
import MenuBar from "../MenuBar/MenuBar";
import Controls from "../Player/Controls";

export default function Layout() {
  return (
    <div className="relative">
      <main className='flex flex-col sm:flex-row gap-2 sm:gap-7 pb-28'>
        <Outlet />
      </main>
      <Controls />
      <MenuBar />
    </div>
  );
}
