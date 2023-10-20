import { useEffect, useState } from 'react';
import { WeatherInfo } from './vite-env';

import './App.css';
import { getWMOInfo } from './getWMOInfo';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWater, faWind } from '@fortawesome/free-solid-svg-icons';

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
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '2rem',
        alignItems: 'start',
      }}
    >
      {weatherInfo && (
        <div
          style={{
            minWidth: 300,
            padding: '2rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem',
            color: '#346284e8',
            border: '2px solid #346284e8',

            ...(weatherInfo?.current.is_day && {
              color: 'white',
              backgroundColor: '#346284e8',
            }),
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'start',
              }}
            >
              <p style={{ fontSize: '3.5rem', margin: 0 }}>
                {weatherInfo.current.temperature_2m}
                {weatherInfo?.current_units.temperature_2m}
              </p>
              <p style={{ fontSize: '0.85rem', margin: 0 }}>
                Feels like {weatherInfo.current.apparent_temperature}
                {weatherInfo?.current_units.apparent_temperature}
              </p>
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <img
                src={getWMOInfo(weatherInfo)?.image}
                style={{ width: '84px', height: '84px' }}
              />
              <p style={{ fontSize: '0.85rem', margin: 0 }}>
                {getWMOInfo(weatherInfo)?.description}
              </p>
            </div>
          </div>

          {/* <p>
            Precipitation: {weatherInfo.current.precipitation_probability}
            {weatherInfo?.current_units.precipitation_probability}
          </p> */}

          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.5rem',
                alignItems: 'center',
              }}
            >
              <p style={{ fontSize: '1.5rem', margin: 0 }}>
                <FontAwesomeIcon icon={faWind} />{' '}
                {weatherInfo.current.windspeed_10m}
                {weatherInfo.current_units.windspeed_10m}
              </p>
              <p style={{ fontSize: '0.85rem', margin: 0 }}>Wind speed</p>
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.5rem',
                alignItems: 'center',
              }}
            >
              <p style={{ fontSize: '1.5rem', margin: 0 }}>
                <FontAwesomeIcon icon={faWater} />{' '}
                {weatherInfo.current.relativehumidity_2m}
                {weatherInfo.current_units.relativehumidity_2m}
              </p>
              <p style={{ fontSize: '0.85rem', margin: 0 }}>Humidity</p>
            </div>
          </div>
        </div>
      )}

      <details>
        <summary>API response</summary>
        <pre
          className='prettyprint'
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(weatherInfo, undefined, 2),
          }}
        />
      </details>
    </div>
  );
}

export default App;
