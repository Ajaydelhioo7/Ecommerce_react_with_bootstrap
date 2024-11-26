import React from "react";
import "./Hero.css";
import { Carousel, Container, Row, Col, Button, Form } from "react-bootstrap";

const Hero = () => {
  return (
    <section className="hero-section">
      <Container>
        <Row className="align-items-center">
          {/* Left Side - Text and Search Input */}
          <Col md={6} className="hero-left">
            <h1>Buy Civil Services Textbooks for the best price</h1>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <Form className="hero-search">
              <Form.Control
                type="text"
                placeholder="Search for ISBN number"
                className="search-input"
              />
              <Button variant="warning" className="search-button">
                Search
              </Button>
            </Form>
          </Col>

          {/* Right Side - Carousel */}
          <Col md={6} className="hero-carousel">
            <Carousel>
              <Carousel.Item>
                <img
                  className="imgcar d-block w-100"
                  src="https://shop.99notes.in/wp-content/uploads/2024/06/World-History.png"
                  alt="Book 1"
                />
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="imgcar d-block w-100"
                  src="https://shop.99notes.in/wp-content/uploads/2024/06/World-History.png"
                  alt="Book 2"
                />
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="imgcar d-block w-100"
                  src="https://shop.99notes.in/wp-content/uploads/2024/06/World-History.png"
                  alt="Book 3"
                />
              </Carousel.Item>
            </Carousel>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Hero;
