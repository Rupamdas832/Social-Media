import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    notifications: [],
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
    loadNotifications: (state, action) => {
      state.notifications = action.payload.notifications;
    },
    editProfile: (state, action) => {
      state.user.name = action.payload.name;
      state.user.bio = action.payload.bio;
      state.user.website = action.payload.website;
    },
  },
});

export const { loadUser, logoutUser, editProfile, loadNotifications } =
  userSlice.actions;

export default userSlice.reducer;
