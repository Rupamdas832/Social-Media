import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notifications",
  initialState: {
    allUsersNotifications: null,
  },
  reducers: {
    loadAllNotifications: (state, action) => {
      state.allUsersNotifications = action.payload.notifications;
    },
    updateNotification: (state, action) => {
      const foundUserNoticationsByUserId = state.allUsersNotifications.find(
        (item) => item.userName === action.payload.userName
      );
      if (foundUserNoticationsByUserId) {
        foundUserNoticationsByUserId.items.push(action.payload.newNotification);
      }
    },
    addNewNotificationDataToList: (state, action) => {
      state.allUsersNotifications.push(action.payload.newNotificationData);
    },
  },
});

export const {
  loadAllNotifications,
  updateNotification,
  addNewNotificationDataToList,
} = notificationSlice.actions;

export default notificationSlice.reducer;
