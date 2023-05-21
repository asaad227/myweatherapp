import React,{useEffect, useState} from 'react'

export default function Fetch() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
            fetch(`https://api.weatherapi.com/v1/current.json?key=${process.env.REACT_APP_API_KEY}&q=London&aqi=no`)
            .then((response) => response.json())
            .then((data) => {
                setData(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching data: ", error);
                setError(error);
                setLoading(false);
            });
    }, []);
    

  return (
    <div>
        <h1>My Weather App</h1>
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


