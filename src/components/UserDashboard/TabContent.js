import React, { useEffect, useState } from "react";
import OrderCard from "./OrderCard";
import BuyAgainCard from "./BuyAgainCard";
import axiosInstance from "../../services/axiosInstance";
import "./TabContent.css";

const TabContent = ({ activeTab }) => {
  const [orders, setOrders] = useState([]);
  const [buyAgainItems, setBuyAgainItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const userId = localStorage.getItem("userId"); // Fetch userId from localStorage
        const response = await axiosInstance.get(`/users/${userId}`, {
          withCredentials: true,
        });

        const userData = response.data;
        setOrders(userData.orders || []);
        setBuyAgainItems(
          userData.orders?.flatMap((order) => order.items) || []
        );
      } catch (err) {
        setError("Failed to fetch data. Please try again later.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return <div className="tab-content">Loading...</div>;
  }

  if (error) {
    return <div className="tab-content error-message">{error}</div>;
  }

  if (activeTab === "my-purchase") {
    return (
      <div className="tab-content">
        <h2>Your Orders</h2>

        {/* Order Tabs */}
        <div className="order-tabs">
          <button className="active">Orders</button>
          <button>Buy Again</button>
          <button>Active Orders</button>
          <button>Cancelled Orders</button>
        </div>

        {/* Orders Section */}
        <div className="orders-section">
          {orders.map((order, index) => (
            <OrderCard key={index} order={order} />
          ))}
        </div>

        {/* Buy Again Section */}
        <div className="buy-again-section">
          <h3>Buy it again</h3>
          {buyAgainItems.map((item, index) => (
            <BuyAgainCard key={index} item={item} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="tab-content">
      Content for {activeTab} is under construction.
    </div>
  );
};

export default TabContent;
