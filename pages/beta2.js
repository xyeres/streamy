import Layout from "../components/Layout/Layout";
import ReactAudioPlayer from 'react-audio-player';
import { useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";

export default function Beta() {
  const [songUrl, setSongUrl] = useState(null)
  const [isPlaying, setIsPlaying] = useState(false)

  const playerRef = useRef()

  useEffect(() => {
    if (songUrl) {
      if (playerRef.current) {
        const player = playerRef.current.getInternalPlayer()
        if (player) {
          console.log('loaded')
          player.load()
          setIsPlaying(true)
        }
      }
    }
  }, [songUrl])




  // list of songs that allow me to click various ones and it loads into
  // the player

  const handlePlayPause = () => {
    setIsPlaying(prevState => !prevState)
    // if (playerRef.current) {
    //   const player = playerRef.current.getInternalPlayer()
    //   if (player.paused === true) {
    //     player.play()
    //   } else {
    //     player.pause()
    //   }
    // }
  }

  const handleSongClick = (src) => {
    setSongUrl(src)
    console.log(src)
  }



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
        <button
          className="bg-pink-300 border-gray-600 p-3 px-4 m-4 shadow-lg"
          onClick={handlePlayPause}>{!!songUrl ? "pause" : "play"}</button>
        <ReactPlayer
          ref={playerRef}
          url={songUrl}
          playing={!!songUrl}
          playsinline
          config={{
            file: {
              forceAudio: false,
              attributes: {
                autoPlay: false,
              },
            }
          }}
        />

      </div>



    </Layout>
  )
}
