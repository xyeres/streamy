import CoverGridItem from "./CoverGridItem";

function CoverGrid({ items, path }) {
  const listItems = items.map((item, index) => {
    return <CoverGridItem key={index} path={path} item={item} />
  })

  return (
    <div className="flex overflow-x-auto flex-nowrap flex-row sm:flex-col py-4 pr-4 lg:overflow-x-visible">
      <ul className="flex flex-row  gap-4 lg:gap-8 first:ml-4 flex-shrink-0 lg:flex-wrap">
        {listItems}
      </ul>
    </div>
  );
}


export default CoverGrid