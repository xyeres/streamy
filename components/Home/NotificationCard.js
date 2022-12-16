import { useEffect, useRef } from "react";

function NotificationCard() {
  const dialog = useRef(null);

  useEffect(() => {
    // Check localstorage
    let hasShown = localStorage.getItem("dialog1");

    if (!hasShown) {
      dialog.current.showModal();
    }
  }, []);

  function handleDialogDismiss() {
    // set localStorage
    localStorage.setItem("dialog1", "true");
  }

  return (
    <dialog
      ref={dialog}
      className="ring-4 absolute top-4 left-4 right-4 bottom-16 z-50 p-6 rounded-2xl bg-[[rgba(256,256,256,256.9)]] dark:bg-[rgba(0,0,0,0.9)] text-gray-800 dark:text-white"
    >
      <main className="text-center flex flex-col justify-center items-center">
        <h1 className="text-2xl mb-8 font-bold">Good news</h1>
        <p>
          iOS update 15.7.2 now allows for background playback in Safari when your phone is locked. Update your phone to take advantage of this and enjoy continuous playback in the app.
        </p>
      </main>
      <div className="w-full mt-4 flex justify-center">
        <form method="dialog">
          <button
            onClick={handleDialogDismiss}
            className="bg-gray-600 focus:ring-2 ring-gray-200 outline-none hover:bg-gray-500 active:bg-gray-400 rounded-full text-xs p-2 px-4 m-2"
          >
            OK
          </button>
        </form>
      </div>
    </dialog>
  );
}

export default NotificationCard;
