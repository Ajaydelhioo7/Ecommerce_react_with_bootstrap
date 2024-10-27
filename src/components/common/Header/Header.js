import logo from "../../../assets/images/99notes.webp";
import React, { useState } from "react";
import "./Header.css";
import {
  FaUser,
  FaHeart,
  FaShoppingBag,
  FaSearch,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { useCart } from "../../../context/CartContext";
import CartDrawer from "../Cart/CartDrawer"; // Import CartDrawer

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false); // Cart open state
  const { cart } = useCart();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  return (
    <header>
      {/* Top bar with promo text */}
      <div className="header-top">
        <p>10% Off on your first order. | Use Code: FIRSTORDER</p>
      </div>

      {/* Main navigation bar */}
      <div className="header-main">
        <div className="logo">
          <img src={logo} alt="Logo" className="logo-icon" />{" "}
        </div>

        {/* Search bar */}
        <div className="search-bar">
          <input type="text" placeholder="Search Products" />
          <button>
            <FaSearch />
          </button>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="nav-links">
          <a href="/books">Books</a>
          <a href="/courses">Courses</a>
          <a href="/test-series">Test Series</a>
          <a href="/continue-learning">Continue Learning</a>
        </nav>

        {/* User action icons */}
        <div className="user-actions">
          <FaUser />
          <FaHeart />
          <div className="cart-icon-container" onClick={toggleCart}>
            <FaShoppingBag />
            {cart.itemCount > 0 && (
              <span className="cart-count">{cart.itemCount}</span>
            )}
          </div>
        </div>

        {/* Hamburger icon for mobile menu */}
        <button className="hamburger-icon" onClick={toggleMobileMenu}>
          {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Slide-in mobile menu */}
      <div className={`mobile-menu ${isMobileMenuOpen ? "open" : ""}`}>
        <button className="close-menu-icon" onClick={toggleMobileMenu}>
          <FaTimes />
        </button>
        <nav>
          <a href="/books" onClick={toggleMobileMenu}>
            Books
          </a>
          <a href="/courses" onClick={toggleMobileMenu}>
            Courses
          </a>
          <a href="/test-series" onClick={toggleMobileMenu}>
            Test Series
          </a>
          <a href="/continue-learning" onClick={toggleMobileMenu}>
            Continue Learning
          </a>
        </nav>
      </div>

      {/* Slide-in Cart Drawer */}
      <CartDrawer isOpen={isCartOpen} toggleCart={toggleCart} />
    </header>
  );
};

export default Header;
