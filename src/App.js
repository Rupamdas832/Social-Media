import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { AllNotificationsAPI, PostsAPI } from "./api/ApiCall";
import "./App.css";
import { Footer, PrivateRoute } from "./components";
import { Header } from "./components/Header";
import { loadAllNotifications } from "./features/notifications/notificationSlice";
import { loadPosts } from "./features/posts/postsSlice";
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
  Signup,
  Timeline,
} from "./pages";

const App = () => {
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

  useEffect(() => {
    fetchPosts();
    fetchNotifications();
  }, []);
  return (
    <div className="App">
      <Header />
      <Routes>
        <PrivateRoute path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/getting-started" element={<GettingStarted />} />
        <PrivateRoute path="/timeline" element={<Timeline />} />
        <PrivateRoute path="/notification" element={<Notification />} />
        <PrivateRoute path="/settings/profile" element={<ProfileEdit />} />
        <PrivateRoute path="/compose" element={<ComposePost />} />
        <PrivateRoute path="/following" element={<Following />} />
        <PrivateRoute path="/followers" element={<Followers />} />
        <PrivateRoute path="/post/:postId" element={<Post />} />
        <Route path="/*" element={<PageNotFound />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
