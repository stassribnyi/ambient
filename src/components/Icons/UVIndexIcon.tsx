import { FC } from 'react';
import { UVIndexScale } from '../../vite-env';

import { type MeteoconProps, Meteocon } from './Meteocon';

// FIXME: reuse types
export const UV_INDEX_SCALE = new Map<UVIndexScale | undefined, { name: MeteoconProps['name']; description: string }>([
  [1, { name: 'uv-index-1', description: 'Low' }],
  [2, { name: 'uv-index-2', description: 'Low' }],
  [3, { name: 'uv-index-3', description: 'Moderate' }],
  [4, { name: 'uv-index-4', description: 'Moderate' }],
  [5, { name: 'uv-index-5', description: 'Moderate' }],
  [6, { name: 'uv-index-6', description: 'High' }],
  [7, { name: 'uv-index-7', description: 'High' }],
  [8, { name: 'uv-index-8', description: 'Very High' }],
  [9, { name: 'uv-index-9', description: 'Very High' }],
  [10, { name: 'uv-index-10', description: 'Extreme' }],
  [11, { name: 'uv-index-11', description: 'Extreme' }],
]);

type UVIndexIconProps = Readonly<{
  scale?: UVIndexScale;
  size?: number;
}>;

export const UVIndexIcon: FC<UVIndexIconProps> = ({ scale, size }) => {
  const info = UV_INDEX_SCALE.get(scale);

  return <Meteocon alt={info?.description ?? 'N/A'} name={info?.name ?? 'uv-index'} size={size} />;
};
