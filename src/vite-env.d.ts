/// <reference types="vite/client" />

import { WMO } from './wmo';

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
  weathercode: keyof typeof WMO;
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
  rain: string;
}

export interface Hourly {
  time: string[];
  temperature_2m: number[];
  relativehumidity_2m: number[];
  apparent_temperature: number[];
  precipitation_probability: number[];
  precipitation: number[];
  rain: number[];
  weathercode: Array<keyof typeof WMO>;
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
  weathercode: Array<keyof typeof WMO>;
  sunrise: string[];
  sunset: string[];
  temperature_2m_max: number[];
  temperature_2m_min: number[];
  precipitation_probability_max: number[];
}

export interface GeocodingInfo {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  elevation: number;
  feature_code: string;
  country_code: string;
  admin1_id: number;
  timezone: string;
  population?: number;
  country_id: number;
  country: string;
  admin1: string;
  admin2_id?: number;
  admin2?: string;
}
