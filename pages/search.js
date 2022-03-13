import { MdOutlineSearch, MdCancel, MdOutlineMusicNote, MdQueueMusic } from "react-icons/md"
import { InstantSearch, connectHits, connectSearchBox, connectStateResults } from 'react-instantsearch-dom'
import Layout from "../components/Layout/Layout"
import algoliasearch from 'algoliasearch/lite'

import SongResultList from "../components/Search/SongResultList"
import { useEffect, useRef } from "react"
import Link from "next/link"

export default function Search() {
  const searchClient = algoliasearch(process.env.NEXT_PUBLIC_ALGOLIA_APP_ID, process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_KEY)
  const searchInputRef = useRef()

  useEffect(() => {
    searchInputRef.current.focus()
  }, [])


  const NoQuery = () => {
    return (
      <div className="flex flex-col items-center justify-center text-lg text-gray-400 p-4 text-center py-20">
        <MdQueueMusic size="4em" className="text-gray-300 drop-shadow-sm" />
        <h2 className="font-semibold">
          Something missing?
        </h2>
        <p>
          <br />If we&apos;ve missed an item, please send us some <Link href="/library?feedback=open"><a className="font-bold underline">feedback</a></Link> and we&apos;ll get it uploaded.
        </p>
      </div>
    )
  }

  const Results = connectStateResults(({ searchState, children }) =>
    searchState && searchState.query ? (
      <>{children}</>
    ) : (
      <NoQuery />
    )
  );

  const Hits = ({ hits }) => {
    return <SongResultList data={hits} />
  }

  const CustomHits = connectHits(Hits)

  const SearchBox = ({ currentRefinement, refine }) => {
    const clearRefinement = () => {
      refine('')
    }
    return (
      <div className="relative">
        <input
          type="text"
          placeholder="Artist, album, song"
          value={currentRefinement}
          ref={searchInputRef}
          onChange={(e) => refine(e.currentTarget.value)}
          className="bg-gray-100 mb-4 focus:outline-2 text-gray-500 focus:outline-gray-400 p-2 px-4 pl-10 rounded-3xl w-full"
        />
        {
          currentRefinement ?
            <MdCancel onClick={clearRefinement} size="1.25em" className="cursor-pointer text-gray-300 absolute top-[9px] right-3" />
            : null
        }
        <MdOutlineSearch size="1.25em" className="text-gray-500 top-3 left-3 absolute" />
      </div>
    )
  }

  const CustomSearchBox = connectSearchBox(SearchBox)

  return (
    <Layout search>
      <div className="p-4 w-full">
        <InstantSearch searchClient={searchClient} indexName="songs">
          <CustomSearchBox />
          <Results>
            <CustomHits />
          </Results>
        </InstantSearch>
      </div>
    </Layout>
  )
}
