import { v4 } from "uuid";
import { updateNotification } from "../notifications/notificationSlice";
import { commentAdded } from "./postsSlice";

export const commentHandler = (postModal, reply, onClose, user, dispatch) => {
  const newComment = {
    _id: v4(),
    userName: user.userName,
    name: user.name,
    profileImg: user.profileImg,
    text: reply,
  };
  dispatch(commentAdded({ newComment: newComment, postId: postModal._id }));
  const newNotification = {
    _id: v4(),
    postId: postModal._id,
    createdAt: new Date(),
    profileImg: user.profileImg,
    name: user.name,
    type: "commented",
  };
  if (postModal.userName !== user.userName) {
    dispatch(
      updateNotification({
        userName: postModal.userName,
        newNotification: newNotification,
      })
    );
  }
  onClose();
};
