import axios, { AxiosError } from 'axios';
import { useState, useEffect } from 'react';

import { GeocodingInfo, WeatherInfo } from '../vite-env';

const WEATHER_API_URL = 'https://api.open-meteo.com/v1/forecast';

const FORECAST_OPTIONS = {
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
  ],
  hourly: ['temperature_2m', 'weathercode', 'relativehumidity_2m', 'precipitation_probability', 'rain'],
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
};

export const useWeather = (city: Pick<GeocodingInfo, 'latitude' | 'longitude' | 'name' | 'timezone'>) => {
  const [forecast, setForecast] = useState<null | WeatherInfo>(null);
  const [error, setError] = useState<null | AxiosError>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);

    axios
      .get<WeatherInfo>(WEATHER_API_URL, {
        params: {
          ...FORECAST_OPTIONS,
          latitude: city.latitude,
          longitude: city.longitude,
        },
      })
      .then(({ data }) => setForecast(data))
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  }, [city]);

  return { forecast, error, loading };
};
