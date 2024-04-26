import { FC } from 'react';
import { Link } from 'react-router-dom';

import { IconButton, Box } from '@mui/material';
import { ArrowForward } from '@mui/icons-material';

import { Branding } from '@/components';

import { DialogContent } from './DialogContent';

import { MenuPageRoutes } from '../routes';

export const WelcomePage: FC = () => (
  <DialogContent>
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
      <Branding />
      <IconButton
        component={Link}
        aria-label="search"
        to={MenuPageRoutes.SEARCH}
        sx={{ backgroundColor: 'secondary.dark' }}
      >
        <ArrowForward />
      </IconButton>
    </Box>
  </DialogContent>
);
