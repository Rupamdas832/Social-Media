import axios from "axios";
import { followButtonClicked } from "./userSlice";
import { apiUrl } from "../../api/ApiURL";

export const unFollowUserHandler = async (
  userIdToUnFollow,
  onClose,
  token,
  dispatch,
  toast
) => {
  toast({
    title: "Unfollowing user",
    status: "info",
    duration: 2000,
    isClosable: true,
  });
  try {
    const {
      status,
      data: { user, userToUnFollow },
    } = await axios.delete(`${apiUrl}/user/follow`, {
      headers: { Authorization: token },
      data: {
        userIdToUnFollow,
      },
    });
    if (status === 201) {
      dispatch(followButtonClicked({ user, userToFollow: userToUnFollow }));
      onClose();
    }
  } catch (error) {
    console.log(error);
  }
};
