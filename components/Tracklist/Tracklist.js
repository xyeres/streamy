import Image from "next/image";
import ErrorMessage from "../../components/Layout/ErrorMessage";
import LoadingMsg from "../../components/Layout/LoadingMsg";
import TracklistItem from "../../components/Tracklist/TracklistItem";
import FeaturedPill from "../Home/FeaturedPill";
import TrackListView from "./TrackListView";

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

  return <TrackListView
    listDoc={listDoc}
    isPlaylist={isPlaylist}
    artists={artists}
    listDate={listDate}
    tracklistItems={tracklistItems}
    coverArt={coverArt}
  />

}
