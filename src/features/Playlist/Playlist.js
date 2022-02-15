import CoverImage from '../../img/lfas-cover.png'
import { useParams } from "react-router-dom";
import { useCollectionGroup, useDocument } from "../CoverGrid/useAlbums";
import PlaylistItem from "./PlaylistItem";
import ErrorMessage from "../Layout/ErrorMessage";
import GoBack from "../Layout/GoBack";
import LoadingMsg from "../Layout/LoadingMsg";

export default function Playlist() {
  const params = useParams()
  const { playlistId } = params

  const playlist = useDocument('playlists', playlistId)
  const songs = useCollectionGroup(`playlists/${playlistId}`, 'songs')

  const isError = playlist.isError || songs.isError
  const isLoading = playlist.isLoading || songs.isLoading

  console.log('songs data', songs)

  if (isLoading) return <LoadingMsg message="Loading playlist!" />
  if (isError) return <ErrorMessage message={isError.message} />

  const playlistItems = songs.data.map((song, index) => {
    return <PlaylistItem
      key={index}
      playlistId={playlistId}
      songsList={songs.data}
      song={song}
    />
  })

  return (
    <div className="p-4 w-full h-full flex flex-col items-center">
      <>
        <GoBack />
        <div className="px-10 pt-10 mb-5">
          <img alt={`${playlist.data.title} album cover`} src={CoverImage} className="rounded-xl" />
        </div>
        <h1 className="font-bold text-lg">{playlist.data.title}</h1>
        <p className="text-sm mb-3">Featuring artists, and more artists</p>
        <ul className="divide-y divide-solid max-w-lg w-full divide-neutral-300 pb-28">
          {playlistItems}
        </ul>
      </>
    </div>
  )
}
