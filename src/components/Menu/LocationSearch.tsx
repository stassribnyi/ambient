import { useState, Fragment } from 'react';
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

import { useLocationSearch } from '../../hooks';
import { Location } from '../../vite-env';

export function LocationSearch({
  onBackButton,
  onSubmit,
}: {
  onBackButton: () => void;
  onSubmit: (location: Location) => void;
}) {
  const [search, setSearch] = useState<string>('');
  const debouncedSearch = useDebounce<string>(search, 500);

  const { results, loading } = useLocationSearch(debouncedSearch?.trim());

  const handleSelect = (option: Location) => {
    setSearch('');
    onSubmit(option);
    onBackButton();
  };

  return (
    <BaseMenuPage
      header={
        <>
          <IconButton sx={{ fontSize: '2rem' }} edge="start" color="inherit" onClick={onBackButton} aria-label="close">
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
        <Box sx={{ display: 'grid', placeContent: 'center', height: '100%' }}>
          {loading ? (
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
