import { v4 } from "uuid";
import { updateNotification } from "../notifications/notificationSlice";
import { likeButtonClicked } from "./postsSlice";

export const likeHandler = (isLiked, post, user, dispatch) => {
  if (isLiked === undefined) {
    const newLike = {
      userName: user.userName,
    };
    dispatch(likeButtonClicked({ newLike: newLike, postId: post._id }));
    const newNotification = {
      _id: v4(),
      postId: post._id,
      createdAt: new Date(),
      profileImg: user.profileImg,
      name: user.name,
      type: "liked",
    };
    if (post.userName !== user.userName) {
      dispatch(
        updateNotification({
          userName: post.userName,
          newNotification: newNotification,
        })
      );
    }
  }
};
