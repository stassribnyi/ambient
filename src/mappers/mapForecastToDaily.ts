import { getWMOInfoDaily } from './getWMOInfo';
import { WeatherInfo } from '../vite-env';

export type DailyReportType = Readonly<{
  time: Date;
  temperature: {
    min: number;
    max: number;
  };
  precipitationProbability: number;
  description?: string;
  iconUrl?: string;
}>;

export function getDailyReport(weatherInfo: WeatherInfo): Array<DailyReportType> {
  return weatherInfo.daily.time
    .map((t, idx) => ({
      idx,
      time: new Date(t),
    }))
    .map(({ time, idx }) => ({
      ...getWMOInfoDaily(weatherInfo, idx),
      time,
      temperature: {
        min: weatherInfo.daily.temperature_2m_min[idx],
        max: weatherInfo.daily.temperature_2m_max[idx],
      },
      precipitationProbability: weatherInfo.daily.precipitation_probability_max[idx],
    }));
}
