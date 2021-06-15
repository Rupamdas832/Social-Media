import axios from "axios";
import { commentUpdated } from "./postsSlice";
import { apiUrl } from "../../api/ApiURL";

export const commentHandler = async (
  postModal,
  reply,
  onClose,
  user,
  token,
  dispatch
) => {
  try {
    const {
      status,
      data: { post },
    } = await axios.post(
      `${apiUrl}/posts/${postModal._id}/comment`,
      {
        userName: user.userName,
        name: user.name,
        profileImg: user.profileImg,
        text: reply,
      },
      {
        headers: { Authorization: token },
      }
    );
    if (status === 201) {
      dispatch(commentUpdated({ updatedPost: post, postId: post._id }));
    }
  } catch (error) {
    console.log(error);
  }
  if (postModal.userName !== user.userName) {
    try {
      await axios.post(
        `${apiUrl}/notifications/${postModal.userId}`,
        {
          postId: postModal._id,
          profileImg: user.profileImg,
          name: user.name,
          type: "commented",
        },
        {
          headers: { Authorization: token },
        }
      );
    } catch (error) {
      console.log(error);
    }
  }
  onClose();
};
