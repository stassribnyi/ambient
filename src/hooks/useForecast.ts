import axios from 'axios';

import { WeatherInfo } from '../vite-env';
import { useLocations } from './useLocations';

import { mapForecastToCurrent, mapForecastToHourly, mapForecastToDaily, mapForecastToSeries } from '../mappers';

import { useQuery } from '@tanstack/react-query';

// FIXME: move to .env file
const WEATHER_API_URL = 'https://api.open-meteo.com/v1/forecast';

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
  hourly: [
    'temperature_2m',
    'weathercode',
    'relativehumidity_2m',
    'precipitation_probability',
    'uv_index',
    'relative_humidity_2m',
    'cloud_cover',
  ],
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
  const { current: favorite } = useLocations();

  const {
    data: currentForecast,
    error: currentForecastError,
    isLoading: isCurrentForecastLoading,
    refetch: refresh,
  } = useQuery({
    queryKey: ['forecast', { id: favorite?.id, lat: favorite?.latitude, long: favorite?.longitude }],
    queryFn: async ({ signal }) => {
      const { data } = await axios.get<WeatherInfo>(WEATHER_API_URL, {
        params: {
          ...CURRENT_FORECAST_OPTIONS,
          latitude: favorite?.latitude,
          longitude: favorite?.longitude,
        },
        signal,
      });

      // TODO: do I really need to reuse it?
      const series = mapForecastToSeries(data);
      const daily = mapForecastToDaily(data);
      const hourly = mapForecastToHourly(data, daily);
      const current = mapForecastToCurrent(data, daily, hourly);

      return {
        lastUpdated: new Date(Date.now()),
        current,
        daily,
        hourly,
        series,
      };
    },
    enabled: !!favorite,
  });

  return {
    currentForecast,
    refresh,
    error: currentForecastError,
    loading: isCurrentForecastLoading,
  };
};
