import AlbumList from '../AlbumList/AlbumList';
import FeaturedCard from '../AlbumList/FeaturedCard';
import CategoryHeader from './CategoryHeader';
import LoadingMsg from './LoadingMsg';
import useAlbums from '../AlbumList/useAlbums';
import ErrorMessage from './ErrorMessage';
import { useSelector } from 'react-redux';
import { selectUrl } from '../Player/playerSlice';

export default function Home() {
  const { albums, isLoading, isError } = useAlbums()

  const isPlayerBarVisible = useSelector(selectUrl)

  if (isLoading) return <LoadingMsg message="Loading albums" />
  if (isError) return <ErrorMessage message={isError.message} />

  return (
    <div className={`relative ${isPlayerBarVisible ? 'h-[var(--vh-minus-96)]' : 'h-full'} w-full overflow-auto`}>
      <>
        <CategoryHeader title="Recently Added" />
        <AlbumList albumList={albums} />
        <CategoryHeader title="Featured Album" />
        <FeaturedCard />
        <CategoryHeader title="From the Studio" />
        <AlbumList albumList={albums} />
        <CategoryHeader title="Raw Live Sessions" />
        <AlbumList albumList={albums} />
      </>
    </div>
  );
}
