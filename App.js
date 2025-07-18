import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');

  const API_KEY = '07e3072f'; // Replace with your actual OpenWeatherMap API key

  const handleChange = (e) => {
    setCity(e.target.value);
  };

  const getWeather = async () => {
    if (!city) {
      setError('Please enter a city name.');
      setWeather(null);
      return;
    }

    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      const data = await res.json();

      if (data.cod === 200) {
        setWeather(data);
        setError('');
      } else {
        setWeather(null);
        setError('City not found.');
      }
    } catch (err) {
      console.error(err);
      setError('Something went wrong. Try again.');
      setWeather(null);
    }
  };

  return (
    <div className="weather-container">
      <h1>Weather Forecast</h1>

      <input
        type="text"
        placeholder="Enter city name"
        value={city}
        onChange={handleChange}
      />
      <button onClick={getWeather}>Get Weather</button>

      {error && <div className="error">{error}</div>}

      {weather && (
        <div className="weather-details">
          <img
            className="weather-icon"
            src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt="Weather Icon"
          />
          <h2>{weather.name}</h2>
          <p>🌡 Temperature: {weather.main.temp}°C</p>
          <p>☁ Condition: {weather.weather[0].description}</p>
          <p>💨 Wind: {weather.wind.speed} m/s</p>
        </div>
      )}
    </div>
  );
};

export default App;
