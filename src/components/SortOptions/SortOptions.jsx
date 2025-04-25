import React from 'react';
import './SortOptions.css';

const SortOptions = ({ onSortChange }) => {
  return (
    <div className="sort-section">
      <h3 data-testid="filter-header-sort" className="filter-header">
        Sort by
      </h3>
      <div className="sort-options">
        <label className="sort-option">
          <input
            data-testid="sort-fees"
            type="radio"
            name="sort"
            onChange={() => onSortChange('fee')}
            className="sort-input"
          />
          Fees (Low to High)
        </label>
        <label className="sort-option">
          <input
            data-testid="sort-experience"
            type="radio"
            name="sort"
            onChange={() => onSortChange('experience')}
            className="sort-input"
          />
          Experience (High to Low)
        </label>
      </div>
    </div>
  );
};

export default SortOptions;