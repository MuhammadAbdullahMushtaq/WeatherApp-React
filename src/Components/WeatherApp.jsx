import React, { useEffect, useState } from "react";

const WeatherApp = () => {
  const [weatherData, setWeatherData] = useState({});
  const [cityName, setCityName] = useState("");
  const [searchCityState, setSearchCityState] = useState("");
  useEffect(() => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${searchCityState}&appid=aeea4a77412d6c1856df8675ff429df6&units=metric`)
    .then((res) => res.json())
    .then((result) => {
      setWeatherData(result);
    })
    .catch((err) => {
        console.log("0rrr", err);
      });
  }, [searchCityState]);
  
  const searchCity = (e) => {
    setSearchCityState(cityName);
  };
  return (
    <div>
      <div
        className="d-flex justify-content-center my-5"
        style={{ flexDirection: "column", alignItems: "center" }}
      >
        <input
          type="text"
          value={cityName}
          className="form-group form-control w-50"
          placeholder="Enter City name"
          onChange={(e) => setCityName(e.target.value)}
        />
        <button onClick={searchCity} className="btn btn-info mb-5">
          Search
        </button>
      <li className="list-unstyled font-weight-bold text-warning h5" >CITY: {weatherData && weatherData.name} </li>
      <li className="list-unstyled font-weight-bold text-warning h5" >TEMP: {weatherData && weatherData.main && weatherData.main.temp} </li>
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