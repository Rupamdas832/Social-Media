import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Header } from "./components/Header";
import {
  GettingStarted,
  Home,
  Login,
  Notification,
  PageNotFound,
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
        <Route path="/*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
};

export default App;
