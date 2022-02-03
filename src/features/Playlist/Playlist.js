import PlaylistItem from "./PlaylistItem";
import { useEffect, useState } from "react";
import querySongs from "./querySongs";
import { useParams } from "react-router-dom";

export default function Playlist() {
  const params = useParams()
  const { playlistId } = params

  console.log(playlistId);

  const [songs, setSongs] = useState([]);
  const [firstSong, setFirstSong] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchSongs = async (albumId) => {
      setIsLoading(true)
      const data = await querySongs(albumId)
      setSongs(data)
      setFirstSong(data[0])
      setIsLoading(false)
    }

    fetchSongs(playlistId)
  }, [playlistId]);

  const playlistItems = songs.map((song, index) => {
    return <PlaylistItem key={index} song={song} />
  })

  return (
      <div className="p-4 w-full flex flex-col items-center">
        <img src={firstSong.coverUrl} className="rounded-lg mb-5" />
      <ul className="divide-y divide-solid max-w-lg w-full divide-neutral-100 pb-24 sm:pb-0">
          {isLoading ? "Loading songs..." : playlistItems}
        </ul>
      </div>
  )
}
