import AlbumResultListItem from "./AlbumResultListItem";

export default function AlbumResultList() {
  return (
    <div>
      <h2 className="font-bold text-xs mb-4">Albums</h2>
      <ul>
        <AlbumResultListItem />
      </ul>
    </div>
  )
}
