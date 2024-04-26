import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { WMOCode } from '../../vite-env';

import { type MeteoconProps, Meteocon } from './Meteocon';

type WMOIconProps = Readonly<{
  animated?: boolean;
  code: WMOCode;
  size?: number;
  variant?: 'day' | 'night';
}> &
  Pick<MeteoconProps, 'sx'>;

type Variant<T = string> = Readonly<{
  day: T;
  night: T;
}>;

const WMO_ICON: Record<WMOCode, Variant<MeteoconProps['name']>> = {
  '0': { day: 'clear-day', night: 'clear-night' },
  '1': { day: 'clear-day', night: 'clear-night' },
  '2': { day: 'partly-cloudy-day', night: 'partly-cloudy-night' },
  '3': { day: 'overcast-day', night: 'overcast-night' },
  '45': { day: 'fog-day', night: 'fog-night' },
  '48': { day: 'fog-day', night: 'fog-night' },
  '51': { day: 'partly-cloudy-day-drizzle', night: 'partly-cloudy-night-drizzle' },
  '53': { day: 'partly-cloudy-day-drizzle', night: 'partly-cloudy-night-drizzle' },
  '55': { day: 'partly-cloudy-day-drizzle', night: 'partly-cloudy-night-drizzle' },
  '56': { day: 'partly-cloudy-day-drizzle', night: 'partly-cloudy-night-drizzle' },
  '57': { day: 'partly-cloudy-day-drizzle', night: 'partly-cloudy-night-drizzle' },
  '61': { day: 'partly-cloudy-day-rain', night: 'partly-cloudy-night-rain' },
  '63': { day: 'partly-cloudy-day-rain', night: 'partly-cloudy-night-rain' },
  '65': { day: 'partly-cloudy-day-rain', night: 'partly-cloudy-night-rain' },
  '66': { day: 'partly-cloudy-day-rain', night: 'partly-cloudy-night-rain' },
  '67': { day: 'partly-cloudy-day-rain', night: 'partly-cloudy-night-rain' },
  '71': { day: 'overcast-day-snow', night: 'overcast-night-snow' },
  '73': { day: 'overcast-day-snow', night: 'overcast-night-snow' },
  '75': { day: 'overcast-day-snow', night: 'overcast-night-snow' },
  '77': { day: 'overcast-day-snow', night: 'overcast-night-snow' },
  '80': { day: 'partly-cloudy-day-drizzle', night: 'partly-cloudy-night-drizzle' },
  '81': { day: 'partly-cloudy-day-drizzle', night: 'partly-cloudy-night-drizzle' },
  '82': { day: 'partly-cloudy-day-drizzle', night: 'partly-cloudy-night-drizzle' },
  '85': { day: 'overcast-day-snow', night: 'overcast-day-snow' },
  '86': { day: 'overcast-day-snow', night: 'overcast-day-snow' },
  '95': { day: 'thunderstorms-day', night: 'thunderstorms-night' },
  '96': { day: 'thunderstorms-day', night: 'thunderstorms-night' },
  '99': { day: 'thunderstorms-day', night: 'thunderstorms-night' },
} as const;

export const WMOIcon: FC<WMOIconProps> = ({ code, size, variant = 'day', animated = false, sx }) => {
  const { t } = useTranslation();

  return (
    <Meteocon
      animated={animated}
      alt={t(`wmo_codes.${code}.${variant}`)}
      name={WMO_ICON[code][variant]}
      size={size}
      sx={sx}
    />
  );
};
