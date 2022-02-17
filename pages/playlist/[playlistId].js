import Image from "next/image";
import { useRouter } from "next/router";
import { useCollectionGroup, useDocument } from "../../components/CoverGrid/useAlbums";
import ErrorMessage from "../../components/Layout/ErrorMessage";
import LoadingMsg from "../../components/Layout/LoadingMsg";
import Layout from "../../components/Layout/Layout";
import PlaylistItem from "../../components/Playlist/PlaylistItem";

export default function Playlist() {
  const router = useRouter()
  const { playlistId } = router.query

  const playlist = useDocument('playlists', playlistId)
  const songs = useCollectionGroup(`playlists/${playlistId}`, 'songs')

  const isError = playlist.isError || songs.isError
  const isLoading = playlist.isLoading || songs.isLoading

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
    <Layout>
      <div className="p-4 w-full h-full flex flex-col items-center">
          <div className="px-10 pt-10 mb-5">
            <Image alt={`${playlist.data.title} album cover`} height={400} width={400} src="/images/lfas-cover.png" className="rounded-xl" />
          </div>
          <h1 className="font-bold text-lg">{playlist.data.title}</h1>
          <p className="text-sm mb-3">Featuring artists, and more artists</p>
          <ul className="divide max-w-lg w-full pb-28">
            {playlistItems}
          </ul>
      </div>
    </Layout>
  )
}
