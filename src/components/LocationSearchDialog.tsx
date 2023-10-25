import { Add, ChevronLeft, Close, Menu, PlusOne } from '@mui/icons-material';
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
  ListSubheader,
  useTheme,
  useMediaQuery,
  Box,
} from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import { forwardRef, useState, useEffect } from 'react';
import { GeocodingInfo } from '../vite-env';

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction='right' ref={ref} {...props} />;
});

export function LocationSearchDialog({
  handleSubmit,
}: {
  handleSubmit: (value: GeocodingInfo) => void;
}) {
  const [open, setOpen] = useState(false);
  const [isNewSearch, setNewSearch] = useState(false);
  const [options, setOptions] = useState<Array<GeocodingInfo>>([]);
  const [favorite, setFavorite] = useState<null | GeocodingInfo>(null);
  const [previousOptions, setPreviousOptions] = useState<Array<GeocodingInfo>>(
    []
  );
  const [search, setSearch] = useState<string>('');

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    if (!search?.trim().length) {
      return;
    }

    const url = new URL(
      `https://geocoding-api.open-meteo.com/v1/search?name=${search}&count=10&language=en&format=json`
    );
    fetch(url.toString())
      .then((resp) => resp.json())
      .then((res) =>
        setOptions(
          ((res.results || []) as Array<GeocodingInfo>).filter(
            (x) => x.latitude && x.longitude
          )
        )
      )
      .catch(console.log);
  }, [search]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
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
            backgroundImage:
              'linear-gradient(rgba(255, 255, 255, 0.06), rgba(255, 255, 255, 0.06))',
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
              <IconButton
                edge='start'
                color='inherit'
                onClick={handleClose}
                aria-label='close'
              >
                <ChevronLeft />
              </IconButton>
              {isNewSearch ? (
                <>
                  <InputBase
                    value={search}
                    sx={{ width: '100%' }}
                    placeholder='What is your city?'
                    onChange={({ target }) => setSearch(target.value)}
                  />

                  <IconButton onClick={() => setSearch('')}>
                    <Close />
                  </IconButton>
                </>
              ) : (
                <Stack
                  direction='row'
                  alignItems='center'
                  justifyContent='space-between'
                  sx={{ width: '100%' }}
                >
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
                <List>
                  {options.map((option, idx) => (
                    <>
                      <ListItem
                        onClick={() => {
                          handleOptionSelect(option);
                        }}
                      >
                        <ListItemText
                          primary={option.name}
                          secondary={option.admin1}
                        />
                      </ListItem>
                      {idx !== options.length - 1 && <Divider />}
                    </>
                  ))}
                </List>
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
                    {search.trim().length === 0
                      ? 'Please enter your location.'
                      : 'Nothing has been found.'}
                  </DialogContentText>
                </DialogContent>
              )}
            </>
          )}
          {!isNewSearch && (
            <>
              {favorite && (
                <List
                  subheader={<ListSubheader>Current location</ListSubheader>}
                >
                  <ListItem
                    onClick={() => {
                      handleOptionSelect(favorite);
                    }}
                  >
                    <ListItemText
                      primary={favorite.name}
                      secondary={favorite.admin1}
                    />
                  </ListItem>
                </List>
              )}
              {previousOptions.length ? (
                <List
                  subheader={<ListSubheader>Other locations</ListSubheader>}
                >
                  {previousOptions.map((option, idx) => (
                    <>
                      <ListItem
                        onClick={() => {
                          handleOptionSelect(option);
                        }}
                      >
                        <ListItemText
                          primary={option.name}
                          secondary={option.admin1}
                        />
                      </ListItem>
                      {idx !== previousOptions.length - 1 && <Divider />}
                    </>
                  ))}
                </List>
              ) : null}
            </>
          )}
        </Box>
      </Dialog>
    </>
  );
}
