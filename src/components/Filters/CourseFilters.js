import React from "react";
import "./CourseFilters.css";

const CourseFilters = ({ filters, onFilterChange }) => {
  const handleCheckboxChange = (category, value) => {
    onFilterChange(category, value);
  };

  return (
    <div className="course-filters">
      <h4>Filter by</h4>

      <div className="filter-category">
        <h5>Subject</h5>
        {filters.subjects.map((subject) => (
          <label key={subject}>
            <input
              type="checkbox"
              checked={filters.selectedSubjects.includes(subject)}
              onChange={() => handleCheckboxChange("selectedSubjects", subject)}
            />
            {subject}
          </label>
        ))}
      </div>

      <div className="filter-category">
        <h5>Exam</h5>
        {filters.exams.map((exam) => (
          <label key={exam}>
            <input
              type="checkbox"
              checked={filters.selectedExams.includes(exam)}
              onChange={() => handleCheckboxChange("selectedExams", exam)}
            />
            {exam}
          </label>
        ))}
      </div>

      <div className="filter-category">
        <h5>Category</h5>
        {filters.categories.map((category) => (
          <label key={category}>
            <input
              type="checkbox"
              checked={filters.selectedCategories.includes(category)}
              onChange={() =>
                handleCheckboxChange("selectedCategories", category)
              }
            />
            {category}
          </label>
        ))}
      </div>
    </div>
  );
};

export default CourseFilters;
