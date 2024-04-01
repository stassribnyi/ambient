import axios, { AxiosError } from 'axios';
import { useState, useEffect, useCallback, useRef } from 'react';

import { WeatherInfo } from '../vite-env';
import { useLocations } from './useLocations';

import { mapForecastToCurrent, mapForecastToHourly, mapForecastToDaily, mapForecastToSeries } from '../mappers';

import type { CurrentForecast, HourlyForecast, DailyForecast, SeriesForecast } from '../mappers';
import { useForecastSnapshotMutation } from './useForecastSnapshots';

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
  const [currentForecast, setCurrentForecast] = useState<null | Readonly<{
    lastUpdated: Date;
    current: CurrentForecast;
    daily: Array<DailyForecast>;
    hourly: Array<HourlyForecast>;
    series: SeriesForecast;
  }>>(null);

  const [error, setError] = useState<null | AxiosError>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const controllerRef = useRef<AbortController>();

  const { current, locations } = useLocations();
  const updateForecastSnapshots = useForecastSnapshotMutation();

  const refresh = useCallback(async () => {
    if (!current) {
      return;
    }

    setLoading(true);

    if (controllerRef.current) {
      controllerRef.current.abort();
    }

    controllerRef.current = new AbortController();
    const signal = controllerRef.current.signal;

    const currentParams = {
      ...CURRENT_FORECAST_OPTIONS,
      latitude: current.latitude,
      longitude: current.longitude,
    };

    const othersParams = {
      ...FORECAST_OPTIONS,
      latitude: locations.reduce((lats, city) => [...lats, city.latitude], [] as Array<number>),
      longitude: locations.reduce((lats, city) => [...lats, city.longitude], [] as Array<number>),
    };

    await Promise.all([
      axios.get<WeatherInfo>(WEATHER_API_URL, { params: currentParams, signal }),
      // TODO: change type
      axios.get<Array<WeatherInfo>>(WEATHER_API_URL, { params: othersParams, signal }),
    ])
      .then(([main, others]) => {
        // TODO: do I really need to reuse it?
        const series = mapForecastToSeries(main.data);
        const daily = mapForecastToDaily(main.data);
        const hourly = mapForecastToHourly(main.data, daily);
        const current = mapForecastToCurrent(main.data, daily, hourly);

        setCurrentForecast({
          lastUpdated: new Date(Date.now()),
          current,
          daily,
          hourly,
          series,
        });

        const locationsForecast = Array.isArray(others.data) ? others.data : [others.data];

        updateForecastSnapshots(
          locations.map((location, idx) => ({
            locationId: location.id,
            temperature: locationsForecast[idx]?.current.temperature_2m,
            weathercode: locationsForecast[idx]?.current.weathercode,
            isDay: locationsForecast[idx]?.current.is_day,
          })),
        );
      })
      .catch((error) => setError(error?.code !== AxiosError.ERR_CANCELED ? error : null))
      .finally(() => setLoading(false));
  }, [current, locations, updateForecastSnapshots]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { currentForecast, error, loading, refresh };
};
