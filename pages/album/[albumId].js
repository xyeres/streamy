import { useRouter } from 'next/router'
import Image from 'next/image';
import useCollection, { useDocument } from "../../components/CoverGrid/useAlbums";
import ErrorMessage from "../../components/Layout/ErrorMessage";
import LoadingMsg from "../../components/Layout/LoadingMsg";
import Layout from '../../components/Layout/Layout';
import AlbumlistItem from '../../components/Album/AlbumlistItem';

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
    return <AlbumlistItem key={index} playlistId={albumId} songsList={songs.data} song={song} />
  })

  return (
    <Layout>
      <div className="p-4 w-full h-full flex flex-col items-center z-0">
        <div className="px-20 pt-10 mb-5 min-w-[320px] min-h-[320px] sm:min-w-[440px] sm:min-h-[440px] aspect-square relative">
          <Image
          layout='fill'
          objectFit='cover'
          objectPosition="top left"
          alt={`${album.data.title} album cover`} 
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
