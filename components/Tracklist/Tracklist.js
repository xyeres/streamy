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
  const coverArt = listDoc.data.coverUrl
  const listDate = listDoc.data.year

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
    <div className="p-4 w-full h-full flex flex-col items-center max-w-screen-2xl">
      <div className="flex flex-col items-center lg:items-end lg:self-start lg:flex-row lg:">
        <div className="p-10 pb-2 relative active:scale-95 transition-all lg:p-0 lg:pt-24 lg:max-w-[260px] lg:mr-6">
          <Image
            priority
            alt={`${listDoc.data.title} album cover`}
            height={380}
            width={380}
            src={coverArt}
            className="rounded-xl aspect-square object-cover"
          />
          <div className="absolute right-5 top-16 lg:top-28 lg:-right-5">{listDoc.data.featured ? <FeaturedPill message="Featured" /> : null}</div>
        </div>
        <div className="flex flex-col items-center lg:items-start">
          <h1 className="font-bold text-lg">{listDoc.data.title}</h1>
          <h2 className="text-xs mb-5">{isPlaylist ? `Playlist featuring ${Array.from(artists).join(', ')}` : `${listDoc.data.artist} - ${listDate && listDate}`}
          </h2>
        </div>
      </div>
      <div className="max-w-lg lg:max-w-none mt-5 lg:mt-10 w-full pb-24">
        <ul className="divide-y w-full pb-2">
          {tracklistItems}
        </ul>

      </div>
    </div>

  )
}
