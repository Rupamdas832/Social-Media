import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Footer, PrivateRoute } from "./components";
import { Header } from "./components/Header";
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
