import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Footer } from "./components";
import { Header } from "./components/Header";
import {
  ComposePost,
  GettingStarted,
  Home,
  Login,
  Notification,
  PageNotFound,
  ProfileEdit,
  Signup,
  Timeline,
} from "./pages";

const App = () => {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/getting-started" element={<GettingStarted />} />
        <Route path="/timeline" element={<Timeline />} />
        <Route path="/notification" element={<Notification />} />
        <Route path="/settings/profile" element={<ProfileEdit />} />
        <Route path="/compose" element={<ComposePost />} />
        <Route path="/*" element={<PageNotFound />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
