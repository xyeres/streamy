import Image from "next/image"
import Link from "next/link"
import { useSelector } from "react-redux"
import CoverGrid from "../CoverGrid/CoverGrid"
import { selectUrl } from "../Player/playerSlice"
import CategoryHeader from "./CategoryHeader"
import FeaturedCard from "./FeaturedCard"
import FeedbackCard from "./FeedbackCard"



function Grid() {
  const isPlayerLoaded = useSelector(selectUrl)
  return (
    <div className={`relative h-full w-full ${isPlayerLoaded ? 'pb-24' : 'pb-12'}`}>
      <CategoryHeader title="Newly Added" />
      <CoverGrid
        path="/album"
        keywords={{ field: 'tags', opStr: 'array-contains', value: 'new' }}
        swrkey="recentlyAdded"
      />
      <CategoryHeader title="Recent Live EPs" />
      <CoverGrid
        path="/album"
        keywords={{ field: 'tags', opStr: 'array-contains', value: 'monthlyep' }}
        swrkey="monthlyep"
      />
      <CategoryHeader title="Featured Album" />
      <FeaturedCard featuredColl="albums" />
      <CategoryHeader title="New playlists" />
      <CoverGrid
        path="/playlist"
        coll="playlists"
      />
      <CategoryHeader title="From the Studio" />
      <CoverGrid
        path="/album"
        limit={12}
        swrkey="studioAlbums"
        keywords={{ field: 'tags', opStr: 'array-contains', value: 'studio' }}
      />

      <FeedbackCard />

    </div>
  )
}

export default Grid