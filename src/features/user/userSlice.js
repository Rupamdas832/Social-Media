import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { apiUrl } from "../../api/ApiURL";

const loginStatus = JSON.parse(localStorage.getItem("SocialMediaLoginUser"));

export const loadLoggedInUser = createAsyncThunk(
  "user/loadloggedInUser",
  async ({ userCredential, password }) => {
    const response = await axios.post(`${apiUrl}/login`, {
      userCredential: userCredential,
      password: password,
    });
    return response.data;
  }
);

export const signupUser = createAsyncThunk(
  "user/signupUser",
  async ({ name, email, userName, password }) => {
    const response = await axios.post(`${apiUrl}/signup`, {
      name: name,
      email: email,
      userName: userName,
      password: password,
    });
    return response.data;
  }
);

export const loadUsersList = createAsyncThunk(
  "users/loadUsersList",
  async () => {
    const response = await axios.get(`${apiUrl}/users`);
    return response.data;
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState: {
    loggedInUserStatus: "idle",
    loggedInUser: loginStatus?.user || null,
    userLoginError: null,
    isUserLogin: loginStatus?.isUserLogin || false,
    token: loginStatus?.token || "",
    userProfile: null,
    usersList: [],
    usersListStatus: "idle",
    usersListError: null,
    search: "",
  },
  reducers: {
    logoutUser: (state) => {
      state.loggedInUser = null;
      state.loggedInUserStatus = "idle";
      state.userLoginError = null;
      state.isUserLogin = false;
      state.token = "";
    },
    addUserDetails: (state, action) => {
      state.loggedInUser.bio = action.payload.bio;
      state.loggedInUser.website = action.payload.website;
      state.loggedInUser.profileImg = action.payload.profileImg;
      state.loggedInUser.coverImg = action.payload.coverImg;
    },
    followButtonClicked: (state, action) => {
      state.loggedInUser.following = action.payload.user.following;
      state.userProfile.followers = action.payload.userToFollow.followers;
    },
    loadUserProfile: (state, action) => {
      state.userProfile = action.payload.user;
    },
    updateUserSearch: (state, action) => {
      state.search = action.payload.search;
    },
  },
  extraReducers: {
    [loadLoggedInUser.pending]: (state, action) => {
      state.loggedInUserStatus = "pending";
    },
    [loadLoggedInUser.fulfilled]: (state, action) => {
      state.loggedInUser = action.payload.user;
      state.isUserLogin = true;
      state.token = action.payload.token;
      localStorage.setItem(
        "SocialMediaLoginUser",
        JSON.stringify({
          isUserLogin: true,
          token: action.payload.token,
          user: action.payload.user,
          notifications: [],
        })
      );
      state.loggedInUserStatus = "fulfilled";
    },
    [loadLoggedInUser.rejected]: (state, action) => {
      state.loggedInUserStatus = "error";
      state.userLoginError = action.error.message;
    },
    [loadUsersList.pending]: (state, action) => {
      state.usersListStatus = "pending";
    },
    [loadUsersList.fulfilled]: (state, action) => {
      state.usersList = action.payload.users;
      state.usersListStatus = "fulfilled";
    },
    [loadUsersList.rejected]: (state, action) => {
      state.usersListStatus = "error";
      state.usersListError = action.error.message;
    },
    [signupUser.pending]: (state, action) => {
      state.loggedInUserStatus = "pending";
    },
    [signupUser.fulfilled]: (state, action) => {
      state.loggedInUser = action.payload.user;
      state.isUserLogin = true;
      state.token = action.payload.token;
      state.usersList.push(action.payload.user);
      localStorage.setItem(
        "SocialMediaLoginUser",
        JSON.stringify({
          isUserLogin: true,
          token: action.payload.token,
          user: action.payload.user,
          notifications: [],
        })
      );
      state.loggedInUserStatus = "fulfilled";
    },
    [signupUser.rejected]: (state, action) => {
      state.loggedInUserStatus = "error";
      state.userLoginError = action.error.message;
    },
  },
});

export const {
  logoutUser,
  addUserDetails,
  followButtonClicked,
  loadUserProfile,
  updateUserSearch,
} = userSlice.actions;

export default userSlice.reducer;
