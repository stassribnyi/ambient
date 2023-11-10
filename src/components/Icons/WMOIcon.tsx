import { FC } from 'react';

import { WMOCode } from '../../vite-env';

import { type Icons, Meteocon } from './Meteocon';

type WMOIconProps = Readonly<{
  code?: WMOCode;
  size?: number;
  variant?: 'day' | 'night';
}>;

type Variant<T = string> = Readonly<{
  day: T;
  night: T;
}>;

const WMO_ICON = new Map<WMOCode | undefined, Variant<Icons>>([
  [0, { day: 'sunny', night: 'clear' }],
  [1, { day: 'sunny', night: 'clear' }],
  [2, { day: 'partly-sunny', night: 'partly-clear' }],
  [3, { day: 'cloudy-day', night: 'cloudy-night' }],
  [45, { day: 'foggy-day', night: 'foggy-night' }],
  [48, { day: 'foggy-day', night: 'foggy-night' }],
  [51, { day: 'drizzle-day', night: 'drizzle-night' }],
  [53, { day: 'drizzle-day', night: 'drizzle-night' }],
  [55, { day: 'drizzle-day', night: 'drizzle-night' }],
  [56, { day: 'drizzle-day', night: 'drizzle-night' }],
  [57, { day: 'drizzle-day', night: 'drizzle-night' }],
  [61, { day: 'rain-day', night: 'rain-night' }],
  [63, { day: 'rain-day', night: 'rain-night' }],
  [65, { day: 'rain-day', night: 'rain-night' }],
  [66, { day: 'rain-day', night: 'rain-night' }],
  [67, { day: 'rain-day', night: 'rain-night' }],
  [71, { day: 'snow-day', night: 'snow-night' }],
  [73, { day: 'snow-day', night: 'snow-night' }],
  [75, { day: 'snow-day', night: 'snow-night' }],
  [77, { day: 'snow-day', night: 'snow-night' }],
  [80, { day: 'drizzle-day', night: 'drizzle-night' }],
  [81, { day: 'drizzle-day', night: 'drizzle-night' }],
  [82, { day: 'drizzle-day', night: 'drizzle-night' }],
  [85, { day: 'snow-day', night: 'snow-night' }],
  [86, { day: 'snow-day', night: 'snow-night' }],
  [95, { day: 'thunderstorm-day', night: 'thunderstorm-night' }],
  [96, { day: 'thunderstorm-day', night: 'thunderstorm-night' }],
  [99, { day: 'thunderstorm-day', night: 'thunderstorm-night' }],
]);

// FIXME: move into separate file
export const WMO_DESCRIPTION = new Map<WMOCode | undefined, Variant>([
  [0, { day: 'Sunny', night: 'Clear' }],
  [1, { day: 'Mainly Sunny', night: 'Mainly Clear' }],
  [2, { day: 'Partly Cloudy', night: 'Partly Cloudy' }],
  [3, { day: 'Cloudy', night: 'Cloudy' }],
  [45, { day: 'Foggy', night: 'Foggy' }],
  [48, { day: 'Rime Fog', night: 'Rime Fog' }],
  [51, { day: 'Light Drizzle', night: 'Light Drizzle' }],
  [53, { day: 'Drizzle', night: 'Drizzle' }],
  [55, { day: 'Heavy Drizzle', night: 'Heavy Drizzle' }],
  [56, { day: 'Light Freezing Drizzle', night: 'Light Freezing Drizzle' }],
  [57, { day: 'Freezing Drizzle', night: 'Freezing Drizzle' }],
  [61, { day: 'Light Rain', night: 'Light Rain' }],
  [63, { day: 'Rain', night: 'Rain' }],
  [65, { day: 'Heavy Rain', night: 'Heavy Rain' }],
  [66, { day: 'Light Freezing Rain', night: 'Light Freezing Rain' }],
  [67, { day: 'Freezing Rain', night: 'Freezing Rain' }],
  [71, { day: 'Light Snow', night: 'Light Snow' }],
  [73, { day: 'Snow', night: 'Snow' }],
  [75, { day: 'Heavy Snow', night: 'Heavy Snow' }],
  [77, { day: 'Snow Grains', night: 'Snow Grains' }],
  [80, { day: 'Light Showers', night: 'Light Showers' }],
  [81, { day: 'Showers', night: 'Showers' }],
  [82, { day: 'Heavy Showers', night: 'Heavy Showers' }],
  [85, { day: 'Light Snow Showers', night: 'Light Snow Showers' }],
  [86, { day: 'Snow Showers', night: 'Snow Showers' }],
  [95, { day: 'Thunderstorm', night: 'Thunderstorm' }],
  [96, { day: 'Light Thunderstorms With Hail', night: 'Light Thunderstorms With Hail' }],
  [99, { day: 'Thunderstorm With Hail', night: 'Thunderstorm With Hail' }],
]);

export const WMOIcon: FC<WMOIconProps> = ({ code, variant = 'day', size }) => {
  const details = WMO_DESCRIPTION.get(code);
  const icons = WMO_ICON.get(code);

  const isDay = variant === 'day';
  const description = isDay ? details?.day : details?.night;
  const iconName = isDay ? icons?.day : icons?.night;

  return <Meteocon alt={description ?? 'N/A'} name={iconName ?? 'n/a'} size={size} />;
};
