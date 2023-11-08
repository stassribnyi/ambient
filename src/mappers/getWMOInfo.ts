import { isAfter, isBefore, isSameDay } from 'date-fns';
import { WeatherInfo } from '../vite-env';

import { WMO } from '../wmo';

export function getWMOInfo(weatherInfo: WeatherInfo) {
  if (weatherInfo.current_units.weathercode !== 'wmo code') {
    return null;
  }

  const details = WMO[weatherInfo.current.weathercode];

  return weatherInfo.current.is_day ? details.day : details.night;
}

export function getWMOInfoHourly(weatherInfo: WeatherInfo, hourIdx: number) {
  if (weatherInfo.current_units.weathercode !== 'wmo code') {
    return null;
  }

  const details = WMO[weatherInfo.hourly.weathercode[hourIdx]];

  if (!details) {
    return null;
  }

  const time = new Date(weatherInfo.hourly.time[hourIdx]);
  const dayIdx = weatherInfo.daily.time.findIndex((t) => isSameDay(time, new Date(t)));

  const sunrise = new Date(weatherInfo.daily.sunrise[dayIdx || 0]);
  const sunset = new Date(weatherInfo.daily.sunset[dayIdx || 0]);

  const isDay = isAfter(time, sunrise) && isBefore(time, sunset);

  return isDay ? details.day : details.night;
}

export function getWMOInfoDaily(weatherInfo: WeatherInfo, dayIdx: number) {
  if (weatherInfo.current_units.weathercode !== 'wmo code') {
    return null;
  }

  const details = WMO[weatherInfo.daily.weathercode[dayIdx]];

  if (!details) {
    return null;
  }

  return details.day;
}
