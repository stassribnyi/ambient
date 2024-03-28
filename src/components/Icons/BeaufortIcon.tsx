import { FC } from 'react';
import { BeaufortScale } from '../../vite-env';

import { type MeteoconProps, Meteocon } from './Meteocon';

const WIND_BEAUFORT_ICON = new Map<BeaufortScale | undefined, MeteoconProps['name']>([
  [0, 'wind-beaufort-0'],
  [1, 'wind-beaufort-1'],
  [2, 'wind-beaufort-2'],
  [3, 'wind-beaufort-3'],
  [4, 'wind-beaufort-4'],
  [5, 'wind-beaufort-5'],
  [6, 'wind-beaufort-6'],
  [7, 'wind-beaufort-7'],
  [8, 'wind-beaufort-8'],
  [9, 'wind-beaufort-9'],
  [10, 'wind-beaufort-10'],
  [11, 'wind-beaufort-11'],
  [12, 'wind-beaufort-12'],
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

  return <Meteocon alt={description ?? 'N/A'} name={iconName ?? 'wind-beaufort-0'} size={size} />;
};
