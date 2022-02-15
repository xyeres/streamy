import CoverGrid from '../CoverGrid/CoverGrid';
import FeaturedCard from './FeaturedCard';
import CategoryHeader from './CategoryHeader';
import LoadingMsg from '../Layout/LoadingMsg';
import useCollection from '../CoverGrid/useAlbums';
import ErrorMessage from '../Layout/ErrorMessage';
import { useSelector } from 'react-redux';
import { selectUrl } from '../Player/playerSlice';

export default function Home() {
  const albums = useCollection("albums", "lastUpdated")
  const playlists = useCollection("playlists", "title")

  const isLoading = albums.isLoading || playlists.isLoading
  const isError = albums.isError || playlists.isError
  
  const isPlayerBarVisible = useSelector(selectUrl)

  if (isLoading) return <LoadingMsg message="Loading music" />
  if (isError) return <ErrorMessage message={isError.message} />

  return (
    <div className={`relative ${isPlayerBarVisible ? 'h-[var(--vh-minus-96)]' : 'h-full'} w-full overflow-auto`}>
      <>
        <CategoryHeader title="Recently Added" />
        <CoverGrid path="/album" items={albums.data} />
        <CategoryHeader title="Featured Album" />
        <FeaturedCard />
        <CategoryHeader title="New playlists" />
        <CoverGrid path="/playlist" items={playlists.data} />
        <CategoryHeader title="Raw Live Sessions" />
        <CoverGrid path="/album" items={albums.data} />
      </>
    </div>
  );
}
