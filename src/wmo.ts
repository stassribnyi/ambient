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

export const WMO = {
    '0': {
        day: {
            description: 'Sunny',
            image: sunny,
        },
        night: {
            description: 'Clear',
            image: clear,
        },
    },
    '1': {
        day: {
            description: 'Mainly Sunny',
            image: sunny,
        },
        night: {
            description: 'Mainly Clear',
            image: clear,
        },
    },
    '2': {
        day: {
            description: 'Partly Cloudy',
            image: partlySunny,
        },
        night: {
            description: 'Partly Cloudy',
            image: partlyClear,
        },
    },
    '3': {
        day: {
            description: 'Cloudy',
            image: cloudyDay,
        },
        night: {
            description: 'Cloudy',
            image: cloudyNight,
        },
    },
    '45': {
        day: {
            description: 'Foggy',
            image: foggyDay,
        },
        night: {
            description: 'Foggy',
            image: foggyNight,
        },
    },
    '48': {
        day: {
            description: 'Rime Fog',
            image: foggyDay,
        },
        night: {
            description: 'Rime Fog',
            image: foggyNight,
        },
    },
    '51': {
        day: {
            description: 'Light Drizzle',
            image: drizzleDay,
        },
        night: {
            description: 'Light Drizzle',
            image: drizzleNight,
        },
    },
    '53': {
        day: {
            description: 'Drizzle',
            image: drizzleDay,
        },
        night: {
            description: 'Drizzle',
            image: drizzleNight,
        },
    },
    '55': {
        day: {
            description: 'Heavy Drizzle',
            image: drizzleDay,
        },
        night: {
            description: 'Heavy Drizzle',
            image: drizzleNight,
        },
    },
    '56': {
        day: {
            description: 'Light Freezing Drizzle',
            image: drizzleDay,
        },
        night: {
            description: 'Light Freezing Drizzle',
            image: drizzleNight,
        },
    },
    '57': {
        day: {
            description: 'Freezing Drizzle',
            image: drizzleDay,
        },
        night: {
            description: 'Freezing Drizzle',
            image: drizzleNight,
        },
    },
    '61': {
        day: {
            description: 'Light Rain',
            image: rainDay,
        },
        night: {
            description: 'Light Rain',
            image: rainNight,
        },
    },
    '63': {
        day: {
            description: 'Rain',
            image: rainDay,
        },
        night: {
            description: 'Rain',
            image: rainNight,
        },
    },
    '65': {
        day: {
            description: 'Heavy Rain',
            image: rainDay,
        },
        night: {
            description: 'Heavy Rain',
            image: rainNight,
        },
    },
    '66': {
        day: {
            description: 'Light Freezing Rain',
            image: rainDay,
        },
        night: {
            description: 'Light Freezing Rain',
            image: rainNight,
        },
    },
    '67': {
        day: {
            description: 'Freezing Rain',
            image: rainDay,
        },
        night: {
            description: 'Freezing Rain',
            image: rainNight,
        },
    },
    '71': {
        day: {
            description: 'Light Snow',
            image: snowDay,
        },
        night: {
            description: 'Light Snow',
            image: snowNight,
        },
    },
    '73': {
        day: {
            description: 'Snow',
            image: snowDay,
        },
        night: {
            description: 'Snow',
            image: snowNight,
        },
    },
    '75': {
        day: {
            description: 'Heavy Snow',
            image: snowDay,
        },
        night: {
            description: 'Heavy Snow',
            image: snowNight,
        },
    },
    '77': {
        day: {
            description: 'Snow Grains',
            image: snowDay,
        },
        night: {
            description: 'Snow Grains',
            image: snowNight,
        },
    },
    '80': {
        day: {
            description: 'Light Showers',
            image: drizzleDay,
        },
        night: {
            description: 'Light Showers',
            image: drizzleNight,
        },
    },
    '81': {
        day: {
            description: 'Showers',
            image: drizzleDay,
        },
        night: {
            description: 'Showers',
            image: drizzleNight,
        },
    },
    '82': {
        day: {
            description: 'Heavy Showers',
            image: drizzleDay,
        },
        night: {
            description: 'Heavy Showers',
            image: drizzleNight,
        },
    },
    '85': {
        day: {
            description: 'Light Snow Showers',
            image: snowDay,
        },
        night: {
            description: 'Light Snow Showers',
            image: snowNight,
        },
    },
    '86': {
        day: {
            description: 'Snow Showers',
            image: snowDay,
        },
        night: {
            description: 'Snow Showers',
            image: snowNight,
        },
    },
    '95': {
        day: {
            description: 'Thunderstorm',
            image: thunderstormDay,
        },
        night: {
            description: 'Thunderstorm',
            image: thunderstormNight,
        },
    },
    '96': {
        day: {
            description: 'Light Thunderstorms With Hail',
            image: thunderstormDay,
        },
        night: {
            description: 'Light Thunderstorms With Hail',
            image: thunderstormNight,
        },
    },
    '99': {
        day: {
            description: 'Thunderstorm With Hail',
            image: thunderstormDay,
        },
        night: {
            description: 'Thunderstorm With Hail',
            image: thunderstormNight,
        },
    },
};