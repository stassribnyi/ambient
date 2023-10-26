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
import { Add, BackspaceOutlined, ChevronLeft, Menu } from '@mui/icons-material';

import { forwardRef, useState, FC, useMemo } from 'react';
import { useDebounce, useLocalStorage } from 'usehooks-ts';

import { useLocationSearch } from '../hooks';
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
> = ({ option, onSelect }) => (
  <Card sx={{ mb: 2 }}>
    <ButtonBase onClick={() => onSelect(option)} sx={{ width: '100%' }}>
      <CardContent sx={{ width: '100%' }}>
        <Stack direction="row" justifyContent="space-between">
          <Stack alignItems="start">
            <Typography variant="body1">{option.name}</Typography>
            <Typography variant="caption" color="secondary">
              {option.country}
            </Typography>
          </Stack>
          <Stack direction="row" alignItems="center">
            <img src={WMO[0].day.image} style={{ width: '36px' }} />
            <Typography variant="h5">14°</Typography>
          </Stack>
        </Stack>
      </CardContent>
    </ButtonBase>
  </Card>
);

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

  const { results, loading } = useLocationSearch(debouncedSearch);

  const handleSelect = (option: Location) => {
    setSearch('');
    handleSubmit(option);
    handleBackButton();
  };

  return (
    <>
      <AppBar sx={{ position: 'relative' }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={handleBackButton} aria-label="close">
            <ChevronLeft />
          </IconButton>

          <InputBase
            autoFocus
            value={search}
            sx={{ width: '100%' }}
            placeholder="What is your city?"
            onChange={({ target }) => setSearch(target.value?.trim())}
          />

          <IconButton onClick={() => setSearch('')}>
            <BackspaceOutlined />
          </IconButton>
        </Toolbar>
      </AppBar>
      <DialogContent sx={{ p: 1, minHeight: '444px', maxHeight: isMobile ? 'auto' : '560px', minWidth: '320px' }}>
        {results.length && search.length ? (
          <Card>
            <CardContent>
              <List disablePadding>
                {results.map((location, idx) => (
                  <>
                    <ListItem disableGutters key={idx} onClick={() => handleSelect(location)}>
                      <ListItemText primary={location.name} secondary={location.admin1} />
                    </ListItem>
                    {idx !== results.length - 1 && <Divider />}
                  </>
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
  const [locations] = useLocalStorage<Array<Location>>('locations', []);
  const favorite = useMemo(() => locations.find((item) => item.current), [locations]);
  const otherLocations = useMemo(() => locations.filter((item) => item.id !== favorite?.id), [locations, favorite]);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <>
      <AppBar sx={{ position: 'relative' }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={handleBackButton} aria-label="close">
            <ChevronLeft />
          </IconButton>

          <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ width: '100%' }}>
            <Typography>Manage your location</Typography>
            <IconButton onClick={handleAddLocation}>
              <Add />
            </IconButton>
          </Stack>
        </Toolbar>
      </AppBar>
      <DialogContent sx={{ p: 1, minHeight: '444px', maxHeight: isMobile ? 'auto' : '560px', minWidth: '320px' }}>
        {favorite && (
          <>
            <Typography gutterBottom color="secondary.light" sx={{ pl: 1.5 }}>
              Current location
            </Typography>
            <LocationOption option={favorite} onSelect={handleSubmit} />
          </>
        )}
        {otherLocations.length ? (
          <>
            <Typography gutterBottom color="secondary.light" sx={{ pl: 1.5 }}>
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
  const [, setLocations] = useLocalStorage<Array<Location>>('locations', []);

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
    setLocations((items) => {
      const existing = items.find((item) => item.id === option.id);
      items.forEach((item) => (item.current = false));

      if (existing) {
        existing.current = true;

        return [...items];
      }

      return [...items, { ...option, current: true }];
    });

    handleClose();
  };

  return (
    <>
      <IconButton onClick={handleClickOpen}>
        <Menu />
      </IconButton>
      <Dialog
        sx={{
          '& header': {
            boxShadow: 'none',
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
