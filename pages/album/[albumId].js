import { useRouter } from 'next/router';
import { useAlbum, useAlbumSongs } from "../../components/CoverGrid/useAlbums";
import { Layout } from '../../components/Layout';
import LoadingMsg from '../../components/Layout/LoadingMsg';
import { Tracklist } from '../../components/Tracklist';

export default function Albumlist() {
  const router = useRouter()
  const { albumId } = router.query
  const album = useAlbum(albumId)
  const tracks = useAlbumSongs(albumId)

  if (!albumId) {
    return <LoadingMsg message={"Loading album..."} />
  }
  
  return (
    <Layout>
      <Tracklist
        listId={albumId}
        listDoc={album}
        tracks={tracks}
      />
    </Layout>
  )
}
