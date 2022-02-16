import MenuNav from "./MenuNav";
import Player from "../Player/Player";
import GoBack from "./GoBack";

export default function Layout({ children }) {
  return (
    <main className="w-full h-full pb-12 flex overflow-auto flex-col sm:flex-row gap-2 sm:gap-7">
      <>
        <GoBack />
        {children}
      </>
    </main>
  );
}
