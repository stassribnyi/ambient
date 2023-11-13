import { IconButton, Box, Typography } from '@mui/material';
import { ArrowForward } from '@mui/icons-material';

import { BaseMenuPage } from './BaseMenuPage';
import { Meteocon } from '../Icons';

export function Welcome({ onNext }: { onNext: () => void }) {
  return (
    <BaseMenuPage>
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
            <Meteocon alt="clear day" name="partly-sunny" size={256} />
          </Box>
          <Typography variant="h3" sx={{ fontWeight: 'bold' }}>
            Ambient
          </Typography>
          <Typography color="secondary">Weather Forecast</Typography>
        </Box>
        <IconButton aria-aria-label="search" onClick={onNext} sx={{ backgroundColor: 'secondary.dark' }}>
          <ArrowForward />
        </IconButton>
      </Box>
    </BaseMenuPage>
  );
}
