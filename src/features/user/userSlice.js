import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    loggedInUser: null,
    notifications: [],
    isUserLogin: false,
    token: "",
    usersList: null,
    userProfile: null,
  },
  reducers: {
    loadLoggedInUser: (state, action) => {
      state.loggedInUser = action.payload.user;
      state.isUserLogin = true;
      state.token = action.payload.token;
    },
    logoutUser: (state) => {
      state.loggedInUser = null;
      state.isUserLogin = false;
      state.token = "";
    },
    loadNotifications: (state, action) => {
      state.notifications = action.payload.notifications;
    },
    editProfile: (state, action) => {
      state.loggedInUser.name = action.payload.name;
      state.loggedInUser.bio = action.payload.bio;
      state.loggedInUser.website = action.payload.website;
    },
    loadAllUsers: (state, action) => {
      state.usersList = action.payload.users;
    },
    loadUserProfile: (state, action) => {
      state.userProfile = action.payload.userProfile;
    },
    followButtonClicked: (state, action) => {
      state.loggedInUser.following.push(action.payload.newFollowing);
      state.usersList = state.usersList.map((user) => {
        if (user.userName === action.payload.newFollower.userName) {
          user.following.push(action.payload.newFollowing);
        }
        return user;
      });
      const foundUser = state.usersList.find(
        (user) => user.userName === action.payload.newFollowing.userName
      );
      if (foundUser) {
        foundUser.followers.push(action.payload.newFollower);
      }
    },
  },
});

export const {
  loadLoggedInUser,
  logoutUser,
  editProfile,
  loadNotifications,
  loadAllUsers,
  loadUserProfile,
  followButtonClicked,
} = userSlice.actions;

export default userSlice.reducer;
