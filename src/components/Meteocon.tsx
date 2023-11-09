import { FC } from 'react';
import { Box } from '@mui/material';

// OPEN WEATHER MAP ICONS
import sunny from '@bybas/weather-icons/production/fill/openweathermap/01d.svg';
import clear from '@bybas/weather-icons/production/fill/openweathermap/01n.svg';

import partlySunny from '@bybas/weather-icons/production/fill/openweathermap/02d.svg';
import partlyClear from '@bybas/weather-icons/production/fill/openweathermap/02n.svg';

import cloudyDay from '@bybas/weather-icons/production/fill/openweathermap/03d.svg';
import cloudyNight from '@bybas/weather-icons/production/fill/openweathermap/03n.svg';

import foggyDay from '@bybas/weather-icons/production/fill/openweathermap/50d.svg';
import foggyNight from '@bybas/weather-icons/production/fill/openweathermap/50n.svg';

import rainDay from '@bybas/weather-icons/production/fill/openweathermap/10d.svg';
import rainNight from '@bybas/weather-icons/production/fill/openweathermap/10n.svg';

import drizzleDay from '@bybas/weather-icons/production/fill/openweathermap/09d.svg';
import drizzleNight from '@bybas/weather-icons/production/fill/openweathermap/09n.svg';

import snowDay from '@bybas/weather-icons/production/fill/openweathermap/13d.svg';
import snowNight from '@bybas/weather-icons/production/fill/openweathermap/13n.svg';

import thunderstormDay from '@bybas/weather-icons/production/fill/openweathermap/11d.svg';
import thunderstormNight from '@bybas/weather-icons/production/fill/openweathermap/11n.svg';

// BEAUFORT SCALE ICONS
import windBeaufort0 from '@bybas/weather-icons/production/fill/all/wind-beaufort-0.svg';
import windBeaufort1 from '@bybas/weather-icons/production/fill/all/wind-beaufort-1.svg';
import windBeaufort2 from '@bybas/weather-icons/production/fill/all/wind-beaufort-2.svg';
import windBeaufort3 from '@bybas/weather-icons/production/fill/all/wind-beaufort-3.svg';
import windBeaufort4 from '@bybas/weather-icons/production/fill/all/wind-beaufort-4.svg';
import windBeaufort5 from '@bybas/weather-icons/production/fill/all/wind-beaufort-5.svg';
import windBeaufort6 from '@bybas/weather-icons/production/fill/all/wind-beaufort-6.svg';
import windBeaufort7 from '@bybas/weather-icons/production/fill/all/wind-beaufort-7.svg';
import windBeaufort8 from '@bybas/weather-icons/production/fill/all/wind-beaufort-8.svg';
import windBeaufort9 from '@bybas/weather-icons/production/fill/all/wind-beaufort-9.svg';
import windBeaufort10 from '@bybas/weather-icons/production/fill/all/wind-beaufort-10.svg';
import windBeaufort11 from '@bybas/weather-icons/production/fill/all/wind-beaufort-11.svg';
import windBeaufort12 from '@bybas/weather-icons/production/fill/all/wind-beaufort-12.svg';

// UV INDEX ICONS
import uvIdxNA from '@bybas/weather-icons/production/fill/all/uv-index.svg';
import uvIdx1 from '@bybas/weather-icons/production/fill/all/uv-index-1.svg';
import uvIdx2 from '@bybas/weather-icons/production/fill/all/uv-index-2.svg';
import uvIdx3 from '@bybas/weather-icons/production/fill/all/uv-index-3.svg';
import uvIdx4 from '@bybas/weather-icons/production/fill/all/uv-index-4.svg';
import uvIdx5 from '@bybas/weather-icons/production/fill/all/uv-index-5.svg';
import uvIdx6 from '@bybas/weather-icons/production/fill/all/uv-index-6.svg';
import uvIdx7 from '@bybas/weather-icons/production/fill/all/uv-index-7.svg';
import uvIdx8 from '@bybas/weather-icons/production/fill/all/uv-index-8.svg';
import uvIdx9 from '@bybas/weather-icons/production/fill/all/uv-index-9.svg';
import uvIdx10 from '@bybas/weather-icons/production/fill/all/uv-index-10.svg';
import uvIdx11 from '@bybas/weather-icons/production/fill/all/uv-index-11.svg';

// SUN CYCLE ICONS
import sunrise from '@bybas/weather-icons/production/fill/all/sunrise.svg';
import sunset from '@bybas/weather-icons/production/fill/all/sunset.svg';

// GENERAL ICONS
import humidity from '@bybas/weather-icons/production/fill/all/humidity.svg';
import notAvailable from '@bybas/weather-icons/production/fill/all/not-available.svg';

const OPEN_WEATHER_ICONS = {
  sunny: sunny,
  clear: clear,
  'partly-sunny': partlySunny,
  'partly-clear': partlyClear,
  'cloudy-day': cloudyDay,
  'cloudy-night': cloudyNight,
  'foggy-day': foggyDay,
  'foggy-night': foggyNight,
  'rain-day': rainDay,
  'rain-night': rainNight,
  'drizzle-day': drizzleDay,
  'drizzle-night': drizzleNight,
  'snow-day': snowDay,
  'snow-night': snowNight,
  'thunderstorm-day': thunderstormDay,
  'thunderstorm-night': thunderstormNight,
} as const;

const BEAUFORT_SCALE_ICONS = {
  'beaufort-0': windBeaufort0,
  'beaufort-1': windBeaufort1,
  'beaufort-2': windBeaufort2,
  'beaufort-3': windBeaufort3,
  'beaufort-4': windBeaufort4,
  'beaufort-5': windBeaufort5,
  'beaufort-6': windBeaufort6,
  'beaufort-7': windBeaufort7,
  'beaufort-8': windBeaufort8,
  'beaufort-9': windBeaufort9,
  'beaufort-10': windBeaufort10,
  'beaufort-11': windBeaufort11,
  'beaufort-12': windBeaufort12,
} as const;

const UV_INDEX_ICONS = {
  'uv-n/a': uvIdxNA,
  'uv-1': uvIdx1,
  'uv-2': uvIdx2,
  'uv-3': uvIdx3,
  'uv-4': uvIdx4,
  'uv-5': uvIdx5,
  'uv-6': uvIdx6,
  'uv-7': uvIdx7,
  'uv-8': uvIdx8,
  'uv-9': uvIdx9,
  'uv-10': uvIdx10,
  'uv-11': uvIdx11,
} as const;

const SUN_CYCLE_ICONS = {
  sunrise: sunrise,
  sunset: sunset,
} as const;

const GENERAL_ICONS = { humidity: humidity, 'n/a': notAvailable } as const;

const ICONS_MAP = {
  ...OPEN_WEATHER_ICONS,
  ...BEAUFORT_SCALE_ICONS,
  ...UV_INDEX_ICONS,
  ...SUN_CYCLE_ICONS,
  ...GENERAL_ICONS,
} as const;

export type Icons = keyof typeof ICONS_MAP;

export const Meteocon: FC<
  Readonly<{
    alt: string;
    name: Icons;
    size?: number;
  }>
> = ({ alt, name, size = 48 }) => (
  <Box component="img" src={ICONS_MAP[name] ?? notAvailable} alt={alt} sx={{ width: `${size}px` }} />
);
