import React from "react";
import { Button } from "react-bootstrap";
import { useCart } from "../../context/CartContext";
import "./BookCard.css";

const BookCard = ({ book }) => {
  const { addToCart } = useCart(); // Access addToCart function from context

  const handleAddToCart = () => {
    addToCart(book); // Add book to cart
  };

  return (
    <div className="book-card">
      <div className="book-image">
        <img src={book.image} alt={book.title} />
        <span className="discount-badge">{book.discount}% Off</span>
      </div>
      <div className="book-details">
        <h5 className="book-title">{book.title}</h5>
        <p className="book-author">by {book.author}</p>
        <p className="book-price">
          ₹ {book.price}{" "}
          <span className="original-price">₹ {book.originalPrice}</span>
        </p>
        <div className="action-buttons">
          <Button variant="warning" size="sm" onClick={handleAddToCart}>
            Add to Cart
          </Button>
          <Button variant="outline-dark" size="sm">
            Buy Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
