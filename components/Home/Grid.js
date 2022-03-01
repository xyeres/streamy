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
        limit={12}
        coll="albums"
        swrPath="recentAdded"
        order="lastUpdated"
        keyword={{ field: "tag", value: "2020-2021" }}
      />
      <CategoryHeader title="Featured Album" />
      <FeaturedCard />
      <CategoryHeader title="New playlists" />
      <CoverGrid
        path="/playlist"
        coll="playlists"
        swrPath="homePlaylists"
        order="title"
        limit={7}
      />
      <CategoryHeader title="Raw Live Sessions" />
      <CoverGrid
        path="/album"
        coll="albums"
        swrPath="lots"
        order="lastUpdated"
      />
    </div>
  )
}

export default Grid