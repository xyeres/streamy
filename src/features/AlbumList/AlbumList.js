import AlbumListItem from "./AlbumListItem";

export default function AlbumList({ isLoading, albumList, setPlaylist }) {
  const albumListItems = albumList.map((album, index) => {
    return <AlbumListItem setPlaylist={setPlaylist} key={index} album={album} />
  })
  // w-full flex flex-col flex-wrap sm:flex-row sm:w-full sm:columns-2 mr-4 sm:gap-7
  return (
    // Flex Outer
    <div
      className="flex overflow-x-auto flex-nowrap flex-row py-4 sm:flex-row sm:gap-7 sm:py-0 sm:flex-wrap sm:block sm:columns-2">
      {/* Flex inner */}
      <div className="flex flex-row flex-shrink-0 sm:block sm:flex-shrink">
        {isLoading ? 'loading...' : albumListItems}
      </div>
    </div>
  );
}
