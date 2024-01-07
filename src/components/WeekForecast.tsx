import React, { FC, useEffect } from "react";
import { Accordion, AccordionItem, AccordionItemButton, AccordionItemHeading, AccordionItemPanel } from "react-accessible-accordion";

interface WeekForecastProps {
    weekData: any;
}

const WEEK_DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const WeekForecast: FC<WeekForecastProps> = ({ weekData }) => {

    const dayOfWeek = new Date().getDay();
    const forecastDays = WEEK_DAYS.slice(dayOfWeek, 5).concat(WEEK_DAYS.slice(0, dayOfWeek));

    return (
        <>
            <label className="">Five days forecast</label>
            <Accordion allowZeroExpanded>
                {weekData.map((item: any, index: number) => {
                    return <AccordionItem key={`item-${index}`}>
                        <AccordionItemHeading>
                            <AccordionItemButton>
                                <div className="bg-red-100 border flex cursor-pointer">
                                    <img alt="weather" className="w-[40px] bg-blue-100" src={`http://openweathermap.org/img/wn/${weekData[index].weather[0].icon}.png`} />
                                    <label className="mx-1 flex-1 cursor-pointer">{forecastDays[index]}</label>
                                    <label className="mx-1 flex-1 cursor-pointer">{item.weather[0].description}</label>
                                    <label className="mx-1 flex-1 cursor-pointer">{item.main.temp_min.toFixed()}°C / {item.main.temp_max.toFixed()}°C</label>
                                </div>
                            </AccordionItemButton>
                        </AccordionItemHeading>
                        <AccordionItemPanel>
                            <div className="animate-appear">
                                <div className="">
                                    <label>Pressure: </label>
                                    <label>{item.main.pressure} hPa</label>
                                </div>
                                <div className="">
                                    <label>Humidity: </label>
                                    <label>{item.main.humidity}%</label>
                                </div>
                                <div className="">
                                    <label>Clouds: </label>
                                    <label>{item.clouds.all}%</label>
                                </div>
                                <div className="">
                                    <label>Wind speed: </label>
                                    <label>{item.wind.speed} m/s</label>
                                </div>
                            </div>
                        </AccordionItemPanel>
                    </AccordionItem>
                })}
            </Accordion>
        </>
    )
}

export default WeekForecast;