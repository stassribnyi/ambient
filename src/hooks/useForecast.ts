import axios, { AxiosError } from 'axios';
import { useState, useEffect } from 'react';

import { WeatherInfo } from '../vite-env';
import { useUserSettings } from './useUserSettings';
import { useLocations } from '.';

const WEATHER_API_URL = 'https://api.open-meteo.com/v1/forecast';

const FORECAST_OPTIONS = {
  current: ['temperature_2m', 'is_day', 'weathercode'],
  timezone: 'auto',
  forecast_days: 1,
  temperature_unit: 'celsius',
} as const;

const CURRENT_FORECAST_OPTIONS = {
  current: [
    'temperature_2m',
    'relativehumidity_2m',
    'apparent_temperature',
    'is_day',
    'precipitation_probability',
    'weathercode',
    'cloudcover',
    'pressure_msl',
    'surface_pressure',
    'windspeed_10m',
  ],
  hourly: ['temperature_2m', 'weathercode', 'relativehumidity_2m', 'precipitation_probability', 'uv_index'],
  daily: [
    'weathercode',
    'sunrise',
    'sunset',
    'temperature_2m_max',
    'temperature_2m_min',
    'precipitation_probability_max',
  ],
  timezone: 'auto',
  past_days: 1,
  forecast_days: 10,
  temperature_unit: 'celsius',
} as const;

export const useForecast = () => {
  const [currentForecast, setCurrentForecast] = useState<null | WeatherInfo>(null);
  const [forecast, setForecast] = useState<null | Array<WeatherInfo>>([]);
  const [error, setError] = useState<null | AxiosError>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const [{ units }] = useUserSettings();
  const { current, locations, setLocations } = useLocations();

  const temperature_unit = units === 'metric' ? 'celsius' : 'fahrenheit';

  useEffect(() => {
    setLoading(true);

    const controller = new AbortController();
    const signal = controller.signal;

    const currentParams = {
      ...CURRENT_FORECAST_OPTIONS,
      latitude: current.latitude,
      longitude: current.longitude,
      temperature_unit,
    };

    const othersParams = {
      ...FORECAST_OPTIONS,
      latitude: locations.reduce((lats, city) => [...lats, city.latitude], [] as Array<number>),
      longitude: locations.reduce((lats, city) => [...lats, city.latitude], [] as Array<number>),
      temperature_unit,
    };

    Promise.all([
      axios.get<WeatherInfo>(WEATHER_API_URL, { params: currentParams, signal }),
      // TODO: change type
      axios.get<Array<WeatherInfo>>(WEATHER_API_URL, { params: othersParams, signal }),
    ])
      .then(([main, others]) => {
        setCurrentForecast(main.data);

        const othersForecast = Array.isArray(others.data) ? others.data : [others.data];

        setForecast(othersForecast);

        // TODO: explore other ways to preserve this info
        const updated = locations.map((location, idx) => ({
          ...location,
          temperature: othersForecast[idx]?.current.temperature_2m,
          weathercode: othersForecast[idx]?.current.weathercode,
        }));

        if (JSON.stringify(updated) !== JSON.stringify(locations)) {
          setLocations(updated);
        }
      })
      .catch((error) => setError(error?.code !== AxiosError.ERR_CANCELED ? error : null))
      .finally(() => setLoading(false));

    return () => controller.abort();
  }, [current.latitude, current.longitude, locations, setLocations, temperature_unit]);

  return { currentForecast, forecast, error, loading };
};
