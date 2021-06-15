import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { apiUrl } from "../../api/ApiURL";

export const loadPosts = createAsyncThunk("posts/loadPosts", async () => {
  const response = await axios.get(`${apiUrl}/posts`);

  return response.data;
});
export const composePost = createAsyncThunk(
  "posts/composePost",
  async ({ userName, name, profileImg, content, token }) => {
    const response = await axios.post(
      `${apiUrl}/posts`,
      {
        userName,
        name,
        profileImg,
        content,
      },
      {
        headers: { Authorization: token },
      }
    );
    return response.data;
  }
);

export const postSlice = createSlice({
  name: "posts",
  initialState: {
    postStatus: "idle",
    posts: null,
    postError: null,
    postModal: null,
    composeStatus: "idle",
  },
  reducers: {
    likeButtonClicked: (state, action) => {
      state.posts = state.posts.map((post) => {
        if (post._id === action.payload.postId) {
          post = action.payload.updatedPost;
        }
        return post;
      });
    },
    loadPostOnModal: (state, action) => {
      state.postModal = action.payload.post;
    },
    commentUpdated: (state, action) => {
      state.posts = state.posts.map((post) => {
        if (post._id === action.payload.postId) {
          post = action.payload.updatedPost;
        }
        return post;
      });
    },
    resetComposeStatus: (state, action) => {
      state.composeStatus = "idle";
    },
  },
  extraReducers: {
    [loadPosts.pending]: (state, action) => {
      state.postStatus = "pending";
    },
    [loadPosts.fulfilled]: (state, action) => {
      state.posts = action.payload.posts;
      state.postStatus = "fulfilled";
    },
    [loadPosts.rejected]: (state, action) => {
      state.postStatus = "error";
      state.postError = action.payload.message;
    },
    [composePost.pending]: (state, action) => {
      state.composeStatus = "pending";
    },
    [composePost.fulfilled]: (state, action) => {
      state.posts = state.posts.concat(action.payload.post);
      state.composeStatus = "fulfilled";
    },
    [composePost.rejected]: (state, action) => {
      state.composeStatus = "error";
      state.postError = action.payload.message;
    },
  },
});

export const {
  likeButtonClicked,
  commentUpdated,
  loadPostOnModal,
  resetComposeStatus,
} = postSlice.actions;

export default postSlice.reducer;
