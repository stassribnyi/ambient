import { useEffect, useState } from 'react';
import { WeatherInfo } from './vite-env';

import './App.css';
import { getWMOInfo, getWMOInfoDaily, getWMOInfoHourly } from './getWMOInfo';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faMagnifyingGlass,
  faWater,
  faWind,
} from '@fortawesome/free-solid-svg-icons';
import { addHours, compareAsc, format, isToday, subHours } from 'date-fns';

const DETAILS_QUERY = {
  latitude: 50.4547,
  longitude: 30.5238,
  current: [
    'temperature_2m',
    'relativehumidity_2m',
    'apparent_temperature',
    'is_day',
    'precipitation_probability',
    'rain',
    'showers',
    'snowfall',
    'weathercode',
    'cloudcover',
    'pressure_msl',
    'surface_pressure',
    'windspeed_10m',
  ].join(','),
  hourly: [
    'temperature_2m',
    'weathercode',
    'relativehumidity_2m',
    'precipitation_probability',
    'rain',
  ].join(','),
  daily: [
    'weathercode',
    'sunrise',
    'sunset',
    'temperature_2m_max',
    'temperature_2m_min',
  ].join(','),
  timezone: 'auto',
};

export interface Option {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  elevation: number;
  feature_code: string;
  country_code: string;
  admin1_id: number;
  timezone: string;
  population?: number;
  country_id: number;
  country: string;
  admin1: string;
  admin2_id?: number;
  admin2?: string;
}

function App() {
  const [weatherInfo, setWeatherInfo] = useState<null | WeatherInfo>(null);
  const [search, setSearch] = useState<string>('Kyiv');
  const [options, setOptions] = useState<Array<Option>>([]);
  const [city, setCity] = useState<
    Pick<Option, 'latitude' | 'longitude' | 'name' | 'timezone'>
  >({
    latitude: 50.4547,
    longitude: 30.5238,
    name: 'Kyiv',
    timezone: 'auto',
  });

  useEffect(() => {
    const url = new URL('https://api.open-meteo.com/v1/forecast');

    const params = url.searchParams;
    params.set('daily', DETAILS_QUERY.daily);
    params.set('current', DETAILS_QUERY.current);
    params.set('hourly', DETAILS_QUERY.hourly);

    params.set('latitude', `${city.latitude}`);
    params.set('longitude', `${city.longitude}`);
    params.set('timezone', city.timezone);

    fetch(url.toString())
      .then((resp) => resp.json())
      .then((data) => setWeatherInfo(data))
      .catch(console.log);
  }, [city]);

  useEffect(() => {
    if (!search?.trim().length) {
      return;
    }

    const url = new URL(
      `https://geocoding-api.open-meteo.com/v1/search?name=${search}&count=10&language=en&format=json`
    );
    fetch(url.toString())
      .then((resp) => resp.json())
      .then((res) => setOptions(res.results || []))
      .catch(console.log);
  }, [search]);

  const handleSearch = () => {
    const value = options.find((x) => x.name === search);

    if (!value) {
      setSearch('');

      return;
    }

    setCity(value);
  };

  return (
    <>
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
              boxSizing: 'border-box',
              width: '100%',
              padding: '2rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.5rem',
              color: '#346284e8',
              border: '2px solid #346284e8',

              ...(!weatherInfo?.current.is_day && {
                color: 'white',
                backgroundColor: '#346284e8',
              }),
            }}
          >
            <div
              style={{
                display: 'flex',
                gap: '2rem',
                marginBottom: '1rem',
              }}
            >
              <input
                value={search}
                style={{ width: '100%' }}
                list='city-options'
                placeholder='What is your city?'
                onChange={({ target }) => setSearch(target.value)}
                onKeyDown={(event) => {
                  if (event.code === 'Enter') {
                    handleSearch();
                  }
                }}
              />
              <datalist id='city-options'>
                {options.map((option) => (
                  <option key={option.id} value={option.name}>
                    {option.name} {option.admin1}
                  </option>
                ))}
              </datalist>
              <button onClick={handleSearch}>
                <FontAwesomeIcon icon={faMagnifyingGlass} />
              </button>
            </div>
            <p style={{ fontSize: '2rem', margin: 0, fontWeight: 700 }}>
              {city?.name}
            </p>
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
                  alignItems: 'center',
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
            <ul className='horizontal-scroll '>
              {weatherInfo.hourly.time
                .map((t, idx) => ({
                  idx,
                  time: new Date(t),
                }))
                .filter((slot) => {
                  const from = subHours(Date.now(), 1);
                  const to = addHours(from, 12);

                  return (
                    compareAsc(from, slot.time) - compareAsc(slot.time, to) ===
                    0
                  );
                })
                .map(({ time, idx }) => (
                  <li key={idx}>
                    <div>
                      <p style={{ margin: 0 }}>{format(time, 'HH:mm')}</p>
                      <img
                        src={getWMOInfoHourly(weatherInfo, idx)?.image}
                        style={{ width: '40px', height: '40px' }}
                      />
                      <p style={{ margin: 0 }}>
                        {weatherInfo.hourly.temperature_2m[idx]}
                        {weatherInfo.hourly_units.temperature_2m}
                      </p>
                    </div>
                  </li>
                ))}
            </ul>
            <details>
              <summary style={{ cursor: 'pointer' }}>
                7 Days Weather Report
              </summary>
              <ul style={{ listStyle: 'none', margin: '1rem 0 0', padding: 0 }}>
                {weatherInfo.daily.time
                  .map((t, idx) => ({
                    idx,
                    time: new Date(t),
                  }))
                  .map(({ time, idx }) => (
                    <li key={idx}>
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.75rem',
                          fontSize: '0.75rem',
                          // justifyContent: 'space-between',
                        }}
                      >
                        <p style={{ margin: 0 }}>{format(time, 'LLL d')}</p>
                        <p style={{ margin: 0, width: '38px' }}>
                          {isToday(time) ? 'Today' : format(time, 'EEE')}
                        </p>
                        <img
                          src={getWMOInfoDaily(weatherInfo, idx)?.image}
                          style={{ width: '38px', height: '38px' }}
                        />
                        <p style={{ margin: 0, width: '60px' }}>
                          {getWMOInfoDaily(weatherInfo, idx)?.description}
                        </p>
                        <p style={{ margin: 0 }}>
                          {weatherInfo.daily.temperature_2m_max[idx]}
                          {weatherInfo.daily_units.temperature_2m_max}/
                          {weatherInfo.daily.temperature_2m_min[idx]}
                          {weatherInfo.daily_units.temperature_2m_min}
                        </p>
                      </div>
                    </li>
                  ))}
              </ul>
            </details>
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
    </>
  );
}

export default App;
