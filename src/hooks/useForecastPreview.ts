import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

import { ForecastPreview, WeatherInfo } from '../vite-env';
import { useLocations } from './useLocations';

const STORE_NAME = 'forecast-preview';

// FIXME: move to .env file
const WEATHER_API_URL = 'https://api.open-meteo.com/v1/forecast';

const FORECAST_OPTIONS = {
  current: ['temperature_2m', 'is_day', 'weathercode'],
  timezone: 'auto',
  forecast_days: 1,
  temperature_unit: 'celsius',
} as const;

export const useForecastPreview = (locationId: ForecastPreview['locationId']) => {
  const { locations } = useLocations();

  const current = locations.find((item) => item.id === locationId);

  return useQuery({
    queryKey: [STORE_NAME, { id: current?.id, lat: current?.latitude, long: current?.longitude }],
    queryFn: async ({ signal }) => {
      const { data } = await axios.get<WeatherInfo>(WEATHER_API_URL, {
        params: {
          ...FORECAST_OPTIONS,
          latitude: current?.latitude,
          longitude: current?.longitude,
        },
        signal,
      });

      return {
        locationId: current?.id,
        temperature: data?.current.temperature_2m,
        weathercode: data?.current.weathercode,
        isDay: data?.current.is_day,
      };
    },
    enabled: !!current,
  });
};
