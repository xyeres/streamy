import Layout from "../components/Layout/Layout";
import ReactAudioPlayer from 'react-audio-player';
import { useRef, useState } from "react";

export default function Beta() {
  const [songUrl, setSongUrl] = useState(null)
  const song1 = 'https://firebasestorage.googleapis.com/v0/b/streamy-dev-51f11.appspot.com/o/songs%2F40dfc93e-1574-400a-a41c-4893c5fa7cfatagmp3_02-Lifting-Off.mp3?alt=media&token=8be753ad-a1fe-4bbe-9975-3fa34d093157'

  let playerRef;

  const ref = useRef()

  const handlePlay = () => {
    if (playerRef.paused) playerRef.play()
    else playerRef.pause()
  }

  const handleSongClick = (src) => {
    console.log('song src', src)
    // setSongUrl(src)
    ref.current.audioEl.current.src = src
    ref.current.audioEl.current.load()
    ref.current.audioEl.current.play()
  }

  // list of songs that allow me to click various ones and it loads into
  // the player

  const songData = [
    {
      id: 1,
      src: 'https://firebasestorage.googleapis.com/v0/b/streamy-dev-51f11.appspot.com/o/songs%2F40dfc93e-1574-400a-a41c-4893c5fa7cfatagmp3_02-Lifting-Off.mp3?alt=media&token=8be753ad-a1fe-4bbe-9975-3fa34d093157',
      title: 'Will Reagan Song'
    },
    {
      id: 2,
      src: 'https://firebasestorage.googleapis.com/v0/b/streamy-dev-51f11.appspot.com/o/songs%2Fb217ac29-c100-4da5-bce4-2a0fc7cc7b3ftagmp3_02-Peace-Like-a-River.mp3?alt=media&token=b830cd0f-6951-4ecd-98e3-9b2cc4d68a66',
      title: 'Monthly EP Track'
    },
    {
      id: 3,
      src: "https://firebasestorage.googleapis.com/v0/b/streamy-dev-51f11.appspot.com/o/songs%2F4e850bb6-b992-4dd7-b796-5ce77cfc79e6tagmp3_03-You're-Beautiful.mp3?alt=media&token=198ba9f8-ce55-4c92-b5d9-b27e64651fdf",
      title: 'United Pursuit Song of Choice'
    },
  ]

  const handleLoadSong = (url) => {
    setSongUrl(url)
  }

  return (
    <Layout>
      <div className="px-5 pt-20 h-screen">
        <h1>Audio Player Test</h1>
        <p>Songs: </p>
        <ul className="my-5">
          {songData.map((song) => {
            return (
              <li className="underline cursor-pointer text-green-400" key={song.id} onClick={() => handleSongClick(song.src)}>{song.title}</li>
            )
          })}
        </ul>
        <ReactAudioPlayer
          ref={ref}
          src={songUrl}
        />
        <button
          className="bg-blue-300 border-gray-600 p-3 px-4 m-4 shadow-lg"
          onClick={handlePlay}>button</button>
      </div>



    </Layout>
  )
}
