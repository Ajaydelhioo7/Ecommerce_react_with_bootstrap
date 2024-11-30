import React from "react";
import "./BuyAgainCard.css";

const BuyAgainCard = ({ item }) => {
  const { title, price, image } = item;

  return (
    <div className="buy-again-card">
      <img
        src={image || "https://via.placeholder.com/100"}
        alt={title}
        className="product-image"
      />
      <div className="product-info">
        <h4>{title}</h4>
        <p>₹{price.toFixed(2)}</p>
        <button className="btn-primary">Buy Now</button>
      </div>
    </div>
  );
};

export default BuyAgainCard;
