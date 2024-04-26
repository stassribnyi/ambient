import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { BeaufortScale } from '../../vite-env';

import { type MeteoconProps, Meteocon } from './Meteocon';

const WIND_BEAUFORT_SCALE: Record<BeaufortScale, MeteoconProps['name']> = {
  0: 'wind-beaufort-0',
  1: 'wind-beaufort-1',
  2: 'wind-beaufort-2',
  3: 'wind-beaufort-3',
  4: 'wind-beaufort-4',
  5: 'wind-beaufort-5',
  6: 'wind-beaufort-6',
  7: 'wind-beaufort-7',
  8: 'wind-beaufort-8',
  9: 'wind-beaufort-9',
  10: 'wind-beaufort-10',
  11: 'wind-beaufort-11',
  12: 'wind-beaufort-12',
} as const;

type BeaufortIconProps = Readonly<{
  scale: BeaufortScale;
  size?: number;
}>;

export const BeaufortIcon: FC<BeaufortIconProps> = ({ scale, size }) => {
  const { t } = useTranslation();

  return <Meteocon animated alt={t(`beaufort_scale_codes.${scale}`)} name={WIND_BEAUFORT_SCALE[scale]} size={size} />;
};
