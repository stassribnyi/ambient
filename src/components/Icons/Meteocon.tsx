import { FC } from 'react';
import { Box } from '@mui/material';

// OPEN WEATHER MAP ICONS
// import sunny from '../../assets/svg/01d.svg';
// import clear from '../../assets/svg/01n.svg';

// import partlySunny from '../../assets/svg/02d.svg';
// import partlyClear from '../../assets/svg/02n.svg';

// import cloudyDay from '../../assets/svg/03d.svg';
// import cloudyNight from '../../assets/svg/03n.svg';

// import foggyDay from '../../assets/svg/50d.svg';
// import foggyNight from '../../assets/svg/50n.svg';

// import rainDay from '../../assets/svg/10d.svg';
// import rainNight from '../../assets/svg/10n.svg';

// import drizzleDay from '../../assets/svg/09d.svg';
// import drizzleNight from '../../assets/svg/09n.svg';

// import snowDay from '../../assets/svg/13d.svg';
// import snowNight from '../../assets/svg/13n.svg';

// import thunderstormDay from '../../assets/svg/11d.svg';
// import thunderstormNight from '../../assets/svg/11n.svg';

import sunny from '../../assets/svg/clear-day.svg';
import clear from '../../assets/svg/clear-night.svg';

import partlySunny from '../../assets/svg/partly-cloudy-day.svg';
import partlyClear from '../../assets/svg/partly-cloudy-night.svg';

import cloudyDay from '../../assets/svg/overcast-day.svg';
import cloudyNight from '../../assets/svg/overcast-night.svg';

import foggyDay from '../../assets/svg/fog-day.svg';
import foggyNight from '../../assets/svg/fog-night.svg';

import rainDay from '../../assets/svg/partly-cloudy-day-rain.svg';
import rainNight from '../../assets/svg/partly-cloudy-night-rain.svg';

import drizzleDay from '../../assets/svg/partly-cloudy-day-drizzle.svg';
import drizzleNight from '../../assets/svg/partly-cloudy-night-drizzle.svg';

import snowDay from '../../assets/svg/overcast-day-snow.svg';
import snowNight from '../../assets/svg/overcast-night-snow.svg';

import thunderstormDay from '../../assets/svg/thunderstorms-day.svg';
import thunderstormNight from '../../assets/svg/thunderstorms-night.svg';

// BEAUFORT SCALE ICONS
import windBeaufort0 from '../../assets/svg/wind-beaufort-0.svg';
import windBeaufort1 from '../../assets/svg/wind-beaufort-1.svg';
import windBeaufort2 from '../../assets/svg/wind-beaufort-2.svg';
import windBeaufort3 from '../../assets/svg/wind-beaufort-3.svg';
import windBeaufort4 from '../../assets/svg/wind-beaufort-4.svg';
import windBeaufort5 from '../../assets/svg/wind-beaufort-5.svg';
import windBeaufort6 from '../../assets/svg/wind-beaufort-6.svg';
import windBeaufort7 from '../../assets/svg/wind-beaufort-7.svg';
import windBeaufort8 from '../../assets/svg/wind-beaufort-8.svg';
import windBeaufort9 from '../../assets/svg/wind-beaufort-9.svg';
import windBeaufort10 from '../../assets/svg/wind-beaufort-10.svg';
import windBeaufort11 from '../../assets/svg/wind-beaufort-11.svg';
import windBeaufort12 from '../../assets/svg/wind-beaufort-12.svg';

// UV INDEX ICONS
import uvIdxNA from '../../assets/svg/uv-index.svg';
import uvIdx1 from '../../assets/svg/uv-index-1.svg';
import uvIdx2 from '../../assets/svg/uv-index-2.svg';
import uvIdx3 from '../../assets/svg/uv-index-3.svg';
import uvIdx4 from '../../assets/svg/uv-index-4.svg';
import uvIdx5 from '../../assets/svg/uv-index-5.svg';
import uvIdx6 from '../../assets/svg/uv-index-6.svg';
import uvIdx7 from '../../assets/svg/uv-index-7.svg';
import uvIdx8 from '../../assets/svg/uv-index-8.svg';
import uvIdx9 from '../../assets/svg/uv-index-9.svg';
import uvIdx10 from '../../assets/svg/uv-index-10.svg';
import uvIdx11 from '../../assets/svg/uv-index-11.svg';

// SUN CYCLE ICONS
import sunrise from '../../assets/svg/sunrise.svg';
import sunset from '../../assets/svg/sunset.svg';

// GENERAL ICONS
import humidity from '../../assets/svg/humidity.svg';
import notAvailable from '../../assets/svg/not-available.svg';
import umbrella from '../../assets/svg/umbrella.svg';
import barometer from '../../assets/svg/barometer.svg';

import { OPEN_WEATHER_ICONS_STATIC } from './MeteoconStatic';

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

const GENERAL_ICONS = {
  barometer: barometer,
  humidity: humidity,
  'n/a': notAvailable,
  umbrella: umbrella,
} as const;

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
    variant?: 'dynamic' | 'static';
  }>
> = ({ alt, name, size = 48, variant = 'dynamic' }) => (
  <Box
    draggable={false}
    component="img"
    src={
      variant === 'static' && Object.keys(OPEN_WEATHER_ICONS_STATIC).includes(name)
        ? OPEN_WEATHER_ICONS_STATIC[name]
        : ICONS_MAP[name] ?? notAvailable
    }
    alt={alt}
    sx={{ width: `${size}px` }}
  />
);
