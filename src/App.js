import React from "react";
import { useSelector } from "react-redux";
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
  Search,
  Signup,
  Timeline,
} from "./pages";

const App = () => {
  const { themeMode, themeColor } = useSelector((state) => state.theme);

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
