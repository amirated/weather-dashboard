import { useCallback, useState } from 'react';
import InputText from './components/InputText';
import WeatherCard from './components/WeatherCard';
import WeekForecast from './components/WeekForecast';
import { getAPI } from './utils/api';

import { FaBookmark, FaRegBookmark } from "react-icons/fa6";

function App() {
  const [data, setData] = useState();
  const [currentLocation, setCurrentLocation] = useState("");
  const [savedLocations, setSavedLocations] = useState<string[]>([]);
  const [weekData, setWeekData] = useState();
  
  const searchLocation = (location: string) => {
    const currentWeatherURL = `${process.env.REACT_APP_CURRENT_WEATHER_API_ENDPOINT}?q=${location}&units=metric&appid=${process.env.REACT_APP_OPENWEATHER_API_KEY}`;
    const weekForecastURL = `${process.env.REACT_APP_WEEK_WEATHER_API_ENDPOINT}?q=${location}&units=metric&appid=${process.env.REACT_APP_OPENWEATHER_API_KEY}`;

    setCurrentLocation(location);

    getAPI(currentWeatherURL).then((res: any) => {
      setData(res);
    });
    getAPI(weekForecastURL).then((res: any) => {
      setWeekData(res.list.splice(0, 7));
    });
  }

  const renderSavedLocations = useCallback(() => {
    if (savedLocations.length === 0) {
      let savedLocationsList = localStorage.getItem('savedLocationsList') || '';
      let locationsArr = savedLocationsList.split(',');
      return <>
        {locationsArr.map((item, index) => {
          return <div>{item}</div>
        })}
        </>
    } else {
      return <>
        {savedLocations.map((item, index) => {
          return <div>{item}</div>
        })}
        </>
    }
  }, [savedLocations]);

  const renderCurrentWeather = useCallback(() => {
    return <>{data ? <WeatherCard weatherData={data} /> : null}</>
  }, [data]);

  
  
  const renderSaveStatus = useCallback(() => {
    const addToSavedLocations = () => {
      let savedLocationsList = localStorage.getItem('savedLocationsList') || '';
      if (savedLocationsList !== '') {
        savedLocationsList += ',' + currentLocation;
      } else {
        savedLocationsList = currentLocation;
      }
      localStorage.setItem('savedLocationsList', savedLocationsList);
      let locationsArr = savedLocationsList.split(',');
      setSavedLocations([...locationsArr]);
    };

    const removeFromSavedLocations = () => {
      let savedLocationsList = localStorage.getItem('savedLocationsList') || '';
      let locationsArr = savedLocationsList.split(',');
      let locationIndex = locationsArr.indexOf(currentLocation);
      locationsArr.splice(locationIndex, 1);
      savedLocationsList = locationsArr.join(',');
      localStorage.setItem('savedLocationsList', savedLocationsList);
      setSavedLocations([...locationsArr]);
    };

    let savedLocationsList = localStorage.getItem('savedLocationsList') || '';
    if (!currentLocation) {
      return null;
    } else if (savedLocationsList && savedLocationsList.indexOf(currentLocation) !== -1) {
      return <>
        <button onClick={() => removeFromSavedLocations()}>
          <FaBookmark className="text-blue-500" />
        </button>
      </>
    } else {
      return <>
        <button onClick={() => addToSavedLocations()}>
          <FaRegBookmark className="text-blue-500" />
        </button>
      </>
    }
  }, [currentLocation]);

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
        {renderSavedLocations()}
        {renderCurrentWeather()}
        {renderSaveStatus()}
        {renderWeekForecast()}
      </div>
    </div>
  );
}

export default App;
