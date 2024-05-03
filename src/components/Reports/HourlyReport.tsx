import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Typography } from '@mui/material';

import { Precipitation } from '../Precipitation';
import { Temperature } from '../Temperature';
import { WMOIcon } from '../Icons';

import type { HourlyForecast } from '../../mappers';

export const HourlyReport: FC<Readonly<{ value: Array<HourlyForecast> }>> = ({ value }) => {
  const { t } = useTranslation();

  return (
    <Box component="ul" sx={{ display: 'flex', listStyle: 'none', overflowX: 'auto', m: 0, p: 0, pb: '1rem' }}>
      {value.map(({ time, isDay, precipitation, temperature, weathercode }, idx) => (
        <Box
          component="li"
          key={idx}
          sx={{
            display: 'grid',
            placeItems: 'center',
            p: '0.25rem 0.5rem',
            gap: 0.4,
          }}
        >
          <Typography sx={{ fontSize: '1rem', fontWeight: 700, m: 0 }}>
            <Temperature value={temperature} />
          </Typography>
          <WMOIcon variant={isDay ? 'day' : 'night'} code={weathercode} size={34} />
          <Typography gutterBottom sx={{ width: 'max-content', fontSize: '0.75rem' }}>
            {t('report.hourly.time', { time })}
          </Typography>
          <Precipitation showLabel level={precipitation} size={12} />
        </Box>
      ))}
    </Box>
  );
};
