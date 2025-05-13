import React, { useState } from 'react'
import axios from 'axios'
import './App.css';
function App() {
  const [city, setCity] = useState("")
  const [weather, setWeather] = useState(null)
  const [error, setError] = useState(null)

  const apiKey = "89065233a679380be0cbc0051b3ec569"

  const getWeather = async () => {
    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`)
      setWeather(response.data)
      console.log(response.data)
      setError(null)
    }
    catch (error) {
      setError("city not found")
      setWeather(null)
    }
  }
  return (
    <div className='container'>
      <h1>Weather App</h1>
      <div className='input_field'>
        <input type="text" placeholder='Enter the city' value={city} onChange={(e) => { setCity(e.target.value) }}></input>
        <button onClick={getWeather}>Get Weather</button>
      </div>
      {error && (<div>{error}</div>)}
      {weather && (
        <div className='weather_field'>
          <h2>{weather.name}</h2>
          <p>Temperature:{parseInt(weather.main.temp - 273)}°C</p>
          <p>Humidity: {weather.main.humidity}%</p>
          <p>Wind Speed: {weather.wind.speed} m/s</p>
          <p>Weather: {weather.weather[0].description}</p>
        </div>
      )}
    </div>
  )
}
export default App