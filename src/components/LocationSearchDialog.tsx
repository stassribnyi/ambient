import { Add, BackspaceOutlined, ChevronLeft, Menu } from '@mui/icons-material';
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
  Box,
  Card,
  CardContent,
  ButtonBase,
} from '@mui/material';
import type { TransitionProps } from '@mui/material/transitions';
import { forwardRef, useState, useEffect, FC } from 'react';
import { GeocodingInfo } from '../vite-env';
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
    option: GeocodingInfo;
    onSelect: (option: GeocodingInfo) => void;
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

export function LocationSearchDialog({ handleSubmit }: { handleSubmit: (value: GeocodingInfo) => void }) {
  const [open, setOpen] = useState(false);
  const [isNewSearch, setNewSearch] = useState(false);
  const [options, setOptions] = useState<Array<GeocodingInfo>>([]);
  const [favorite, setFavorite] = useState<null | GeocodingInfo>(null);
  const [previousOptions, setPreviousOptions] = useState<Array<GeocodingInfo>>([]);
  const [search, setSearch] = useState<string>('');

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    if (!search?.trim().length) {
      return;
    }

    const url = new URL(
      `https://geocoding-api.open-meteo.com/v1/search?name=${search}&count=10&language=en&format=json`,
    );
    fetch(url.toString())
      .then((resp) => resp.json())
      .then((res) => setOptions(((res.results || []) as Array<GeocodingInfo>).filter((x) => x.latitude && x.longitude)))
      .catch(console.log);
  }, [search]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    if (isNewSearch) {
      setNewSearch(false);

      return;
    }

    setOpen(false);
    setNewSearch(false);
  };

  const handleOptionSelect = (option: GeocodingInfo) => {
    setSearch('');
    setNewSearch(false);
    setPreviousOptions((items) => [
      ...items.filter((item) => item.id !== option.id),
      ...(favorite && favorite?.id !== option.id ? [favorite] : []),
    ]);
    setFavorite(option);
    handleSubmit(option);
    handleClose();
  };

  return (
    <>
      <IconButton onClick={handleClickOpen}>
        <Menu />
      </IconButton>
      <Dialog
        sx={{
          '& .MuiPaper-root': {
            // backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.06), rgba(255, 255, 255, 0.06))',
          },
          '& header': {
            boxShadow: 'none',
          },
        }}
        fullScreen={isMobile}
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <Box
          sx={{
            minWidth: '360px',
            minHeight: '480px',
            height: 'calc(100% - 56px)',
            width: '100%',
          }}
        >
          <AppBar sx={{ position: 'relative' }}>
            <Toolbar>
              <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                <ChevronLeft />
              </IconButton>
              {isNewSearch ? (
                <>
                  <InputBase
                    autoFocus
                    value={search}
                    sx={{ width: '100%' }}
                    placeholder="What is your city?"
                    onChange={({ target }) => setSearch(target.value)}
                  />

                  <IconButton onClick={() => setSearch('')}>
                    <BackspaceOutlined />
                  </IconButton>
                </>
              ) : (
                <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ width: '100%' }}>
                  <Typography>Manage your location</Typography>
                  <IconButton onClick={() => setNewSearch(true)}>
                    <Add />
                  </IconButton>
                </Stack>
              )}
            </Toolbar>
          </AppBar>
          {/* TODO: split it up and create a better solution */}
          {isNewSearch && (
            <>
              {options.length && search.trim().length ? (
                <DialogContent sx={{ p: 1, pt: 4 }}>
                  <Card>
                    <CardContent>
                      <List disablePadding>
                        {options.map((option, idx) => (
                          <>
                            <ListItem
                              disableGutters
                              key={idx}
                              onClick={() => {
                                handleOptionSelect(option);
                              }}
                            >
                              <ListItemText primary={option.name} secondary={option.admin1} />
                            </ListItem>
                            {idx !== options.length - 1 && <Divider />}
                          </>
                        ))}
                      </List>
                    </CardContent>
                  </Card>
                </DialogContent>
              ) : (
                <DialogContent
                  sx={{
                    display: 'grid',
                    placeItems: 'center',
                    height: '100%',
                    width: '100%',
                  }}
                >
                  <DialogContentText>
                    {search.trim().length === 0 ? 'Please enter your location.' : 'Nothing has been found.'}
                  </DialogContentText>
                </DialogContent>
              )}
            </>
          )}
          {!isNewSearch && (
            <DialogContent sx={{ p: 1 }}>
              {favorite && (
                <>
                  <Typography gutterBottom color="secondary.light" sx={{ pl: 1.5 }}>
                    Current location
                  </Typography>
                  <LocationOption option={favorite} onSelect={handleOptionSelect} />
                </>
              )}
              {previousOptions.length ? (
                <>
                  <Typography gutterBottom color="secondary.light" sx={{ pl: 1.5 }}>
                    Other locations
                  </Typography>
                  {previousOptions.map((option, idx) => (
                    <LocationOption key={idx} option={option} onSelect={handleOptionSelect} />
                  ))}
                </>
              ) : null}
            </DialogContent>
          )}
        </Box>
      </Dialog>
    </>
  );
}
