import { createSlice } from "@reduxjs/toolkit";

export const userAuthSlice = createSlice({
  name: 'userAuth',
  initialState: {
    user: null,
  },
  reducers: {
    loginUser: (state, action) => {
      const json = JSON.parse(JSON.stringify(action.payload))
      state.user = json
      state.user.displayName ? null : state.user.displayName = state.user.email
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