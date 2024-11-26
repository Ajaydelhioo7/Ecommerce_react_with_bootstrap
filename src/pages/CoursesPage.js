import React, { useState } from "react";
import { Container, Row, Col, Tabs, Tab } from "react-bootstrap";
import CourseCard from "../components/CourseCard/CourseCard";
import CourseFilters from "../components/Filters/CourseFilters";
import "./CoursesPage.css";

// Updated course data with courseType, subject, exam, and category added
const courseData = [
  {
    id: 1,
    title: "Polity - Subjectwise GS Programme",
    fee: 168500,
    medium: "English",
    duration: "11 Months",
    classTiming: "01:00 PM to 07:30 PM",
    courseType: "GS Pre-Foundations",
    subject: "Polity",
    exam: "UPSC",
    category: "Text Book",
    image: "https://via.placeholder.com/200",
  },
  {
    id: 2,
    title: "History - Subjectwise GS Programme",
    fee: 142000,
    medium: "Hindi",
    duration: "11 Months",
    classTiming: "01:00 PM to 07:30 PM",
    courseType: "Optional Course",
    subject: "History",
    exam: "State PSC",
    category: "Objective Paper",
    image: "https://via.placeholder.com/200",
  },
  {
    id: 3,
    title: "Economics - Subjectwise GS Programme",
    fee: 142000,
    medium: "Hindi",
    duration: "11 Months",
    classTiming: "01:00 PM to 07:30 PM",
    courseType: "Online Live Course",
    subject: "Economic",
    exam: "Banking",
    category: "Objective Paper",
    image: "https://via.placeholder.com/200",
  },
  {
    id: 4,
    title: "Geography - Subjectwise GS Programme",
    fee: 142000,
    medium: "Hindi",
    duration: "11 Months",
    classTiming: "01:00 PM to 07:30 PM",
    courseType: "Optional Course",
    subject: "Geography",
    exam: "SSC",
    category: "Objective Paper",
    image: "https://via.placeholder.com/200",
  },
  // Add more course data as needed
];

// Filter options
const filterOptions = {
  subjects: ["History", "Economic", "Polity", "Geography"],
  exams: ["UPSC", "SSC", "State PSC", "Banking"],
  categories: ["Text Book", "Objective Paper", "PYQ", "Answer Writing"],
};

const CoursesPage = () => {
  const [selectedTab, setSelectedTab] = useState("All Courses");
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

  const filteredCourses = courseData.filter((course) => {
    const isSubjectMatch =
      !filters.selectedSubjects.length ||
      filters.selectedSubjects.includes(course.subject);

    const isExamMatch =
      !filters.selectedExams.length ||
      filters.selectedExams.includes(course.exam);

    const isCategoryMatch =
      !filters.selectedCategories.length ||
      filters.selectedCategories.includes(course.category);

    const isTabMatch =
      selectedTab === "All Courses" || course.courseType === selectedTab;

    return isSubjectMatch && isExamMatch && isCategoryMatch && isTabMatch;
  });

  return (
    <Container className="courses-page">
      <h2 className="page-title mt-3">Our Courses</h2>

      {/* Top Filter Tabs for Course Type */}
      <Tabs
        activeKey={selectedTab}
        onSelect={(tab) => setSelectedTab(tab)}
        className="course-tabs p-3"
      >
        <Tab eventKey="All Courses" title="All Courses" />
        <Tab eventKey="GS Pre-Foundations" title="GS Pre-Foundations" />
        <Tab eventKey="Online Live Course" title="Online Live Course" />
        <Tab eventKey="Weekend Course" title="Weekend Course" />
        <Tab eventKey="Optional Course" title="Optional Course" />
        <Tab eventKey="Classroom Courses" title="Classroom Courses" />
      </Tabs>

      <Row>
        <Col md={3}>
          <CourseFilters
            filters={filters}
            onFilterChange={handleFilterChange}
          />
        </Col>

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
