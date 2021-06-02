import { UsersData } from "./Data";

export const LoginAPI = (userId, password) => {
  return new Promise((res, rej) => {
    setTimeout(() => {
      const foundUser = UsersData.find((user) => user.userId === userId);
      if (!foundUser) {
        rej({
          status: 400,
          success: false,
          data: { message: "User not found" },
        });
      } else if (foundUser.password === password) {
        const token = "credToken";
        res({
          status: 200,
          success: true,
          data: { user: foundUser, token: token },
        });
      } else {
        rej({
          response: {
            status: 400,
            success: false,
            data: { message: "Password not match" },
          },
        });
      }
    }, 2000);
  });
};
