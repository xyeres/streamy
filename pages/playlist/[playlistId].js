import { useRouter } from "next/router";
import { useCollectionGroup, useDocument } from "../../components/CoverGrid/useAlbums";
import Layout from "../../components/Layout/Layout";
import Tracklist from "../../components/Tracklist/Tracklist";

export default function Playlist() {
  const router = useRouter()
  const { playlistId } = router.query

  const playlist = useDocument('playlists', playlistId)
  const tracks = useCollectionGroup(`playlists/${playlistId}`, 'songs')

  return (
    <Layout>
      <Tracklist
        listId={playlistId}
        listDoc={playlist}
        tracks={tracks}
        thumbnail
      />
    </Layout>
  )
}
