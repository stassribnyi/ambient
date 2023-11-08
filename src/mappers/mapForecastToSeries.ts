import { changeTimeZone } from '../utils';
import { WeatherInfo } from '../vite-env';

// TODO: rename props
export type SeriesForecast = Readonly<{
  time: Array<Date>;
  cloud_cover: Array<number>;
  relative_humidity_2m: Array<number>;
  precipitation_probability: Array<number>;
}>;

export function mapForecastToSeries(weatherInfo: WeatherInfo): SeriesForecast {
  return {
    cloud_cover: weatherInfo.hourly.cloud_cover,
    relative_humidity_2m: weatherInfo.hourly.relativehumidity_2m,
    precipitation_probability: weatherInfo.hourly.precipitation_probability,
    time: weatherInfo.hourly.time.map((t) => changeTimeZone(new Date(t), weatherInfo.timezone)),
  };
}
