import axios, { AxiosError } from 'axios';
import { useState, useEffect, useCallback, useRef } from 'react';

import { WeatherInfo } from '../vite-env';
import { useLocations } from './useLocations';
import { type CurrentForecast, mapForecastToCurrent } from '../mappers/mapForecastToCurrent';
import { type HourlyForecast, mapForecastToHourly } from '../mappers/mapForecastToHourly';
import { type DailyForecast, mapForecastToDaily } from '../mappers/mapForecastToDaily';

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
    current: CurrentForecast;
    daily: Array<DailyForecast>;
    hourly: Array<HourlyForecast>;
    series: Readonly<{
      time: Array<Date>;
      cloud_cover: Array<number>;
      relative_humidity_2m: Array<number>;
      precipitation_probability: Array<number>;
    }>;
  }>>(null);
  const [forecast, setForecast] = useState<null | Array<WeatherInfo>>([]);
  const [error, setError] = useState<null | AxiosError>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const controllerRef = useRef<AbortController>();

  const { current, locations, setLocations } = useLocations();

  const refresh = useCallback(async () => {
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
      longitude: locations.reduce((lats, city) => [...lats, city.latitude], [] as Array<number>),
    };

    await Promise.all([
      axios.get<WeatherInfo>(WEATHER_API_URL, { params: currentParams, signal }),
      // TODO: change type
      axios.get<Array<WeatherInfo>>(WEATHER_API_URL, { params: othersParams, signal }),
    ])
      .then(([main, others]) => {
        setCurrentForecast({
          current: mapForecastToCurrent(main.data),
          daily: mapForecastToDaily(main.data),
          hourly: mapForecastToHourly(main.data),
          series: {
            time: main.data.hourly.time.map((x) => new Date(x)),
            cloud_cover: main.data.hourly.cloud_cover,
            relative_humidity_2m: main.data.hourly.relativehumidity_2m,
            precipitation_probability: main.data.hourly.precipitation_probability,
          },
        });

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
  }, [current.latitude, current.longitude, locations, setLocations]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { currentForecast, forecast, error, loading, refresh };
};
