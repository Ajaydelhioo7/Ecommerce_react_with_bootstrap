import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Button,
  Form,
  Accordion,
  Card,
  Tabs,
  Tab,
} from "react-bootstrap";
import { useCart } from "../context/CartContext";
import "./ProductDetail.css";

const ProductDetail = () => {
  const { state } = useLocation();
  const product = state?.product || {};
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    addToCart({ ...product, quantity });
  };

  return (
    <Container className="product-detail">
      {/* Breadcrumb */}
      <div className="breadcrumb">
        <a href="/">Home</a> &gt; <a href="/all-products">All Product</a>
      </div>

      <Row>
        {/* Image Gallery Section */}
        <Col md={4}>
          <div className="image-gallery">
            <div className="thumbnail-list">
              {[...Array(3)].map((_, i) => (
                <img
                  key={i}
                  src={product.image}
                  alt={`Thumbnail ${i + 1}`}
                  className="thumbnail"
                />
              ))}
            </div>
            <div className="main-image">
              <img src={product.image} alt={product.title} />
            </div>
          </div>
        </Col>

        {/* Product Information Section */}
        <Col md={8}>
          <h2 className="product-title">{product.title}</h2>
          <p className="product-subtitle">
            For Civil Service Examination General Studies - 1
          </p>
          <p className="product-price">
            ₹ {product.price} <span className="original-price">₹999</span>{" "}
            <span className="discount">Save 50%</span>
          </p>

          {/* Book Type */}
          <Form.Group className="product-options">
            <Form.Label>Book Type:</Form.Label>
            <Button variant="outline-dark" className="book-type">
              Hardbound
            </Button>
          </Form.Group>

          {/* Quantity Selector */}
          <Form.Group className="quantity">
            <Form.Label>Quantity:</Form.Label>
            <div className="quantity-control">
              <Button
                variant="outline-dark"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
              >
                -
              </Button>
              <span>{quantity}</span>
              <Button
                variant="outline-dark"
                onClick={() => setQuantity(quantity + 1)}
              >
                +
              </Button>
            </div>
          </Form.Group>

          {/* Add to Cart and Buy Now Buttons */}
          <div className="action-buttons">
            <Button
              variant="warning"
              className="add-to-cart"
              onClick={handleAddToCart}
            >
              Add to Cart
            </Button>
            <Button variant="primary" className="buy-now">
              Buy Now
            </Button>
          </div>

          {/* Product Highlights Accordion */}
          <Accordion defaultActiveKey="0" className="product-highlights">
            <Accordion.Item eventKey="0">
              <Accordion.Header>Product Highlights</Accordion.Header>
              <Accordion.Body>
                <p>
                  <strong>Author:</strong> Pulakit Bharti
                </p>
                <p>
                  <strong>Language:</strong> English
                </p>
                <p>
                  <strong>Publisher:</strong> Dilshad
                </p>
                <p>
                  <strong>Pages:</strong> 335
                </p>
                <p>
                  <strong>Weight:</strong> 0.5 kg
                </p>
                <p>
                  <strong>Dimensions:</strong> 26*16*7
                </p>
                <p>
                  <strong>Edition:</strong> 34th
                </p>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>

          {/* Icons under Product Highlights */}
          <div className="highlight-icons">
            <div className="icon">📦 Pay On Delivery Available</div>
            <div className="icon">✅ 99notes Certified</div>
            <div className="icon">↩️ 7 Day Easy Return Policy</div>
          </div>
        </Col>
      </Row>

      {/* Tabs for Product Description and Sample */}
      <Row className="product-description">
        <Col>
          <Tabs defaultActiveKey="description" id="product-tabs">
            <Tab eventKey="description" title="Product Description">
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit...</p>
            </Tab>
            <Tab eventKey="sample" title="Read Sample">
              <p>Sample content of the book...</p>
            </Tab>
          </Tabs>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductDetail;
