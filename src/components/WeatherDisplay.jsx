import React, { useState } from 'react';

// Importing icons for weather data
import temperatureIcon from '../images/temp.gif';
import humidityIcon from '../images/snow.gif';
import visibilityIcon from '../images/visiblity.gif';
import windSpeedIcon from '../images/wind.gif';

const WeatherDisplay = ({ data, unit, addToFavorites }) => {
    const { current, forecast } = data;
    const [selectedDay, setSelectedDay] = useState(null);

    // Function to handle click on a forecast day
    const handleDayClick = (index) => {
        setSelectedDay(forecast[index]); // Set the selected day's data
    };

    // Function to get the OpenWeatherMap icon URL based on the icon code
    const getIconUrl = (icon) => {
        return `http://openweathermap.org/img/wn/${icon}@2x.png`;
    };

    return (
        <>
            <div className="weather-display">
                {/* Current weather section */}
                <div className="data">
                    <div className="heading">
                        <h2>Current Weather in <br /> {current.name} </h2>
                        {/* Button to add current city to favorites */}
                        <button className='buttons' onClick={() => addToFavorites(current.name)}>Add to Favorites</button>
                    </div>
                    <div className="description">
                        {/* Display current weather icon and description */}
                        <img src={getIconUrl(current.weather[0].icon)} alt={current.weather[0].description} />
                        <p>{current.weather[0].description}</p>
                    </div>
                    <div className="datacontainer">
                        {/* Container for weather data */}
                        <div className='datacontainer1'>
                            {/* Temperature */}
                            <p className='icons'>
                                <img src={temperatureIcon} alt="Temperature" />
                                Temperature: {current.main.temp}° {unit === 'metric' ? 'C' : 'F'}
                            </p>
                            {/* Humidity */}
                            <p className='icons'>
                                <img src={humidityIcon} alt="Humidity" />
                                Humidity: {current.main.humidity}%
                            </p>
                        </div>
                        <div className='datacontainer2'>
                            {/* Visibility */}
                            <p className='icons'>
                                <img src={visibilityIcon} alt="Visibility" />
                                Visibility: {current.visibility / 1000} km
                            </p>
                            {/* Wind Speed */}
                            <p className='icons'>
                                <img src={windSpeedIcon} alt="Wind Speed" />
                                Wind Speed: {current.wind.speed} {unit === 'metric' ? 'm/s' : 'mph'}
                            </p>
                        </div>
                    </div>
                </div>

                {/* 5-day forecast section */}
                <div className="fivedata">
                    <div className="heading">
                        <h2>5-Day Forecast</h2>
                    </div>
                    <div className="forecast">
                        {/* Display each forecast day */}
                        {forecast.map((day, index) => (
                            <div key={index} className="forecast-day" onClick={() => handleDayClick(index)}>
                                {/* Date of the forecast */}
                                <p>{new Date(day.dt_txt).toLocaleDateString()}</p>
                                {/* Forecast weather icon */}
                                <img src={getIconUrl(day.weather[0].icon)} alt={day.weather[0].description} />
                                <div className='text'>
                                    {/* Forecast weather description */}
                                    <p>{day.weather[0].description}</p>
                                    {/* Forecast temperature */}
                                    <p>Temp: {day.main.temp}° {unit === 'metric' ? 'C' : 'F'}</p>
                                    {/* Forecast humidity */}
                                    <p>Humidity: {day.main.humidity}%</p>
                                    {/* Forecast visibility */}
                                    <p>Visibility: {day.visibility / 1000} km</p>
                                    {/* Forecast wind speed */}
                                    <p>Wind Speed: {day.wind.speed} {unit === 'metric' ? 'm/s' : 'mph'}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Selected day weather section */}
                {selectedDay && (
                    <div className="selected-day">
                        <h3>Weather on {new Date(selectedDay.dt_txt).toLocaleDateString()}</h3>
                        {/* Display selected day's weather icon and description */}
                        <div className="description">
                            <img src={getIconUrl(selectedDay.weather[0].icon)} alt={selectedDay.weather[0].description} />
                            <p>{selectedDay.weather[0].description}</p>
                        </div>
                        <div className="datacontainer">
                            {/* Container for selected day's weather data */}
                            <div className='datacontainer1'>
                                {/* Temperature */}
                                <p className='icons'>
                                    <img src={temperatureIcon} alt="Temperature" />
                                    Temperature: {selectedDay.main.temp}° {unit === 'metric' ? 'C' : 'F'}
                                </p>
                                {/* Humidity */}
                                <p className='icons'>
                                    <img src={humidityIcon} alt="Humidity" />
                                    Humidity: {selectedDay.main.humidity}%
                                </p>
                            </div>
                            <div className='datacontainer2'>
                                {/* Visibility */}
                                <p className='icons'>
                                    <img src={visibilityIcon} alt="Visibility" />
                                    Visibility: {selectedDay.visibility / 1000} km
                                </p>
                                {/* Wind Speed */}
                                <p className='icons'>
                                    <img src={windSpeedIcon} alt="Wind Speed" />
                                    Wind Speed: {selectedDay.wind.speed} {unit === 'metric' ? 'm/s' : 'mph'}
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default WeatherDisplay;
