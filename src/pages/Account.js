import React from "react";
import Sidebar from "../components/UserDashboard/Sidebar";
import TabContent from "../components/UserDashboard/TabContent";
import "./Account.css";

const Account = () => {
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
