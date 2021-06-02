import { createSlice } from "@reduxjs/toolkit";
import { PostsData } from "../../api/Data";

export const postSlice = createSlice({
  name: "posts",
  initialState: {
    posts: PostsData,
  },
  reducers: {
    increment: (state, action) => {
      state.posts = state.posts.map((post) => {
        if (post._id === action.payload.postId) {
          post.likes = post.likes.concat(action.payload.newLike);
        }
        return post;
      });
    },
    composePost: (state, action) => {
      state.posts = state.posts.concat(action.payload.newPost);
    },
  },
});

export const { increment, composePost } = postSlice.actions;

export default postSlice.reducer;
