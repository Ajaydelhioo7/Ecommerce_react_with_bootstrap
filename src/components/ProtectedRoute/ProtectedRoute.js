import React from "react";
import { Navigate } from "react-router-dom";

// Utility function to check if the user is logged in
const isLoggedIn = () => {
  const token = localStorage.getItem("jwtToken");
  return !!token; // Returns true if token exists, false otherwise
};

const ProtectedRoute = ({ children }) => {
  if (!isLoggedIn()) {
    return <Navigate to="/login" />; // Redirect to login if user is not logged in
  }
  return children; // Render the protected page if the user is logged in
};

export default ProtectedRoute;
