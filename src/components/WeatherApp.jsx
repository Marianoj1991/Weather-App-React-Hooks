import React, { useEffect, useState } from "react";
import WeatherForm from "./WeatherForm";
import WeatherMainInfo from "./WeatherMainInfo";
import styles from './weatherApp.module.css';

export default function WeatherApp() {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    loadInfo();
  }, []);

  useEffect(() => {
    document.title = `Weather | ${weather?.location.name ?? ''}`
  }, [weather]);

  async function loadInfo(city = "mendoza") {
    try {
      const resp = await fetch(
        `http://api.weatherapi.com/v1/current.json?aqi=no&key=48246c830de64519a1304336230403&q=${city}`
      );
      const data = await resp.json();
      setWeather(data);
      console.log(data);
    } catch (err) {
      throw err;
    }
  }

  function handleChangeCity(city) {
    setWeather(null);
    loadInfo(city);
  }


  return (
    <div className={styles.weatherContainer}>
      <WeatherForm onChangeCity={handleChangeCity} />
      <WeatherMainInfo weather={weather} />
      <div>{weather?.current.temp_c}</div>
    </div>
  );
}