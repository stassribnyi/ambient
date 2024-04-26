import { Stack, CircularProgress } from '@mui/material';

import { Branding } from './Branding';

export const SplashFallback = () => (
  <Stack alignItems="center" justifyContent="center" gap={8} sx={{ flex: 1 }}>
    <Branding />
    <CircularProgress color="secondary" size={28} />
  </Stack>
);
