import Image from "next/image";
import TracklistItem from "./TracklistItem";
import FeaturedPill from "../Home/FeaturedPill";
import TrackListView from "./TrackListView";

export default function TracklistStatic({ listId, listDoc, tracks, thumbnail }) {
  const isPlaylist = !!listDoc.listType
  const artists = new Set()
  const coverArt = listDoc.coverUrl
  const listDate = listDoc.year
  const listDocData = {
    data: listDoc
  }

  const tracklistItems = tracks.map((track, index) => {
    artists.add(track.artist)

    delete track.lastUpdated

    return <TracklistItem
      key={index}
      index={index}
      song={track}
      listId={listId}
      listSongs={tracks}
      thumbnail={thumbnail}
    />
  })

  return <TrackListView
    listDoc={listDocData}
    isPlaylist={isPlaylist}
    artists={artists}
    listDate={listDate}
    tracklistItems={tracklistItems}
    coverArt={coverArt}
  />
}
