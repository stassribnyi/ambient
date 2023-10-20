import { useEffect, useState } from 'react';
import { WeatherInfo } from './vite-env';

import './App.css';
import { getWMOInfo } from './getWMOInfo';

const query = {
  latitude: '50.4547',
  longitude: '30.5238',
  current:
    'temperature_2m,relativehumidity_2m,apparent_temperature,is_day,precipitation_probability,rain,showers,snowfall,weathercode,cloudcover,pressure_msl,surface_pressure,windspeed_10m',
  hourly:
    'temperature_2m,relativehumidity_2m,apparent_temperature,precipitation_probability,precipitation,rain',
  daily: 'weathercode,sunrise,sunset',
  timezone: 'auto',
};

function App() {
  const [weatherInfo, setWeatherInfo] = useState<null | WeatherInfo>(null);

  useEffect(() => {
    const url = new URL('https://api.open-meteo.com/v1/forecast');

    const params = url.searchParams;
    params.set('latitude', query.latitude);
    params.set('longitude', query.longitude);
    params.set('current', query.current);
    params.set('timezone', query.timezone);

    fetch(url.toString())
      .then((resp) => resp.json())
      .then((data) => setWeatherInfo(data))
      .catch(console.log);
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'row', gap: '2rem', alignItems: 'start' }}>
      {weatherInfo && (
        <div
          style={{
            textAlign: 'center',
            minWidth: 380,

            ...(!weatherInfo?.current.is_day && {
              color: 'white',
              backgroundColor: 'black',
            }),
          }}
        >
          <p>
            Temperature: {weatherInfo.current.temperature_2m}
            {weatherInfo?.current_units.temperature_2m}
          </p>
          <p>
            Precipitation: {weatherInfo.current.precipitation_probability}
            {weatherInfo?.current_units.precipitation_probability}
          </p>
          <p>
            Humidity: {weatherInfo.current.relativehumidity_2m}
            {weatherInfo?.current_units.relativehumidity_2m}
          </p>
          <p>
            Feels like: {weatherInfo.current.apparent_temperature}
            {weatherInfo?.current_units.apparent_temperature}
          </p>
          <p>
            Wind speed: {weatherInfo.current.windspeed_10m}
            {weatherInfo?.current_units.windspeed_10m}
          </p>
          <p>{getWMOInfo(weatherInfo)?.description}</p>
          <img
            src={getWMOInfo(weatherInfo)?.image}
            style={{ width: '100px', height: '100px' }}
          />
        </div>
      )}

      <pre
        className='prettyprint'
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(weatherInfo, undefined, 2),
        }}
      />
    </div>
  );
}

export default App;
