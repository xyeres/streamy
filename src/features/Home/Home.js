import { useEffect, useState } from 'react';
import AlbumList from '../AlbumList/AlbumList';
import Controls from '../Player/Controls';
import queryAlbums from '../AlbumList/queryAlbums';
import FeaturedCard from '../AlbumList/FeaturedCard';

export default function Home() {
  const [albumList, setAlbumList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchAlbums = async () => {
      setIsLoading(true)
      const albums = await queryAlbums()
      setAlbumList(albums)
      setIsLoading(false)
    }
    fetchAlbums()
  }, []);

  return (
    <div className='relative sm:ml-4 mr-0'>
      <h1 className='font-bold pt-6 mx-4 text-lg'>Recently Added</h1>
      <AlbumList isLoading={isLoading} albumList={albumList} />
      <h2 className='font-bold pt-4 mx-4 text-lg'>Featured</h2>
      <FeaturedCard />
      <h2 className='font-bold pt-4 mx-4 text-lg'>Studio Albums</h2>
      <AlbumList isLoading={isLoading} albumList={albumList} />
      <h2 className='font-bold pt-4 mx-4 text-lg'>Live and Unedited</h2>
      <AlbumList isLoading={isLoading} albumList={albumList} />
    </div>
  );
}
