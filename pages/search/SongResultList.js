import SongResultListItem from "./SongResultListItem";

export default function SongResultList() {
  return (
    <div className="my-9">
      <h2 className="font-bold text-xs mb-4">Songs</h2>
      <ul>
        <SongResultListItem />
      </ul>
    </div>
  )
}
