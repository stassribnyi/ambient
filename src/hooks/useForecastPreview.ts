import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

import { ForecastPreview, WeatherInfo } from '../vite-env';
import { useLocations } from './useLocations';

// FIXME: move to .env file
const WEATHER_API_URL = 'https://api.open-meteo.com/v1/forecast';

const FORECAST_OPTIONS = {
  current: ['temperature_2m', 'is_day', 'weathercode'],
  timezone: 'auto',
  forecast_days: 1,
  temperature_unit: 'celsius', // FIXME: reuse global settings
} as const;

export const useForecastPreview = (locationId: ForecastPreview['locationId']) => {
  const { locations } = useLocations();

  const selected = locations.find((item) => item.id === locationId);

  return useQuery({
    queryKey: ['forecast-preview', { id: selected?.id, lat: selected?.latitude, long: selected?.longitude }],
    queryFn: async ({ signal }) => {
      const { data } = await axios.get<WeatherInfo>(WEATHER_API_URL, {
        params: {
          ...FORECAST_OPTIONS,
          latitude: selected?.latitude,
          longitude: selected?.longitude,
        },
        signal,
      });

      return {
        locationId: selected?.id,
        temperature: data?.current.temperature_2m,
        weathercode: data?.current.weathercode,
        isDay: data?.current.is_day,
      };
    },
    enabled: !!selected,
  });
};
