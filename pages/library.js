import Link from "next/link";
import { useState } from "react";
import { GiHeartBottle, GiTechnoHeart } from "react-icons/gi";
import { useSelector } from "react-redux";
import CoverGridItem from "../components/CoverGrid/CoverGridItem";
import SearchIcon from "../components/Home/SearchIcon";
import Layout from "../components/Layout/Layout";
import Feedback from "../components/Library/Feedback";
import { selectUrl } from "../components/Player/playerSlice";
import getAllAlbums from "../lib/getAllAlbums";

export async function getStaticProps() {
  const albums = await getAllAlbums();

  return {
    props: {
      albums,
    },
  };
}

export default function Library({ albums }) {
  const [isOpen, setIsOpen] = useState(false);
  const handleFeedbackToggle = () => {
    setIsOpen(!isOpen);
  };

  const isPlayerLoaded = useSelector(selectUrl);

  const albumList = albums.map((item) => {
    return <CoverGridItem key={item.id} path="/album" item={item} />;
  });

  return (
    <Layout library>
      <SearchIcon />
      <Feedback setIsOpen={setIsOpen} isOpen={isOpen} />
      <div className="overflow-hidden text-center m-4 gap-6 text-gray-600 dark:text-gray-300 flex flex-col items-center justify-center mt-10 pb-16">
        <GiHeartBottle
          size="4em"
          className="transition-all drop-shadow-md hover:drop-shadow-lg"
        />
        <h1 className="font-bold text-lg">Library</h1>
        <p className="p-4">
          A more complete library is coming soon. <br />
          But while you&apos;re here, mind telling us what you think of the app?
        </p>
        <button
          onClick={handleFeedbackToggle}
          className="bg-violet-600 group animate-pulse ring ring-offset-4 hover:shadow-inner rounded-full hover:ring-offset-2 hover:ring-none transition-all ring-violet-600 text-white flex items-center justify-center px-6 py-3"
        >
          Give{" "}
          <span className="mx-2">
            <GiTechnoHeart className="animate-pulse text-red-500" size="2em" />
          </span>{" "}
          feedback
        </button>
      </div>
      <div className="text-center mb-10">
        <h2 className="dark:text-white font-bold text-xl">
          Browse entire catalog
        </h2>
        {/* <p className="dark:text-gray-500">New to old</p> */}
      </div>
      <div
        className={`relative h-full w-full mb-10 ${
          isPlayerLoaded ? "pb-24" : "pb-12"
        }`}
      >
        <ul className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 first:ml-4 xl:grid-cols-6 gap-4 lg:gap-8">
          {albumList}
        </ul>
      </div>
    </Layout>
  );
}
