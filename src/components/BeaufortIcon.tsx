import { FC } from 'react';
import { Box } from '@mui/material';
import { BeaufortScale } from '../vite-env';

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

const WIND_BEAUFORT = new Map<BeaufortScale | undefined, string>([
  [0, windBeaufort0],
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

export const WIND_BEAUFORT_DESCRIPTION = new Map<BeaufortScale | undefined, string>([
  [0, 'Calm'],
  [1, 'Light air'],
  [2, 'Light Breeze'],
  [3, 'Gentle Breeze'],
  [4, 'Moderate Breeze'],
  [5, 'Fresh Breeze'],
  [6, 'Strong Breeze'],
  [7, 'Near Gale'],
  [8, 'Gale'],
  [9, 'Severe Gale'],
  [10, 'Storm'],
  [11, 'Violent Storm'],
  [12, 'Hurricane'],
]);

type BeaufortIconProps = Readonly<{
  scale?: BeaufortScale;
  size?: number;
}>;

export const BeaufortIcon: FC<BeaufortIconProps> = ({ scale, size = 48 }) => {
  const iconUrl = WIND_BEAUFORT.get(scale) || windBeaufort0;
  const description = WIND_BEAUFORT_DESCRIPTION.get(scale) || 'N/A';

  return <Box component="img" alt={description} src={iconUrl} sx={{ width: `${size}px` }} />;
};
