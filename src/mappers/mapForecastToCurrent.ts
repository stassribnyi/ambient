import { isSameDay, isSameHour } from 'date-fns';

import { changeTimeZone, uvIndexToScale, windspeedToBeaufortScale } from '../utils';

import { BeaufortScale, UVIndexScale, WeatherInfo, WMOCode } from '../vite-env';

import type { DailyForecast } from './mapForecastToDaily';
import type { HourlyForecast } from './mapForecastToHourly';

export type CurrentForecast = Readonly<{
  isDay: number;
  time: Date;
  temperature: number;
  apparentTemperature: number;
  relativeHumidity: number;
  sunsetTime: Date;
  sunriseTime: Date;
  description?: string;
  uvIndex: UVIndexScale;
  windspeed: number;
  weathercode: WMOCode;
  beaufortScale: BeaufortScale;
}>;

export function mapForecastToCurrent(
  { timezone, current: currentForecast }: WeatherInfo,
  dailyForecast: Array<DailyForecast>,
  hourlyForecast: Array<HourlyForecast>,
): CurrentForecast {
  const currentDateTimeZone = changeTimeZone(new Date(), timezone);

  const currentHour = hourlyForecast.find((hour) => isSameHour(currentDateTimeZone, hour.time));
  const currentDay = dailyForecast.find((day) => isSameDay(currentDateTimeZone, day.time));

  return {
    time: currentDateTimeZone,
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
