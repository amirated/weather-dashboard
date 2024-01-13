import { FC } from "react";
import { Accordion, AccordionItem, AccordionItemButton, AccordionItemHeading, AccordionItemPanel } from "react-accessible-accordion";
import { ObjectType } from "../Types";

interface WeekForecastProps {
    weekData: ObjectType;
}

const WEEK_DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const WeekForecast: FC<WeekForecastProps> = ({ weekData }) => {

    const dayOfWeek = new Date().getDay();
    const forecastDays = WEEK_DAYS.slice(dayOfWeek, 5).concat(WEEK_DAYS.slice(0, dayOfWeek));

    return (
        <div className="mt-6">
            {/* <label className="">Five days forecast</label> */}
            <Accordion allowZeroExpanded>
                {weekData.map((item: ObjectType, index: number) => {
                    return <AccordionItem key={`item-${index}`}>
                        <AccordionItemHeading>
                            <AccordionItemButton>
                                <div className="bg-white border flex cursor-pointer rounded">
                                    <img alt="weather" className="w-[40px]" src={`http://openweathermap.org/img/wn/${weekData[index].weather[0].icon}.png`} />
                                    <label className="mx-1 flex-1 cursor-pointer py-2">{forecastDays[index]}</label>
                                    <label className="mx-1 flex-1 cursor-pointer py-2">{item.weather[0].description}</label>
                                    <label className="mx-1 flex-1 cursor-pointer py-2">{item.main.temp_min.toFixed()}°C / {item.main.temp_max.toFixed()}°C</label>
                                </div>
                            </AccordionItemButton>
                        </AccordionItemHeading>
                        <AccordionItemPanel>
                            <div className="animate-appear bg-gray-50 border p-10">
                                <div className="w-[35%] flex justify-between gap-x-8 text-gray-600">
                                    <label>Pressure: </label>
                                    <label className="font-semibold">{item.main.pressure} hPa</label>
                                </div>
                                <div className="w-[35%] flex justify-between gap-x-8 text-gray-600">
                                    <label>Humidity: </label>
                                    <label className="font-semibold">{item.main.humidity}%</label>
                                </div>
                                <div className="w-[35%] flex justify-between gap-x-8 text-gray-600">
                                    <label>Clouds: </label>
                                    <label className="font-semibold">{item.clouds.all}%</label>
                                </div>
                                <div className="w-[35%] flex justify-between gap-x-8 text-gray-600">
                                    <label>Wind speed: </label>
                                    <label className="font-semibold">{item.wind.speed} m/s</label>
                                </div>
                            </div>
                        </AccordionItemPanel>
                    </AccordionItem>
                })}
            </Accordion>
        </div>
    )
}

export default WeekForecast;