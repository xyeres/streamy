
import PlaylistResultListItem from "./PlaylistResultListItem"

export default function PlaylistResultList() {
  return (
    <div className="my-9">
      <h2 className="font-bold text-xs mb-4">Playlists</h2>
      <ul>
        <PlaylistResultListItem />
      </ul>
    </div>
  )
}
