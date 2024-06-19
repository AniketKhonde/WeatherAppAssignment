import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Search from './components/Search';
import WeatherDisplay from './components/WeatherDisplay';
import Favorites from './components/Favorites';
import './App.css';

const App = () => {
  // State to store weather data
  const [weatherData, setWeatherData] = useState(null);
  
  // State to store favorite cities
  const [favorites, setFavorites] = useState([]);
  
  // State to store the unit of temperature (metric for Celsius, imperial for Fahrenheit)
  const [unit, setUnit] = useState('metric');

  // Fetch favorite cities and last searched city on component mount
  useEffect(() => {
    // Fetch favorite cities from server
    const fetchFavorites = async () => {
      const response = await axios.get('http://localhost:5000/favorites');
      setFavorites(response.data);
    };
    fetchFavorites();

    // Fetch weather data for the last searched city if it exists in local storage
    const lastCity = localStorage.getItem('lastCity');
    if (lastCity) {
      handleSearch(lastCity);
    }
  }, []);

  // Handle search for weather data based on city name
  const handleSearch = async (city) => {
    // Store the last searched city in local storage
    localStorage.setItem('lastCity', city);

    // Fetch current weather data
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${import.meta.env.VITE_OPENWEATHER_API_KEY}&units=${unit}`);

    // Fetch 5-day forecast data
    const forecastResponse = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${import.meta.env.VITE_OPENWEATHER_API_KEY}&units=${unit}`);

    // Update weather data state
    setWeatherData({
      current: response.data,
      forecast: forecastResponse.data.list.filter((item, index) => index % 8 === 0) // Filter forecast data for daily data
    });
  };

  // Add a city to the favorites list
  const addToFavorites = async (city) => {
    // Check if the city is already in the favorites list
    const isFavorite = favorites.some(fav => fav.name.toLowerCase() === city.toLowerCase());
    alert("City added to favorites!");
    if (!isFavorite) {
      // Add city to favorites on the server
      await axios.post('http://localhost:5000/favorites', { name: city });
      
      // Fetch updated favorites list
      const favoritesResponse = await axios.get('http://localhost:5000/favorites');
      setFavorites(favoritesResponse.data);
    }
  };

  // Handle selection of a city from the favorites list
  const handleCitySelect = async (city) => {
    await handleSearch(city); // Fetch weather data for the selected city
  };

  // Toggle temperature unit between Celsius and Fahrenheit
  const toggleUnit = () => {
    setUnit(unit === 'metric' ? 'imperial' : 'metric');
  };

  return (
    <div className="App">
      <div className="container">
        <div className="navbar">
          <h1>WeatherApp</h1>
          {/* Search component to handle city search */}
          <Search onSearch={handleSearch} />
          {/* Button to toggle temperature unit */}
          <button className='buttons' onClick={toggleUnit}>Toggle {unit === 'metric' ? 'Fahrenheit' : 'Celsius'}</button>
          {/* Favorites component to display favorite cities */}
          <Favorites favorites={favorites} setFavorites={setFavorites} onCitySelect={handleCitySelect} />
        </div>
        
        {/* Display weather data if available */}
        {weatherData && <WeatherDisplay data={weatherData} unit={unit} addToFavorites={addToFavorites} />}
      </div>
    </div>
  );
};

export default App;
