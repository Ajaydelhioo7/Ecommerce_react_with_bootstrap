import React, { useState } from "react";
import { Container, Row, Col, Tabs, Tab } from "react-bootstrap";
import TestSeriesCard from "../components/TestSeriesCard/TestSeriesCard";
import TestSeriesFilters from "../components/Filters/TestSeriesFilters";
import "./TestSeriesPage.css";

// Updated test series data with `testSeriesType` added
const testSeriesData = [
  {
    id: 1,
    title: "NCERT Prelims Test Series",
    fee: 50000,
    testsCount: 50,
    medium: "English",
    duration: "11 Months",
    validUpto: "31-03-2025",
    category: "Prelims",
    testType: "NCERT",
    testSeriesType: "Prelims", // Added field for series type
    image: "https://via.placeholder.com/200",
  },
  {
    id: 2,
    title: "Current Affairs Mains Test Series",
    fee: 30000,
    testsCount: 30,
    medium: "English",
    duration: "12 Months",
    validUpto: "31-03-2025",
    category: "Mains",
    testType: "Current Affair",
    testSeriesType: "Mains", // Added field for series type
    image: "https://via.placeholder.com/200",
  },
  // Add more test series data as needed
];

// Filter options
const filterOptions = {
  testTypes: ["NCERT", "Sectionwise", "Full Length", "Current Affair"],
  numberOfTests: ["40 or More", "30 or More", "12 to 30", "12 or Less"],
  prices: [
    "20,000 or More",
    "5,000 to 20,000",
    "Less Than 5,000",
    "Less Than 3,000",
  ],
};

const TestSeriesPage = () => {
  const [selectedTab, setSelectedTab] = useState("All Test Series");
  const [filters, setFilters] = useState({
    ...filterOptions,
    selectedTestTypes: [],
    selectedNumberOfTests: [],
    selectedPrices: [],
  });

  const handleFilterChange = (category, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [category]: prevFilters[category].includes(value)
        ? prevFilters[category].filter((item) => item !== value)
        : [...prevFilters[category], value],
    }));
  };

  // Apply filters to test series data
  const filteredTestSeries = testSeriesData.filter((series) => {
    const isTypeMatch =
      !filters.selectedTestTypes.length ||
      filters.selectedTestTypes.includes(series.testType);

    const isCountMatch =
      !filters.selectedNumberOfTests.length ||
      (filters.selectedNumberOfTests.includes("40 or More") &&
        series.testsCount >= 40) ||
      (filters.selectedNumberOfTests.includes("30 or More") &&
        series.testsCount >= 30) ||
      (filters.selectedNumberOfTests.includes("12 to 30") &&
        series.testsCount >= 12 &&
        series.testsCount <= 30) ||
      (filters.selectedNumberOfTests.includes("12 or Less") &&
        series.testsCount <= 12);

    const isPriceMatch =
      !filters.selectedPrices.length ||
      (filters.selectedPrices.includes("20,000 or More") &&
        series.fee >= 20000) ||
      (filters.selectedPrices.includes("5,000 to 20,000") &&
        series.fee >= 5000 &&
        series.fee < 20000) ||
      (filters.selectedPrices.includes("Less Than 5,000") &&
        series.fee < 5000) ||
      (filters.selectedPrices.includes("Less Than 3,000") && series.fee < 3000);

    // Filter based on selected tab
    const isTabMatch =
      selectedTab === "All Test Series" ||
      series.testSeriesType === selectedTab;

    return isTypeMatch && isCountMatch && isPriceMatch && isTabMatch;
  });

  return (
    <Container className="test-series-page">
      <h2 className="page-title">Test Series</h2>

      {/* Category Tabs */}
      <Tabs
        activeKey={selectedTab}
        onSelect={(tab) => setSelectedTab(tab)}
        className="test-series-tabs p-3"
      >
        <Tab eventKey="All Test Series" title="All Test Series" />
        <Tab eventKey="Prelims" title="Prelims Test Series" />
        <Tab eventKey="Mains" title="Mains Test Series" />
      </Tabs>

      <Row>
        <Col md={3}>
          <TestSeriesFilters
            filters={filters}
            onFilterChange={handleFilterChange}
          />
        </Col>

        <Col md={9}>
          <Row>
            {filteredTestSeries.map((series) => (
              <Col md={6} sm={12} key={series.id} className="mb-4">
                <TestSeriesCard testSeries={series} />
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default TestSeriesPage;
