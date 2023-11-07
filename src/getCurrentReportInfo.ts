import { isEqual } from 'date-fns';

import { getWindBeaufortInfo } from './getWindBeaufortInfo';
import { changeTimeZone } from './changeTimezone';
import { getUVIndexInfo } from './getUVIndexInfo';
import { getWMOInfo } from './getWMOInfo';

import { WeatherInfo } from './vite-env';

export type CurrentReportType = Readonly<{
  isDay: number;
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

export function getCurrentReportInfo(weatherInfo: WeatherInfo): CurrentReportType {
  const currentDateTimeZone = changeTimeZone(new Date(), weatherInfo.timezone);

  const currentIdx = weatherInfo.hourly.time.findIndex((t) =>
    isEqual(currentDateTimeZone.setMinutes(0, 0, 0), new Date(t)),
  );
  const dayIdx = weatherInfo.daily.time.findIndex((t) =>
    isEqual(currentDateTimeZone.setHours(0, 0, 0, 0), new Date(t).setHours(0, 0, 0, 0)),
  );

  return {
    ...getWMOInfo(weatherInfo),
    isDay: weatherInfo.current.is_day,
    temperature: weatherInfo.current.temperature_2m,
    apparentTemperature: weatherInfo.current.apparent_temperature,
    relativeHumidity: weatherInfo.current.relativehumidity_2m,
    sunsetTime: new Date(weatherInfo.daily.sunset[dayIdx]),
    sunriseTime: new Date(weatherInfo.daily.sunrise[dayIdx]),
    uvIndex: getUVIndexInfo(weatherInfo.hourly.uv_index[currentIdx]),
    windspeed: getWindBeaufortInfo(weatherInfo.current.windspeed_10m),
  };
}
