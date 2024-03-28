import { FC } from 'react';
import { BeaufortScale } from '../../vite-env';

import { type MeteoconProps, Meteocon } from './Meteocon';

// FIXME: reuse types
export const WIND_BEAUFORT_SCALE = new Map<
  BeaufortScale | undefined,
  { name: MeteoconProps['name']; description: string }
>([
  [0, { name: 'wind-beaufort-0', description: 'Calm' }],
  [1, { name: 'wind-beaufort-1', description: 'Light Air' }],
  [2, { name: 'wind-beaufort-2', description: 'Light Breeze' }],
  [3, { name: 'wind-beaufort-3', description: 'Gentle Breeze' }],
  [4, { name: 'wind-beaufort-4', description: 'Moderate Breeze' }],
  [5, { name: 'wind-beaufort-5', description: 'Fresh Breeze' }],
  [6, { name: 'wind-beaufort-6', description: 'Strong Breeze' }],
  [7, { name: 'wind-beaufort-7', description: 'Near Gale' }],
  [8, { name: 'wind-beaufort-8', description: 'Gale' }],
  [9, { name: 'wind-beaufort-9', description: 'Severe Gale' }],
  [10, { name: 'wind-beaufort-10', description: 'Storm' }],
  [11, { name: 'wind-beaufort-11', description: 'Violent Storm' }],
  [12, { name: 'wind-beaufort-12', description: 'Hurricane' }],
]);

type BeaufortIconProps = Readonly<{
  scale?: BeaufortScale;
  size?: number;
}>;

export const BeaufortIcon: FC<BeaufortIconProps> = ({ scale, size }) => {
  const info = WIND_BEAUFORT_SCALE.get(scale);

  return <Meteocon alt={info?.description ?? 'N/A'} name={info?.name ?? 'wind-beaufort-0'} size={size} />;
};
