import CoverGrid from '../components/CoverGrid/CoverGrid';
import FeaturedCard from '../components/Home/FeaturedCard';
import CategoryHeader from '../components/Home/CategoryHeader';
import LoadingMsg from '../components/Layout/LoadingMsg';
import useCollection from '../components/CoverGrid/useAlbums';
import ErrorMessage from '../components/Layout/ErrorMessage';
import { useSelector } from 'react-redux';
import { selectUrl } from '../components/Player/playerSlice';
import Layout from '../components/Layout/Layout';

export default function Home() {
  const albums = useCollection("albums", "lastUpdated")
  const playlists = useCollection("playlists", "title")

  const isLoading = albums.isLoading || playlists.isLoading
  const isError = albums.isError || playlists.isError

  const isPlayerBarVisible = useSelector(selectUrl)

  if (isLoading) return <LoadingMsg message="Loading music" />
  if (isError) return <ErrorMessage message={isError.message} />

  return (
    <Layout home>
      <div className={`relative ${isPlayerBarVisible ? 'h-[var(--vh-minus-96)]' : 'h-full'} w-full overflow-auto`}>
        <CategoryHeader title="Recently Added" />
        <CoverGrid path="/album" items={albums.data} />
        <CategoryHeader title="Featured Album" />
        <FeaturedCard />
        <CategoryHeader title="New playlists" />
        <CoverGrid path="/playlist" items={playlists.data} />
        <CategoryHeader title="Raw Live Sessions" />
        <CoverGrid path="/album" items={albums.data} />
      </div>
    </Layout>
  );
}
