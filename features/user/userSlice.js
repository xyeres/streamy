import { createSlice } from "@reduxjs/toolkit";

export const userAuthSlice = createSlice({
  name: 'userAuth',
  initialState: {
    user: null,
    username: null
  },
  reducers: {
    loginUser: (state, action) => {
      state.user = action.payload
      state.username = action.payload.email
    },
    logoutUser: (state) => {
      state.user = null,
      state.username = null
    }
  }
})


export const {
  loginUser,
  logoutUser
} = userAuthSlice.actions

export default userAuthSlice.reducer

export const selectUser = (state) => state.userAuth.user
export const selectUsername = (state) => state.userAuth.username