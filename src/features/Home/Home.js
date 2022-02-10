import { useEffect, useState } from 'react';
import AlbumList from '../AlbumList/AlbumList';
import getAlbums from '../AlbumList/getAlbums';
import FeaturedCard from '../AlbumList/FeaturedCard';
import CategoryHeader from './CategoryHeader';
import LoadingSkeleton from './LoadingSkeleton';

export default function Home() {
  const [albumList, setAlbumList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchAlbums = async () => {
      setIsLoading(true)
      const albums = await getAlbums()
      setAlbumList(albums)
      setIsLoading(false)
    }
    fetchAlbums()
  }, []);

  return (
    <div className='relative h-[var(--vh-minus-96)] overflow-auto'>
      {isLoading ? <LoadingSkeleton message="Loading albums" />
        : (<>
          <CategoryHeader title="Recently Added" />
          <AlbumList isLoading={isLoading} albumList={albumList} />
          <CategoryHeader title="Featured Album" />
          <FeaturedCard />
          <CategoryHeader title="From the Studio" />
          <AlbumList isLoading={isLoading} albumList={albumList} />
          <CategoryHeader title="Raw Live Sessions" />
          <AlbumList isLoading={isLoading} albumList={albumList} />
        </>)
      }
    </div>
  );
}
