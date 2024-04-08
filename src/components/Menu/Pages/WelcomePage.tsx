import { IconButton, Box, Typography } from '@mui/material';
import { ArrowForward } from '@mui/icons-material';

import { Meteocon } from '../../Icons';
import { Link } from 'react-router-dom';
import { DialogLayout } from './DialogLayout';
import { MenuPageRoutes } from '../routes';

export function WelcomePage() {
  return (
    <DialogLayout>
      <Box
        sx={{
          pb: 4,
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <Box sx={{ display: 'grid', placeItems: 'center' }}>
          <Box sx={{ mb: 2 }}>
            <Meteocon animated alt="partly cloudy day" name="partly-cloudy-day" size={256} />
          </Box>
          <Typography variant="h3" sx={{ fontWeight: 'bold' }}>
            Ambient
          </Typography>
          <Typography color="secondary">Weather Forecast</Typography>
        </Box>
        <IconButton
          component={Link}
          aria-aria-label="search"
          to={MenuPageRoutes.SEARCH}
          sx={{ backgroundColor: 'secondary.dark' }}
        >
          <ArrowForward />
        </IconButton>
      </Box>
    </DialogLayout>
  );
}
