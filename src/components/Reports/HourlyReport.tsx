import { FC } from 'react';
import { Box, Typography } from '@mui/material';

import { Precipitation } from '../Precipitation';
import { Temperature } from '../Temperature';
import { Time } from '../Time';
import { WMOIcon } from '../Icons';

import type { HourlyForecast } from '../../mappers';

export const HourlyReport: FC<Readonly<{ value: Array<HourlyForecast> }>> = ({ value }) => {
  return (
    <Box component="ul" sx={{ display: 'flex', listStyle: 'none', overflowX: 'auto', m: 0, p: 0, pb: '1rem' }}>
      {value.map(({ time, isDay, precipitation, temperature, weathercode }, idx) => (
        <Box component="li" key={idx} sx={{ display: 'grid', placeItems: 'center', p: 0.5 }}>
          <Typography sx={{ fontSize: '1rem', fontWeight: 700, m: 0 }}>
            <Temperature value={temperature} />
          </Typography>
          <WMOIcon variant={isDay ? 'day' : 'night'} code={weathercode} size={40} />
          <Typography sx={{ fontSize: '0.75rem', m: 0, mb: 1 }}>
            <Time value={time} format="HH:mm" />
          </Typography>
          <Precipitation showLabel level={precipitation} size={12} />
        </Box>
      ))}
    </Box>
  );
};
