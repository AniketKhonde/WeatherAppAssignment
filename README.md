# Weather App
This is a simple weather application built with React that allows users to search for current weather and 5-day forecast for cities worldwide. Users can add their favorite cities to the list for quick access.

# Getting Started
To get a local copy of this project up and running, follow these steps.

# Prerequisites
Before you begin, make sure you have the following installed on your development machine:
Node.js (v14.x or higher)
npm (v6.x or higher) or yarn (v1.x or higher)

# Installation
Clone the repository to your local machine or download code:
git clone https://github.com/AniketKhonde/WeatherAppAssignment.git

# Navigate into the project directory:
cd WeatherApp

# Install dependencies using npm or yarn:
npm install
# or
yarn install

# Obtain API Key from OpenWeatherMap
This application uses the OpenWeatherMap API to fetch weather data. To obtain an API key:
Visit OpenWeatherMap and sign up for a free account.
Once logged in, navigate to your account dashboard.
Copy your API key (APPID) from the dashboard.

# After obtaining your API key(IMP):
Create a .env file in the root directory of the project.

# Add your API key to the .env file:
REACT_APP_OPENWEATHER_API_KEY=your_api_key_here
Replace your_api_key_here with your actual API key obtained from OpenWeatherMap.


# Running the Application
# Start the JSON server:
npm run server
# after starting server to run the Weather app:
npm run dev
This will open the application in your default web browser at http://localhost:3000 or any other.

# Usage
Enter a city name in the search bar and click "Search" to fetch the current weather and 5-day forecast.
Toggle between Celsius and Fahrenheit units using the button provided.
Click on the "Add to Favorites" button to add a city to your favorites list.
Click on a favorite city from the dropdown list to view weather details directly.

# Contributing
Contributions are welcome! If you'd like to contribute to this project, please follow these steps:

Fork the repository and create your branch from main.
Make your changes and test thoroughly.
Submit a pull request describing your changes.
