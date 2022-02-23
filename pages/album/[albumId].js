import Image from 'next/image';
import { useRouter } from 'next/router';
import AlbumlistItem from '../../components/Album/AlbumlistItem';
import useCollection, { useDocument } from "../../components/CoverGrid/useAlbums";
import ErrorMessage from "../../components/Layout/ErrorMessage";
import Layout from '../../components/Layout/Layout';
import LoadingMsg from "../../components/Layout/LoadingMsg";

export default function Albumlist() {
  const router = useRouter()
  const { albumId } = router.query

  const album = useDocument('albums', albumId)
  const songs = useCollection(`albums/${albumId}/songs`, "track")

  const isError = album.isError || songs.isError
  const isLoading = album.isLoading || songs.isLoading

  if (isLoading) return <LoadingMsg message="Loading playlist!" />
  if (isError) return <ErrorMessage message={isError.message} />

  const albumlistItems = songs.data.map((song, index) => {
    return (<AlbumlistItem
      key={index}
      index={index}
      song={song}
      listId={albumId}
      listSongs={songs.data}
    />)
  })

  return (
    <Layout>
      <div className="p-4 w-full h-full flex flex-col items-center z-0">
        <div className="p-10 pb-2 relative">
          <Image
            priority
            alt={`${album.data.title} album cover`}
            height={380}
            width={380}
            src={album.data.coverUrl}
            className="rounded-xl"
          />
        </div>
        <h1 className="font-bold text-lg">{album.data.title}</h1>
        <p className="text-sm mb-3">{album.data.artist}</p>
        <ul className="divide max-w-lg w-full pb-28">
          {albumlistItems}
        </ul>
      </div>
    </Layout>
  )
}
