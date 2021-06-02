import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Route } from "react-router-dom";

export const PrivateRoute = ({ path, ...props }) => {
  const { isUserLogin } = useSelector((state) => state.user);

  if (isUserLogin) {
    return <Route {...props} />;
  } else return <Navigate to="/login" replace state={{ from: path }} />;
};
