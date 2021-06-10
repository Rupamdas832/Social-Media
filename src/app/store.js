import { configureStore } from "@reduxjs/toolkit";
import notificationReducer from "../features/notifications/notificationSlice";
import postSliceReducer from "../features/posts/postsSlice";
import userSliceReducer from "../features/user/userSlice";
import themeReducer from "../features/theme/themeSlice";

export const store = configureStore({
  reducer: {
    posts: postSliceReducer,
    user: userSliceReducer,
    notifications: notificationReducer,
    theme: themeReducer,
  },
});
