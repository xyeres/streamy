import SongResultListItem from "./SongResultListItem";

export default function SongResultList({ data }) {

  const songResultItems = data.map((song, index) => {
    return <SongResultListItem key={index} song={song} />
  })

  return (
    <div className="mb-9">
      <ul>
        {songResultItems}
      </ul>
    </div>
  )
}
