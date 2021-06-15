import axios from "axios";
import { commentUpdated } from "./postsSlice";
import { apiUrl } from "../../api/ApiURL";

export const deleteComment = async (
  currentPost,
  commentId,
  token,
  dispatch
) => {
  try {
    const {
      status,
      data: { post },
    } = await axios.delete(`${apiUrl}/posts/${currentPost._id}/comment`, {
      headers: { Authorization: token },
      data: {
        commentId,
      },
    });
    if (status === 200) {
      dispatch(commentUpdated({ updatedPost: post, postId: post._id }));
    }
  } catch (error) {
    console.log(error);
  }
};
