import { forwardRef, useEffect } from 'react';

import { Slide, IconButton, Dialog, useTheme, useMediaQuery } from '@mui/material';
import type { TransitionProps } from '@mui/material/transitions';
import { Menu as MenuIcon } from '@mui/icons-material';

import { LocationSearch } from './LocationSearch';
import { LocationList } from './LocationList';
import { Welcome } from './Welcome';

import { useHash, useLocations } from '../../hooks';
import { Location } from '../../vite-env';

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

enum MenuPage {
  INDEX = 'settings',
  SEARCH = 'search',
  WELCOME = 'welcome',
}

const SCREEN_LOCK_PAGES = [MenuPage.WELCOME, MenuPage.SEARCH];
const ALLOWED_PAGES = [MenuPage.INDEX, MenuPage.SEARCH, MenuPage.WELCOME];

export function MenuDialog() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { locations, addLocation, isPending } = useLocations();

  const [hash, setHash] = useHash();

  useEffect(() => {
    if (!hash) {
      return;
    }

    if (ALLOWED_PAGES.includes(hash as MenuPage)) {
      setHash(hash);

      return;
    }

    setHash(null);
  }, [hash, setHash]);

  useEffect(() => {
    if (isPending || locations.length > 0 || SCREEN_LOCK_PAGES.includes(hash as MenuPage)) {
      return;
    }

    setHash(MenuPage.WELCOME);
  }, [isPending, hash, locations.length, setHash]);

  const handleClickOpen = () => {
    setHash(MenuPage.INDEX);
  };

  const handleClose = () => {
    setHash(null);
  };

  const handleOptionSelect = async (option: Location) => {
    // TODO: consider adding animation for setting new location as primary?
    await addLocation(option);

    if (!locations.includes(option)) {
      setHash(MenuPage.INDEX);

      return;
    }

    handleClose();
  };

  function MenuRoutes() {
    switch (hash) {
      case MenuPage.SEARCH:
        return <LocationSearch onBackButton={() => setHash(MenuPage.INDEX)} onSubmit={handleOptionSelect} />;
      case MenuPage.WELCOME:
        return <Welcome onNext={() => setHash(MenuPage.SEARCH)} />;
      default:
        return (
          <LocationList
            onAdd={() => setHash(MenuPage.SEARCH)}
            onBackButton={handleClose}
            onSelect={handleOptionSelect}
          />
        );
    }
  }

  return (
    <>
      <IconButton edge="start" sx={{ fontSize: '2rem' }} onClick={handleClickOpen}>
        <MenuIcon fontSize="inherit" />
      </IconButton>
      <Dialog
        open={ALLOWED_PAGES.includes(hash as MenuPage)}
        onClose={handleClose}
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
        <MenuRoutes />
      </Dialog>
    </>
  );
}
