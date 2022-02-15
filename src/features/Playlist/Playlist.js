import { useParams } from "react-router-dom";
import { useDocFetcher, useAlbumSongs } from "../AlbumList/useAlbums";
import PlaylistItem from "./PlaylistItem";
import ErrorMessage from "../Layout/ErrorMessage";
import GoBack from "../Layout/GoBack";
import LoadingMsg from "../Layout/LoadingMsg";

export default function Playlist() {
  const params = useParams()
  const { playlistId } = params

  const { data: playlist, isLoading: isLoadingAlbum, isError: isErrorAlbum } = useDocFetcher('albums', playlistId)
  const { songs, isLoading: isLoadingSongs, isError: isErrorSongs } = useAlbumSongs(playlistId)

  const isError = isErrorAlbum || isErrorSongs
  const isLoading = isLoadingAlbum || isLoadingSongs

  if (isLoading) return <LoadingMsg message="Loading playlist!" />
  if (isError) return <ErrorMessage message={isError.message} />

  const firstSong = songs[0]

  const playlistItems = songs.map((song, index) => {
    return <PlaylistItem key={index} playlistId={playlistId} songsList={songs} song={song} />
  })

  return (
    <div className="p-4 w-full h-full flex flex-col items-center">
      <>
        <GoBack />
        <div className="px-10 pt-10 mb-5">
          <img alt={`${playlist.title} album cover`} src={playlist.coverUrl} className="rounded-xl" />
        </div>
        <h1 className="font-bold text-lg">{playlist.title}</h1>
        <p className="text-sm mb-3">{firstSong.artist}</p>
        <ul className="divide-y divide-solid max-w-lg w-full divide-neutral-300 pb-28">
          {playlistItems}
        </ul>
      </>
    </div>
  )
}
