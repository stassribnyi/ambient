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
}

export interface DailyUnits {
  time: string;
  weathercode: string;
  sunrise: string;
  sunset: string;
}

export interface Daily {
  time: string[];
  weathercode: number[];
  sunrise: string[];
  sunset: string[];
}