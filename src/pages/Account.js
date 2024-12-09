import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./css/Account.css";

const Account = () => {
  const { authData, logout, loading } = useAuth(); // Use AuthContext
  const navigate = useNavigate();

  // If user data is still loading, show a loader
  if (loading) {
    return <div className="account-container">Loading user details...</div>;
  }

  // If the user is not logged in (authData is null), redirect to login
  if (!authData) {
    navigate("/login");
    return null;
  }

  // Handle logout
  const handleLogout = async () => {
    await logout(); // Call the logout function from AuthContext
    navigate("/login"); // Redirect to login page
  };

  return (
    <div className="account-container">
      <h2>My Account</h2>
      <div className="account-details">
        <div className="detail-item">
          <strong>ID:</strong> {authData.id || "N/A"}
        </div>
        <div className="detail-item">
          <strong>Name:</strong> {authData.name || "Not Provided"}
        </div>
        <div className="detail-item">
          <strong>Email:</strong> {authData.email || "Not Provided"}
        </div>
        <div className="detail-item">
          <strong>Phone Number:</strong>{" "}
          {authData.phoneNumber || "Not Provided"}
        </div>
        <div className="detail-item">
          <strong>Address:</strong> {authData.address || "Not Provided"}
        </div>
        <div className="detail-item">
          <strong>Role:</strong> {authData.role || "N/A"}
        </div>
        <div className="detail-item">
          <strong>Username:</strong> {authData.username || "Not Provided"}
        </div>
        <div className="detail-item">
          <strong>Account Created:</strong>{" "}
          {new Date(authData.createdAt).toLocaleString()}
        </div>
        <div className="detail-item">
          <strong>Last Updated:</strong>{" "}
          {new Date(authData.updatedAt).toLocaleString()}
        </div>
      </div>
      <div className="logout-container">
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Account;
