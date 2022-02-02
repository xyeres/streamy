import PlaylistItem from "./PlaylistItem";
import { useEffect, useState } from "react";
import querySongs from "./querySongs";

export default function Playlist({ playlist }) {
  const [songs, setSongs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchSongs = async (albumId) => {
      setIsLoading(true)
      const data = await querySongs(albumId)
      setSongs(data)
      setIsLoading(false)
    }

    fetchSongs(playlist)
  }, [playlist]);

  const playlistItems = songs.map((song, index) => {
    return <PlaylistItem key={index} song={song} />
  })

  return (
    <ul className="divide-y divide-solid divide-neutral-100">
      {isLoading ? "Loading songs..." : playlistItems}
    </ul>
  )
}
