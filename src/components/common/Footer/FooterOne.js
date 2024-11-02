import React from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { FaFacebook, FaInstagram, FaYoutube, FaTiktok } from "react-icons/fa";
import "./FooterOne.css";

const FooterOne = () => {
  return (
    <footer className="footer-one">
      <Container>
        <Row>
          {/* Get in Touch Section */}
          <Col md={3}>
            <h3>Let's Get In Touch</h3>
            <p>Lorem ipsum dolor sit amet, consectetur dolore magna aliqua.</p>
            <Form className="footer-subscribe-form">
              <Form.Group controlId="formEmail">
                <div className="email-input-wrapper">
                  <Form.Control type="email" placeholder="Enter your email" />
                  <Button variant="link" type="submit">
                    <i className="fa fa-arrow-right"></i>
                  </Button>
                </div>
              </Form.Group>
            </Form>
          </Col>

          {/* Links Section */}
          <Col md={3}>
            <h3>Links</h3>
            <ul className="footer-links">
              <li>
                <a href="/search">Search</a>
              </li>
              <li>
                <a href="/terms">Terms of Service</a>
              </li>
              <li>
                <a href="/refund">Refund policy</a>
              </li>
            </ul>
          </Col>

          {/* Contact Us Section */}
          <Col md={3}>
            <h3>Contact Us</h3>
            <p>+91-9654638994</p>
            <p>
              <a href="mailto:info@99notes.in">Info@99notes.in</a>
            </p>
          </Col>

          {/* Social Links Section */}
          <Col md={3}>
            <h3>Let's Get Social</h3>
            <div className="social-icons">
              <a href="https://99notes.in/">
                <FaFacebook />
              </a>
              <a href="https://99notes.in/">
                <FaInstagram />
              </a>
              <a href="https://99notes.in/">
                <FaYoutube />
              </a>
              <a href="https://99notes.in/">
                <FaTiktok />
              </a>
            </div>
          </Col>
        </Row>
      </Container>
      {/* Bottom Bar */}
      <div className="footer-bottom">
        <Container>
          <p>© 2024 99Notes.in All Rights Reserved</p>
        </Container>
      </div>
    </footer>
  );
};

export default FooterOne;
