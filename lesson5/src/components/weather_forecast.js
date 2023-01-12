import { Suspense } from 'react';
import WeatherList from './weather_list';
import CityFilter from './weather_filter';

export default function WeatherForecast() {
  return (
    <>
    <CityFilter/>
    <Suspense fallback={<div>Loading...</div>}>
      <WeatherList />
    </Suspense>
    </>
  );
}