import { createSlice } from '@reduxjs/toolkit'
import secondsToTime from './secondsToTime'

export const playerSlice = createSlice({
  name: 'player',
  initialState: {
    url: null,
    pip: false,
    playing: false,
    controls: false,
    light: false,
    volume: 0.8,
    muted: false,
    played: 0,
    loaded: 0,
    duration: 0,
    playbackRate: 1.0,
    loop: false,
    queue: [],
    prevPlayed: [],
    currentlyPlaying: {
      songUrl: null,
      coverUrl: null,
      title: "Song Title",
      artist: "Artist Name",
      progress: {},
      duration: null,
      playedFrom: {
        playlistId: null,
        trackNumber: null
      }
    },
  },
  reducers: {
    playPause: (state) => {
      state.playing = !state.playing
    },
    setVolume: (state, action) => {
      state.volume = parseFloat(action.payload)
    },
    playSongFromPlaylist: (state, action) => {
      // queue tracks in front of this one in playlist
      const trackNumber = action.payload.song.track
      const songsForwardToQueue = action.payload.songsList
        .filter((song) => parseInt(song.track) > parseInt(trackNumber))

      state.queue = [...songsForwardToQueue]

      // set currently playing
      const playedFrom = {
        playlistId: action.payload.playlistId,
        trackNumber
      }

      state.currentlyPlaying = {
        ...state.currentlyPlaying,
        ...action.payload.song,
        playedFrom
      }
      state.playing = true
      state.url = action.payload.song.songUrl
    },
    setDuration: (state, action) => {
      state.currentlyPlaying.duration = action.payload
    },
    progress: {
      reducer(state, action) {
        state.currentlyPlaying.progress = action.payload
      },
      prepare({ playedSeconds, played }) {
        let time = secondsToTime(playedSeconds)
        return {
          payload: {
            time,
            playedSeconds,
            fraction: played
          }
        }
      }
    },
    playNext: (state) => {
      // Removes first added song and plays it
      const nextSong = state.queue.shift()
      if (nextSong) {
        // Push currently playing song to prevPlayed for back btn
        state.prevPlayed.push(state.currentlyPlaying)

        state.currentlyPlaying = {
          ...state.currentlyPlaying,
          ...nextSong,
        }
        state.url = nextSong.songUrl
        state.playing = true
      } else {
        state.playing = false
      }
    },
    playPrev: (state) => {
      let prevSong = state.prevPlayed.pop()

      if (prevSong) {
        // unshift current song to queue so we can come back
        state.queue.unshift(state.currentlyPlaying)

        state.currentlyPlaying = {
          ...state.currentlyPlaying,
          ...prevSong
        }
        state.url = prevSong.songUrl
        state.playing = true
      } else {
        // just play current song from beginning
        state.played = 0
        state.loaded = 0
        state.url = state.currentlyPlaying.songUrl
      }
    }
  }
})

export const {
  playPause,
  setVolume,
  playSongFromPlaylist,
  playNext,
  playPrev,
  setDuration,
  progress
} = playerSlice.actions

export default playerSlice.reducer
export const selectIsPlaying = (state) => state.player.playing
export const selectCurrentlyPlaying = (state) => state.player.currentlyPlaying