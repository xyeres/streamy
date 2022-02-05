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
    playSong: (state, action) => {
      const payload = action.payload
      state.url = payload.song.songUrl
      state.playing = true

      const playedFrom = {
        playlistId: payload.playlistId,
        trackNumber: payload.song.track
      }

      state.currentlyPlaying = {
        ...state.currentlyPlaying,
        ...payload.song,
        playedFrom
      }
    },
    enqueue: (state, action) => {
      state.queue.push(action.payload)
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
    dequeueAndPlayNext: (state) => {
      // Removes first added song and plays it
      const nextSong = state.queue.shift()
      if (nextSong) {
        state.currentlyPlaying = {
          ...state.currentlyPlaying,
          ...nextSong,
        }
        state.url = nextSong.songUrl
        state.playing = true
      } else {
        state.playing = false
      }
    }
  }
})

export const {
  playPause,
  setVolume,
  playSong,
  playSongFromPlaylist,
  dequeueAndPlayNext,
  setDuration,
  enqueue,
  progress
} = playerSlice.actions

export default playerSlice.reducer
export const selectIsPlaying = (state) => state.player.playing
export const selectCurrentlyPlaying = (state) => state.player.currentlyPlaying