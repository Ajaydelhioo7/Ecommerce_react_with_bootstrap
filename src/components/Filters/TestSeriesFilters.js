import React from "react";
import "./TestSeriesFilters.css";

const TestSeriesFilters = ({ filters, onFilterChange }) => {
  const handleCheckboxChange = (category, value) => {
    onFilterChange(category, value);
  };

  return (
    <div className="test-series-filters">
      <h4>Filter by</h4>

      <div className="filter-category">
        <h5>Test Type</h5>
        {filters.testTypes.map((type) => (
          <label key={type}>
            <input
              type="checkbox"
              checked={filters.selectedTestTypes.includes(type)}
              onChange={() => handleCheckboxChange("selectedTestTypes", type)}
            />
            {type}
          </label>
        ))}
      </div>

      <div className="filter-category">
        <h5>Number of Tests</h5>
        {filters.numberOfTests.map((count) => (
          <label key={count}>
            <input
              type="checkbox"
              checked={filters.selectedNumberOfTests.includes(count)}
              onChange={() =>
                handleCheckboxChange("selectedNumberOfTests", count)
              }
            />
            {count}
          </label>
        ))}
      </div>

      <div className="filter-category">
        <h5>Prices</h5>
        {filters.prices.map((price) => (
          <label key={price}>
            <input
              type="checkbox"
              checked={filters.selectedPrices.includes(price)}
              onChange={() => handleCheckboxChange("selectedPrices", price)}
            />
            {price}
          </label>
        ))}
      </div>
    </div>
  );
};

export default TestSeriesFilters;
