import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { UVIndexScale } from '../../vite-env';

import { type MeteoconProps, Meteocon } from './Meteocon';

const UV_INDEX_SCALE: Record<UVIndexScale, MeteoconProps['name']> = {
  1: 'uv-index-1',
  2: 'uv-index-2',
  3: 'uv-index-3',
  4: 'uv-index-4',
  5: 'uv-index-5',
  6: 'uv-index-6',
  7: 'uv-index-7',
  8: 'uv-index-8',
  9: 'uv-index-9',
  10: 'uv-index-10',
  11: 'uv-index-11',
} as const;

type UVIndexIconProps = Readonly<{
  scale?: UVIndexScale; //TODO: must not be null
  size?: number;
}>;

export const UVIndexIcon: FC<UVIndexIconProps> = ({ scale, size }) => {
  const { t } = useTranslation();

  return (
    <Meteocon
      animated
      alt={scale ? t(`uv_index_codes.${scale}`) : t('common.not_available')}
      name={scale ? UV_INDEX_SCALE[scale] : 'uv-index'}
      size={size}
    />
  );
};
