import React, { useState } from "react";
import Sidebar from "../components/UserDashboard/Sidebar";
import TabContent from "../components/UserDashboard/TabContent";
import "./Account.css";

const Account = () => {
  const [activeTab, setActiveTab] = useState("orders"); // Default active tab

  return (
    <div className="account-page">
      {/* Sidebar */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content */}
      <div className="main-content">
        <TabContent activeTab={activeTab} />
      </div>
    </div>
  );
};

export default Account;
