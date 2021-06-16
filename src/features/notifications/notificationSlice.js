import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { apiUrl } from "../../api/ApiURL";

const loginStatus = JSON.parse(localStorage.getItem("SocialMediaLoginUser"));

export const loadUserNotification = createAsyncThunk(
  "notifications/loadUserNotification",
  async ({ token }) => {
    const response = await axios.get(`${apiUrl}/notifications`, {
      headers: { authorization: token },
    });
    return response.data;
  }
);

const notificationSlice = createSlice({
  name: "notifications",
  initialState: {
    notifications: loginStatus?.notifications || null,
    notificationStatus: "idle",
    notificationError: null,
  },
  extraReducers: {
    [loadUserNotification.pending]: (state, action) => {
      state.notificationStatus = "pending";
    },
    [loadUserNotification.fulfilled]: (state, action) => {
      state.notifications = action.payload.notifications;
      const localData = JSON.parse(
        localStorage.getItem("SocialMediaLoginUser")
      );
      localData.notifications = action.payload.notifications;
      localStorage.setItem("SocialMediaLoginUser", JSON.stringify(localData));
      state.notificationStatus = "fulfilled";
    },
    [loadUserNotification.rejected]: (state, action) => {
      state.notificationStatus = "error";
      state.notificationError = action.error.message;
    },
  },
});

export default notificationSlice.reducer;
