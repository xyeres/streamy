import { useSelector } from "react-redux"
import { CoverGrid } from "../components/CoverGrid"
import { selectUrl } from "../components/Player/playerSlice"
import { CategoryHeader } from "../components/CategoryHeader"
import { FeaturedCard } from "../components/FeaturedCard"
import { FeedbackCard } from "../components/FeedbackCard"
import { Layout } from '../components/Layout';
import { AccountBar } from "../components/AccountBar"


export default function Home() {
  const isPlayerLoaded = useSelector(selectUrl)

  return (
    <Layout home>
      <div className="absolute top-4 right-4 z-10">
        <AccountBar />
      </div>
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
        <div className="m-4 my-6">
          <FeedbackCard />
        </div>
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
    </Layout>
  );
}
