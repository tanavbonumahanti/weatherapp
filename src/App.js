import React, { useState } from 'react';

const api = {
  key: "54146f5981ee6046437ab16ad16879a9",
  base: "https://api.openweathermap.org/data/2.5/"
}

function App() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  const search = evt => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&appid=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result);
          setQuery('');
          console.log(result);
        });
    }
  }

  const dateBuilder = (d) => {
    const months = ["January", "February", "March", "April", "May", "June", 
                    "July", "August", "September", "October", "November", "December"];
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", 
                  "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day}, ${date} ${month} ${year}`;
  }

  var weatherType = "";
  if (weather.weather[0].main === "Sunny" || weather.weather[0].main === "Clear") {
    weatherType = "app sunny";
  } else if (weather.weather[0].main === "Haze") {
    weatherType = "app haze";
  } else if (weather.weather[0].main === "Fog") {
    weatherType = "app fog";
  } else if (weather.weather[0].main === "Rain" || weather.weather[0].main === "Drizzle") {
    weatherType = "app rain";
  } else {
    weatherType = "app";
  }

  return (
    <div className={weatherType}>
      <main>
        <div className="search-box">
          <input 
            type="text" 
            className="search-bar" 
            placeholder="Search for a city..." 
            onChange={e => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>
        {(typeof weather.main !== "undefined") ? (
        <><div className="location-box">
            <div className="location">{weather.name}, {weather.sys.country}</div>
            <div className="date">{dateBuilder(new Date())}</div>
          </div><div className="weather-box">
              <div className="temp">{Math.round(weather.main.temp)}°C</div>
              <div className="weather">{weather.weather[0].main}</div>
            </div></>
        ) : ('')}
      </main>
    </div>
  );
}

export default App;
