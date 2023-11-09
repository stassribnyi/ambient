import { changeTimeZone } from '../utils/changeTimezone';
import { WeatherInfo, WMOCode } from '../vite-env';

type Range = Readonly<{
  min: number;
  max: number;
}>;

export type DailyForecast = Readonly<{
  time: Date;
  sunrise: Date;
  sunset: Date;
  temperature: Range;
  precipitationProbability: number;
  weathercode: WMOCode;
}>;

export function mapForecastToDaily({ daily, timezone }: WeatherInfo): Array<DailyForecast> {
  return daily.time.map((time, idx) => ({
    time: changeTimeZone(new Date(time), timezone),
    weathercode: daily.weathercode[idx],
    temperature: {
      min: daily.temperature_2m_min[idx],
      max: daily.temperature_2m_max[idx],
    },
    precipitationProbability: daily.precipitation_probability_max[idx],
    sunrise: changeTimeZone(new Date(daily.sunrise[idx]), timezone),
    sunset: changeTimeZone(new Date(daily.sunset[idx]), timezone),
  }));
}
