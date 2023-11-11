import { FC } from 'react';
import { Stack, Typography, CircularProgress } from '@mui/material';

import { Tile } from './Tile';

export const Fallback: FC<Readonly<{ title: string }>> = ({ title }) => (
  <Tile>
    <Stack direction="row" justifyContent="space-between">
      <Typography variant="h6">{title}</Typography>
      <CircularProgress color="secondary" size={28} />
    </Stack>
  </Tile>
);
