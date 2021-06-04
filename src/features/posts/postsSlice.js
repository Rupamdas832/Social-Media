import { createSlice } from "@reduxjs/toolkit";
import { PostsData } from "../../api/Data";

export const postSlice = createSlice({
  name: "posts",
  initialState: {
    posts: null,
    postModal: null,
  },
  reducers: {
    loadPosts: (state, action) => {
      state.posts = action.payload.posts;
    },
    likeButtonClicked: (state, action) => {
      state.posts = state.posts.map((post) => {
        if (post._id === action.payload.postId) {
          post.likes = post.likes.concat(action.payload.newLike);
        }
        return post;
      });
    },
    loadPostOnModal: (state, action) => {
      state.postModal = action.payload.post;
    },
    commentAdded: (state, action) => {
      state.posts = state.posts.map((post) => {
        if (post._id === action.payload.postId) {
          post.comments = post.comments.concat(action.payload.newComment);
        }
        return post;
      });
    },
    composePost: (state, action) => {
      state.posts = state.posts.concat(action.payload.newPost);
    },
  },
});

export const {
  likeButtonClicked,
  composePost,
  commentAdded,
  loadPostOnModal,
  loadPosts,
} = postSlice.actions;

export default postSlice.reducer;
