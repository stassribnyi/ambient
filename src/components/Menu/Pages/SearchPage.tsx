import { useState, Fragment, useEffect, FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDebounce } from 'usehooks-ts';
import { useTranslation } from 'react-i18next';

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
  Stack,
  Box,
  DialogContentText,
} from '@mui/material';
import { Close } from '@mui/icons-material';

import { useGeoPosition, useLocations, useSearch } from '@/hooks';
import { safeJoin } from '@/utils';
import { Location } from '@/vite-env';

import { MenuPageRoutes } from '../routes';

import { BaseMenuPage } from './BaseMenuPage';

const SearchInput: FC<{
  value: string;
  onChange: (value: string) => void;
}> = ({ value, onChange }) => {
  const { t } = useTranslation();

  return (
    <Stack direction="row" sx={{ width: '100%' }}>
      <InputBase
        autoFocus
        value={value}
        sx={{
          color: 'inherit',
          width: '100%',
          fontSize: '1.125rem',

          '.MuiInputBase-input::placeholder': {
            color: 'white',
            opacity: 0.75,
          },
        }}
        placeholder={t('screen.search.placeholder')}
        onChange={({ target }) => onChange(target.value)}
      />

      <IconButton
        aria-label={t('screen.search.clear_all')}
        sx={{ fontSize: '1.5rem' }}
        edge="end"
        color="inherit"
        onClick={() => onChange('')}
      >
        <Close fontSize="inherit" />
      </IconButton>
    </Stack>
  );
};

export function SearchPage() {
  const { t } = useTranslation();
  const [searchInput, setSearchInput] = useState<string>('');
  const debouncedSearch = useDebounce<string>(searchInput, 500);

  const navigate = useNavigate();
  const { primary, addLocation } = useLocations();
  const { isFetching: isFetchingPosition, data: position } = useGeoPosition();
  const { isFetching: isFetchingPlaces, data: results = [] } = useSearch(debouncedSearch?.trim());

  useEffect(() => {
    if (!position) {
      return;
    }

    setSearchInput(safeJoin([position.admin1, position.country]));
  }, [position]);

  const handleSelect = async (place: Location) => {
    await addLocation(place);
    setSearchInput('');
    navigate(MenuPageRoutes.SETTINGS);
  };

  const isFetching = isFetchingPosition || isFetchingPlaces;
  const isResultVisible = results.length && !isFetching;

  const feedback = searchInput.length === 0 ? t('screen.search.cta') : t('screen.search.not_found');

  return (
    <BaseMenuPage
      backTo={primary ? MenuPageRoutes.SETTINGS : MenuPageRoutes.WELCOME}
      header={<SearchInput value={searchInput} onChange={setSearchInput} />}
    >
      {isResultVisible ? (
        <Card>
          <CardContent>
            <List disablePadding>
              {results.map((place, idx) => (
                <Fragment key={idx}>
                  <ListItem disableGutters onClick={() => handleSelect(place)}>
                    <ListItemText
                      primary={place.name}
                      primaryTypographyProps={{ fontSize: '1.125rem' }}
                      secondaryTypographyProps={{ color: '#ce93d8' }}
                      secondary={safeJoin([place.admin1, place.country])}
                    />
                  </ListItem>
                  {idx !== results.length - 1 && <Divider />}
                </Fragment>
              ))}
            </List>
          </CardContent>
        </Card>
      ) : (
        <Box sx={{ display: 'grid', placeContent: 'center', flex: '1', textAlign: 'center' }}>
          {isFetching ? <CircularProgress color="secondary" /> : <DialogContentText>{feedback}</DialogContentText>}
        </Box>
      )}
    </BaseMenuPage>
  );
}
