import { forwardRef, useCallback, useEffect, useState } from 'react';

import { Slide, IconButton, Dialog, useTheme, useMediaQuery } from '@mui/material';
import type { TransitionProps } from '@mui/material/transitions';
import { Menu as MenuIcon } from '@mui/icons-material';

import { LocationSearch } from './LocationSearch';
import { LocationList } from './LocationList';

import { useLocations, useUserSettings } from '../../hooks';
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
}

// TODO: move into separate file
const useHash = (): [string, (value?: string | null) => void] => {
  const [hash, setHash] = useState(() => window.location.hash.replace('#', ''));

  const hashChangeHandler = useCallback(() => {
    setHash(window.location.hash.replace('#', ''));
  }, []);

  useEffect(() => {
    window.addEventListener('hashchange', hashChangeHandler);

    return () => {
      window.removeEventListener('hashchange', hashChangeHandler);
    };
  }, [hashChangeHandler]);

  const updateHash = useCallback(
    (newHash?: string | null) => {
      if (newHash !== hash) {
        window.location.hash = newHash ?? '';
      }
    },
    [hash],
  );

  return [hash, updateHash];
};

export function MenuDialog() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { locations, setLocations } = useLocations();
  const [, setSettings] = useUserSettings();

  const [hash, setHash] = useHash();

  useEffect(() => {
    if (!hash) {
      return;
    }

    if (hash === MenuPage.INDEX) {
      setHash(MenuPage.INDEX);

      return;
    }

    if (hash === MenuPage.SEARCH) {
      setHash(MenuPage.SEARCH);

      return;
    }

    setHash('');
  }, [hash, setHash]);

  const handleClickOpen = () => {
    setHash(MenuPage.INDEX);
  };

  const handleClose = () => {
    setHash(null);
  };

  const handleOptionSelect = (option: Location) => {
    if (!locations.some((item) => item.id === option.id)) {
      setLocations((items) => [...items, option]);
    }

    setSettings((prev) => ({ ...prev, currentLocationId: option.id }));
    handleClose();
  };

  // TODO: persist state via url, so back button returns to previous menu page
  function MenuRoutes() {
    switch (hash) {
      case MenuPage.SEARCH:
        return <LocationSearch onBackButton={() => setHash(MenuPage.INDEX)} onSubmit={handleOptionSelect} />;

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
        open={[MenuPage.INDEX, MenuPage.SEARCH].includes(hash as MenuPage)}
        onClose={handleClose}
        fullScreen={isMobile}
        TransitionComponent={Transition}
        sx={{
          '& .MuiDialog-container > .MuiPaper-root': {
            backgroundImage: 'none',
          },

          '& header': {
            color: 'secondary.light',
            backgroundImage: 'none',
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
