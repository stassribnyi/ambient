import { isSameDay, isSameHour } from 'date-fns';

import { changeTimeZone, uvIndexToScale, windspeedToBeaufortScale, WMO } from '../utils';

import { WeatherInfo } from '../vite-env';

import type { DailyForecast } from './mapForecastToDaily';
import type { HourlyForecast } from './mapForecastToHourly';

type Scale = Readonly<{
  value: number;
  iconUrl: string;
  description: string;
}>;

export type CurrentForecast = Readonly<{
  isDay: number;
  time: Date;
  temperature: number;
  apparentTemperature: number;
  relativeHumidity: number;
  sunsetTime: Date;
  sunriseTime: Date;
  description?: string;
  uvIndex: Scale;
  windspeed: Scale;
  weathercode: WeatherInfo['current']['weathercode'];
}>;

export function mapForecastToCurrent(
  { timezone, current: currentForecast }: WeatherInfo,
  dailyForecast: Array<DailyForecast>,
  hourlyForecast: Array<HourlyForecast>,
): CurrentForecast {
  const currentDateTimeZone = changeTimeZone(new Date(), timezone);

  const currentHour = hourlyForecast.find((hour) => isSameHour(currentDateTimeZone, hour.time));
  const currentDay = dailyForecast.find((day) => isSameDay(currentDateTimeZone, day.time));

  const details = WMO[currentForecast.weathercode];

  return {
    ...(currentForecast.is_day ? details?.day : details?.night),
    time: currentDateTimeZone,
    isDay: currentForecast.is_day,
    temperature: currentForecast.temperature_2m,
    apparentTemperature: currentForecast.apparent_temperature,
    relativeHumidity: currentForecast.relativehumidity_2m,
    sunsetTime: currentDay?.sunset ?? new Date(), // TODO: find out better way to fallback
    sunriseTime: currentDay?.sunrise ?? new Date(),
    uvIndex: uvIndexToScale(currentHour?.uvIndex ?? 0),
    windspeed: windspeedToBeaufortScale(currentForecast.windspeed_10m),
    weathercode: currentForecast.weathercode,
  };
}
