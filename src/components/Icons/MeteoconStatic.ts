// FIXME: move mappings somewhere else

// OPEN WEATHER MAP ICONS
import sunny from '../../assets/svg-static/clear-day.svg';
import clear from '../../assets/svg-static/clear-night.svg';

import partlySunny from '../../assets/svg-static/partly-cloudy-day.svg';
import partlyClear from '../../assets/svg-static/partly-cloudy-night.svg';

import cloudyDay from '../../assets/svg-static/cloudy.svg';
import cloudyNight from '../../assets/svg-static/cloudy.svg';

import foggyDay from '../../assets/svg-static/fog-day.svg';
import foggyNight from '../../assets/svg-static/fog-night.svg'; // TODO

import rainDay from '../../assets/svg-static/rain.svg';
import rainNight from '../../assets/svg-static/overcast-night-rain.svg'; // TODO

import drizzleDay from '../../assets/svg-static/drizzle.svg';
import drizzleNight from '../../assets/svg-static/drizzle.svg';

import snowDay from '../../assets/svg-static/overcast-snow.svg'; // TODO
import snowNight from '../../assets/svg-static/overcast-night-snow.svg'; // TODO

import thunderstormDay from '../../assets/svg-static/thunderstorms-day.svg'; // TODO
import thunderstormNight from '../../assets/svg-static/thunderstorms-night.svg';

export const OPEN_WEATHER_ICONS_STATIC = {
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
