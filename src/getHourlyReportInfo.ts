import { subHours, addHours, compareAsc } from 'date-fns';

import { changeTimeZone } from './changeTimezone';
import { getWMOInfoHourly } from './getWMOInfo';
import { WeatherInfo } from './vite-env';

export type HourlyReportType = Readonly<{
  time: Date;
  iconUrl?: string;
  temperature: number;
  precipitation: number;
}>;

export function getHourlyReportInfo(weatherInfo: WeatherInfo): Array<HourlyReportType> {
  return weatherInfo.hourly.time
    .map((t, idx) => ({
      idx,
      time: changeTimeZone(t, weatherInfo.timezone),
    }))
    .filter((slot) => {
      // TODO: revisit and fix consistency
      const current = changeTimeZone(new Date(), weatherInfo.timezone);

      // -1 hour, so if time is less than hour in the past, we still show forecast
      const from = subHours(current.setMinutes(0, 0, 0), 1);
      // 24(+1) hour, so if time is less than hour in the future, we still show forecast
      const to = addHours(current, 25);

      return compareAsc(from, slot.time) - compareAsc(slot.time, to) === 0;
    })
    .map(({ time, idx }) => ({
      time,
      iconUrl: getWMOInfoHourly(weatherInfo, idx)?.iconUrl,
      temperature: weatherInfo.hourly.temperature_2m[idx],
      precipitation: weatherInfo.hourly.precipitation_probability[idx],
    }));
}
