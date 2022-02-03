import { useEffect, useState } from 'react';
import AlbumList from '../AlbumList/AlbumList';
import getAlbums from '../AlbumList/getAlbums';
import FeaturedCard from '../AlbumList/FeaturedCard';
import CategoryHeader from './CategoryHeader';

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
    <div className='relative sm:mx-4 mr-0'>
      <CategoryHeader title="Recently Added" />
      <AlbumList isLoading={isLoading} albumList={albumList} />
      <CategoryHeader title="Featured Album" />
      <FeaturedCard />
      <CategoryHeader title="From the Studio" />
      <AlbumList isLoading={isLoading} albumList={albumList} />
      <CategoryHeader title="Raw Live Sessions" />
      <AlbumList isLoading={isLoading} albumList={albumList} />
    </div>
  );
}
