import { useState, useEffect } from 'react';

import WeatherItem from './weather_item';
import { PropagateLoader } from 'react-spinners';
import useFetchForecast from '../hooks/use_fetch_forecast';

function WeatherList() {
  const [city, setCity] = useState('Antwerp');

  var paddingStyle = {
    padding: 20
  };

  var buttonStyle = {
    borderRadius: 4,
    height: 50,
    border: 0,
    margin: 5,
    color: "#FFFFFF",
    backgroundColor: "#3388ff"
  }

  const {items, loading,} = useFetchForecast(city);

  const output = items.map((item, i) => {
    return (
      <div key={i} className="columns large-2 medium-4">
        <WeatherItem item={item} city={city} />
      </div>
    )
  });

  return (
    <section style={paddingStyle}>
      <div>
        <input style={buttonStyle} type="button" value="Antwerp" onClick={() => setCity('Antwerp')} />
        <input style={buttonStyle} type="button" value="Leuven" onClick={() => setCity('Leuven')} />
      </div>
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
      {!loading && (
        <div className="row">
          {output}
        </div>
      )}
    </section>
  );
}

export default WeatherList;