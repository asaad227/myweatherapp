import React from 'react'

export default function WeekForecast({forecastday,loading,error}) {



  return (
    <div className='flex-forecast'>
{loading && <p>Loading...</p>}
{error && <p>Something went wrong: {error.message}</p>}
{forecastday.map((day) => (
    <div className='forecast-container'>
        <p>Date: {day.date}</p>
        <p>Sunrise: {day.astro.sunrise}</p>
        <p>Sunset: {day.astro.sunset}</p>
        <p>Maxtemp: {day.day.maxtemp_c}</p>
        <p>Mintemp: {day.day.mintemp_c}</p>
        <p>{day.day.condition.text}</p>
        <img src={day.day.condition.icon} alt={day.day.condition.text} />
    </div>
  ))}
    </div>
    )
}
