import { FC, useCallback, useEffect, useState } from "react";
import InputText from "./InputText";
import { getAPI } from "../utils/api";
import WeatherCard from "./WeatherCard";
import { FaBookmark, FaRegBookmark } from "react-icons/fa6";
import WeekForecast from "./WeekForecast";
import EmptyContent from "./EmptyContent";
import ErrorView from "./ErrorView";
import { LocationKeyType, LocationListType, ObjectType } from "../Types";

interface ContentPanelProps {
    updateSavedLocations: (savedLocationsList: LocationListType) => void;
    selectedLocationKey: LocationKeyType;
}

const ContentPanel: FC<ContentPanelProps> = ({ updateSavedLocations, selectedLocationKey }) => {
    const [data, setData] = useState<ObjectType>();
    const [currentLocation, setCurrentLocation] = useState("");
    const [weekData, setWeekData] = useState();
    const [showError, setShowError] = useState(false);

    useEffect(() => {
      if (selectedLocationKey && selectedLocationKey !== "") {
        setCurrentLocation(selectedLocationKey);
        searchLocation(selectedLocationKey);
      }
    }, [selectedLocationKey]);
    
    const searchLocation = (location: string) => {
        const currentWeatherURL = `${process.env.REACT_APP_CURRENT_WEATHER_API_ENDPOINT}?q=${location}&units=metric&appid=${process.env.REACT_APP_OPENWEATHER_API_KEY}`;
        const weekForecastURL = `${process.env.REACT_APP_WEEK_WEATHER_API_ENDPOINT}?q=${location}&units=metric&appid=${process.env.REACT_APP_OPENWEATHER_API_KEY}`;
    
        
        getAPI(currentWeatherURL).then((res: ObjectType) => {
          setCurrentLocation(location);
          setData(res);
        }).catch(() => {
          setShowError(true);
        });
        getAPI(weekForecastURL).then((res: ObjectType) => {
          setCurrentLocation(location);
          setWeekData(res.list.splice(0, 5));
        }).catch(() => {
          setShowError(true);
        });
    }

    const renderCurrentWeather = useCallback(() => {
        return <>{data ? <WeatherCard weatherData={data} /> : null}</>
    }, [data]);

    const renderSaveStatus = useCallback(() => {
        const addToSavedLocations = (locationData: ObjectType) => {
          let savedLocationsListString = localStorage.getItem('savedLocationsList');
          let savedLocationsList: LocationListType = [];
          if (savedLocationsListString && savedLocationsListString !== "") {
            savedLocationsList = JSON.parse(savedLocationsListString);
            let newItem = {
              key: currentLocation,
              name: locationData.data.name,
              country: locationData.data.sys.country,
              temperature: locationData.data.main.temp,
              description: locationData.data.weather[0].description,
              icon: locationData.data.weather[0].icon
            };
            savedLocationsList?.push(newItem);
          } else {
            let newItem = {
              key: currentLocation,
              name: locationData.data.name,
              country: locationData.data.sys.country,
              temperature: locationData.data.main.temp,
              description: locationData.data.weather[0].description,
              icon: locationData.data.weather[0].icon
            };
            savedLocationsList.push(newItem);
          }
          let savedLocationsListJSONString = JSON.stringify(savedLocationsList);
          localStorage.setItem('savedLocationsList', savedLocationsListJSONString);
          updateSavedLocations(savedLocationsList);
        };
    
        const removeFromSavedLocations = () => {
          let savedLocationsListString = localStorage.getItem('savedLocationsList');
          let savedLocationsList: LocationListType = [];
          if (savedLocationsListString && savedLocationsListString !== "") {
            savedLocationsList = JSON.parse(savedLocationsListString);
            savedLocationsList = savedLocationsList?.filter((item: ObjectType) => {
              return currentLocation !== item.key;
            });
            localStorage.setItem('savedLocationsList', JSON.stringify(savedLocationsList));
            updateSavedLocations(savedLocationsList);
          }
        };
    
        let savedLocationsList = localStorage.getItem('savedLocationsList') || '';
        if (!currentLocation) {
          return null;
        } else if (savedLocationsList && savedLocationsList.indexOf(currentLocation) !== -1) {
          return <>
            <button className="relative left-[230px]" onClick={() => removeFromSavedLocations()}>
              <FaBookmark className="text-blue-500" />
            </button>
          </>
        } else {
          return <>
            <button className="relative left-[230px]" onClick={() => addToSavedLocations({data})}>
              <FaRegBookmark className="text-blue-500" />
            </button>
          </>
        }
    }, [data, currentLocation, updateSavedLocations]);

    const renderWeekForecast = useCallback(() => {
        return <>{weekData ? <WeekForecast weekData={weekData} /> : null}</>
    }, [weekData]);

    return (
        <div className="w-9/12 p-4 bg-gray-100">
            <InputText
                placeholder={'Type the city name here.'}
                handleEnter={searchLocation}
            />
            {currentLocation && data ? 
              <>
                {renderCurrentWeather()}
                <label className="text-gray-500 font-semibold">Five days forecast</label>
                {renderSaveStatus()}
                {renderWeekForecast()}
              </>
            : <div>
                {showError ? <ErrorView /> : <EmptyContent />}
              </div>
            }
        </div>
    );
};

export default ContentPanel;