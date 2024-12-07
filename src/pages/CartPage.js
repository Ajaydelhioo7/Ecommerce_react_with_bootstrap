import React from "react";
import { useCart } from "../context/CartContext";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./css/CartPage.css";

const CartPage = () => {
  const { cart, incrementQuantity, decrementQuantity, removeFromCart } =
    useCart();
  const navigate = useNavigate();

  const calculateSubtotal = () => {
    return cart.items.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
  };

  return (
    <Container className="cart-page">
      <h2 className="page-title">Shopping Cart</h2>
      <div className="breadcrumb">
        <a href="/">Home</a> &gt; <span>Your Shopping Cart</span>
      </div>
      <p>
        Congrats! You are eligible for <strong>FREE Shipping</strong>
      </p>
      <hr className="divider" />

      {cart.items.length > 0 ? (
        <div className="cart-table">
          {cart.items.map((item) => (
            <Row key={item.id} className="cart-item">
              <Col md={2} className="product-image">
                <img src={item.image} alt={item.title} />
              </Col>
              <Col md={4} className="product-details">
                <h4>{item.title}</h4>
                <p>For Civil Service Examination General Studies</p>
                <button
                  className="remove-item"
                  onClick={() => removeFromCart(item.id)}
                >
                  Remove
                </button>
              </Col>
              <Col md={2} className="product-price">
                ₹ {item.price}
              </Col>
              <Col md={2} className="product-quantity">
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
              </Col>
              <Col md={2} className="product-total">
                ₹ {item.price * item.quantity}
              </Col>
            </Row>
          ))}

          <div className="cart-summary">
            <div className="subtotal">
              <p>Subtotal</p>
              <p>₹ {calculateSubtotal()}</p>
            </div>
            <Form.Check
              type="checkbox"
              label="Pay Via Gift Cards"
              className="gift-card-check"
            />
            <Button
              variant="warning"
              className="checkout-button"
              onClick={() => navigate("/checkout")}
            >
              CHECK OUT
            </Button>
          </div>
        </div>
      ) : (
        <p>Your cart is empty</p>
      )}
    </Container>
  );
};

export default CartPage;
