import { addHours, isSameDay, isWithinInterval } from 'date-fns';

import { changeTimeZone } from '../utils';
import { WeatherInfo, WMOCode } from '../vite-env';

import type { DailyForecast } from './mapForecastToDaily';

export type HourlyForecast = Readonly<{
  isDay: boolean;
  precipitation: number;
  temperature: number;
  time: Date;
  uvIndex: number;
  weathercode: WMOCode;
}>;

export function mapForecastToHourly(
  { hourly, timezone }: WeatherInfo,
  dailyForecast: Array<DailyForecast>,
): Array<HourlyForecast> {
  return hourly.time
    .map((t, idx) => ({ idx, time: new Date(t) }))
    .filter((slot) => {
      const current = changeTimeZone(new Date(), timezone);

      return isWithinInterval(slot.time, {
        start: current.setMinutes(0, 0, 0),
        end: addHours(current, 23),
      });
    })
    .map(({ time, idx }) => {
      const currentDay = dailyForecast.find((day) => isSameDay(time, day.time));
      const isDay = currentDay && isWithinInterval(time, { start: currentDay.sunrise, end: currentDay.sunset });

      return {
        time,
        isDay: isDay ?? true,
        precipitation: hourly.precipitation_probability[idx],
        temperature: hourly.temperature_2m[idx],
        uvIndex: hourly.uv_index[idx],
        weathercode: hourly.weathercode[idx],
      };
    });
}
