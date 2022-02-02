import AlbumListItem from "./AlbumListItem";

export default function AlbumList({ isLoading, albumList, setPlaylist }) {
  const albumListItems = albumList.map((album, index) => {
    return <AlbumListItem setPlaylist={setPlaylist} key={index} album={album} />
  })
  return (
    <div className="w-full flex flex-col flex-wrap sm:flex-row">
      {isLoading ? 'loading...' : albumListItems}
    </div>
  );
}
