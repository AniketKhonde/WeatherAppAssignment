import React, { useState } from 'react';

// Search component definition
const Search = ({ onSearch }) => {
  // State to manage the input value for the city name
  const [city, setCity] = useState('');

  // Handle form submission to search for the city's weather
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    onSearch(city); // Call the onSearch function passed as a prop with the city name
  };

  // Handle clearing the input field
  const handleClear = () => {
    setCity(''); // Clear the city input field
  };

  return (
    // Form element to handle city search
    <form onSubmit={handleSubmit} className="search-container">
      {/* Input field for entering the city name */}
      <input
        className='searchbar'
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city"
      />
      {/* Conditional rendering of the clear button */}
      {city && <button type="button" className="clear-button" onClick={handleClear}>&times;</button>}
      {/* Submit button for the search */}
      <button type="submit" className="search-button">Search</button>
    </form>
  );
};

export default Search;
