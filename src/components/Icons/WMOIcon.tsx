import { FC } from 'react';

import { WMOCode } from '../../vite-env';

import { type MeteoconProps, Meteocon } from './Meteocon';

type WMOIconProps = Readonly<{
  code?: WMOCode;
  size?: number;
  variant?: 'day' | 'night';
}>;

type Variant<T = string> = Readonly<{
  day: T;
  night: T;
}>;
``;

const WMO_ICON = new Map<WMOCode | undefined, Variant<MeteoconProps['name']>>([
  [0, { day: 'clear-day', night: 'clear-night' }],
  [1, { day: 'clear-day', night: 'clear-night' }],
  [2, { day: 'partly-cloudy-day', night: 'partly-cloudy-night' }],
  [3, { day: 'overcast-day', night: 'overcast-night' }],
  [45, { day: 'fog-day', night: 'fog-night' }],
  [48, { day: 'fog-day', night: 'fog-night' }],
  [51, { day: 'partly-cloudy-day-drizzle', night: 'partly-cloudy-night-drizzle' }],
  [53, { day: 'partly-cloudy-day-drizzle', night: 'partly-cloudy-night-drizzle' }],
  [55, { day: 'partly-cloudy-day-drizzle', night: 'partly-cloudy-night-drizzle' }],
  [56, { day: 'partly-cloudy-day-drizzle', night: 'partly-cloudy-night-drizzle' }],
  [57, { day: 'partly-cloudy-day-drizzle', night: 'partly-cloudy-night-drizzle' }],
  [61, { day: 'partly-cloudy-day-rain', night: 'partly-cloudy-night-rain' }],
  [63, { day: 'partly-cloudy-day-rain', night: 'partly-cloudy-night-rain' }],
  [65, { day: 'partly-cloudy-day-rain', night: 'partly-cloudy-night-rain' }],
  [66, { day: 'partly-cloudy-day-rain', night: 'partly-cloudy-night-rain' }],
  [67, { day: 'partly-cloudy-day-rain', night: 'partly-cloudy-night-rain' }],
  [71, { day: 'overcast-day-snow', night: 'overcast-night-snow' }],
  [73, { day: 'overcast-day-snow', night: 'overcast-night-snow' }],
  [75, { day: 'overcast-day-snow', night: 'overcast-night-snow' }],
  [77, { day: 'overcast-day-snow', night: 'overcast-night-snow' }],
  [80, { day: 'partly-cloudy-day-drizzle', night: 'partly-cloudy-night-drizzle' }],
  [81, { day: 'partly-cloudy-day-drizzle', night: 'partly-cloudy-night-drizzle' }],
  [82, { day: 'partly-cloudy-day-drizzle', night: 'partly-cloudy-night-drizzle' }],
  [85, { day: 'overcast-day-snow', night: 'overcast-day-snow' }],
  [86, { day: 'overcast-day-snow', night: 'overcast-day-snow' }],
  [95, { day: 'thunderstorms-day', night: 'thunderstorms-night' }],
  [96, { day: 'thunderstorms-day', night: 'thunderstorms-night' }],
  [99, { day: 'thunderstorms-day', night: 'thunderstorms-night' }],
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

  return <Meteocon alt={description ?? 'N/A'} name={iconName ?? 'not-available'} size={size} />;
};
