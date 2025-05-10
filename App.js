import React, { useState } from 'react';
import './App.css';

const API_KEY = '738bc30f1fb7fff7a35d441a5e0970ae';

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);

  const fetchWeather = async () => {
    if (!city) return;

    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      if (!res.ok) throw new Error('City not found');
      const data = await res.json();
      setWeather(data);
    } catch (error) {
      alert(error.message);
      setWeather(null);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') fetchWeather();
  };

  return (
    <div className="app">
      <h1>Weather App</h1>
      <div className="search">
        <input
          type="text"
          placeholder="Enter city..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button onClick={fetchWeather}>Check Weather</button>
      </div>

      {weather && (
        <div className="card">
          <h2>{weather.name}, {weather.sys.country}</h2>
          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt="weather icon"
          />
          <p><strong>Temp:</strong> {weather.main.temp} °C</p>
          <p><strong>Condition:</strong> {weather.weather[0].description}</p>
          <p><strong>Humidity:</strong> {weather.main.humidity}%</p>
          <p><strong>Wind:</strong> {weather.wind.speed} km/h</p>
        </div>
      )}
    </div>
  );
}

export default App;
