import {
  Slide,
  IconButton,
  Dialog,
  AppBar,
  Toolbar,
  InputBase,
  List,
  ListItem,
  ListItemText,
  Divider,
  DialogContent,
  DialogContentText,
  Typography,
  Stack,
  useTheme,
  useMediaQuery,
  Card,
  CardContent,
  ButtonBase,
  CircularProgress,
} from '@mui/material';
import type { TransitionProps } from '@mui/material/transitions';
import { Add, ChevronLeft, Close, Menu } from '@mui/icons-material';

import { forwardRef, useState, FC, useMemo, Fragment } from 'react';
import { useDebounce, useLocalStorage } from 'usehooks-ts';

import { useLocationSearch, useUserSettings } from '../hooks';
import { Location } from '../vite-env';
import { WMO } from '../wmo';

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

const LocationOption: FC<
  Readonly<{
    option: Location;
    onSelect: (option: Location) => void;
  }>
> = ({ option, onSelect }) => {
  const optionWMO = option.weathercode !== undefined ? WMO[option.weathercode] : null;

  return (
    <Card sx={{ mb: 2, borderRadius: '28px' }}>
      <ButtonBase onClick={() => onSelect(option)} sx={{ width: '100%' }}>
        <CardContent sx={{ width: '100%', p: '1.5rem 1rem' }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Stack direction="row" alignItems="center" gap={1}>
              {optionWMO && <img src={optionWMO.day.image} style={{ width: '48px' }} />}
              <Stack alignItems="start">
                <Typography sx={{ fontSize: '1.125rem' }}>{option.name}</Typography>
                <Typography variant="caption" color="secondary">
                  {[option.admin1, option.country].filter(Boolean).join(', ')}
                </Typography>
              </Stack>
            </Stack>
            <Typography
              color="secondary.light"
              sx={{ fontSize: '2rem', fontWeight: 300, letterSpacing: '-0.00833em' }}
              variant="h5"
            >
              {option.temperature ? `${Math.floor(option.temperature)}°` : 'N/A'}
            </Typography>
          </Stack>
        </CardContent>
      </ButtonBase>
    </Card>
  );
};

function FindLocationDialog({
  handleBackButton,
  handleSubmit,
}: {
  handleBackButton: () => void;
  handleSubmit: (location: Location) => void;
}) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [search, setSearch] = useState<string>('');
  const debouncedSearch = useDebounce<string>(search, 500);

  const { results, loading } = useLocationSearch(debouncedSearch?.trim());

  const handleSelect = (option: Location) => {
    setSearch('');
    handleSubmit(option);
    handleBackButton();
  };

  return (
    <>
      <AppBar sx={{ position: 'relative' }}>
        <Toolbar>
          <IconButton
            sx={{ fontSize: '2rem' }}
            edge="start"
            color="inherit"
            onClick={handleBackButton}
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
        </Toolbar>
      </AppBar>
      <DialogContent sx={{ p: 0.5, minHeight: '444px', maxHeight: isMobile ? 'auto' : '560px', minWidth: '320px' }}>
        {results.length && search.length ? (
          <Card
            sx={{
              maxHeight: '100%',
              overflowY: 'scroll',
            }}
          >
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
          <Stack direction="row" justifyContent="center" alignItems="center" sx={{ height: '100%' }}>
            {loading ? (
              <CircularProgress color="secondary" />
            ) : (
              <DialogContentText>
                {search.length === 0 ? 'Please enter your location.' : 'Nothing has been found.'}
              </DialogContentText>
            )}
          </Stack>
        )}
      </DialogContent>
    </>
  );
}

function ManageLocationDialog({
  handleBackButton,
  handleAddLocation,
  handleSubmit,
}: {
  handleBackButton: () => void;
  handleAddLocation: () => void;
  handleSubmit: (value: Location) => void;
}) {
  const [{ currentLocationId }] = useUserSettings();
  const [locations] = useLocalStorage<Array<Location>>('locations', []);
  const favorite = useMemo(
    () => locations.find((item) => item.id === currentLocationId),
    [currentLocationId, locations],
  );
  const otherLocations = useMemo(
    () => locations.filter((item) => item.id !== currentLocationId),
    [currentLocationId, locations],
  );

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <>
      <AppBar sx={{ position: 'relative' }}>
        <Toolbar>
          <IconButton
            sx={{ fontSize: '2rem' }}
            edge="start"
            color="inherit"
            onClick={handleBackButton}
            aria-label="close"
          >
            <ChevronLeft fontSize="inherit" />
          </IconButton>

          <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ width: '100%' }}>
            <Typography sx={{ fontSize: '1.125rem' }}>Manage your location</Typography>
            <IconButton sx={{ fontSize: '1.85rem' }} edge="end" color="inherit" onClick={handleAddLocation}>
              <Add fontSize="inherit" />
            </IconButton>
          </Stack>
        </Toolbar>
      </AppBar>
      <DialogContent
        sx={{
          p: 0.5,
          minHeight: '444px',
          maxHeight: isMobile ? 'auto' : '560px',
          minWidth: '320px',
          borderRadius: '16px',
        }}
      >
        {favorite && (
          <>
            <Typography gutterBottom color="secondary.light" sx={{ pl: 1.5, fontSize: '0.9rem' }}>
              Current location
            </Typography>
            <LocationOption option={favorite} onSelect={handleSubmit} />
          </>
        )}
        {otherLocations.length ? (
          <>
            <Typography gutterBottom color="secondary.light" sx={{ pl: 1.5, fontSize: '0.9rem' }}>
              Other locations
            </Typography>
            {otherLocations.map((option, idx) => (
              <LocationOption key={idx} option={option} onSelect={handleSubmit} />
            ))}
          </>
        ) : null}
      </DialogContent>
    </>
  );
}

export function LocationSearchDialog() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [locations, setLocations] = useLocalStorage<Array<Location>>('locations', []);
  const [, setSettings] = useUserSettings();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  const handleClickOpen = () => {
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsSearchVisible(false);
    setIsModalOpen(false);
  };

  const handleOptionSelect = (option: Location) => {
    if (!locations.some((item) => item.id === option.id)) {
      setLocations((items) => [...items, option]);
    }

    setSettings((prev) => ({ ...prev, currentLocationId: option.id }));
    handleClose();
  };

  return (
    <>
      <IconButton edge="start" sx={{ fontSize: '2rem' }} onClick={handleClickOpen}>
        <Menu fontSize="inherit" />
      </IconButton>
      <Dialog
        sx={{
          '& .MuiDialog-container > .MuiPaper-root': {
            backgroundImage: 'none',
          },

          '& header': {
            color: 'secondary.light',
            backgroundImage: 'none',
            boxShadow: 'none',
            pt: 1,
            pb: 1,

            '& .MuiToolbar-root': {
              height: '2.25rem',
            },
          },
        }}
        fullScreen={isMobile}
        open={isModalOpen}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        {isSearchVisible ? (
          <FindLocationDialog handleBackButton={() => setIsSearchVisible(false)} handleSubmit={handleOptionSelect} />
        ) : (
          <ManageLocationDialog
            handleBackButton={handleClose}
            handleSubmit={handleOptionSelect}
            handleAddLocation={() => setIsSearchVisible(true)}
          />
        )}
      </Dialog>
    </>
  );
}
