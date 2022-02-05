import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  songs: [],
  coverUrl: null,
  title: "Playlist",
  artists: [],
}

export const playlistSlice = createSlice({
  name:'playlist',
  initialState,
  reducers: {
    loadSongs: (state, action) => {
      state.songs = action.payload
    }
  }
})