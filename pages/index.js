import CoverGrid from "../components/CoverGrid/CoverGrid";
import CategoryHeader from "../components/Home/CategoryHeader";
import FeaturedCard from "../components/Home/FeaturedCard";
import FeedbackCard from "../components/Home/FeedbackCard";
import Layout from "../components/Layout/Layout";
import getFeatured from "../lib/getFeatured";
import getAlbums from "../lib/getAlbums";
import getCollection from "../lib/getCollection";
import { useSelector } from "react-redux";
import { selectUrl } from "../components/Player/playerSlice";
import SearchIcon from "../components/Home/SearchIcon";
import NotificationCard from "../components/Home/NotificationCard";

export async function getStaticProps() {
  const featuredAlbums = await getFeatured("albums");

  const firstFeaturedAlbum = {
    ...featuredAlbums[0],
    lastUpdated: null,
  };

  const options = { field: "tags", opStr: "array-contains" };
  const albumsLive = await getAlbums({ ...options, value: "live" }, null, 12);
  const albumsMonthlyEP = await getAlbums({ ...options, value: "monthlyep" });
  const albumsNew = await getAlbums(
    { ...options, value: "new" },
    "lastUpdated"
  );
  const albumsOG = await getAlbums({ ...options, value: "og" }, null, 10);
  const albumsStudio = await getAlbums({ ...options, value: "studio" }, "year");

  // Get Playlists
  const playlistsNew = await getCollection("playlists");

  return {
    props: {
      albumsLive,
      albumsMonthlyEP,
      albumsNew,
      albumsOG,
      albumsStudio,
      buildTime: new Date().toISOString(),
      feature: firstFeaturedAlbum,
      playlistsNew,
    },
    revalidate: 60,
  };
}

export default function Home({
  feature,
  albumsNew,
  albumsMonthlyEP,
  albumsStudio,
  albumsLive,
  albumsOG,
  buildTime,
  playlistsNew,
}) {
  const isPlayerLoaded = useSelector(selectUrl);

  return (
    <Layout home>
      <SearchIcon />
      <div
        className={`relative h-full w-full ${
          isPlayerLoaded ? "pb-24" : "pb-12"
        }`}
      >
        <div className="hidden lg:my-10 lg:flex items-center justify-center">
          <FeaturedCard feature={feature} />
        </div>

        <CategoryHeader title="Newly Added" />
        <CoverGrid path="/album" items={albumsNew} />
        <CategoryHeader title="Recent Live EPs" />
        <CoverGrid path="/album" items={albumsMonthlyEP} />

        <div className="lg:hidden">
          <CategoryHeader title="Featured Album" />
          <FeaturedCard feature={feature} />
        </div>
        <CategoryHeader title="New playlists" />
        <CoverGrid path="/playlist" items={playlistsNew} />
        <CategoryHeader title="From the Studio" />
        <CoverGrid path="/album" items={albumsStudio} />
        <FeedbackCard />
        <CategoryHeader title="Live albums" />
        <CoverGrid path="/album" items={albumsLive} />
        <CategoryHeader title="Classics: Monthly EP Vol. I - X" />
        <CoverGrid path="/album" items={albumsOG} />
        <div className="flex justify-end pb-4 text-xs text-gray-50 dark:text-gray-800">
          {buildTime}
        </div>
      </div>
    </Layout>
  );
}
