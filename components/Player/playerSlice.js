import { createSlice } from '@reduxjs/toolkit'

export const playerSlice = createSlice({
  name: 'player',
  initialState: {
    url: null,
    open: false,
    playing: true,
    volume: 0.0,
    muted: false,
    currentTime: 0,
    loaded: 0,
    duration: 0,
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
    setBetaPlayerUrl: (state, action) => {
      state.betaUrl = action.payload
    },
    openClose: (state) => {
      state.open = !state.open
    },
    playPause: (state) => {
      state.playing = !state.playing
    },
    play: (state) => {
      if (state.url != null) {
        state.playing = true
        state.muted = false
      }
    },
    stopAndUnload: (state) => {
      state.playing = false
      state.url = null
    },
    setVolume: (state, action) => {
      state.volume = parseFloat(action.payload)
    },
    setDuration: (state, action) => {
      state.duration = action.payload
    },
    setCurrentTime: (state, action) => {
      state.currentTime = action.payload
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
  setBetaPlayerUrl,
  openClose,
  playPause,
  play,
  setVolume,
  setCurrentTime,
  playSongFromPlaylist,
  playNext,
  playPrev,
  setDuration
} = playerSlice.actions

export default playerSlice.reducer
export const selectIsOpen = (state) => state.player.open
export const selectIsMuted = (state) => state.player.muted
export const selectIsPlaying = (state) => state.player.playing
export const selectCurrentlyPlaying = (state) => state.player.currentlyPlaying
export const selectCurrentTime = (state) => state.player.currentTime
export const selectDuration = (state) => state.player.duration
export const selectUrl = (state) => state.player.url
export const selectQueue = (state) => state.player.queue
export const selectPrevPlayed = (state) => state.player.prevPlayed
