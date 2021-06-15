import axios from "axios";
import { likeButtonClicked } from "./postsSlice";
import { apiUrl } from "../../api/ApiURL";

export const likeHandler = async (
  isLiked,
  currentPost,
  user,
  token,
  dispatch
) => {
  if (isLiked === undefined) {
    try {
      const {
        status,
        data: { post },
      } = await axios.post(
        `${apiUrl}/posts/${currentPost._id}/like`,
        {
          userName: user.userName,
        },
        {
          headers: { Authorization: token },
        }
      );
      if (status === 201) {
        dispatch(likeButtonClicked({ updatedPost: post, postId: post._id }));
      }
    } catch (error) {
      console.log(error);
    }
    if (currentPost.userName !== user.userName) {
      try {
        await axios.post(
          `${apiUrl}/notifications/${currentPost.userId}`,
          {
            postId: currentPost._id,
            profileImg: user.profileImg,
            name: user.name,
            type: "liked",
          },
          {
            headers: { Authorization: token },
          }
        );
      } catch (error) {
        console.log(error);
      }
    }
  } else {
    try {
      const {
        status,
        data: { post },
      } = await axios.delete(`${apiUrl}/posts/${currentPost._id}/like`, {
        headers: { Authorization: token },
        data: {
          userName: user.userName,
        },
      });
      if (status === 200) {
        dispatch(likeButtonClicked({ updatedPost: post, postId: post._id }));
      }
    } catch (error) {
      console.log(error);
    }
  }
};
