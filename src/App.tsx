import React, { useCallback, useState } from 'react';
import axios from 'axios';
import InputText from './components/InputText';
import WeatherCard from './components/WeatherCard';
import WeekForecast from './components/WeekForecast';
import { getAPI } from './utils/api';

function App() {
  const [data, setData] = useState();
  const [weekData, setWeekData] = useState();
  
  const searchLocation = (location: string) => {
    const currentWeatherURL = `${process.env.REACT_APP_CURRENT_WEATHER_API_ENDPOINT}?q=${location}&units=metric&appid=${process.env.REACT_APP_OPENWEATHER_API_KEY}`;
    const weekForecastURL = `${process.env.REACT_APP_WEEK_WEATHER_API_ENDPOINT}?q=${location}&units=metric&appid=${process.env.REACT_APP_OPENWEATHER_API_KEY}`;
    getAPI(currentWeatherURL).then((res: any) => {
      setData(res);
    });
    getAPI(weekForecastURL).then((res: any) => {
      setWeekData(res.list.splice(0, 7));
    });
  }

  const renderCurrentWeather = useCallback(() => {
    return <>{data ? <WeatherCard weatherData={data} /> : null}</>
  }, [data]);

  const renderWeekForecast = useCallback(() => {
    return <>{weekData ? <WeekForecast weekData={weekData} /> : null}</>
  }, [weekData]);

  return (
    <div className="w-full h-full relative">
      <div className="text-center p-4">
        <InputText
          placeholder={'Type the city name here.'}
          handleEnter={searchLocation}
         />
        {renderCurrentWeather()}
        {renderWeekForecast()}
      </div>
    </div>
  );
}

export default App;
