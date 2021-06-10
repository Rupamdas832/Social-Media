import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    loggedInUser: null,
    notifications: [],
    isUserLogin: false,
    token: "",
    usersList: null,
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
    addNewUserToUsersList: (state, action) => {
      state.usersList.push(action.payload.user);
    },
    addUserDetails: (state, action) => {
      state.loggedInUser.bio = action.payload.bio;
      state.loggedInUser.website = action.payload.website;
      state.loggedInUser.profileImg = action.payload.profileImg;
      state.loggedInUser.coverImg = action.payload.coverImg;
      const foundUserToUpadate = state.usersList.find(
        (user) => user.userName === action.payload.userName
      );
      if (foundUserToUpadate) {
        foundUserToUpadate.bio = action.payload.bio;
        foundUserToUpadate.website = action.payload.website;
        foundUserToUpadate.profileImg = action.payload.profileImg;
        foundUserToUpadate.coverImg = action.payload.coverImg;
        foundUserToUpadate.followers = [];
        foundUserToUpadate.following = [];
      }
    },
    followButtonClicked: (state, action) => {
      state.loggedInUser.following.push(action.payload.newFollowing);

      const followingUser = state.usersList.find(
        (user) => user.userName === action.payload.newFollower.userName
      );
      if (followingUser) {
        followingUser.following.push(action.payload.newFollowing);
      }

      const foundUserToFollow = state.usersList.find(
        (user) => user.userName === action.payload.newFollowing.userName
      );
      if (foundUserToFollow) {
        foundUserToFollow.followers.push(action.payload.newFollower);
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
  addNewUserToUsersList,
  addUserDetails,
  followButtonClicked,
} = userSlice.actions;

export default userSlice.reducer;
