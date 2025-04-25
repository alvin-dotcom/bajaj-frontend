import React, { useState, useEffect } from 'react';
import './SearchBar.css';

const SearchBar = ({ onSearch, doctors }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    if (query.trim() === '') {
      setSuggestions([]);
      return;
    }

    const matchedDoctors = doctors
      .filter(doctor => 
        doctor.name.toLowerCase().includes(query.toLowerCase())
      )
      .slice(0, 3);

    setSuggestions(matchedDoctors);
  }, [query, doctors]);

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(query);
    setShowSuggestions(false);
  };

  const handleSuggestionClick = (name) => {
    setQuery(name);
    onSearch(name);
    setShowSuggestions(false);
  };

  return (
    <div className="search-container">
      <form onSubmit={handleSearch}>
        <input
          data-testid="autocomplete-input"
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setShowSuggestions(true);
          }}
          placeholder="Search Symptoms, Doctors, Specialists, Clinics"
          className="search-input"
        />
      </form>
      
      {showSuggestions && suggestions.length > 0 && (
        <div className="suggestions-dropdown">
          {suggestions.map((doctor) => (
            <div
              data-testid="suggestion-item"
              key={doctor.id}
              onClick={() => handleSuggestionClick(doctor.name)}
              className="suggestion-item"
            >
              {doctor.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;