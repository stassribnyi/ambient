import { FC } from 'react';
import { Box, Typography } from '@mui/material';

import { Meteocon } from './Icons';

export const Branding: FC<Readonly<{ variant?: 'compact' | 'full' }>> = ({ variant = 'full' }) => (
  <Box sx={{ display: 'grid', placeItems: 'center' }}>
    <Box sx={{ m: variant === 'compact' ? '-4rem 0' : null }}>
      <Meteocon animated alt="partly cloudy day" name="partly-cloudy-day" size={256} />
    </Box>
    <Typography variant="h3" sx={{ fontWeight: 'bold' }}>
      Ambient
    </Typography>
    <Typography color="secondary">Weather Forecast</Typography>
  </Box>
);
