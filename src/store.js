import { configureStore } from '@reduxjs/toolkit'
import playerReducer from '../components/Player/playerSlice'
import userAuthReducer from '../features/user/userSlice'

export default configureStore({
  reducer: {
    player: playerReducer,
    userAuth: userAuthReducer,
  },
})