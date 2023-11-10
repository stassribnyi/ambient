import { FC } from 'react';
import { BeaufortScale } from '../../vite-env';

import { type Icons, Meteocon } from './Meteocon';

const WIND_BEAUFORT_ICON = new Map<BeaufortScale | undefined, Icons>([
  [0, 'beaufort-0'],
  [1, 'beaufort-1'],
  [2, 'beaufort-2'],
  [3, 'beaufort-3'],
  [4, 'beaufort-4'],
  [5, 'beaufort-5'],
  [6, 'beaufort-6'],
  [7, 'beaufort-7'],
  [8, 'beaufort-8'],
  [9, 'beaufort-9'],
  [10, 'beaufort-10'],
  [11, 'beaufort-11'],
  [12, 'beaufort-12'],
]);

// FIXME: move into separate file
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

export const BeaufortIcon: FC<BeaufortIconProps> = ({ scale, size }) => {
  const iconName = WIND_BEAUFORT_ICON.get(scale);
  const description = WIND_BEAUFORT_DESCRIPTION.get(scale);

  return <Meteocon alt={description ?? 'N/A'} name={iconName ?? 'beaufort-0'} size={size} />;
};
