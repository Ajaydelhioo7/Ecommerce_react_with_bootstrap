import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import BookCard from "../components/BookCard/BookCard";
import Filters from "../components/Filters/Filters";
import "./Books.css";

const booksData = [
  {
    id: 1,
    title: "Modern India",
    author: "Author A",
    price: 499,
    originalPrice: 999,
    discount: 50,
    image: "https://via.placeholder.com/150",
    subject: "History",
    exam: "UPSC",
    category: "Text Book",
  },
  {
    id: 2,
    title: "Medieval Indian",
    author: "Author B",
    price: 499,
    originalPrice: 999,
    discount: 50,
    image: "https://via.placeholder.com/150",
    subject: "History",
    exam: "SSC",
    category: "Objective Paper",
  },
  {
    id: 3,
    title: "Ancient India",
    author: "Author C",
    price: 499,
    originalPrice: 999,
    discount: 50,
    image: "https://via.placeholder.com/150",
    subject: "History",
    exam: "State PSC",
    category: "PYQ",
  },
  {
    id: 4,
    title: "Indian Polity P-1",
    author: "Author D",
    price: 499,
    originalPrice: 999,
    discount: 50,
    image: "https://via.placeholder.com/150",
    subject: "Polity",
    exam: "UPSC",
    category: "Answer Writing",
  },
  {
    id: 5,
    title: "Agriculture",
    author: "Author E",
    price: 499,
    originalPrice: 999,
    discount: 50,
    image: "https://via.placeholder.com/150",
    subject: "Geography",
    exam: "SSC",
    category: "Text Book",
  },
  {
    id: 6,
    title: "Governance",
    author: "Author F",
    price: 499,
    originalPrice: 999,
    discount: 50,
    image: "https://via.placeholder.com/150",
    subject: "Polity",
    exam: "Banking",
    category: "Objective Paper",
  },
];

const filtersData = {
  subjects: ["History", "Economic", "Polity", "Geography"],
  exams: ["UPSC", "SSC", "State PSC", "Banking"],
  categories: ["Text Book", "Objective Paper", "PYQ", "Answer Writing"],
};

const Books = () => {
  const [filters, setFilters] = useState({
    ...filtersData,
    selectedSubjects: [],
    selectedExams: [],
    selectedCategories: [],
  });

  const handleFilterChange = (category, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [category]: prevFilters[category].includes(value)
        ? prevFilters[category].filter((item) => item !== value)
        : [...prevFilters[category], value],
    }));
  };

  // Filter the books based on selected filters
  const filteredBooks = booksData.filter((book) => {
    return (
      (filters.selectedSubjects.length === 0 ||
        filters.selectedSubjects.includes(book.subject)) &&
      (filters.selectedExams.length === 0 ||
        filters.selectedExams.includes(book.exam)) &&
      (filters.selectedCategories.length === 0 ||
        filters.selectedCategories.includes(book.category))
    );
  });

  return (
    <Container className="books-page">
      <Row>
        {/* Sidebar Filters */}
        <Col md={3}>
          <Filters
            filters={filters}
            setFilters={setFilters}
            onFilterChange={handleFilterChange}
          />
        </Col>

        {/* Book Grid */}
        <Col md={9}>
          <Row>
            {filteredBooks.map((book) => (
              <Col md={4} sm={6} xs={12} key={book.id} className="mb-4">
                <BookCard book={book} />
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default Books;
