import { FC } from 'react';
import { UVIndexScale } from '../vite-env';

import { type Icons, Meteocon } from './Meteocon';

const UV_INDEX_ICON = new Map<UVIndexScale | undefined, Icons>([
  [1, 'uv-1'],
  [2, 'uv-2'],
  [3, 'uv-3'],
  [4, 'uv-4'],
  [5, 'uv-5'],
  [6, 'uv-6'],
  [7, 'uv-7'],
  [8, 'uv-8'],
  [9, 'uv-9'],
  [10, 'uv-10'],
  [11, 'uv-11'],
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
}>;

export const UVIndexIcon: FC<UVIndexIconProps> = ({ scale, size }) => {
  const iconName = UV_INDEX_ICON.get(scale) || 'uv-n/a';
  const description = UV_INDEX_DESCRIPTION.get(scale) || 'N/A';

  return <Meteocon alt={description} name={iconName} size={size} />;
};
