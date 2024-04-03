import axios from 'axios';
import { skipToken, useQuery } from '@tanstack/react-query';

import { useLocations } from './useLocations';

import { mapForecastToCurrent, mapForecastToHourly, mapForecastToDaily, mapForecastToSeries } from '../mappers';
import { WeatherInfo } from '../vite-env';

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
  temperature_unit: 'celsius', // FIXME: reuse global settings
} as const;

export const useForecast = () => {
  const { primary } = useLocations();

  return useQuery({
    queryKey: ['forecast', { id: primary?.id, lat: primary?.latitude, long: primary?.longitude }],
    queryFn: primary
      ? async ({ signal }) => {
          const { data } = await axios.get<WeatherInfo>(WEATHER_API_URL, {
            params: {
              ...CURRENT_FORECAST_OPTIONS,
              latitude: primary.latitude,
              longitude: primary.longitude,
            },
            signal,
          });

          // TODO: do I really need to reuse it?
          const series = mapForecastToSeries(data);
          const daily = mapForecastToDaily(data);
          const hourly = mapForecastToHourly(data, daily);
          const current = mapForecastToCurrent(data, daily, hourly);

          return {
            current,
            daily,
            hourly,
            series,
            lastUpdated: new Date(Date.now()),
          };
        }
      : skipToken,
  });
};
