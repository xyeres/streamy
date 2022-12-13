import Image from 'next/image'
import React from 'react'
import FeaturedPill from '../Home/FeaturedPill'

function TrackListView({ listDoc, isPlaylist, artists, listDate, tracklistItems, coverArt }) {
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
          <div className="absolute right-5 top-16 lg:top-28 lg:-right-5">{listDoc.data.tags?.includes("featured") ? <FeaturedPill message="Featured" /> : null}</div>
        </div>
        <div className="flex flex-col items-center lg:items-start">
          <h1 className="dark:text-neutral-50 font-bold text-lg">{listDoc.data.title}</h1>
          <h2 className="dark:text-neutral-300 text-xs mb-5">{isPlaylist ? `Playlist featuring ${Array.from(artists).join(', ')}` : `${listDoc.data.artist} - ${listDate && listDate}`}
          </h2>
        </div>
      </div>
      <div className="max-w-lg lg:max-w-none mt-5 lg:mt-10 w-full pb-24">
        <ul className="w-full pb-2">
          {tracklistItems}
        </ul>

      </div>
    </div>
  )
}

export default TrackListView