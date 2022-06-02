import GoBack from "./GoBack";

export default function Layout({ children }) {

  return (
    <main className={`w-full h-full flex flex-col gap-2 sm:gap-7 max-w-screen-xl lg:justify-center lg:items-center`}>
      <>
        <GoBack />
        {children}
      </>
    </main>
  );
}
