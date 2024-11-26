import React from "react";
import { Container, Form, Button } from "react-bootstrap";
import logo from "../assets/images/99notes.webp";
import "./CheckoutPage.css";

const CheckoutPage = () => {
  return (
    <Container className="checkout-page">
      {/* Logo at the top */}
      <div className="checkout-logo">
        <img src={logo} alt="99Notes Logo" />
      </div>

      <h2 className="checkout-title">Checkout</h2>
      <h3 className="section-title">1 Enter a new shipping address</h3>

      <div className="address-form-wrapper">
        <Form className="address-form">
          <h4>Add a new address</h4>
          <Button variant="outline-secondary" className="autofill-button">
            Save time. Autofill your current location.
          </Button>

          <Form.Group>
            <Form.Label>Country/Region</Form.Label>
            <Form.Control type="text" required />
          </Form.Group>

          <Form.Group>
            <Form.Label>Receiver Name (First and Last name)</Form.Label>
            <Form.Control type="text" required />
          </Form.Group>

          <Form.Group>
            <Form.Label>Street Number</Form.Label>
            <Form.Control type="text" required />
          </Form.Group>

          <Form.Group>
            <Form.Label>Locality</Form.Label>
            <Form.Control type="text" required />
          </Form.Group>

          <Form.Group>
            <Form.Label>City</Form.Label>
            <Form.Control type="text" required />
          </Form.Group>

          <Form.Group>
            <Form.Label>State / Province / Region</Form.Label>
            <Form.Control type="text" required />
          </Form.Group>

          <Form.Group>
            <Form.Label>PIN Code</Form.Label>
            <Form.Control type="text" required />
          </Form.Group>

          <Form.Group>
            <Form.Label>Phone Number</Form.Label>
            <Form.Control type="text" required />
            <Form.Text className="text-muted">
              May be used to assist delivery
            </Form.Text>
          </Form.Group>

          <Form.Group controlId="defaultAddressCheckbox">
            <Form.Check type="checkbox" label="Use as my default address." />
          </Form.Group>

          <div className="form-buttons">
            <Button variant="outline-secondary" className="back-button">
              Back
            </Button>
            <Button variant="warning" className="next-button">
              Use this address
            </Button>
          </div>
        </Form>
      </div>
    </Container>
  );
};

export default CheckoutPage;
