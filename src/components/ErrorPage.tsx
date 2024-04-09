import { Link, useRouteError } from 'react-router-dom';
import { Box, IconButton, Stack, Typography } from '@mui/material';

import { Meteocon } from './Icons';

export function ErrorPage() {
  const error = useRouteError() as Record<string, string>;
  console.error(error);

  return (
    <Box id="error-page" sx={{ p: 2, flex: 1, display: 'flex' }}>
      <Stack gap={2} alignItems="center" justifyContent="center" sx={{ flex: 1 }}>
        <Meteocon animated alt="Oops!" name="overcast-day-rain" size={256} />
        <Typography gutterBottom align="center" sx={{ fontSize: '1.125rem', fontWeight: 'bold' }}>
          Oops! It seems we’ve encountered a little cloud cover.
          <br />
          Use umbrella while we clear the skies!
        </Typography>
        <IconButton
          aria-label="home"
          component={Link}
          to="/"
          sx={{
            width: 48,
            height: 48,
            backgroundColor: 'rgba(255, 255, 255, 0.15)',
          }}
        >
          <Meteocon animated alt="Take an umbrella!" name="umbrella" />
        </IconButton>
      </Stack>
    </Box>
  );
}
