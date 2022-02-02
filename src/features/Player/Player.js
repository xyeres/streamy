import { useEffect, useState } from 'react';
import AlbumList from '../AlbumList/AlbumList';
import Controls from './Controls';
import Playlist from '../Playlist/Playlist';
import queryAlbums from '../AlbumList/queryAlbums';

export default function Player() {
  const [albumList, setAlbumList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [playlist, setPlaylist] = useState([1, 2, 3, 4, 5]);

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
    <div className="">
      <h1 className='font-bold mt-6 mb-2 mx-4 text-lg'>Recent Albums</h1>
      
      <main className='flex flex-col sm:flex-row gap-2 sm:gap-7 justify-between'>
        <div className='relative ml-4 mr-0'>
          <AlbumList setPlaylist={setPlaylist} isLoading={isLoading} albumList={albumList} />
        </div>
        <div className='px-4 sm:pl-0 sm:mr-0 sm:ml-0 w-full'><Playlist playlist={playlist} /></div>
      </main>
      <Controls />
    </div>
  );
}
