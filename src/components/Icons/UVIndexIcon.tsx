import { FC } from 'react';
import { UVIndexScale } from '../../vite-env';

import { type MeteoconProps, Meteocon } from './Meteocon';

const UV_INDEX_ICON = new Map<UVIndexScale | undefined, MeteoconProps['name']>([
  [1, 'uv-index-1'],
  [2, 'uv-index-2'],
  [3, 'uv-index-3'],
  [4, 'uv-index-4'],
  [5, 'uv-index-5'],
  [6, 'uv-index-6'],
  [7, 'uv-index-7'],
  [8, 'uv-index-8'],
  [9, 'uv-index-9'],
  [10, 'uv-index-10'],
  [11, 'uv-index-11'],
]);

// FIXME: move into separate file
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
}>;

export const UVIndexIcon: FC<UVIndexIconProps> = ({ scale, size }) => {
  const iconName = UV_INDEX_ICON.get(scale);
  const description = UV_INDEX_DESCRIPTION.get(scale);

  return <Meteocon alt={description ?? 'N/A'} name={iconName ?? 'uv-index'} size={size} />;
};
