import { MdOutlineSearch, MdOutlineMusicNote, MdQueueMusic } from "react-icons/md"
import { FaAlgolia } from 'react-icons/fa'
import { InstantSearch, connectHits, connectSearchBox } from 'react-instantsearch-dom'
import Layout from "../components/Layout/Layout"
import algoliasearch from 'algoliasearch/lite'

import SongResultList from "../components/Search/SongResultList"

export default function Search() {
  const searchClient = algoliasearch(process.env.NEXT_PUBLIC_ALGOLIA_APP_ID, process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_KEY)

  const Loading = () => {
    return (
      <div className="font-bold text-md flex items-center justify-center py-5">
        <MdOutlineMusicNote className="animate-bounce text-emerald-700" size="1em" />
        <h1 className="animate-pulse text-gray-700">Searching...</h1>
      </div>
    )
  }

  const InitialState = () => {
    return (
      <div className="flex flex-col items-center justify-center text-lg text-gray-400 p-10 py-20">
        <MdQueueMusic size="4em" className="text-gray-300 drop-shadow-sm" />
        <h1>Find something good to listen to</h1>
      </div>
    )
  }

  const Hits = ({ hits }) => {
    console.log('hits', hits)
    return <SongResultList data={hits} />
  }

  const CustomHits = connectHits(Hits)

  const SearchBox = ({ currentRefinement, refine }) => {
    return (
      <div className="relative">
        <input
          type="text"
          placeholder="Artist, album, song"
          value={currentRefinement}
          onChange={(e) => refine(e.currentTarget.value)}
          className="bg-gray-100 mb-4 focus:outline-2 text-gray-500 focus:outline-gray-400 p-2 px-4 pl-12 rounded-3xl w-full"
        />
        <FaAlgolia size="1.25em" className="text-gray-200 top-[9px] right-5 absolute" />
        <MdOutlineSearch size="1.25em" className="text-gray-500 top-3 left-4 absolute" />
      </div>
    )
  }

  const CustomSearchBox = connectSearchBox(SearchBox)

  return (
    <Layout search>
      <div className="p-4 w-full">
        <InstantSearch searchClient={searchClient} indexName="songs">
          <CustomSearchBox />
          <CustomHits />
        </InstantSearch>
      </div>
    </Layout>
  )
}
