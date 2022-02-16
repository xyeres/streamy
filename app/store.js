import { configureStore } from '@reduxjs/toolkit'
import playerReducer from '../components/Player/playerSlice'

export default configureStore({
  reducer: {
    player: playerReducer,
  },
})