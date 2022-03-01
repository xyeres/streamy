import Image from "next/image";
import ErrorMessage from "../../components/Layout/ErrorMessage";
import LoadingMsg from "../../components/Layout/LoadingMsg";
import TracklistItem from "../../components/Tracklist/TracklistItem";
import FeaturedPill from "../Home/FeaturedPill";

export default function Tracklist({ listId, listDoc, tracks, thumbnail }) {
  const isError = listDoc.isError || tracks.isError
  const isLoading = listDoc.isLoading || tracks.isLoading

  if (isLoading) return <LoadingMsg message="Loading playlist!" />
  if (isError) return <ErrorMessage message={isError.message} />

  const isPlaylist = !!listDoc.data.listType
  const artists = new Set()
  const coverArt = tracks.data[0].coverUrl

  const tracklistItems = tracks.data.map((song, index) => {
    artists.add(song.artist)
    
    delete song.lastUpdated

    return <TracklistItem
      key={index}
      index={index}
      song={song}
      listId={listId}
      listSongs={tracks.data}
      thumbnail={thumbnail}
    />
  })

  return (
    <div className="p-4 w-full h-full flex flex-col items-center">
      <div className="p-10 pb-2 relative">
        <Image
          priority
          alt={`${listDoc.data.title} album cover`}
          height={380}
          width={380}
          src={coverArt}
          className="rounded-xl"
        />
        <div className="absolute right-5 top-16">{listDoc.data.featured ? <FeaturedPill message="Featured" /> : null}</div>
      </div>
      <h1 className="font-bold text-lg">{listDoc.data.title}</h1>
      <p className="text-xs mb-5">{isPlaylist ? `Playlist featuring ${Array.from(artists).join(', ')}` : listDoc.data.artist}</p>
      <ul className="divide max-w-lg w-full pb-28">
        {tracklistItems}
      </ul>
    </div>
  )
}
