import { useState } from "react"
import { MdOutlineSearch, MdOutlineMusicNote, MdQueueMusic } from "react-icons/md"
import Layout from "../../components/Layout/Layout"

import AlbumResultList from "./AlbumResultList"
import PlaylistResultList from "./PlaylistResultList"
import SongResultList from "./SongResultList"

export default function Search() {
  const [searchInput, setSearchInput] = useState("")

  const handleInput = (e) => {
    setSearchInput(e.target.value)
  }

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

  return (
    <Layout search>
      <div className="p-4 w-full">
        <div className="relative">
          <input
            type="text"
            onChange={handleInput}
            placeholder="Album, playlist, song"
            value={searchInput}
            className="bg-gray-100 mb-4 focus:outline-2 text-gray-500 focus:outline-gray-400 p-2 px-4 pl-12 rounded-3xl w-full"
          />
          <MdOutlineSearch size="1.25em" className="text-gray-500 top-3 left-4 absolute" />
        </div>
        {searchInput ? (
          <>
            <Loading />
            <SongResultList />
            <AlbumResultList />
            <PlaylistResultList />
          </>
        ) : <InitialState />}
      </div>
    </Layout>
  )
}
