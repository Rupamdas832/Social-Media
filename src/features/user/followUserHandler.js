import { v4 } from "uuid";
import { updateNotification } from "../notifications/notificationSlice";
import { followButtonClicked } from "./userSlice";

export const followUserHandler = (
  userName,
  name,
  profileImg,
  loggedInUser,
  dispatch
) => {
  const newFollowing = {
    _id: v4(),
    userName: userName,
    profileImg: profileImg,
    name: name,
  };
  const newFollower = {
    _id: v4(),
    userName: loggedInUser.userName,
    profileImg: loggedInUser.profileImg,
    name: loggedInUser.name,
  };
  dispatch(
    followButtonClicked({
      newFollowing: newFollowing,
      newFollower: newFollower,
    })
  );
  const newNotification = {
    _id: v4(),
    userName: loggedInUser.userName,
    createdAt: new Date().toISOString(),
    profileImg: loggedInUser.profileImg,
    name: loggedInUser.name,
    type: "followed",
  };
  dispatch(
    updateNotification({
      userName: userName,
      newNotification: newNotification,
    })
  );
};
