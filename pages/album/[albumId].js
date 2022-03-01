import { useRouter } from 'next/router';
import useCollection, { useAlbum, useAlbumSongs, useDocument } from "../../components/CoverGrid/useAlbums";
import Layout from '../../components/Layout/Layout';
import Tracklist from '../../components/Tracklist/Tracklist';

export default function Albumlist() {
  const router = useRouter()
  const { albumId } = router.query

  const album = useAlbum(albumId)
  const tracks = useAlbumSongs(albumId)
  
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
