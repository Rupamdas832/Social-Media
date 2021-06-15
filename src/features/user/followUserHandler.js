import axios from "axios";
import { followButtonClicked } from "./userSlice";
import { apiUrl } from "../../api/ApiURL";

export const followUserHandler = async (
  userIdToFollow,
  loggedInUser,
  token,
  dispatch
) => {
  try {
    const {
      status,
      data: { user, userToFollow },
    } = await axios.post(
      `${apiUrl}/user/follow`,
      {
        userIdToFollow: userIdToFollow,
      },
      {
        headers: { Authorization: token },
      }
    );
    if (status === 201) {
      dispatch(followButtonClicked({ user, userToFollow }));
    }
  } catch (error) {
    console.log(error);
  }
  try {
    await axios.post(
      `${apiUrl}/notifications/${userIdToFollow}`,
      {
        profileImg: loggedInUser.profileImg,
        name: loggedInUser.name,
        userName: loggedInUser.userName,
        type: "followed",
      },
      {
        headers: { Authorization: token },
      }
    );
  } catch (error) {
    console.log(error);
  }
};
