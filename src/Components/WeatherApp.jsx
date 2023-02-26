import React, { useEffect, useState } from "react";
import "./weatherApp.css";

const WeatherApp = () => {
  const [weatherData, setWeatherData] = useState({});
  const [cityName, setCityName] = useState("Karachi");
  const [locationCity, setLocationCity] = useState({});
  const [searchCityState, setSearchCityState] = useState("Karachi");

  useEffect(() => {
    function getLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          function (position) {
            console.log(position);
            setLocationCity(position);
            setCityName("");
          },
          function (error) {
            console.log("error", error);
            setSearchCityState(cityName);
          }
        );
      } else {
        alert("Geolocation is not supported by this browser.");
      }
    }
    getLocation();
  }, []);

  useEffect(() => {
    let searchQuery =
      locationCity && locationCity.coords
        ? `lat=${locationCity.coords.latitude}&lon=${locationCity.coords.longitude}`
        : `q=${searchCityState ? searchCityState : cityName}`;

    fetch(
      `https://api.openweathermap.org/data/2.5/weather?${searchQuery}&appid=aeea4a77412d6c1856df8675ff429df6&units=metric`
    )
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setWeatherData(result);
      })
      .catch((err) => {
        console.log("0rrr", err);
      });
  }, [searchCityState, locationCity]);

  const searchCity = (e) => {
    if(cityName === ''){
      alert('Enter City')
    }
    else{
      setSearchCityState(cityName);
      setLocationCity({});
    }
  };

  return (
    <div>
      <div
        className="d-flex flex-column align-items-center justify-content-center my-5"
      >
        <h1 style={{color: "white", marginBottom: '50px'}}>WeatherApp</h1>
        <input
          type="text"
          value={cityName}
          className="form-group form-control media"
          placeholder="Enter City name"
          onChange={(e) => setCityName(e.target.value)}
        />
        <button onClick={searchCity} className="btn btn-info my-5">
          Search
        </button>
      </div>
      <div className="listBox">
      <li className="list-unstyled font-weight-bold text-warning h5" >City: {weatherData && weatherData.name} </li>
      <li className="list-unstyled font-weight-bold text-warning h5" >Temp: {weatherData && weatherData.main && weatherData.main.temp} </li>
      <li className="list-unstyled font-weight-bold text-warning h5" >
        Condition:{" "}
        {weatherData &&
          weatherData.weather &&
          weatherData.weather[0] &&
          weatherData.weather[0].main}
      </li>
          </div>
    </div>
  );
};

export default WeatherApp;