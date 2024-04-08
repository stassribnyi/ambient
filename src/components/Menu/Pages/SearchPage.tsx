import { useState, Fragment, useEffect } from 'react';
import { useDebounce } from 'usehooks-ts';
import { ChevronLeft, Close } from '@mui/icons-material';
import {
  IconButton,
  InputBase,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  Divider,
  CircularProgress,
  DialogContentText,
  Box,
} from '@mui/material';

import { BaseMenuPage } from './BaseMenuPage';

import { useGeoPosition, useLocations, useSearch } from '../../../hooks';
import { Location } from '../../../vite-env';
import { useNavigate } from 'react-router-dom';
import { MenuPageRoutes } from '../routes';

export function SearchPage() {
  const [search, setSearch] = useState<string>(''); // FIXME: change naming
  const debouncedSearch = useDebounce<string>(search, 500);
  const navigate = useNavigate();

  const { isPending, primary, addLocation } = useLocations();
  const { isLoading: isRequesting, data: position } = useGeoPosition();
  const { isLoading: isSearching, data: results = [] } = useSearch(debouncedSearch?.trim());

  useEffect(() => {
    if (!position) {
      return;
    }

    setSearch([position.name, position.country].filter(Boolean).join(', '));
  }, [position]);

  const handleSelect = async (option: Location) => {
    setSearch('');
    await addLocation(option);
    navigate(MenuPageRoutes.SETTINGS);
  };

  // FIXME: debouncing search phrase causes 'Nothing found' for a split second
  const isLoading = isPending || isRequesting || isSearching;

  return (
    <BaseMenuPage
      header={
        <>
          <IconButton
            sx={{ fontSize: '2rem' }}
            edge="start"
            color="inherit"
            onClick={() => navigate(primary ? MenuPageRoutes.SETTINGS : MenuPageRoutes.WELCOME)}
            aria-label="close"
          >
            <ChevronLeft fontSize="inherit" />
          </IconButton>

          <InputBase
            autoFocus
            value={search}
            sx={{
              color: 'inherit',
              width: '100%',
              fontSize: '1.125rem',

              '.MuiInputBase-input::placeholder': {
                color: 'white',
                opacity: 0.75,
              },
            }}
            placeholder="What is your city?"
            onChange={({ target }) => setSearch(target.value)}
          />

          <IconButton sx={{ fontSize: '1.5rem' }} edge="end" color="inherit" onClick={() => setSearch('')}>
            <Close fontSize="inherit" />
          </IconButton>
        </>
      }
    >
      {results.length && search.length ? (
        <Card>
          <CardContent>
            <List disablePadding>
              {results.map((location, idx) => (
                <Fragment key={idx}>
                  <ListItem disableGutters onClick={() => handleSelect(location)}>
                    <ListItemText
                      primary={location.name}
                      primaryTypographyProps={{
                        fontSize: '1.125rem',
                      }}
                      secondaryTypographyProps={{
                        color: '#ce93d8',
                      }}
                      secondary={[location.admin1, location.country].filter(Boolean).join(', ')}
                    />
                  </ListItem>
                  {idx !== results.length - 1 && <Divider />}
                </Fragment>
              ))}
            </List>
          </CardContent>
        </Card>
      ) : (
        <Box sx={{ display: 'grid', placeContent: 'center', flex: '1' }}>
          {isLoading ? (
            <CircularProgress color="secondary" />
          ) : (
            <DialogContentText>
              {search.length === 0 ? 'Please enter your location.' : 'Nothing has been found.'}
            </DialogContentText>
          )}
        </Box>
      )}
    </BaseMenuPage>
  );
}
