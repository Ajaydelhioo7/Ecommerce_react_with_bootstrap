import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import BookCard from "../components/BookCard/BookCard";
import Filters from "../components/Filters/Filters";
import "./css/Books.css";
//import axios from "axios";
import axiosInstance from "../services/axiosInstance";

const filtersData = {
  subjects: ["History", "Economic", "Polity", "Geography"],
  exams: ["UPSC", "SSC", "State PSC", "Banking"],
  categories: ["Text Book", "Objective Paper", "PYQ", "Answer Writing"],
};

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
console.log(API_BASE_URL);

const Books = () => {
  const [booksData, setBooksData] = useState([]); // Holds books fetched from the API
  const [filters, setFilters] = useState({
    ...filtersData,
    selectedSubjects: [],
    selectedExams: [],
    selectedCategories: [],
  });

  // Fetch books from the API
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axiosInstance.get("/products", {
          withCredentials: true,
        });
        const transformedBooks = response.data.map((item) => ({
          id: item.id,
          title: item.name,
          author: JSON.parse(item.description).author,
          price: item.price,
          originalPrice: JSON.parse(item.description).originalPrice,
          discount: JSON.parse(item.description).discount,
          image: `${API_BASE_URL}${item.imageUrl}`,
          subject: JSON.parse(item.description).subject,
          exam: "N/A", // Default value; adjust if API provides exam data
          category: mapCategory(item.category),
        }));
        setBooksData(transformedBooks);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    fetchBooks();
  }, []);

  // Map category number to text
  const mapCategory = (categoryNumber) => {
    const categoryMap = {
      1: "Text Book",
      2: "Objective Paper",
      3: "PYQ",
      4: "Answer Writing",
    };
    return categoryMap[categoryNumber] || "Unknown";
  };

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
