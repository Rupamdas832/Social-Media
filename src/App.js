import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { AllNotificationsAPI, PostsAPI, UsersAPI } from "./api/ApiCall";
import "./App.css";
import { Footer, PrivateRoute } from "./components";
import { Header } from "./components/Header";
import { loadAllNotifications } from "./features/notifications/notificationSlice";
import { loadPosts } from "./features/posts/postsSlice";
import { loadAllUsers } from "./features/user/userSlice";
import {
  ComposePost,
  Followers,
  Following,
  GettingStarted,
  Home,
  Login,
  Notification,
  PageNotFound,
  Post,
  ProfileEdit,
  Search,
  Signup,
  Timeline,
} from "./pages";

const App = () => {
  const { themeMode, themeColor } = useSelector((state) => state.theme);
  const dispatch = useDispatch();
  const fetchPosts = async () => {
    try {
      const {
        status,
        data: { posts },
      } = await PostsAPI();
      if (status === 200) {
        dispatch(loadPosts({ posts: posts }));
      }
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  const fetchNotifications = async () => {
    try {
      const {
        status,
        data: { notifications },
      } = await AllNotificationsAPI();
      if (status === 200) {
        dispatch(loadAllNotifications({ notifications: notifications }));
      }
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  const fetchUsers = async () => {
    try {
      const {
        status,
        data: { users },
      } = await UsersAPI();
      if (status === 200) {
        dispatch(loadAllUsers({ users: users }));
      }
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  useEffect(() => {
    fetchPosts();
    fetchNotifications();
    fetchUsers();
  }, []);
  return (
    <div
      className="App"
      style={{
        backgroundColor: `${themeColor[themeMode].bg}`,
        color: `${themeColor[themeMode].color}`,
      }}
    >
      <Header />
      <Routes>
        <PrivateRoute path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <PrivateRoute path="/getting-started" element={<GettingStarted />} />
        <PrivateRoute
          path="/timeline/:userNameFromParam"
          element={<Timeline />}
        />
        <PrivateRoute path="/notification" element={<Notification />} />
        <PrivateRoute path="/settings/profile" element={<ProfileEdit />} />
        <PrivateRoute path="/compose" element={<ComposePost />} />
        <PrivateRoute
          path="/:userNameFromParam/following"
          element={<Following />}
        />
        <PrivateRoute
          path="/:userNameFromParam/followers"
          element={<Followers />}
        />
        <PrivateRoute path="/search" element={<Search />} />
        <PrivateRoute path="/post/:postId" element={<Post />} />
        <Route path="/*" element={<PageNotFound />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
