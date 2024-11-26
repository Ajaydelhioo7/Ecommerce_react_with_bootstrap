import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import "./BookCard.css";

const BookCard = ({ book }) => {
  const { addToCart } = useCart();

  // Function to handle adding to cart without navigating
  const handleAddToCart = (e) => {
    e.stopPropagation(); // Prevent the click event from propagating to the Link
    addToCart(book);
  };

  // Function to handle buy now (this could be expanded later)
  const handleBuyNow = (e) => {
    e.stopPropagation(); // Prevent the click event from propagating to the Link
    console.log("Initiate Buy Now for:", book);
    // Additional buy now logic can go here
  };

  return (
    <div className="book-card">
      {/* Wrap the entire card in a Link for navigation to ProductDetail */}
      <Link
        to={`/product/${book.id}`}
        state={{ product: book }}
        className="book-card-link"
      >
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
        </div>
      </Link>

      {/* Separate buttons outside the Link to prevent navigation */}
      <div className="action-buttons">
        <Button variant="warning" size="sm" onClick={handleAddToCart}>
          Add to Cart
        </Button>
        <Button variant="outline-dark" size="sm" onClick={handleBuyNow}>
          Buy Now
        </Button>
      </div>
    </div>
  );
};

export default BookCard;
