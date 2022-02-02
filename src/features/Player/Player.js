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
    <div className="mx-5">
      <h1 className='font-bold my-5 text-sm'>Latest Albums</h1>
      <main className='flex flex-col sm:flex-row justify-between'>
        <AlbumList setPlaylist={setPlaylist} isLoading={isLoading} albumList={albumList} />
        <Playlist playlist={playlist} />
      </main>
      <Controls />
    </div>
  );
}
