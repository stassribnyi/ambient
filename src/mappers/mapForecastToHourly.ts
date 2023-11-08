import { subHours, addHours, compareAsc, isAfter, isBefore, isSameDay } from 'date-fns';

import { changeTimeZone, WMO } from '../utils';
import { WeatherInfo } from '../vite-env';

import type { DailyForecast } from './mapForecastToDaily';

export type HourlyForecast = Readonly<{
  time: Date;
  iconUrl?: string;
  temperature: number;
  precipitation: number;
  uvIndex: number;
}>;

export function mapForecastToHourly(
  mainForecast: WeatherInfo,
  dailyForecast: Array<DailyForecast>,
): Array<HourlyForecast> {
  return mainForecast.hourly.time
    .map((t, idx) => ({
      idx,
      time: changeTimeZone(t, mainForecast.timezone),
    }))
    .filter((slot) => {
      // TODO: revisit and fix consistency
      const current = changeTimeZone(new Date(), mainForecast.timezone);

      // -1 hour, so if time is less than hour in the past, we still show forecast
      const from = subHours(current.setMinutes(0, 0, 0), 1);
      // 24(+1) hour, so if time is less than hour in the future, we still show forecast
      const to = addHours(current, 25);

      return compareAsc(from, slot.time) - compareAsc(slot.time, to) === 0;
    })
    .map(({ time, idx }) => {
      const details = WMO[mainForecast.hourly.weathercode[idx]];

      const currentDay = dailyForecast.find((day) => isSameDay(time, day.time));

      const isDay = currentDay ? isAfter(time, currentDay.sunrise) && isBefore(time, currentDay.sunset) : true;

      return {
        time,
        iconUrl: (isDay ? details?.day : details?.night)?.iconUrl,
        temperature: mainForecast.hourly.temperature_2m[idx],
        precipitation: mainForecast.hourly.precipitation_probability[idx],
        uvIndex: mainForecast.hourly.uv_index[idx],
      };
    });
}
