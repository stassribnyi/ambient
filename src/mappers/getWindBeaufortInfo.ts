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

const WIND_BEAUFORT = new Map([
  [1, windBeaufort1],
  [2, windBeaufort2],
  [3, windBeaufort3],
  [4, windBeaufort4],
  [5, windBeaufort5],
  [6, windBeaufort6],
  [7, windBeaufort7],
  [8, windBeaufort8],
  [9, windBeaufort9],
  [10, windBeaufort10],
  [11, windBeaufort11],
  [12, windBeaufort12],
]);

export function getWindBeaufortInfo(windspeed: number) {
  let description = 'N/A';
  let windIndex = 0;

  switch (true) {
    case windspeed < 1:
      description = 'Calm';
      windIndex = 0;
      break;
    case 1 <= windspeed && windspeed <= 5:
      description = 'Light air';
      windIndex = 1;
      break;
    case 6 <= windspeed && windspeed <= 11:
      description = 'Light Breeze';
      windIndex = 2;
      break;
    case 12 <= windspeed && windspeed <= 19:
      description = 'Gentle Breeze';
      windIndex = 3;
      break;
    case 20 <= windspeed && windspeed <= 28:
      description = 'Moderate Breeze';
      windIndex = 4;
      break;
    case 29 <= windspeed && windspeed <= 38:
      description = 'Fresh Breeze';
      windIndex = 5;
      break;
    case 39 <= windspeed && windspeed <= 49:
      description = 'Strong Breeze';
      windIndex = 6;
      break;
    case 50 <= windspeed && windspeed <= 61:
      description = 'Near Gale';
      windIndex = 7;
      break;
    case 62 <= windspeed && windspeed <= 74:
      description = 'Gale';
      windIndex = 8;
      break;
    case 75 <= windspeed && windspeed <= 88:
      description = 'Severe Gale';
      windIndex = 9;
      break;
    case 89 <= windspeed && windspeed <= 102:
      description = 'Storm';
      windIndex = 10;
      break;
    case 103 <= windspeed && windspeed <= 117:
      description = 'Violent Storm';
      windIndex = 11;
      break;
    case 118 <= windspeed:
      description = 'Hurricane';
      windIndex = 12;
      break;
    default:
      break;
  }

  return {
    value: windspeed,
    description,
    iconUrl: WIND_BEAUFORT.get(windIndex) || windBeaufort0,
  };
}
