import { useRouter } from 'next/router';
import useCollection, { useDocument } from "../../components/CoverGrid/useAlbums";
import Layout from '../../components/Layout/Layout';
import Tracklist from '../../components/Tracklist/Tracklist';

export default function Albumlist() {
  const router = useRouter()
  const { albumId } = router.query

  const album = useDocument('albums', albumId)
  const tracks = useCollection(`albums/${albumId}/songs`, "track")

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
