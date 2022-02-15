import { useParams } from "react-router-dom";
import useCollection, { useDocument } from "../CoverGrid/useAlbums";
import AlbumlistItem from "./AlbumlistItem";
import ErrorMessage from "../Layout/ErrorMessage";
import GoBack from "../Layout/GoBack";
import LoadingMsg from "../Layout/LoadingMsg";

export default function Albumlist() {
  const params = useParams()
  const { albumId } = params

  const album = useDocument('albums', albumId)
  const songs = useCollection(`albums/${albumId}/songs`, "track")

  const isError = album.isError || songs.isError
  const isLoading = album.isLoading || songs.isLoading

  if (isLoading) return <LoadingMsg message="Loading playlist!" />
  if (isError) return <ErrorMessage message={isError.message} />

  const albumlistItems = songs.data.map((song, index) => {
    return <AlbumlistItem key={index} playlistId={albumId} songsList={songs.data} song={song} />
  })

  return (
    <div className="p-4 w-full h-full flex flex-col items-center">
      <>
        <GoBack />
        <div className="px-10 pt-10 mb-5">
          <img alt={`${album.data.title} album cover`} src={album.data.coverUrl} className="rounded-xl" />
        </div>
        <h1 className="font-bold text-lg">{album.data.title}</h1>
        <p className="text-sm mb-3">{album.data.artist}</p>
        <ul className="divide-y divide-solid max-w-lg w-full divide-neutral-300 pb-28">
          {albumlistItems}
        </ul>
      </>
    </div>
  )
}
