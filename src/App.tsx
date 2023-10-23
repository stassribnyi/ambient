import { FC, useEffect, useRef, useState } from 'react';
import { WeatherInfo } from './vite-env';

import './App.css';
import { getWMOInfo, getWMOInfoDaily, getWMOInfoHourly } from './getWMOInfo';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faLocationDot,
  faMagnifyingGlass,
  faWater,
  faWind,
} from '@fortawesome/free-solid-svg-icons';
import { addHours, compareAsc, format, isToday, subHours } from 'date-fns';
import { useDraggable } from 'react-use-draggable-scroll';

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

function getHourlyInfo(weatherInfo: WeatherInfo) {
  return weatherInfo.hourly.time
    .map((t, idx) => ({
      idx,
      time: new Date(t),
    }))
    .filter((slot) => {
      const from = subHours(Date.now(), 1);
      const to = addHours(from, 12);

      return compareAsc(from, slot.time) - compareAsc(slot.time, to) === 0;
    })
    .map(({ time, idx }) => ({
      time,
      imageUrl: getWMOInfoHourly(weatherInfo, idx)?.image,
      temperature: {
        value: weatherInfo.hourly.temperature_2m[idx],
        units: weatherInfo.hourly_units.temperature_2m,
      },
    }));
}

function getDailyInfo(weatherInfo: WeatherInfo) {
  return weatherInfo.daily.time
    .map((t, idx) => ({
      idx,
      time: new Date(t),
    }))
    .map(({ time, idx }) => ({
      time,
      imageUrl: getWMOInfoDaily(weatherInfo, idx)?.image,
      description: getWMOInfoDaily(weatherInfo, idx)?.description,
      temperature: {
        min: weatherInfo.daily.temperature_2m_min[idx],
        max: weatherInfo.daily.temperature_2m_max[idx],
        units: weatherInfo.daily_units.temperature_2m_min,
      },
    }));
}

const DailyReport: FC<Readonly<{ weatherInfo: WeatherInfo }>> = ({
  weatherInfo,
}) => (
  <table>
    {getDailyInfo(weatherInfo).map(
      ({ time, description, imageUrl, temperature }, idx) => (
        <tr key={idx}>
          <td style={{ margin: 0 }}>{format(time, 'LLL d')}</td>
          <td style={{ margin: 0, width: '38px' }}>
            {isToday(time) ? 'Today' : format(time, 'EEE')}
          </td>
          <img src={imageUrl} style={{ minWidth: '38px', width: '38px' }} />
          <td style={{ margin: 0, width: '60px' }}>{description}</td>
          <td style={{ margin: 0 }}>
            {temperature.max}
            {temperature.units}/{temperature.min}
            {temperature.units}
          </td>
        </tr>
      )
    )}
  </table>
);

const HourlyReport: FC<Readonly<{ weatherInfo: WeatherInfo }>> = ({
  weatherInfo,
}) => {
  const ref = useRef<HTMLElement>() as React.MutableRefObject<HTMLElement>;
  const { events } = useDraggable(ref);

  return (
    <figure
      {...events}
      ref={ref}
      style={{
        userSelect: 'none',
      }}
    >
      <table>
        <tr>
          {getHourlyInfo(weatherInfo).map(
            ({ time, imageUrl, temperature }, idx) => (
              <td key={idx}>
                <div>
                  <p style={{ margin: 0 }}>{format(time, 'HH:mm')}</p>
                  <img
                    draggable={false}
                    src={imageUrl}
                    style={{ width: '40px', height: '40px' }}
                  />
                  <p style={{ margin: 0 }}>
                    {temperature.value}
                    {temperature.units}
                  </p>
                </div>
              </td>
            )
          )}
        </tr>
      </table>
    </figure>
  );
};

const CurrentReport: FC<Readonly<{ weatherInfo: WeatherInfo }>> = ({
  weatherInfo,
}) => {
  const wmoInfo = getWMOInfo(weatherInfo);

  const current = {
    temperature: {
      value: weatherInfo.current.temperature_2m,
      units: weatherInfo.current_units.temperature_2m,
    },
    apparentTemperature: {
      value: weatherInfo.current.apparent_temperature,
      units: weatherInfo.current_units.apparent_temperature,
    },
    windspeed: {
      value: weatherInfo.current.windspeed_10m,
      units: weatherInfo.current_units.windspeed_10m,
    },
    relativeHumidity: {
      value: weatherInfo.current.relativehumidity_2m,
      units: weatherInfo.current_units.relativehumidity_2m,
    },
    imageUrl: wmoInfo?.image,
    description: wmoInfo?.description,
  };

  return (
    <>
      <div
        style={{
          display: 'grid',
          gridTemplate: '1fr 1fr / 3fr minmax(100px, 1fr)',
          gap: '2rem',
        }}
      >
        <div>
          <p style={{ fontSize: '3.5rem', margin: 0 }}>
            {current.temperature.value}
            {current.temperature.units}
          </p>
          <p style={{ margin: 0 }}>
            Feels like {current.apparentTemperature.value}
            {current.apparentTemperature.units}
          </p>
        </div>
        <div style={{ justifySelf: 'end' }}>
          <img
            src={current.imageUrl}
            style={{ width: '84px', height: '84px' }}
          />
          <p style={{ margin: 0 }}>{current.description}</p>
        </div>
        <div>
          <p style={{ fontSize: '1.5rem', margin: 0 }}>
            <FontAwesomeIcon icon={faWind} /> {current.windspeed.value}
            {current.windspeed.units}
          </p>
          <p style={{ margin: 0 }}>Wind speed</p>
        </div>
        <div style={{ justifySelf: 'end' }}>
          <p style={{ fontSize: '1.5rem', margin: 0 }}>
            <FontAwesomeIcon icon={faWater} /> {current.relativeHumidity.value}
            {current.relativeHumidity.units}
          </p>
          <p style={{ margin: 0 }}>Humidity</p>
        </div>
      </div>
    </>
  );
};

