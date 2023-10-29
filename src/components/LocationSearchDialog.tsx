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
  Checkbox,
} from '@mui/material';
import type { TransitionProps } from '@mui/material/transitions';
import {
  Add,
  CheckCircle,
  ChevronLeft,
  Close,
  Delete,
  Menu,
  MoreVert,
  RadioButtonUnchecked,
} from '@mui/icons-material';

import { forwardRef, useState, FC, useMemo, Fragment } from 'react';
import { useDebounce, useLocalStorage } from 'usehooks-ts';

import { useLocationSearch, useLongpress } from '../hooks';
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
    isEdit?: boolean;
    selected?: boolean;
    option: Location;
    onSelect: (option: Location) => void;
    onLongpress: (option: Location) => void;
  }>
> = ({ isEdit, selected, option, onSelect, onLongpress }) => {
  const optionWMO = option.weathercode !== undefined ? WMO[option.weathercode] : null;
  const handleLongpress = useLongpress();

  return (
    <Card sx={{ mb: 2, borderRadius: '28px' }}>
      <ButtonBase
        onClick={() => onSelect(option)}
        sx={{ width: '100%' }}
        {...handleLongpress(() => onLongpress(option))}
      >
        <CardContent sx={{ width: '100%', p: '1.5rem 1rem' }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Stack direction="row" alignItems="center" gap={1}>
              {isEdit && (
                <Checkbox
                  checked={selected}
                  color="secondary"
                  icon={<RadioButtonUnchecked />}
                  checkedIcon={<CheckCircle />}
                />
              )}
              {!isEdit && optionWMO && <img src={optionWMO.day.image} style={{ width: '48px' }} />}
              <Stack alignItems="start">
                <Typography sx={{ fontSize: '1.125rem' }}>{option.name}</Typography>
                <Typography variant="caption" color="secondary">
                  {[option.admin1, option.country].filter(Boolean).join(', ')}
                </Typography>
              </Stack>
            </Stack>
            {!isEdit && (
              <Typography
                color="secondary.light"
                sx={{ fontSize: '2rem', fontWeight: 300, letterSpacing: '-0.00833em' }}
                variant="h5"
              >
                {option.temperature ? `${Math.floor(option.temperature)}°` : 'N/A'}
              </Typography>
            )}
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
  const [locations, setLocations] = useLocalStorage<Array<Location>>('locations', []);
  const favorite = useMemo(() => locations.find((item) => item.current), [locations]);
  const otherLocations = useMemo(() => locations.filter((item) => item.id !== favorite?.id), [locations, favorite]);
  const [selected, setSelected] = useState<Array<Location>>([]);
  const [isEdit, setIsEdit] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleSelect = (option: Location) => {
    if (!isEdit) {
      handleSubmit(option);
      return;
    }
    console.log('isSelected');

    setSelected((prev) => {
      const isSelected = prev.some((x) => x.id === option.id);

      return isSelected ? prev.filter((x) => x.id !== option.id) : [...prev, option];
    });
  };

  return (
    <>
      <AppBar sx={{ position: 'relative' }}>
        {!isEdit ? (
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
              <Stack direction="row" alignItems="center">
                <IconButton sx={{ fontSize: '1.85rem' }} edge="end" color="inherit" onClick={handleAddLocation}>
                  <Add fontSize="inherit" />
                </IconButton>
                <IconButton sx={{ fontSize: '1.85rem' }} edge="end" color="inherit" onClick={() => setIsEdit(true)}>
                  <MoreVert fontSize="inherit" />
                </IconButton>
              </Stack>
            </Stack>
          </Toolbar>
        ) : (
          <Toolbar>
            <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ width: '100%' }}>
              <Stack direction="row" alignItems="center" sx={{ pl: '4px' }}>
                <Checkbox
                  checked={selected.length === locations.length}
                  color="secondary"
                  icon={<RadioButtonUnchecked />}
                  checkedIcon={<CheckCircle />}
                  onClick={() => setSelected(selected.length === locations.length ? [] : locations)}
                />
                <Typography>Select all</Typography>
              </Stack>
              <IconButton sx={{ fontSize: '1.85rem' }} edge="end" color="inherit" onClick={() => setIsEdit(false)}>
                <Close fontSize="inherit" />
              </IconButton>
            </Stack>
          </Toolbar>
        )}
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
        {/* <Stack justifyContent="space-between" sx={{ height: '100%' }}>
          <Stack sx={{ height: 'calc(100% - 56px)', overflowX: 'hidden' }}> */}
        {favorite && (
          <>
            <Typography gutterBottom color="secondary.light" sx={{ pl: 1.5, fontSize: '0.9rem' }}>
              Current location
            </Typography>
            <LocationOption
              selected={selected.some((x) => x.id === favorite.id)}
              isEdit={isEdit}
              option={favorite}
              onSelect={handleSelect}
              onLongpress={() => setIsEdit(true)}
            />
          </>
        )}
        {otherLocations.length ? (
          <>
            <Typography gutterBottom color="secondary.light" sx={{ pl: 1.5, fontSize: '0.9rem' }}>
              Other locations
            </Typography>
            {otherLocations.map((option, idx) => (
              <LocationOption
                selected={selected.some((x) => x.id === option.id)}
                isEdit={isEdit}
                key={idx}
                option={option}
                onSelect={handleSelect}
                onLongpress={() => setIsEdit(true)}
              />
            ))}
          </>
        ) : null}
        {/* </Stack> */}
        {isEdit && (
          <Stack>
            <IconButton
              aria-label="delete"
              onClick={() => {
                const filtered = locations.filter((x) => !selected.includes(x));

                if (!filtered.some((x) => x.current) && filtered[0]) {
                  filtered[0].current = true;
                }

                setLocations(filtered);
                setSelected([]);
                setIsEdit(false);
              }}
            >
              <Delete />
            </IconButton>
          </Stack>
        )}
        {/* </Stack> */}
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
            p: '0.5rem 0',

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
