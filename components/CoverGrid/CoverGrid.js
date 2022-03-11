import CoverGridItem from "./CoverGridItem";
import useCollection, { useAlbums } from "./useAlbums";
import ErrMsgHome from "../Layout/ErrMsgHome";
import LoadingGrid from "../Layout/LoadingGrid";

function CoverGrid({ coll, path, order, limit, swrkey, keywords }) {

  let useDataFetcher;
  if (path === '/album') useDataFetcher = () => useAlbums(keywords, order, limit, swrkey)
  if (path === '/playlist') useDataFetcher = () => useCollection(coll, order)

  const { data, isLoading, isError } = useDataFetcher()

  if (isError) return <ErrMsgHome message={isError.message} />
  if (isLoading) return <LoadingGrid />

  const albumItems = data.map((item, index) => {
    return <CoverGridItem key={index} path={path} item={item} />
  })

  return (
    <div className="flex overflow-x-auto flex-nowrap flex-row sm:flex-col py-4 pr-4">
      <ul className="flex flex-row  gap-4 first:ml-4 flex-shrink-0">
        {albumItems}
      </ul>
    </div>
  );
}


export default CoverGrid