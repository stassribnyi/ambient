import { FC } from 'react';
import { Box, SxProps } from '@mui/material';
import { UVIndexScale } from '../vite-env';

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

const UV_INDEX = new Map<UVIndexScale | undefined, string>([
  [1, uvIdx1],
  [2, uvIdx2],
  [3, uvIdx3],
  [4, uvIdx4],
  [5, uvIdx5],
  [6, uvIdx6],
  [7, uvIdx7],
  [8, uvIdx8],
  [9, uvIdx9],
  [10, uvIdx10],
  [11, uvIdx11],
]);

// TODO: handle Extreme+ index
export const UV_INDEX_DESCRIPTION = new Map<UVIndexScale | undefined, string>([
  [1, 'Low'],
  [2, 'Low'],
  [3, 'Moderate'],
  [4, 'Moderate'],
  [5, 'Moderate'],
  [6, 'High'],
  [7, 'High'],
  [8, 'Very High'],
  [9, 'Very High'],
  [10, 'Extreme'],
  [11, 'Extreme'],
]);

type UVIndexIconProps = Readonly<{
  scale?: UVIndexScale;
  size?: number;
  sx?: SxProps;
}>;

export const UVIndexIcon: FC<UVIndexIconProps> = ({ scale, size = 48 }) => {
  const iconUrl = UV_INDEX.get(scale) || uvIdxNA;
  const description = UV_INDEX_DESCRIPTION.get(scale) || 'N/A';

  return <Box component="img" alt={description} src={iconUrl} sx={{ width: `${size}px` }} />;
};
