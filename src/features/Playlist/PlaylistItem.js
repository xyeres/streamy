import { useEffect } from "react";

export default function PlaylistItem({ song }) {
  let audio;

  const handleSongClick = () => {
    audio = new Audio(song.songUrl)
    audio.play()
  }

  useEffect(() => {


    return () => {
      if (audio) {
        audio.pause()
      }
    };
  });

  return (
    <li onClick={handleSongClick} className="list-none cursor-pointer hover:bg-gray-100 transition-colors duration-200 flex flex-row text-xs py-2 px-1 items-center">
      <img className="rounded-3xl object-cover h-8 w-8" src={song.coverUrl} alt={song.album} />
      <div className="flex-grow ml-1">
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