import Layout from '../../components/Layout/Layout';
import TracklistStatic from '../../components/Tracklist/TracklistStatic';
import getAlbum from '../../lib/getAlbum';
import { getAlbumSongs } from '../../lib/getAlbumSongs';
import getAllAlbums from '../../lib/getAllAlbums';


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
    fallback: false
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
