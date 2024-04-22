/// <reference types="vite/client" />

// FIXME: move into typings
import { WMO_INFO } from './utils/wmo';

export type WMOCode = keyof typeof WMO_INFO;
export type BeaufortScale = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
export type UVIndexScale = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11;

export interface WeatherInfo {
  latitude: number;
  longitude: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string;
  timezone_abbreviation: string;
  elevation: number;
  current_units: CurrentUnits;
  current: Current;
  hourly_units: HourlyUnits;
  hourly: Hourly;
  daily_units: DailyUnits;
  daily: Daily;
}

export interface CurrentUnits {
  time: string;
  interval: string;
  temperature_2m: string;
  relativehumidity_2m: string;
  apparent_temperature: string;
  is_day: string;
  precipitation_probability: string;
  rain: string;
  showers: string;
  snowfall: string;
  weathercode: string;
  cloudcover: string;
  pressure_msl: string;
  surface_pressure: string;
  windspeed_10m: string;
}

export interface Current {
  time: string;
  interval: number;
  temperature_2m: number;
  relativehumidity_2m: number;
  apparent_temperature: number;
  is_day: number;
  precipitation_probability: number;
  rain: number;
  showers: number;
  snowfall: number;
  weathercode: WMOCode;
  cloudcover: number;
  pressure_msl: number;
  surface_pressure: number;
  windspeed_10m: number;
}

export interface HourlyUnits {
  time: string;
  temperature_2m: string;
  relativehumidity_2m: string;
  apparent_temperature: string;
  precipitation_probability: string;
  precipitation: string;
  weathercode: string;
  relative_humidity_2m: string;
  cloud_cover: string;
}

export interface Hourly {
  time: string[];
  temperature_2m: number[];
  relativehumidity_2m: number[];
  apparent_temperature: number[];
  precipitation_probability: number[];
  uv_index: number[];
  precipitation: number[];
  relative_humidity_2m: number[];
  cloud_cover: number[];
  weathercode: Array<WMOCode>;
}

export interface DailyUnits {
  time: string;
  weathercode: string;
  sunrise: string;
  sunset: string;
  temperature_2m_max: string;
  temperature_2m_min: string;
  precipitation_probability_max: string;
}

export interface Daily {
  time: string[];
  weathercode: Array<WMOCode>;
  sunrise: string[];
  sunset: string[];
  temperature_2m_max: number[];
  temperature_2m_min: number[];
  precipitation_probability_max: number[];
}

// TODO: change to places
export interface Location {
  id: number | string;
  name: string;
  country: string;
  admin1: string;
  latitude: number;
  longitude: number;
  isPrimary?: boolean;
}

export interface ForecastPreview {
  locationId: number | string;
  weathercode?: WMOCode;
  temperature?: number;
  isDay?: number;
}

type MeasurementSystem = 'metric' | 'imperial';

interface ImportMetaEnv {
  readonly PACKAGE_VERSION: string;
  readonly PACKAGE_REPOSITORY_URL: string;
  readonly PACKAGE_BUILD_DATE: string;
}
