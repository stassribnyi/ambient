import { subHours, addHours, isSameDay, isWithinInterval } from 'date-fns';

import { changeTimeZone } from '../utils';
import { WeatherInfo, WMOCode } from '../vite-env';

import type { DailyForecast } from './mapForecastToDaily';

export type HourlyForecast = Readonly<{
  time: Date;
  isDay: boolean;
  temperature: number;
  precipitation: number;
  weathercode: WMOCode;
  uvIndex: number;
}>;

export function mapForecastToHourly(
  { hourly, timezone }: WeatherInfo,
  dailyForecast: Array<DailyForecast>,
): Array<HourlyForecast> {
  return hourly.time
    .map((t, idx) => ({ idx, time: changeTimeZone(t, timezone) }))
    .filter((slot) => {
      // FIXME: revisit and fix consistency
      const current = changeTimeZone(new Date(), timezone);

      // -1 hour, so if time is less than hour in the past, we still show forecast
      // 24(+1) hour, so if time is less than hour in the future, we still show forecast
      return isWithinInterval(slot.time, {
        start: subHours(current.setMinutes(0, 0, 0), 1),
        end: addHours(current, 25),
      });
    })
    .map(({ time, idx }) => {
      // FIXME: simplify
      const currentDay = dailyForecast.find((day) => isSameDay(time, day.time));

      const isDay = currentDay ? isWithinInterval(time, { start: currentDay.sunrise, end: currentDay.sunset }) : true;

      return {
        time,
        isDay,
        weathercode: hourly.weathercode[idx],
        temperature: hourly.temperature_2m[idx],
        precipitation: hourly.precipitation_probability[idx],
        uvIndex: hourly.uv_index[idx],
      };
    });
}
