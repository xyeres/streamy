import Player from "../Player/Player";
import MenuNav from "./MenuNav";
import NotificationCard from "../Home/NotificationCard";
import { useState } from "react";

export default function LayoutWrapper({ children, home, search, library }) {
  return (
    <div className={`w-full min-h-screen lg:flex lg:justify-center`}>
      {children}
      <NotificationCard />
      <Player />

      <nav>
        <MenuNav home={home} search={search} library={library} />
      </nav>
    </div>
  );
}
