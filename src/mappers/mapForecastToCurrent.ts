import { isEqual } from 'date-fns';

import { windspeedToBeaufortScale } from './windspeedToBeaufortScale';
import { changeTimeZone } from '../changeTimezone';
import { uvIndexToScale } from './uvIndexToScale';
import { getWMOInfo } from './getWMOInfo';

import { WeatherInfo } from '../vite-env';

export type CurrentForecast = Readonly<{
  isDay: number;
  time: Date;
  temperature: number;
  apparentTemperature: number;
  relativeHumidity: number;
  sunsetTime: Date;
  sunriseTime: Date;
  iconUrl?: string;
  description?: string;
  uvIndex: {
    value: number;
    iconUrl: string;
    description: string;
  };
  windspeed: {
    value: number;
    iconUrl: string;
    description: string;
  };
}>;

export function mapForecastToCurrent(weatherInfo: WeatherInfo): CurrentForecast {
  const currentDateTimeZone = changeTimeZone(new Date(), weatherInfo.timezone);

  const currentIdx = weatherInfo.hourly.time.findIndex((t) =>
    isEqual(currentDateTimeZone.setMinutes(0, 0, 0), new Date(t)),
  );
  const dayIdx = weatherInfo.daily.time.findIndex((t) =>
    isEqual(currentDateTimeZone.setHours(0, 0, 0, 0), new Date(t).setHours(0, 0, 0, 0)),
  );

  return {
    ...getWMOInfo(weatherInfo),
    time: currentDateTimeZone,
    isDay: weatherInfo.current.is_day,
    temperature: weatherInfo.current.temperature_2m,
    apparentTemperature: weatherInfo.current.apparent_temperature,
    relativeHumidity: weatherInfo.current.relativehumidity_2m,
    sunsetTime: new Date(weatherInfo.daily.sunset[dayIdx]),
    sunriseTime: new Date(weatherInfo.daily.sunrise[dayIdx]),
    uvIndex: uvIndexToScale(weatherInfo.hourly.uv_index[currentIdx]),
    windspeed: windspeedToBeaufortScale(weatherInfo.current.windspeed_10m),
  };
}
