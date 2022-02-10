import AlbumListItem from "./AlbumListItem";
import PropTypes from 'prop-types'
import LoadingSkeleton from "../Home/LoadingSkeleton";
function AlbumList({ isLoading, albumList }) {
  const albumListItems = albumList.map((album, index) => {
    return <AlbumListItem key={index} album={album} />
  })
  return (
    <div className="flex overflow-x-auto sm:mx-4 flex-nowrap flex-row py-4 sm:flex-row sm:gap-4 sm:flex-wrap sm:block sm:columns-2">
      <ul className="flex flex-row flex-shrink-0 sm:block sm:flex-shrink">
        {isLoading ? 'Loading' : albumListItems}
      </ul>
    </div>
  );
}


AlbumList.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  albumList: PropTypes.array,
}

export default AlbumList