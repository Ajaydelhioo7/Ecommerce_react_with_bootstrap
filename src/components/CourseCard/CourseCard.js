import React from "react";
import { Button } from "react-bootstrap";
import { useCart } from "../../context/CartContext";
import "./CourseCard.css";

const CourseCard = ({ course }) => {
  const { addToCart } = useCart();

  const handleBuyNow = () => {
    addToCart(course); // Adds the course to the cart
  };

  return (
    <div className="course-card">
      <div className="course-image">
        <img src={course.image} alt={course.title} />
      </div>
      <div className="course-details">
        <h4>{course.title}</h4>
        <p>Complete Course</p>
        <p>Fee: ₹ {course.fee.toLocaleString()}</p>
        <p>Duration: {course.duration}</p>
        <p>Classes Timings: {course.timing}</p>
        <Button variant="warning" className="buy-now" onClick={handleBuyNow}>
          BUY NOW
        </Button>
      </div>
    </div>
  );
};

export default CourseCard;
