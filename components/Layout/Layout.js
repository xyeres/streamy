import GoBack from "./GoBack";

export default function Layout({ children }) {

  return (
    <main className={`w-full h-full flex flex-col sm:flex-row gap-2 sm:gap-7`}>
      <>
        <GoBack />
        {children}
      </>
    </main>
  );
}
