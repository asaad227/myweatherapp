import React from 'react'

export default function WeatherLocation({data,loading,error}) {
  



  return (
    <div className='flex-container'>
        {loading && <p>Loading...</p>}
        {error && <p>Something went wrong: {error.message}</p>}
        {data && (  
            <div >
                <h1>{data.location.name}</h1>
                <p>{data.location.region}</p>
                <p>{data.location.country}</p>
                <p>{data.location.localtime}</p>
                <p>{data.current.temp_c}</p>
                <p>{data.current.condition.text}</p>
                <img src={data.current.condition.icon} alt={data.current.condition.text} />
                </div>)}
    </div>
  )
}


