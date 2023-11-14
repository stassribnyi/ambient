import { isSameDay, isSameHour } from 'date-fns';

import { uvIndexToScale, windspeedToBeaufortScale } from '../utils';

import { BeaufortScale, UVIndexScale, WeatherInfo, WMOCode } from '../vite-env';

import type { DailyForecast } from './mapForecastToDaily';
import type { HourlyForecast } from './mapForecastToHourly';

export type CurrentForecast = Readonly<{
  apparentTemperature: number;
  beaufortScale: BeaufortScale;
  isDay: number;
  relativeHumidity: number;
  sunriseTime: Date;
  sunsetTime: Date;
  temperature: number;
  time: Date;
  uvIndex: UVIndexScale;
  windspeed: number;
  weathercode: WMOCode;
}>;

export function mapForecastToCurrent(
  { current: currentForecast }: WeatherInfo,
  dailyForecast: Array<DailyForecast>,
  hourlyForecast: Array<HourlyForecast>,
): CurrentForecast {
  const currentTime = new Date(currentForecast.time);

  const currentHour = hourlyForecast.find((hour) => isSameHour(currentTime, hour.time));
  const currentDay = dailyForecast.find((day) => isSameDay(currentTime, day.time));

  return {
    time: currentTime,
    isDay: currentForecast.is_day,
    temperature: currentForecast.temperature_2m,
    apparentTemperature: currentForecast.apparent_temperature,
    relativeHumidity: currentForecast.relativehumidity_2m,
    windspeed: currentForecast.windspeed_10m,
    weathercode: currentForecast.weathercode,
    sunsetTime: currentDay?.sunset ?? new Date(), // TODO: find out better way to fallback
    sunriseTime: currentDay?.sunrise ?? new Date(),
    uvIndex: uvIndexToScale(currentHour?.uvIndex ?? 0),
    beaufortScale: windspeedToBeaufortScale(currentForecast.windspeed_10m),
  };
}
