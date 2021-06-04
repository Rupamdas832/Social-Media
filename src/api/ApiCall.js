import { PostsData, UsersData, NotificationsData } from "./Data";

export const LoginAPI = (userName, password) => {
  return new Promise((res, rej) => {
    setTimeout(() => {
      const foundUser = UsersData.find((user) => user.userName === userName);
      if (!foundUser) {
        rej({
          response: {
            status: 400,
            success: false,
            data: { message: "User not found" },
          },
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

export const PostsAPI = () => {
  return new Promise((res, rej) => {
    setTimeout(() => {
      res({
        status: 200,
        success: true,
        data: { posts: PostsData },
      });
    }, 1000);
  });
};

export const AllNotificationsAPI = () => {
  return new Promise((res, rej) => {
    setTimeout(() => {
      res({
        status: 200,
        success: true,
        data: { notifications: NotificationsData },
      });
    }, 1000);
  });
};

export const NotificationsAPI = (_id) => {
  return new Promise((res, rej) => {
    setTimeout(() => {
      const foundNotification = NotificationsData.find(
        (notification) => notification.userId === _id
      );
      if (!foundNotification) {
        rej({
          response: {
            status: 400,
            success: false,
            data: { message: "Notifications not found" },
          },
        });
      } else {
        const token = "credToken";
        res({
          status: 200,
          success: true,
          data: { notificationData: foundNotification },
        });
      }
    }, 1000);
  });
};
