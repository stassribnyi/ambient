import { WeatherInfo, WMOCode } from '../vite-env';

type Range = Readonly<{
  min: number;
  max: number;
}>;

export type DailyForecast = Readonly<{
  precipitationProbability: number;
  sunrise: Date;
  sunset: Date;
  temperature: Range;
  time: Date;
  weathercode: WMOCode;
}>;

export function mapForecastToDaily({ daily }: WeatherInfo): Array<DailyForecast> {
  return daily.time.map((time, idx) => ({
    precipitationProbability: daily.precipitation_probability_max[idx],
    sunrise: new Date(daily.sunrise[idx]),
    sunset: new Date(daily.sunset[idx]),
    temperature: {
      min: daily.temperature_2m_min[idx],
      max: daily.temperature_2m_max[idx],
    },
    time: new Date(time),
    weathercode: daily.weathercode[idx],
  }));
}
