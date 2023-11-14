import { WeatherInfo } from '../vite-env';

export type SeriesForecast = Readonly<{
  cloudCover: Array<number>;
  humidity: Array<number>;
  precipitation: Array<number>;
  time: Array<Date>;
}>;

export function mapForecastToSeries({ hourly }: WeatherInfo): SeriesForecast {
  return {
    cloudCover: hourly.cloud_cover,
    humidity: hourly.relativehumidity_2m,
    precipitation: hourly.precipitation_probability,
    time: hourly.time.map((t) => new Date(t)),
  };
}
