import React from "react";
import Hero from "../components/Hero/Hero";
import CategoryCarousel from "../components/CategoryCarousel/CategoryCarousel";

// Dummy data for carousel items
const foundationCourses = [
  {
    id: 1,
    title: "Foundation Course 2025",
    price: "125000",
    image: "https://via.placeholder.com/150",
  },
  {
    id: 2,
    title: "Foundation Course 2026",
    price: "225000",
    image: "https://via.placeholder.com/150",
  },
  {
    id: 3,
    title: "Foundation Course 2027",
    price: "325000",
    image: "https://via.placeholder.com/150",
  },
  {
    id: 4,
    title: "Foundation Course 2028",
    price: "425000",
    image: "https://via.placeholder.com/150",
  },
  {
    id: 5,
    title: "Foundation Course 2029",
    price: "525000",
    image: "https://via.placeholder.com/150",
  },
];

const testSeries = [
  {
    id: 6,
    title: "Target 2025 Prelims",
    price: "499",
    image: "https://via.placeholder.com/150",
  },
  {
    id: 7,
    title: "Target 2026 Prelims",
    price: "988",
    image: "https://via.placeholder.com/150",
  },
  {
    id: 8,
    title: "Target 2027 Prelims",
    price: "1499",
    image: "https://via.placeholder.com/150",
  },
  {
    id: 9,
    title: "Target 2028 Prelims",
    price: "1998",
    image: "https://via.placeholder.com/150",
  },
];

const subjectWiseCourses = [
  {
    id: 10,
    title: "Full Subscription One Year",
    price: "499",
    image: "https://via.placeholder.com/150",
  },
  {
    id: 11,
    title: "Full Subscription Two Year",
    price: "988",
    image: "https://via.placeholder.com/150",
  },
  {
    id: 12,
    title: "Full Subscription Three Year",
    price: "1499",
    image: "https://via.placeholder.com/150",
  },
  {
    id: 13,
    title: "Full Subscription Four Year",
    price: "1998",
    image: "https://via.placeholder.com/150",
  },
];

const Homepage = () => {
  return (
    <div>
      <Hero />
      <CategoryCarousel
        title="Our Foundation Course"
        items={foundationCourses}
      />
      <CategoryCarousel title="Our Test Series" items={testSeries} />
      <CategoryCarousel
        title="Subject Wise Course"
        items={subjectWiseCourses}
      />
    </div>
  );
};

export default Homepage;
