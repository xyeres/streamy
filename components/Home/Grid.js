import { useSelector } from "react-redux"
import CoverGrid from "../CoverGrid/CoverGrid"
import { selectUrl } from "../Player/playerSlice"
import CategoryHeader from "./CategoryHeader"
import FeaturedCard from "./FeaturedCard"



function Grid() {
  const isPlayerLoaded = useSelector(selectUrl)
  return (
    <div className={`relative h-full w-full ${isPlayerLoaded ? 'pb-24' : 'pb-12'}`}>
      <CategoryHeader title="Recently Added" />
      <CoverGrid
        path="/album"
        keywords={{field: 'tags', opStr: 'array-contains', value: 'new'}}
        swrkey="recentlyAdded"

      />
      <CategoryHeader title="The OG Collection" />
      <CoverGrid
        path="/album"
        keywords={{ field: 'tags', opStr: 'array-contains', value: 'og' }}
        swrkey="og"
      />
      <CategoryHeader title="Featured Album" />
      <FeaturedCard featuredColl="albums" />
      <CategoryHeader title="New playlists" />
      <CoverGrid
        path="/playlist"
        coll="playlists"
      />
      <CategoryHeader title="Live and Raw" />
      <CoverGrid
        path="/album"
        limit={5}
        swrkey="raw"
      />
    </div>
  )
}

export default Grid