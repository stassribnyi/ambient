import { isEqual } from 'date-fns';

import { changeTimeZone, uvIndexToScale, windspeedToBeaufortScale, WMO } from '../utils';

import { WeatherInfo } from '../vite-env';

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
  iconUrl?: string;
  description?: string;
  uvIndex: {
    value: number;
    iconUrl: string;
    description: string;
  };
  windspeed: {
    value: number;
    iconUrl: string;
    description: string;
  };
}>;

export function mapForecastToCurrent(
  weatherInfo: WeatherInfo,
  dailyForecast: Array<DailyForecast>,
  hourlyForecast: Array<HourlyForecast>,
): CurrentForecast {
  const currentDateTimeZone = changeTimeZone(new Date(), weatherInfo.timezone);

  const currentHour = hourlyForecast.find((hour) =>
    // TODO: isSameHour?
    isEqual(currentDateTimeZone.setMinutes(0, 0, 0), hour.time),
  );
  const currentDay = dailyForecast.find((day) =>
    // TODO: isSameDay?
    isEqual(currentDateTimeZone.setHours(0, 0, 0, 0), day.time.setHours(0, 0, 0, 0)),
  );

  const details = WMO[weatherInfo.current.weathercode];

  return {
    ...(weatherInfo.current.is_day ? details?.day : details?.night),
    time: currentDateTimeZone,
    isDay: weatherInfo.current.is_day,
    temperature: weatherInfo.current.temperature_2m,
    apparentTemperature: weatherInfo.current.apparent_temperature,
    relativeHumidity: weatherInfo.current.relativehumidity_2m,
    sunsetTime: currentDay?.sunset ?? new Date(), // TODO: find out better way to fallback
    sunriseTime: currentDay?.sunrise ?? new Date(),
    uvIndex: uvIndexToScale(currentHour?.uvIndex ?? 0),
    windspeed: windspeedToBeaufortScale(weatherInfo.current.windspeed_10m),
  };
}
