import React from "react";
import { Button } from "react-bootstrap";
import { useCart } from "../../context/CartContext";
import "./TestSeriesCard.css";

const TestSeriesCard = ({ testSeries }) => {
  const { addToCart } = useCart();

  const handleBuyNow = () => {
    addToCart(testSeries); // Adds the test series to the cart
  };

  return (
    <div className="test-series-card">
      <div className="test-series-image">
        <img src={testSeries.image} alt={testSeries.title} />
      </div>
      <div className="test-series-details">
        <h4>{testSeries.title}</h4>
        <p>Fee: ₹ {testSeries.fee.toLocaleString()}</p>
        <p>Number of Tests: {testSeries.testsCount}</p>
        <p>Medium: {testSeries.medium}</p>
        <p>Duration: {testSeries.duration}</p>
        <p>Valid Upto: {testSeries.validUpto}</p>
        <Button variant="warning" className="buy-now" onClick={handleBuyNow}>
          BUY NOW
        </Button>
      </div>
    </div>
  );
};

export default TestSeriesCard;
