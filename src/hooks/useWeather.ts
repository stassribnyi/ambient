import axios, { AxiosError } from 'axios';
import { useState, useEffect } from 'react';

import { Location, WeatherInfo } from '../vite-env';

const WEATHER_API_URL = 'https://api.open-meteo.com/v1/forecast';

const FORECAST_OPTIONS = {
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

export const useWeather = (
  city: Pick<Location, 'latitude' | 'longitude' | 'name' | 'timezone'>,
  unit: 'fahrenheit' | 'celsius',
) => {
  const [forecast, setForecast] = useState<null | WeatherInfo>(null);
  const [error, setError] = useState<null | AxiosError>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);

    const controller = new AbortController();
    const signal = controller.signal;

    axios
      .get<WeatherInfo>(WEATHER_API_URL, {
        params: {
          ...FORECAST_OPTIONS,
          latitude: city.latitude,
          longitude: city.longitude,
          temperature_unit: unit,
          windspeed_unit: unit === 'celsius' ? 'kmh' : 'mph',
        },
        signal,
      })
      .then(({ data }) => setForecast(data))
      .catch((error) => setError(error?.code !== AxiosError.ERR_CANCELED ? error : null))
      .finally(() => setLoading(false));

    return () => controller.abort();
  }, [city, unit]);

  return { forecast, error, loading };
};
