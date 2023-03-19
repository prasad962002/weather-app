import React, { useEffect, useState } from "react";
import './App.css';


function App() {
  
  const[cityName, setCityName] = useState("Rome");
  const[inputText, setinputText] = useState("Rome");
  const[data, setData] = useState([]);
  const[error, setError] = useState(false);
  const[loading, setLoading] = useState(true);
  
  useEffect(() => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=110712d8a5918e36a50c1570af8a5d0f&units=metric`)
    .then((res) => {
      if(res.status === 200){
        error && setError(false);
        return res.json();
      }else{
        throw new Error("Something went wrong");
      }
    })
    .then((data) => {
      setData(data);
      console.log(data);
    })
    .catch(() => setError(true))
    .finally(() => setLoading(false))
    
  }, [cityName, error]);


  const handleSearch = (e) => {
    if(e.key === 'Enter'){
      setCityName(e.target.value);
      setinputText("");
    }
  }

  // console.log(inputText);
  return (
    <div className="bg_img">
      {
        !loading ? (
          <>

                <input type='text' placeholder='Enter city...' value={inputText} onChange={(e) => setinputText(e.target.value)} onKeyDown={handleSearch} />
      <h1 className='city'>{data.name}</h1>

      <div className='group'>
        <img src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`} alt='WeatherImage' />
        <h1>{data.weather[0].main}</h1>
      </div>

      <h1 className='temp'>{data.main.temp.toFixed()} °C </h1>

      <div className='box-container'>
        <div className='box'>
          <p>Humidity</p>
          <h1>{data.main.humidity.toFixed()} %</h1>
        </div>
        <div className='box'>
          <p>Wind</p>
          <h1>{data.wind.speed.toFixed()} Km/h</h1>
        </div>
        <div className='box'>
          <p>Feels like</p>
          <h1>{data.main.feels_like.toFixed()} °C</h1>
        </div>
        
      </div>
          </>
        ) : null
      }
    </div>
  );
}

export default App;
