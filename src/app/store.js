import { configureStore } from '@reduxjs/toolkit'
import playerReducer from '../features/Player/playerSlice'

export default configureStore({
  reducer: {
    player: playerReducer,
  },
})