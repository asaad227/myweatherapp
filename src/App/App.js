
import React, { useEffect, useState } from 'react';
import './App.css';
import WeatherLocation from '../WeatherLocation';
import WeekForecast from '../WeekCast/weekforecast';

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [location, setLocation] = useState("");
  const [items, setItems] = useState(JSON.parse(localStorage.getItem("items")) || "London");

useEffect(() => {
  localStorage.setItem("items", JSON.stringify(items));
}, [items]);
 

  async function fetchData() {
    setLoading(true);
    setError(null);
    setData(null);
    try {
     
        const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${process.env.REACT_APP_API_KEY}&q=${items}&aqi=no`);
        if (response.ok) {
          const json = await response.json();
          setData(json);

        } else {
          throw response;
        }
      
    }catch (error) {
      console.error("Error fetching data: ", error);
      setError(error);
    }
    setLoading(false);
    setLocation("")
  }
  
  async function fetchWeekData() {
    setLoading(true);
    setError(null);
    setData(null);
    try {
        const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${process.env.REACT_APP_API_KEY}&q=${items}&days=7`);
        if (response.ok) {
          const json = await response.json();
          setData(json);

        } else {
          throw response;
        }
      
    }catch (error) {
      console.error("Error fetching data: ", error);
      setError(error);
    }
    setLoading(false);
    setLocation("")
  }

  
  
const forecastday = data?.forecast?.forecastday || [];

function handleFunctin(){
  if (location === "") {
    alert("Please enter a location")
  }else{
    setItems(location)
    fetchData();
    fetchWeekData();
  }
}

useEffect(() => {
  fetchData();
  fetchWeekData();
}, [items]);


  return (
    <div className='App'>
      <h1 className='header'>Weather App</h1>
      <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} placeholder='Enter your location here....' />
      <button type="button" onClick={handleFunctin}>Search</button>
  
    <WeatherLocation data={data} loading={loading} error={error} />
     <WeekForecast forecastday={forecastday} loading={loading} error={error} />
    </div>
  );
}

export default App;