import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../services/axiosInstance";
import "./Account.css";

const Account = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axiosInstance.get("/users/currentUser", {
          withCredentials: true,
        });
        setUserData(response.data);
      } catch (err) {
        setError("Unable to load user details. Please try again later.");
        console.error("Error fetching user data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, []);

  const handleLogout = () => {
    // Delete the jwt cookie
    document.cookie =
      "jwt=; Path=/; Max-Age=0; Expires=Thu, 01 Jan 1970 00:00:00 GMT;";
    navigate("/login"); // Redirect to login page
  };

  if (loading) {
    return <div className="account-container">Loading user details...</div>;
  }

  if (error) {
    return <div className="account-container error-message">{error}</div>;
  }

  return (
    <div className="account-container">
      <h2>My Account</h2>
      <div className="account-details">
        <div className="detail-item">
          <strong>ID:</strong> {userData.id || "N/A"}
        </div>
        <div className="detail-item">
          <strong>Name:</strong> {userData.name || "Not Provided"}
        </div>
        <div className="detail-item">
          <strong>Email:</strong> {userData.email || "Not Provided"}
        </div>
        <div className="detail-item">
          <strong>Phone Number:</strong>{" "}
          {userData.phoneNumber || "Not Provided"}
        </div>
        <div className="detail-item">
          <strong>Address:</strong> {userData.address || "Not Provided"}
        </div>
        <div className="detail-item">
          <strong>Role:</strong> {userData.role || "N/A"}
        </div>
        <div className="detail-item">
          <strong>Username:</strong> {userData.username || "Not Provided"}
        </div>
        <div className="detail-item">
          <strong>Account Created:</strong>{" "}
          {new Date(userData.createdAt).toLocaleString()}
        </div>
        <div className="detail-item">
          <strong>Last Updated:</strong>{" "}
          {new Date(userData.updatedAt).toLocaleString()}
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
