import { forwardRef } from 'react';
import { useOutlet, useNavigate } from 'react-router-dom';

import { Slide, IconButton, Dialog, useTheme, useMediaQuery } from '@mui/material';
import type { TransitionProps } from '@mui/material/transitions';
import { Menu as MenuIcon } from '@mui/icons-material';

import { MenuPageRoutes } from './routes';

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<unknown, string>;
  },
  ref: React.Ref<unknown>,
) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return <Slide direction={isMobile ? 'right' : 'down'} ref={ref} {...props} />;
});

// TODO: use route guards
// const SCREEN_LOCK_PAGES = [MenuPage.WELCOME, MenuPage.SEARCH];

export function MenuDialog() {
  const theme = useTheme();
  const outlet = useOutlet();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <>
      <IconButton edge="start" sx={{ fontSize: '2rem' }} onClick={() => navigate(MenuPageRoutes.SETTINGS)}>
        <MenuIcon fontSize="inherit" />
      </IconButton>
      <Dialog
        open={!!outlet}
        onClose={() => navigate('/')}
        fullScreen={isMobile}
        TransitionComponent={Transition}
        sx={{
          '& .MuiDialog-container > .MuiPaper-root': {
            backgroundImage: 'none',
            ...(!isMobile && {
              minHeight: '568px',
              maxHeight: '568px',
              minWidth: '360px',
              overflowY: 'hidden',
            }),
          },

          '& header': {
            color: 'secondary.light',
            background: 'none',
            boxShadow: 'none',
            p: '0.5rem 0',

            '& .MuiToolbar-root': {
              height: '2.25rem',
              pl: 3,
              pr: 3,
            },
          },
        }}
      >
        {outlet}
      </Dialog>
    </>
  );
}
