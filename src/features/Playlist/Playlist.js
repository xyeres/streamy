import PlaylistItem from "./PlaylistItem";
import { useEffect, useState } from "react";
import querySongs from "./querySongs";
import { useParams } from "react-router-dom";
import { getAlbum } from "../AlbumList/getAlbums";
import ErrorMessage from "../Home/ErrorMessage";
import GoBack from "../Home/GoBack";

export default function Playlist() {
  const params = useParams()
  const { playlistId } = params

  const [songs, setSongs] = useState([]);
  const [firstSong, setFirstSong] = useState({});
  const [album, setAlbum] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({ status: false, message: null });

  useEffect(() => {
    const fetchData = async (albumId) => {
      try {
        setError(prevState => ({...prevState, status:false}))
        setIsLoading(true)
        const songs = await querySongs(albumId)
        const album = await getAlbum(albumId)
        setSongs(songs)
        setFirstSong(songs[0])
        setAlbum(album)
      } catch (err) {
        setError({ status: true, message: err.message })
      } finally {
        setIsLoading(false)
      }
    }

    fetchData(playlistId)
  }, [playlistId]);

  const playlistItems = songs.map((song, index) => {
    return <PlaylistItem key={index} song={song} />
  })

  return (
    <div className="p-4 w-full flex flex-col items-center">
      {error.status ? <ErrorMessage message={error.message} /> : (
        <>
          <GoBack />
          <img alt={`${album.title} album cover`} src={album.coverUrl} className="rounded-lg mb-5" />
          <h1 className="font-bold text-lg">{album.title}</h1>
          <p className="text-sm mb-3">{firstSong.artist}</p>
          <ul className="divide-y divide-solid max-w-lg w-full divide-neutral-300 pb-24 sm:pb-0">
            {isLoading ? "Loading songs..." : playlistItems}
          </ul>
        </>
      )}
    </div>
  )
}
