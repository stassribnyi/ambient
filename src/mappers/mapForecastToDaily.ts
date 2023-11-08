import { changeTimeZone } from '../utils/changeTimezone';
import { WeatherInfo } from '../vite-env';
import { WMO } from '../utils/wmo';

export type DailyForecast = Readonly<{
  time: Date;
  sunrise: Date;
  sunset: Date;
  temperature: {
    min: number;
    max: number;
  };
  precipitationProbability: number;
  description?: string;
  iconUrl?: string;
}>;

export function mapForecastToDaily(weatherInfo: WeatherInfo): Array<DailyForecast> {
  return weatherInfo.daily.time
    .map((t, idx) => ({
      idx,
      time: changeTimeZone(new Date(t), weatherInfo.timezone),
    }))
    .map(({ time, idx }) => ({
      ...WMO[weatherInfo.daily.weathercode[idx]]?.day,
      time,
      temperature: {
        min: weatherInfo.daily.temperature_2m_min[idx],
        max: weatherInfo.daily.temperature_2m_max[idx],
      },
      precipitationProbability: weatherInfo.daily.precipitation_probability_max[idx],
      sunrise: changeTimeZone(new Date(weatherInfo.daily.sunrise[idx]), weatherInfo.timezone),
      sunset: changeTimeZone(new Date(weatherInfo.daily.sunset[idx]), weatherInfo.timezone),
    }));
}
