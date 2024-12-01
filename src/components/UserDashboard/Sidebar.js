import React, { useEffect, useState } from "react";
import "./Sidebar.css";
import {
  FaCalendarAlt,
  FaInbox,
  FaBook,
  FaClipboardList,
  FaShoppingBag,
  FaCog,
} from "react-icons/fa";
import axiosInstance from "../../services/axiosInstance";

const Sidebar = ({ activeTab, setActiveTab }) => {
  const [userData, setUserData] = useState({ name: "", phoneNumber: "" });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Fetch userId from localStorage
        const response = await axiosInstance.get(`/users/7`, {
          withCredentials: true, // Ensure cookies are included
        });
        setUserData({
          name: response.data.name || "User Name",
          phoneNumber: response.data.phoneNumber || "+91 XXXXXXXXXX",
        });
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className="sidebar">
      {/* Profile Section */}
      <div className="profile-section">
        <img
          src="https://via.placeholder.com/50"
          alt="User"
          className="profile-picture"
        />
        <div className="profile-info">
          <h3>{userData.name}</h3>
          <p>{userData.phoneNumber}</p>
        </div>
        <FaCog className="settings-icon" />
      </div>

      {/* Navigation Tabs */}
      <nav className="sidebar-nav">
        <button
          className={activeTab === "dashboard" ? "active" : ""}
          onClick={() => setActiveTab("dashboard")}
        >
          <FaCalendarAlt /> Dashboard
        </button>
        <button
          className={activeTab === "calendar" ? "active" : ""}
          onClick={() => setActiveTab("calendar")}
        >
          <FaCalendarAlt /> Calendar
        </button>
        <button
          className={activeTab === "inbox" ? "active" : ""}
          onClick={() => setActiveTab("inbox")}
        >
          <FaInbox /> Inbox
        </button>
        <button
          className={activeTab === "my-course" ? "active" : ""}
          onClick={() => setActiveTab("my-course")}
        >
          <FaBook /> My Course
        </button>
        <button
          className={activeTab === "my-tests" ? "active" : ""}
          onClick={() => setActiveTab("my-tests")}
        >
          <FaClipboardList /> My Tests
        </button>
        <button
          className={activeTab === "my-purchase" ? "active" : ""}
          onClick={() => setActiveTab("my-purchase")}
        >
          <FaShoppingBag /> My Purchase
        </button>
      </nav>

      {/* Footer Links */}
      <div className="sidebar-footer">
        <button>Connect Us</button>
        <button>Rate Us</button>
        <button>Logout</button>
      </div>
    </div>
  );
};

export default Sidebar;
