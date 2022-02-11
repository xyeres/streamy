import { createSlice } from '@reduxjs/toolkit'

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
      title: "",
      artist: "",
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
    setDuration: (state, action) => {
      state.duration = action.payload
    },
    progressMade: (state, action) => {
      state.played = action.payload
    },
    playSongFromPlaylist: (state, action) => {
      // Clear Queue and Playhistory to create new context:
      state.queue = []
      state.prevPlayed = []

      // queue tracks in front of this one in playlist
      const trackNumber = action.payload.song.track

      const forward = action.payload.songsList
        .filter((song) => song.track > trackNumber)
      const backward = action.payload.songsList
        .filter((song) => song.track < trackNumber)

      state.queue.push(...forward)
      state.prevPlayed.push(...backward)

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
    playNext: (state) => {
      // Removes first added song and plays it
      const nextSong = state.queue.shift()
      if (nextSong) {
        // Push currently playing song to prevPlayed for back btn
        state.prevPlayed.push(state.currentlyPlaying)

        // Update Currently Playing
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
        // put current song to front of queue so we can come back
        state.queue.unshift(state.currentlyPlaying)

        // Update Currently Playing
        state.currentlyPlaying = {
          ...state.currentlyPlaying,
          ...prevSong
        }
        state.url = prevSong.songUrl
        state.playing = true
      }
    }
  }
})

export const {
  playPause,
  setVolume,
  progressMade,
  playSongFromPlaylist,
  playNext,
  playPrev,
  setDuration
} = playerSlice.actions

export default playerSlice.reducer
export const selectIsPlaying = (state) => state.player.playing
export const selectCurrentlyPlaying = (state) => state.player.currentlyPlaying
export const selectPlayed = (state) => state.player.played
export const selectDuration = (state) => state.player.duration
export const selectUrl = (state) => state.player.url
export const selectQueue = (state) => state.player.queue
export const selectPrevPlayed = (state) => state.player.prevPlayed
