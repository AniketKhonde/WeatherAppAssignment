import React, { useEffect, useState } from 'react';
import deleteIcon from '../images/delete.gif'; // Importing the delete icon image
import axios from 'axios'; // Importing Axios for HTTP requests
import '../App'; // Import your CSS file for styling

const Favorites = ({ favorites, setFavorites, onCitySelect }) => {
  const [favoriteCities, setFavoriteCities] = useState([]); // State to hold favorite cities
  const [dropdownOpen, setDropdownOpen] = useState(false); // State to manage dropdown visibility

  // Fetch favorites from the server when the component mounts or when 'favorites' changes
  useEffect(() => {
    const fetchFavorites = async () => {
      const response = await axios.get('http://localhost:5000/favorites'); // Fetch favorites from API
      setFavoriteCities(response.data); // Update favoriteCities state with fetched data
    };
    fetchFavorites(); // Call the fetchFavorites function
  }, [favorites]); // Depend on 'favorites' to refetch when it changes

  // Function to handle removal of a favorite city
  const handleRemove = async (id) => {
    await axios.delete(`http://localhost:5000/favorites/${id}`); // Send DELETE request to API
    setFavorites(favorites.filter(city => city.id !== id)); // Update 'favorites' state by filtering out the removed city
    alert("City removed successfully!"); // Show alert message after successful removal
  };

  // Function to handle selecting a favorite city
  const handleCitySelect = (city) => {
    onCitySelect(city); // Call parent component function to handle city selection
    setDropdownOpen(false); // Close the dropdown after selecting a city
  };

  return (
    <div className="favorites-dropdown">
      {/* Button to toggle dropdown visibility */}
      <button
        className="favorites-dropdown-btn, buttons" // CSS classes for styling
        onClick={() => setDropdownOpen(!dropdownOpen)} // Toggle dropdown visibility on click
        aria-expanded={dropdownOpen} // Accessibility attribute to indicate dropdown state
      >
        Favorites Cities
      </button>
      {/* Dropdown content, displayed when dropdownOpen state is true */}
      {dropdownOpen && (
        <div className="favorites-dropdown-content">
          {/* Displaying list of favorite cities */}
          {favoriteCities.map((city) => (
            <div key={city.id} className='dropdown'> {/* Container for each city */}
              {/* Button to select a city */}
              <button className='dropdowntext' onClick={() => handleCitySelect(city.name)}>{city.name}</button>
              {/* Button to remove a city */}
              <button className='dropdowntext' onClick={() => handleRemove(city.id)}>
                <img className='deleteIcon' src={deleteIcon} alt="delete" /> {/* Delete icon */}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
