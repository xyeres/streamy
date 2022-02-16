import CoverGridItem from "./CoverGridItem";
import PropTypes from 'prop-types'

function CoverGrid({ items, path }) {
  const albumItems = items.map((item, index) => {
    return <CoverGridItem key={index} path={path} item={item} />
  })
  return (
    <div className="flex overflow-x-auto sm:mx-4 flex-nowrap flex-row py-4 sm:flex-row sm:gap-4 sm:flex-wrap sm:block sm:columns-2">
      <ul className="flex flex-row flex-shrink-0 sm:block sm:flex-shrink">
        {albumItems}
      </ul>
    </div>
  );
}


CoverGrid.propTypes = {
  items: PropTypes.array.isRequired
}

export default CoverGrid