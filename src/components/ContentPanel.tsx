import { FC, useCallback, useState } from "react";
import InputText from "./InputText";
import { getAPI } from "../utils/api";
import WeatherCard from "./WeatherCard";
import { FaBookmark, FaRegBookmark } from "react-icons/fa6";
import WeekForecast from "./WeekForecast";

interface ContentPanelProps {
    updateSavedLocations: any;
}

const ContentPanel: FC<ContentPanelProps> = ({ updateSavedLocations }) => {
    const [data, setData] = useState();
    const [currentLocation, setCurrentLocation] = useState("");
    const [weekData, setWeekData] = useState();
    
    const searchLocation = (location: string) => {
        const currentWeatherURL = `${process.env.REACT_APP_CURRENT_WEATHER_API_ENDPOINT}?q=${location}&units=metric&appid=${process.env.REACT_APP_OPENWEATHER_API_KEY}`;
        const weekForecastURL = `${process.env.REACT_APP_WEEK_WEATHER_API_ENDPOINT}?q=${location}&units=metric&appid=${process.env.REACT_APP_OPENWEATHER_API_KEY}`;
    
        setCurrentLocation(location);
    
        getAPI(currentWeatherURL).then((res: any) => {
          setData(res);
        });
        getAPI(weekForecastURL).then((res: any) => {
          setWeekData(res.list.splice(0, 5));
        });
    }

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
          updateSavedLocations([...locationsArr]);
        };
    
        const removeFromSavedLocations = () => {
          let savedLocationsList = localStorage.getItem('savedLocationsList') || '';
          let locationsArr = savedLocationsList.split(',');
          let locationIndex = locationsArr.indexOf(currentLocation);
          locationsArr.splice(locationIndex, 1);
          savedLocationsList = locationsArr.join(',');
          localStorage.setItem('savedLocationsList', savedLocationsList);
          updateSavedLocations([...locationsArr]);
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
    }, [currentLocation, updateSavedLocations]);

    const renderWeekForecast = useCallback(() => {
        return <>{weekData ? <WeekForecast weekData={weekData} /> : null}</>
    }, [weekData]);

    return (
        <div className="w-10/12 p-4 bg-green-100">
            <InputText
                placeholder={'Type the city name here.'}
                handleEnter={searchLocation}
            />
            {renderCurrentWeather()}
            {renderSaveStatus()}
            <hr />
            {renderWeekForecast()}
        </div>
    );
};

export default ContentPanel;