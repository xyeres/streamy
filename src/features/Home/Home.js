import { useEffect, useState } from 'react';
import AlbumList from '../AlbumList/AlbumList';
import getAlbums from '../AlbumList/getAlbums';
import FeaturedCard from '../AlbumList/FeaturedCard';
import CategoryHeader from './CategoryHeader';
import LoadingMsg from './LoadingMsg';

export default function Home() {
  const [albumList, setAlbumList] = useState(null);

  useEffect(() => {
    const fetchAlbums = async () => {
      const albums = await getAlbums()
      setAlbumList(albums)
    }
    fetchAlbums()
  }, []);

  if (!albumList) return <LoadingMsg message="Loading albums" />

  return (
    <div className='relative h-[var(--vh-minus-96)] overflow-auto'>
      <>
        <CategoryHeader title="Recently Added" />
        <AlbumList albumList={albumList} />
        <CategoryHeader title="Featured Album" />
        <FeaturedCard />
        <CategoryHeader title="From the Studio" />
        <AlbumList albumList={albumList} />
        <CategoryHeader title="Raw Live Sessions" />
        <AlbumList albumList={albumList} />
      </>
    </div>
  );
}
