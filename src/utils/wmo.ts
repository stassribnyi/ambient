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

// TODO: convert into function and add fallback
export const WMO = {
  '0': {
    day: {
      description: 'Sunny',
      iconUrl: sunny,
    },
    night: {
      description: 'Clear',
      iconUrl: clear,
    },
  },
  '1': {
    day: {
      description: 'Mainly Sunny',
      iconUrl: sunny,
    },
    night: {
      description: 'Mainly Clear',
      iconUrl: clear,
    },
  },
  '2': {
    day: {
      description: 'Partly Cloudy',
      iconUrl: partlySunny,
    },
    night: {
      description: 'Partly Cloudy',
      iconUrl: partlyClear,
    },
  },
  '3': {
    day: {
      description: 'Cloudy',
      iconUrl: cloudyDay,
    },
    night: {
      description: 'Cloudy',
      iconUrl: cloudyNight,
    },
  },
  '45': {
    day: {
      description: 'Foggy',
      iconUrl: foggyDay,
    },
    night: {
      description: 'Foggy',
      iconUrl: foggyNight,
    },
  },
  '48': {
    day: {
      description: 'Rime Fog',
      iconUrl: foggyDay,
    },
    night: {
      description: 'Rime Fog',
      iconUrl: foggyNight,
    },
  },
  '51': {
    day: {
      description: 'Light Drizzle',
      iconUrl: drizzleDay,
    },
    night: {
      description: 'Light Drizzle',
      iconUrl: drizzleNight,
    },
  },
  '53': {
    day: {
      description: 'Drizzle',
      iconUrl: drizzleDay,
    },
    night: {
      description: 'Drizzle',
      iconUrl: drizzleNight,
    },
  },
  '55': {
    day: {
      description: 'Heavy Drizzle',
      iconUrl: drizzleDay,
    },
    night: {
      description: 'Heavy Drizzle',
      iconUrl: drizzleNight,
    },
  },
  '56': {
    day: {
      description: 'Light Freezing Drizzle',
      iconUrl: drizzleDay,
    },
    night: {
      description: 'Light Freezing Drizzle',
      iconUrl: drizzleNight,
    },
  },
  '57': {
    day: {
      description: 'Freezing Drizzle',
      iconUrl: drizzleDay,
    },
    night: {
      description: 'Freezing Drizzle',
      iconUrl: drizzleNight,
    },
  },
  '61': {
    day: {
      description: 'Light Rain',
      iconUrl: rainDay,
    },
    night: {
      description: 'Light Rain',
      iconUrl: rainNight,
    },
  },
  '63': {
    day: {
      description: 'Rain',
      iconUrl: rainDay,
    },
    night: {
      description: 'Rain',
      iconUrl: rainNight,
    },
  },
  '65': {
    day: {
      description: 'Heavy Rain',
      iconUrl: rainDay,
    },
    night: {
      description: 'Heavy Rain',
      iconUrl: rainNight,
    },
  },
  '66': {
    day: {
      description: 'Light Freezing Rain',
      iconUrl: rainDay,
    },
    night: {
      description: 'Light Freezing Rain',
      iconUrl: rainNight,
    },
  },
  '67': {
    day: {
      description: 'Freezing Rain',
      iconUrl: rainDay,
    },
    night: {
      description: 'Freezing Rain',
      iconUrl: rainNight,
    },
  },
  '71': {
    day: {
      description: 'Light Snow',
      iconUrl: snowDay,
    },
    night: {
      description: 'Light Snow',
      iconUrl: snowNight,
    },
  },
  '73': {
    day: {
      description: 'Snow',
      iconUrl: snowDay,
    },
    night: {
      description: 'Snow',
      iconUrl: snowNight,
    },
  },
  '75': {
    day: {
      description: 'Heavy Snow',
      iconUrl: snowDay,
    },
    night: {
      description: 'Heavy Snow',
      iconUrl: snowNight,
    },
  },
  '77': {
    day: {
      description: 'Snow Grains',
      iconUrl: snowDay,
    },
    night: {
      description: 'Snow Grains',
      iconUrl: snowNight,
    },
  },
  '80': {
    day: {
      description: 'Light Showers',
      iconUrl: drizzleDay,
    },
    night: {
      description: 'Light Showers',
      iconUrl: drizzleNight,
    },
  },
  '81': {
    day: {
      description: 'Showers',
      iconUrl: drizzleDay,
    },
    night: {
      description: 'Showers',
      iconUrl: drizzleNight,
    },
  },
  '82': {
    day: {
      description: 'Heavy Showers',
      iconUrl: drizzleDay,
    },
    night: {
      description: 'Heavy Showers',
      iconUrl: drizzleNight,
    },
  },
  '85': {
    day: {
      description: 'Light Snow Showers',
      iconUrl: snowDay,
    },
    night: {
      description: 'Light Snow Showers',
      iconUrl: snowNight,
    },
  },
  '86': {
    day: {
      description: 'Snow Showers',
      iconUrl: snowDay,
    },
    night: {
      description: 'Snow Showers',
      iconUrl: snowNight,
    },
  },
  '95': {
    day: {
      description: 'Thunderstorm',
      iconUrl: thunderstormDay,
    },
    night: {
      description: 'Thunderstorm',
      iconUrl: thunderstormNight,
    },
  },
  '96': {
    day: {
      description: 'Light Thunderstorms With Hail',
      iconUrl: thunderstormDay,
    },
    night: {
      description: 'Light Thunderstorms With Hail',
      iconUrl: thunderstormNight,
    },
  },
  '99': {
    day: {
      description: 'Thunderstorm With Hail',
      iconUrl: thunderstormDay,
    },
    night: {
      description: 'Thunderstorm With Hail',
      iconUrl: thunderstormNight,
    },
  },
};
