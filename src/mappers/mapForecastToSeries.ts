import { changeTimeZone } from '../utils';
import { WeatherInfo } from '../vite-env';

export type SeriesForecast = Readonly<{
  time: Array<Date>;
  cloudCover: Array<number>;
  humidity: Array<number>;
  precipitation: Array<number>;
}>;

export function mapForecastToSeries({ hourly, timezone }: WeatherInfo): SeriesForecast {
  return {
    cloudCover: hourly.cloud_cover,
    humidity: hourly.relativehumidity_2m,
    precipitation: hourly.precipitation_probability,
    time: hourly.time.map((t) => changeTimeZone(new Date(t), timezone)),
  };
}
