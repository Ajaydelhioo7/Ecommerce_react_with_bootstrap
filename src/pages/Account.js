import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Sidebar from "../components/UserDashboard/Sidebar";
import TabContent from "../components/UserDashboard/TabContent";
import "./Account.css";

const Account = () => {
  const { authData, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>; // Show a loading spinner while checking session
  }

  if (!authData) {
    return <Navigate to="/login" />; // Redirect to login if not authenticated
  }

  return (
    <div className="account-page">
      <Sidebar />
      <div className="main-content">
        <TabContent />
      </div>
    </div>
  );
};

export default Account;
