import axios from 'axios';

import { WeatherInfo } from '../vite-env';
import { useLocations } from './useLocations';

import { mapForecastToCurrent, mapForecastToHourly, mapForecastToDaily, mapForecastToSeries } from '../mappers';

import { useForecastSnapshotMutation } from './useForecastSnapshots';
import { useQuery } from '@tanstack/react-query';
import { useCallback } from 'react';

// FIXME: move to .env file
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
  const { current: favorite, locations } = useLocations();
  const updateForecastSnapshots = useForecastSnapshotMutation();

  const {
    data: currentForecast,
    error: currentForecastError,
    isLoading: isCurrentForecastLoading,
    refetch: refetchCurrentForecast,
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

  // TODO: combine with forecast snapshot and use query key to refetch
  const {
    error: snapshotsError,
    isLoading: isSnapshotLoading,
    refetch: refetchSnapshots,
  } = useQuery({
    queryKey: ['forecast-snapshot-query', locations.map((l) => ({ lat: l.latitude, long: l.longitude }))],
    queryFn: async ({ signal }) => {
      const { data } = await axios.get<Array<WeatherInfo>>(WEATHER_API_URL, {
        params: {
          ...FORECAST_OPTIONS,
          latitude: locations.reduce((lats, city) => [...lats, city.latitude], [] as Array<number>),
          longitude: locations.reduce((longs, city) => [...longs, city.longitude], [] as Array<number>),
        },
        signal,
      });

      const locationsForecast = Array.isArray(data) ? data : [data];

      const result = locations.map((location, idx) => ({
        locationId: location.id,
        temperature: locationsForecast[idx]?.current.temperature_2m,
        weathercode: locationsForecast[idx]?.current.weathercode,
        isDay: locationsForecast[idx]?.current.is_day,
      }));

      updateForecastSnapshots(result);

      return result;
    },
    enabled: locations.length > 0,
  });

  const refresh = useCallback(async () => {
    await Promise.all([refetchCurrentForecast(), refetchSnapshots()]);
  }, [refetchCurrentForecast, refetchSnapshots]);

  return {
    currentForecast,
    refresh,
    error: currentForecastError || snapshotsError,
    loading: isCurrentForecastLoading || isSnapshotLoading,
  };
};
