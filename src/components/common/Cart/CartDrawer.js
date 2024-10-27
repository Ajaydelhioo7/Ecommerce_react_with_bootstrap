import React from "react";
import { useCart } from "../../../context/CartContext";
import { Button, Form } from "react-bootstrap";
import "./CartDrawer.css";

const CartDrawer = ({ isOpen, toggleCart }) => {
  const { cart, incrementQuantity, decrementQuantity } = useCart();

  const calculateSubtotal = () => {
    return cart.items.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
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
            <Button variant="warning" className="checkout-button">
              CHECK OUT
            </Button>
            <Button variant="link" className="view-cart-button">
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