const LocationForm: FC<
  Readonly<{ handleSubmit: (option: Option) => void }>
> = ({ handleSubmit }) => {
  const [options, setOptions] = useState<Array<Option>>([]);
  const [search, setSearch] = useState<string>('Kyiv');

  useEffect(() => {
    if (!search?.trim().length) {
      return;
    }

    const url = new URL(
      `https://geocoding-api.open-meteo.com/v1/search?name=${search}&count=10&language=en&format=json`
    );
    fetch(url.toString())
      .then((resp) => resp.json())
      .then((res) =>
        setOptions(
          ((res.results || []) as Array<Option>).filter(
            (x) => x.latitude && x.longitude
          )
        )
      )
      .catch(console.log);
  }, [search]);

  const handleSearch = () => {
    const value = options.find((x) => x.name === search);

    if (!value) {
      setSearch('');

      return;
    }

    handleSubmit(value);
  };

  return (
    <div>
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
  );
};

async function getForecast(
  city: Pick<Option, 'latitude' | 'longitude' | 'name' | 'timezone'>
) {
  const url = new URL('https://api.open-meteo.com/v1/forecast');

  const params = url.searchParams;
  params.set('daily', DETAILS_QUERY.daily);
  params.set('current', DETAILS_QUERY.current);
  params.set('hourly', DETAILS_QUERY.hourly);

  params.set('latitude', `${city.latitude}`);
  params.set('longitude', `${city.longitude}`);
  params.set('timezone', city.timezone || DETAILS_QUERY.timezone);
  params.set('past_days', '1');

  return fetch(url.toString()).then((resp) => resp.json());
}

function App() {
  const [weatherInfo, setWeatherInfo] = useState<null | WeatherInfo>(null);
  const [isModalOpen, setOpenModal] = useState(false);
  const [city, setCity] = useState<
    Pick<Option, 'latitude' | 'longitude' | 'name' | 'timezone'>
  >({
    latitude: 50.4547,
    longitude: 30.5238,
    name: 'Kyiv',
    timezone: 'auto',
  });

  useEffect(() => {
    getForecast(city)
      .then((data) => setWeatherInfo(data))
      .catch(console.log);
  }, [city]);

  useEffect(() => {
    document.documentElement.setAttribute(
      'data-theme',
      weatherInfo?.current.is_day ? 'light' : 'dark'
    );
  }, [weatherInfo]);

  return (
    <>
      <button
        style={{
          position: 'absolute',
          top: '8px',
          left: '8px',
          width: '56px',
        }}
        onClick={() => setOpenModal(true)}
      >
        <FontAwesomeIcon icon={faLocationDot} />
      </button>
      <div>
        <h1 style={{ margin: '0 0 16px 0', textAlign: 'center' }}>
          Weather Forecast
        </h1>
        {weatherInfo && (
          <article className='grid'>
            <div>
              <h2 style={{ fontSize: '2rem', margin: 0, fontWeight: 700 }}>
                {city?.name}
              </h2>
              <CurrentReport weatherInfo={weatherInfo} />
              <HourlyReport weatherInfo={weatherInfo} />
            </div>
            <DailyReport weatherInfo={weatherInfo} />
          </article>
        )}

        <article>
          <details>
            <summary>API response</summary>
            <pre
              className='prettyprint'
              dangerouslySetInnerHTML={{
                __html: JSON.stringify(weatherInfo, undefined, 2),
              }}
            />
          </details>
        </article>
      </div>
      <dialog open={isModalOpen} onClose={() => setOpenModal(false)}>
        <article>
          <h3>Looking for your city?</h3>
          <LocationForm
            handleSubmit={(city) => {
              setCity(city);
              setOpenModal(false);
            }}
          />
        </article>
      </dialog>
    </>
  );
}

export default App;
