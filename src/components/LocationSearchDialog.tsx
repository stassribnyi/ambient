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
  Menu,
  MenuItem,
  Button,
} from '@mui/material';
import type { TransitionProps } from '@mui/material/transitions';
import {
  Add,
  CheckCircle,
  ChevronLeft,
  Close,
  CheckOutlined as Mark,
  DeleteOutline as Delete,
  Menu as MenuIcon,
  MoreVert,
  RadioButtonUnchecked,
} from '@mui/icons-material';

import { forwardRef, useState, FC, Fragment } from 'react';
import { useDebounce } from 'usehooks-ts';

import { useLocationSearch, useLocations, useUserSettings, useLongPress, useUnitsConverter } from '../hooks';
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
    onLongPress: (option: Location) => void;
  }>
> = ({ isEdit, selected, option, onSelect, onLongPress }) => {
  const optionWMO = option.weathercode !== undefined ? WMO[option.weathercode] : null;
  const handleLongPress = useLongPress();
  const { convert } = useUnitsConverter();

  return (
    <Card sx={{ mb: 2, borderRadius: '28px' }}>
      <ButtonBase
        onClick={() => onSelect(option)}
        sx={{ width: '100%' }}
        {...handleLongPress(() => onLongPress(option))}
      >
        <CardContent sx={{ width: '100%', p: '1.5rem 1rem' }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Stack direction="row" alignItems="center" gap={1}>
              {isEdit && (
                <Checkbox
                  sx={{
                    width: '48px',
                    height: '48px',
                  }}
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
                {option.temperature ? `${Math.floor(convert('temperature', option.temperature))}°` : 'N/A'}
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
      <DialogContent sx={{ p: 0.5, minHeight: '444px', maxHeight: isMobile ? 'auto' : '560px', minWidth: '360px' }}>
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
  const { locations, current: favorite, setLocations } = useLocations();

  const otherLocations = locations.filter((l) => l.id !== favorite.id);
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

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
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
                <IconButton
                  id="demo-positioned-button"
                  aria-controls={open ? 'demo-positioned-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
                  sx={{ fontSize: '1.85rem' }}
                  edge="end"
                  color="inherit"
                  onClick={handleClick}
                >
                  <MoreVert fontSize="inherit" />
                </IconButton>
                <Menu
                  id="demo-positioned-menu"
                  aria-labelledby="demo-positioned-button"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                  }}
                  transformOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                  }}
                  sx={{ '& .MuiList-root': { padding: 0 } }}
                >
                  <MenuItem sx={{ minHeight: 'auto' }} onClick={() => setIsEdit(true)}>
                    Edit
                  </MenuItem>
                </Menu>
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
          minWidth: '360px',
          borderRadius: '16px',
        }}
      >
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
              onLongPress={() => setIsEdit(true)}
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
                onLongPress={() => setIsEdit(true)}
              />
            ))}
          </>
        ) : null}
      </DialogContent>
      <Slide mountOnEnter unmountOnExit in={isEdit && selected.length > 0} direction="up">
        <Stack direction="row" justifyContent="space-around" alignItems="center" sx={{ p: 0.5 }}>
          {selected.length === 1 && selected[0].id !== favorite.id && (
            <Button
              sx={{ flexDirection: 'column', fontSize: '0.7rem', width: '50%', gap: 0.5, color: 'secondary.light' }}
              aria-label="set favorite"
              onClick={() => {
                handleSubmit(selected[0]);
                setSelected([]);
                setIsEdit(false);
              }}
            >
              <Mark />
              Set Favorite
            </Button>
          )}
          <Button
            sx={{ flexDirection: 'column', fontSize: '0.7rem', width: '50%', gap: 0.5, color: 'secondary.light' }}
            aria-label="delete"
            onClick={() => {
              const filtered = locations.filter((x) => !selected.includes(x));
              setLocations(filtered);
              setSelected([]);
              setIsEdit(false);
            }}
          >
            <Delete />
            Delete
          </Button>
        </Stack>
      </Slide>
    </>
  );
}

export function LocationSearchDialog() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { locations, setLocations } = useLocations();
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
        <MenuIcon fontSize="inherit" />
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
