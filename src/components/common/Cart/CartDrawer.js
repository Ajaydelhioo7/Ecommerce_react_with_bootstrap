import React from "react";
import { useCart } from "../../../context/CartContext";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext"; // Import AuthContext
import "./CartDrawer.css";

const CartDrawer = ({ isOpen, toggleCart }) => {
  const { cart, incrementQuantity, decrementQuantity, removeFromCart } =
    useCart();
  const navigate = useNavigate();
  const { authData, loading } = useAuth(); // Access auth data and loading state

  const calculateSubtotal = () => {
    return cart.items.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
  };

  const handleCheckout = () => {
    toggleCart(); // Close the drawer

    if (loading) return; // Prevent navigation if session is still loading

    if (authData) {
      navigate("/checkout"); // Redirect to checkout if logged in
    } else {
      navigate("/login"); // Redirect to login if not logged in
    }
  };

  const handleViewCart = () => {
    toggleCart(); // Close the drawer
    navigate("/cart"); // Navigate to Cart page
  };

  return (
    <div className={`cart-drawer ${isOpen ? "open" : ""}`}>
      <div className="cart-header">
        <h2>Shopping Cart</h2>
        <button className="close-cart" onClick={toggleCart}>
          &times;
        </button>
      </div>
      <p>
        Congrats! You are eligible for <strong>FREE Shipping</strong>
      </p>
      <hr />
      {cart.items.length > 0 ? (
        <div className="cart-items">
          {cart.items.map((item, index) => (
            <div key={index} className="cart-item">
              <button
                className="remove-item"
                onClick={() => removeFromCart(item.id)}
              >
                &times;
              </button>
              <img
                src={item.image}
                alt={item.title}
                className="cart-item-image"
              />
              <div className="cart-item-details">
                <h4>{item.title}</h4>
                <p>Book Type: {item.type || "Hardbound"}</p>
                <p>₹ {item.price}</p>
                <div className="quantity-selector">
                  <Button
                    variant="outline-dark"
                    size="sm"
                    onClick={() => decrementQuantity(item.id)}
                  >
                    -
                  </Button>
                  <span>{item.quantity}</span>
                  <Button
                    variant="outline-dark"
                    size="sm"
                    onClick={() => incrementQuantity(item.id)}
                  >
                    +
                  </Button>
                </div>
              </div>
            </div>
          ))}
          <div className="cart-summary">
            <div className="subtotal">
              <p>Subtotal</p>
              <p>₹ {calculateSubtotal()}</p>
            </div>
            <Form.Check type="checkbox" label="Pay Via Gift Cards" />
            <Button
              variant="warning"
              className="checkout-button"
              onClick={handleCheckout}
            >
              CHECK OUT
            </Button>
            <Button
              variant="link"
              className="view-cart-button"
              onClick={handleViewCart}
            >
              VIEW CART
            </Button>
          </div>
        </div>
      ) : (
        <p>Your cart is empty</p>
      )}
    </div>
  );
};

export default CartDrawer;
