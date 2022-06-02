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

      <div className="hidden lg:my-10 lg:flex items-center justify-center">
        <FeaturedCard featuredColl="albums" />
      </div>

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
      <div className="lg:hidden">
        <CategoryHeader title="Featured Album" />
        <FeaturedCard featuredColl="albums" />
      </div>
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
      <CategoryHeader title="Live albums" />
      <CoverGrid
        path="/album"
        limit={12}
        swrkey="liveAlbums"
        keywords={{ field: 'tags', opStr: 'array-contains', value: 'live' }}
      />
      <CategoryHeader title="Classics: Monthly EP Vol. I - X" />
      <CoverGrid
        path="/album"
        limit={10}
        swrkey="ogEPs"
        keywords={{ field: 'tags', opStr: 'array-contains', value: 'og' }}
      />
    </div>
  )
}

export default Grid