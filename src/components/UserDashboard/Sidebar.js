import React from "react";
import "./Sidebar.css";
import {
  FaCalendarAlt,
  FaInbox,
  FaBook,
  FaClipboardList,
  FaShoppingBag,
  FaCog,
} from "react-icons/fa";
import { useSelector } from "react-redux";

const Sidebar = ({ activeTab, setActiveTab }) => {
  // Access user state from Redux
  const { user, loading, error } = useSelector((state) => state.user);

  // Render loading state
  if (loading) {
    return <div className="sidebar">Loading user data...</div>;
  }

  // Render error state
  if (error) {
    return <div className="sidebar">Error: {error}</div>;
  }

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
          <h3>{user?.name || "User Name"}</h3>
          <p>{user?.phoneNumber || "+91 XXXXXXXXXX"}</p>
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
