import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAlbum } from "../AlbumList/getAlbums";
import PlaylistItem from "./PlaylistItem";
import querySongs from "./querySongs";
import ErrorMessage from "../Home/ErrorMessage";
import GoBack from "../Home/GoBack";
import LoadingMsg from "../Home/LoadingMsg";

export default function Playlist() {
  const params = useParams()
  const { playlistId } = params

  const [songs, setSongs] = useState([]);
  const [firstSong, setFirstSong] = useState({});
  const [playlist, setPlaylist] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({ status: false, message: null });

  useEffect(() => {
    const fetchData = async (playlistId) => {
      try {
        setError(prevState => ({ ...prevState, status: false }))
        setIsLoading(true)
        const songs = await querySongs(playlistId)
        const playlist = await getAlbum(playlistId)
        setSongs(songs)
        setFirstSong(songs[0])
        setPlaylist(playlist)
      } catch (err) {
        setError({ status: true, message: err.message })
      } finally {
        setIsLoading(false)
      }
    }

    fetchData(playlistId)
  }, [playlistId]);

  const playlistItems = songs.map((song, index) => {
    return <PlaylistItem key={index} playlistId={playlistId} songsList={songs} song={song} />
  })

  if (isLoading) return <LoadingMsg message="Loading playlist!" />

  return (
    <div className="p-4 w-full h-full flex flex-col items-center">
      {error.status ? <ErrorMessage message={error.message} /> : (
        <>
          <GoBack />
          <img alt={`${playlist.title} album cover`} src={playlist.coverUrl} className="rounded-lg mb-5" />
          <h1 className="font-bold text-lg">{playlist.title}</h1>
          <p className="text-sm mb-3">{firstSong.artist}</p>
          <ul className="divide-y divide-solid max-w-lg w-full divide-neutral-300 pb-24 sm:pb-0">
            {playlistItems}
          </ul>
        </>
      )}
    </div>
  )
}
