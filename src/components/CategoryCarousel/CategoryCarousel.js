import React from "react";
import "./CategoryCarousel.css";
import { Card } from "react-bootstrap";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useNavigate } from "react-router-dom";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4,
    slidesToSlide: 1, // Slide one item at a time
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    slidesToSlide: 1,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1,
  },
};

const CategoryCarousel = ({ title, items }) => {
  const navigate = useNavigate();

  const handleItemClick = (item) => {
    // Navigate to the product detail page with dynamic product ID
    navigate(`/product/${item.id}`, { state: { product: item } });
  };

  return (
    <section className="category-carousel">
      <h2 className="category-title">{title}</h2>
      <Carousel
        responsive={responsive}
        infinite={false}
        keyBoardControl={true}
        customTransition="transform 300ms ease-in-out"
        containerClass="carousel-container"
        itemClass="carousel-item-padding" // Custom class for spacing between items
        showDots={false}
      >
        {items.map((item, index) => (
          <div
            key={index}
            className="carousel-card-container"
            onClick={() => handleItemClick(item)}
          >
            <Card className="course-card">
              <Card.Img variant="top" src={item.image} />
              <Card.Body>
                <Card.Text className="discount-badge">15% Off</Card.Text>
                <Card.Title className="course-title">{item.title}</Card.Title>
                <Card.Text className="course-price">₹ {item.price}</Card.Text>
              </Card.Body>
            </Card>
          </div>
        ))}
      </Carousel>
    </section>
  );
};

export default CategoryCarousel;
