import { useEffect, useRef } from "react";

export default function PlaylistItem({ song }) {
  let audio;

  const handleSongClick = () => {
    audio = new Audio(song.songUrl)
    audio.play()
  }

  useEffect(() => {
    

    return () => {
      if(audio) {
        audio.pause()
      }
    };
  });

  return (
    <li onClick={handleSongClick} className="list-none cursor-pointer hover:bg-slate-300 transition-colors duration-200 flex flex-row text-xs py-2 px-1 items-center">
      <div className="p-1 m-1 bg-pink-50 rounded-3xl h-8 w-8">
        <img src={song.coverUrl} alt={song.album} />
      </div>
      <div className="flex-grow">
        <div className="flex p-1 justify-between">
          <p className="font-bold">{song.title}</p>
          <p className="text-neutral-500">{song.genre}</p>
        </div>
        <div>
          <span className="p-1">{song.artist}</span>
        </div>
      </div>
    </li>
  );
}
