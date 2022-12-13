import Layout from '../../components/Layout/Layout';
import TracklistStatic from '../../components/Tracklist/TracklistStatic';
import getAlbum from '../../lib/getAlbum';
import { getAlbumSongs } from '../../lib/getAlbumSongs';
import getAllAlbums from '../../lib/getAllAlbums';
import { useRouter } from 'next/router';
import LoadingMsg from '../../components/Layout/LoadingMsg';

export async function getStaticPaths() {

  const albums = await getAllAlbums()

  const paths = albums.map(album => {
    return ({
      params: {
        albumId: album.slug
      }
    })
  })
  return {
    paths,
    fallback: true
  }
}

export async function getStaticProps({ params }) {
  const albumId = params.albumId
  const album = await getAlbum(albumId)
  const tracks = await getAlbumSongs(albumId)

  return {
    props: {
      albumId,
      album,
      tracks
    }
  }
}


export default function Albumlist({ album, albumId, tracks }) {
  const router = useRouter()

  // If the page is not yet generated, this will be displayed
  // initially until getStaticProps() finishes running
  if (router.isFallback) {
    return <LoadingMsg message="Getting that for you..." />
  }

  return (
    <Layout>
      <TracklistStatic
        listId={albumId}
        listDoc={album}
        tracks={tracks}
      />
    </Layout>
  )
}
