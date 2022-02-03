import AlbumListItem from "./AlbumListItem";

export default function AlbumList({ isLoading, albumList, setPlaylist }) {
  const albumListItems = albumList.map((album, index) => {
    return <AlbumListItem setPlaylist={setPlaylist} key={index} album={album} />
  })
  return (
    <div
      className="flex overflow-x-auto flex-nowrap flex-row py-4 sm:flex-row sm:gap-4 sm:pb-16 sm:flex-wrap sm:block sm:columns-2">
      <div className="flex flex-row flex-shrink-0 sm:block sm:flex-shrink">
        {isLoading ? 'loading...' : albumListItems}
      </div>
    </div>
  );
}
