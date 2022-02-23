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
        listId: null,
        listIndex: null,
        listSongs: [],
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
    playedFromList: (state, action) => {
      const { song, listSongs, listId } = action.payload
      const trackNumber = action.payload.song.track
      const listIndex = action.payload.index

      // Clear Queue because we've started a new list
      state.queue = []
      state.prevPlayed = []

      // Populate queue and prevPlayed stack
      const forwardTracks = listSongs.filter(((song, index) => index > listIndex))
      const backwardTracks = listSongs.filter(((song, index) => index < listIndex))
      state.queue.push(...forwardTracks)
      state.prevPlayed.push(...backwardTracks)

      // Set played from
      const playedFrom = {
        listId,
        listIndex,
        listSongs,
        trackNumber
      }

      // Set currently playing
      state.currentlyPlaying = {
        ...song,
        playedFrom
      }
      state.playing = true
      state.url = song.songUrl
    },
    playNext: (state) => {
      // Remove first song from queue
      const nextSong = state.queue.shift()
      if (nextSong) {
        // Push currently playing song to prevPlayed for playPrev action
        state.prevPlayed.push(state.currentlyPlaying)

        // Update Currently Playing
        state.currentlyPlaying = {
          ...state.currentlyPlaying,
          ...nextSong,
        }
        state.url = nextSong.songUrl
        state.playing = true
      } else {
        // If last song

        // Stop playing and close player
        // to alert user that the list is over
        state.playing = false
        state.open = false

        // Load the first song in the songList that the user 
        // was listening to so they can start list over
        const listSongs = state.currentlyPlaying.playedFrom.listSongs
        const firstSongInList = listSongs.shift()

        if (firstSongInList) {
          state.prevPlayed = []
          state.queue = listSongs

          state.currentlyPlaying = {
            ...state.currentlyPlaying,
            ...firstSongInList,
          }
          state.url = firstSongInList.songUrl
        }
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
  playedFromList,
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
