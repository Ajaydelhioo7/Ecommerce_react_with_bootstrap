import React from "react";
import { useCart } from "../context/CartContext";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import "./CheckoutPage.css";

const CheckoutPage = () => {
  const { cart } = useCart();

  const calculateSubtotal = () => {
    return cart.items.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
  };

  return (
    <Container className="checkout-page">
      <h2 className="page-title">Checkout</h2>

      {/* Order Summary */}
      <div className="order-summary">
        <h4>Order Summary</h4>
        {cart.items.map((item) => (
          <div key={item.id} className="checkout-item">
            <p>
              {item.title} x {item.quantity}
            </p>
            <p>₹ {item.price * item.quantity}</p>
          </div>
        ))}
        <div className="order-total">
          <p>Subtotal</p>
          <p>₹ {calculateSubtotal()}</p>
        </div>
      </div>

      {/* Shipping Information */}
      <Form className="shipping-info">
        <h4>Shipping Information</h4>
        <Form.Group>
          <Form.Label>Full Name</Form.Label>
          <Form.Control type="text" required />
        </Form.Group>
        <Form.Group>
          <Form.Label>Address</Form.Label>
          <Form.Control type="text" required />
        </Form.Group>
        <Form.Group>
          <Form.Label>City</Form.Label>
          <Form.Control type="text" required />
        </Form.Group>
        <Form.Group>
          <Form.Label>Postal Code</Form.Label>
          <Form.Control type="text" required />
        </Form.Group>
        <Form.Group>
          <Form.Label>Phone Number</Form.Label>
          <Form.Control type="text" required />
        </Form.Group>
        <Button variant="primary" type="submit" className="place-order-button">
          Place Order
        </Button>
      </Form>
    </Container>
  );
};

export default CheckoutPage;
