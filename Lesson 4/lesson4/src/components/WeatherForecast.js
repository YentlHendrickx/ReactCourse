import { useState } from 'react';
import useFetchForecast from "../hooks/use_fetch_forecast";
import { PropagateLoader } from 'react-spinners';
import WeatherGraph from "./WeatherGraph";

function WeatherForecast() {
    const city = "Antwerp";

    const tempArray = [];
    let averageTemp = 0;
    const pressArray = [];
    let averagePress = 0;
    const humArray = [];
    let averageHum = 0;

    const {items, loading} = useFetchForecast(city);
    console.log(items);

    for (var item in items) {
        tempArray.push(items[item].main.temp);
        averageTemp += Number(items[item].main.temp);
        pressArray.push(items[item].main.pressure);
        averagePress += Number(items[item].main.pressure);
        humArray.push(items[item].main.humidity);
        averageHum += Number(items[item].main.humidity);
    }

    averageTemp /= items.length;
    averagePress /= items.length;
    averageHum /= items.length;

    return (
        <div>
            {!loading && (
                <div className='row'>
                    <WeatherGraph title={"Temperature"} average={averageTemp} dataType={"C"} data={tempArray} lineColor={"yellow"}/>
                    <WeatherGraph title={"Pressure"} average={averagePress} dataType={"hPa"} data={pressArray} lineColor={"green"}/>
                    <WeatherGraph title={"Humidity"} average={averageHum} dataType={"%"} data={humArray} lineColor={"gray"}/>
                </div>
            )}
            {loading && (
                <div className="center">
                <div className='sweet-loading'>
                  <PropagateLoader
                    color={'#3399ff'}
                    size={40}
                    loading={true}
                  />
                </div>
              </div>
            )}
        </div>
    );
}

export default WeatherForecast;