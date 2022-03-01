import CoverGridItem from "./CoverGridItem";
import PropTypes from 'prop-types'
import useCollection, { useAlbums } from "./useAlbums";
import ErrMsgHome from "../Layout/ErrMsgHome";
import LoadingGrid from "../Layout/LoadingGrid";

function CoverGrid({ coll, path, order, limit, swrkey, keywords }) {

  let useDataFetcher;
  if (path === '/album') useDataFetcher = () => useAlbums(keywords, order, limit, swrkey)
  if (path === '/playlist') useDataFetcher = () => useCollection(coll)

  const { data, isLoading, isError } = useDataFetcher()
  
  if (isError) return <ErrMsgHome message={isError.message} />
  if (isLoading) return <LoadingGrid />
  
;;  const albumItems = data.map((item, index) => {
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


export default CoverGrid