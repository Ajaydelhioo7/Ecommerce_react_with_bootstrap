import React from "react";
import "./OrderCard.css";

const OrderCard = ({ order }) => {
  const { orderDate, total, deliveryDate, status, items } = order;

  return (
    <div className="order-card">
      <div className="order-header">
        <p>ORDER PLACED</p>
        <p>TOTAL</p>
        <p>SHIP TO</p>
      </div>
      <div className="order-details">
        <p>{new Date(orderDate).toDateString()}</p>
        <p>₹{total.toFixed(2)}</p>
        <p>Danish Dilshad</p>
      </div>
      {items.map((item, index) => (
        <div className="order-item" key={index}>
          <img src={item.image} alt={item.title} className="product-image" />
          <div className="item-details">
            <h4>{item.title}</h4>
            <p>{item.description}</p>
          </div>
          <div className="item-actions">
            <button className="btn-primary">Buy it Again</button>
            <button className="btn-secondary">View your item</button>
          </div>
        </div>
      ))}
      <p className="delivery-status">
        Delivered {new Date(deliveryDate).toDateString()} - {status}
      </p>
    </div>
  );
};

export default OrderCard;
