import { createSlice } from "@reduxjs/toolkit";

export const userAuthSlice = createSlice({
  name: 'userAuth',
  initialState: {
    user: null,
  },
  reducers: {
    loginUser: (state, action) => {
      state.user = action.payload
    },
    logoutUser: (state) => {
      state.user = null
    },
  }
})


export const {
  loginUser,
  logoutUser
} = userAuthSlice.actions

export default userAuthSlice.reducer

export const selectUser = (state) => state.userAuth.user
export const selectUsername = (state) => state.userAuth.username