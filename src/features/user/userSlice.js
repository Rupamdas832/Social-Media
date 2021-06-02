import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    isUserLogin: false,
    token: "",
  },
  reducers: {
    loadUser: (state, action) => {
      state.user = action.payload.user;
      state.isUserLogin = true;
      state.token = action.payload.token;
    },
    logoutUser: (state) => {
      state.user = null;
      state.isUserLogin = false;
      state.token = "";
    },
    editProfile: (state, action) => {
      state.user.name = action.payload.name;
      state.user.bio = action.payload.bio;
      state.user.website = action.payload.website;
    },
  },
});

export const { loadUser, logoutUser, editProfile } = userSlice.actions;

export default userSlice.reducer;
