import { FC } from 'react';
import { Box, Typography } from '@mui/material';

import { Meteocon } from './Icons';

export const Branding: FC<Readonly<{ variant?: 'compact' | 'full' }>> = ({ variant = 'full' }) => (
  <Box sx={{ display: 'grid', placeItems: 'center' }}>
    <Box sx={{ m: variant === 'compact' ? '-2.5rem 0' : null }}>
      <Meteocon animated alt="ambient logo" name="partly-cloudy-day" size={214} />
    </Box>
    <Typography variant="h3" sx={{ fontWeight: 'bold' }}>
      Ambient
    </Typography>
    <Typography color="secondary">Weather Forecast</Typography>
  </Box>
);
