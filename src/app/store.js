import { configureStore } from "@reduxjs/toolkit";
import postSliceReducer from "../features/posts/postsSlice";
import userSliceReducer from "../features/user/userSlice";

export const store = configureStore({
  reducer: {
    posts: postSliceReducer,
    user: userSliceReducer,
  },
});
