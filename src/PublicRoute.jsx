import React from "react";
import { Navigate } from "react-router-dom";

const PublicRoute = ({ children }) => {
  const token = sessionStorage.getItem("token");

  if (token) {
    // Already logged in → redirect to home
    return <Navigate to="/home" replace />;
  }

  return children; // not logged in → allow access
};

export default PublicRoute;
