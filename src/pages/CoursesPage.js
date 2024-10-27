import React, { useState } from "react";
import { Container, Row, Col, Tabs, Tab } from "react-bootstrap";
import CourseCard from "../components/CourseCard/CourseCard";
import CourseFilters from "../components/Filters/CourseFilters";
import "./CoursesPage.css";

// Sample course data, each with a category matching one of the tab labels
const coursesData = [
  {
    id: 1,
    title: "Polity - GS Foundation Course",
    fee: 168500,
    image: "https://via.placeholder.com/200",
    duration: "11 Months",
    timing: "01:00 PM to 07:30 PM",
    subject: "Polity",
    exam: "UPSC",
    category: "GS Pre-Foundations",
  },
  {
    id: 2,
    title: "History - GS Foundation Course",
    fee: 142000,
    image: "https://via.placeholder.com/200",
    duration: "11 Months",
    timing: "01:00 PM to 07:30 PM",
    subject: "History",
    exam: "UPSC",
    category: "Online Live Course",
  },
  {
    id: 3,
    title: "Indian Economy - GS Foundation Course",
    fee: 168500,
    image: "https://via.placeholder.com/200",
    duration: "11 Months",
    timing: "01:00 PM to 07:30 PM",
    subject: "Economy",
    exam: "SSC",
    category: "Weekend Course",
  },
  {
    id: 4,
    title: "Science & Technology - GS Foundation Course",
    fee: 168500,
    image: "https://via.placeholder.com/200",
    duration: "11 Months",
    timing: "01:00 PM to 07:30 PM",
    subject: "Science",
    exam: "Banking",
    category: "Classroom Courses",
  },
  // Add more courses as needed
];

const filterOptions = {
  subjects: ["History", "Economy", "Polity", "Science"],
  exams: ["UPSC", "SSC", "State PSC", "Banking"],
  categories: [
    "GS Pre-Foundations",
    "Online Live Course",
    "Weekend Course",
    "Optional Course",
    "Classroom Courses",
  ],
};

const CoursesPage = () => {
  const [selectedTab, setSelectedTab] = useState("GS Pre-Foundations");
  const [filters, setFilters] = useState({
    ...filterOptions,
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

  // Filter courses based on selected tab and filters
  const filteredCourses = coursesData.filter((course) => {
    return (
      course.category === selectedTab &&
      (filters.selectedSubjects.length === 0 ||
        filters.selectedSubjects.includes(course.subject)) &&
      (filters.selectedExams.length === 0 ||
        filters.selectedExams.includes(course.exam))
    );
  });

  return (
    <Container className="courses-page p-5">
      <h2 className="page-title">Our Courses</h2>

      {/* Course Category Tabs */}
      <Tabs
        activeKey={selectedTab}
        onSelect={(tab) => setSelectedTab(tab)}
        className="course-tabs p-5"
      >
        {filterOptions.categories.map((category) => (
          <Tab eventKey={category} title={category} key={category} />
        ))}
      </Tabs>

      <Row>
        {/* Sidebar Filters */}
        <Col md={3}>
          <CourseFilters
            filters={filters}
            onFilterChange={handleFilterChange}
          />
        </Col>

        {/* Course Grid */}
        <Col md={9}>
          <Row>
            {filteredCourses.map((course) => (
              <Col md={6} sm={12} key={course.id} className="mb-4">
                <CourseCard course={course} />
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default CoursesPage;
