import axios, { AxiosError } from 'axios';
import { useState, useEffect } from 'react';

import { Location, WeatherInfo } from '../vite-env';
import { useUserSettings } from '.';

const WEATHER_API_URL = 'https://api.open-meteo.com/v1/forecast';

const FORECAST_OPTIONS = {
  current: ['temperature_2m', 'is_day', 'weathercode'],
  timezone: 'auto',
  forecast_days: 1,
  temperature_unit: 'celsius',
} as const;

export const useLocationsWeather = (cities: Array<Location>) => {
  const [forecast, setForecast] = useState<null | Array<WeatherInfo>>(null);
  const [error, setError] = useState<null | AxiosError>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [{ units }] = useUserSettings();

  useEffect(() => {
    setLoading(true);

    const controller = new AbortController();
    const signal = controller.signal;

    axios
      .get<Array<WeatherInfo>>(WEATHER_API_URL, {
        params: {
          ...FORECAST_OPTIONS,
          latitude: cities.reduce((lats, city) => [...lats, city.latitude], [] as Array<number>),
          longitude: cities.reduce((lats, city) => [...lats, city.latitude], [] as Array<number>),
          temperature_unit: units === 'metric' ? 'celsius' : 'fahrenheit',
        },
        signal,
      })
      .then(({ data }) => setForecast(Array.isArray(data) ? data : [data]))
      .catch((error) => setError(error?.code !== AxiosError.ERR_CANCELED ? error : null))
      .finally(() => setLoading(false));

    return () => controller.abort();
  }, [cities, units]);

  return { forecast, error, loading };
};
