import React, { FC } from "react";

interface WeatherCardProps {
    weatherData: any;
}

const WeatherCard: FC<WeatherCardProps> = ({ weatherData }) => {
    return (
        <div>
            {weatherData.weather ? (
                <div className="w-[390px] h-[180px] bg-blue-100 shadow-lg rounded-xl relative px-4 mt-[2%] mb-[2%] text-blue-900">
                    <div className="flex justify-between w-full animate-appear">
                        <div className="w-1/2 my-1 mx-auto flex justify-between items-center">
                            <div>
                                <div className="flex flex-col items-start justify-between h-full">
                                    <p className="text-xl">
                                        {weatherData.name}, {weatherData.sys.country}
                                    </p>
                                    <p className="text-sm">
                                        {weatherData.weather[0].description}
                                    </p>
                                </div>
                                <div>
                                    <h1 className="text-6xl font-semibold mt-[10px]">
                                        {weatherData.main.temp.toFixed()}°C
                                    </h1>
                                </div>
                            </div>
                        </div>

                        <div className="w-2/3 flex flex-col justify-between">
                            <div className="relative">
                                <img
                                    src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
                                    alt=""
                                    className="w-[80px]"
                                />
                            </div>
                            {weatherData.name !== undefined ? (
                                <div className="flex flex-col justify-evenly gap-y-1 mx-auto text-xs">
                                    <div className="flex justify-between gap-x-8">
                                        <p>Feels like</p>
                                        <p className="font-bold w-20 text-end">
                                            {weatherData.main.feels_like.toFixed()}°C
                                        </p>
                                    </div>
                                    <div className="flex justify-between gap-x-8">
                                        <p>Humidity</p>
                                        <p className="font-bold w-20 text-end">
                                            {weatherData.main.humidity}%
                                        </p>
                                    </div>
                                    <div className="flex justify-between gap-x-8">
                                        <p>Wind speed</p>
                                        <p className="font-bold w-20 text-end">
                                            {weatherData.wind.speed.toFixed()}KPH
                                        </p>
                                    </div>
                                    <div className="flex justify-between gap-x-8">
                                        <p>Pressure</p>
                                        <p className="font-bold w-20 text-end">
                                            {weatherData.wind.pressure}hPa
                                        </p>
                                    </div>
                                </div>
                            ) : null}
                        </div>
                    </div>
                </div>
            ): null}
        </div>
    )
}

export default WeatherCard;