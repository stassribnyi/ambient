import { changeTimeZone } from '../utils';
import { WeatherInfo } from '../vite-env';

// TODO: rename props
export type SeriesForecast = Readonly<{
  time: Array<Date>;
  cloud_cover: Array<number>;
  relative_humidity_2m: Array<number>;
  precipitation_probability: Array<number>;
}>;

export function mapForecastToSeries({ hourly, timezone }: WeatherInfo): SeriesForecast {
  return {
    cloud_cover: hourly.cloud_cover,
    relative_humidity_2m: hourly.relativehumidity_2m,
    precipitation_probability: hourly.precipitation_probability,
    time: hourly.time.map((t) => changeTimeZone(new Date(t), timezone)),
  };
}
