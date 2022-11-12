import React, { useEffect, useState } from 'react';
import { toast, Flip } from 'react-toastify';
import { getNowcast } from '../../services/WeatherService';
import './WeatherWidget.scss'

const WeatherWidget = ({city}) => {

  const [ weather, setWeather ] = useState([])

  useEffect(() => {
		getNowcast(city)
			.then(result => {
				if(city){
					if(result.forecast[0].cloudiness > -1) {
						toast.warn("Parece que en las siguente 3 horas, va a estar nublado", {
							position: toast.POSITION.BOTTOM_RIGHT,
							hideProgressBar: true,
							closeOnClick: true,
							theme: "colored",
							transition: Flip,
							draggablePercent: 60,
							icon: "☁️",
							autoClose: 10000,
						})
					}
				}
				return result.forecast
			})
			.then(forecast => {
				setWeather(forecast)
			})
			.catch(err => console.error(err))
	}, [city])
    

  return (
    <div className='weather-card'>      
      <p>{weather[0]?.symbolPhrase}</p>
      <p>Temp: {weather[0]?.temperature}º</p>
			<p>Cloudiness: {weather[0]?.cloudiness}</p>
			<p>Rain probability: {weather[0]?.precipProb}%</p>
    </div>
  );
};

export default WeatherWidget;