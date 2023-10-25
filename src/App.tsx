import { FC, forwardRef, useEffect, useState } from 'react';
import { GeocodingInfo } from './vite-env';

import { ChevronLeft, Menu, Search } from '@mui/icons-material';
import {
  Alert,
  AppBar,
  Box,
  Card,
  CardContent,
  Container,
  Dialog,
  Unstable_Grid2 as Grid,
  IconButton,
  InputBase,
  LinearProgress,
  Slide,
  Snackbar,
  Stack,
  Toolbar,
  Typography,
} from '@mui/material';
import { CurrentReport, DailyReport, HourlyReport } from './components';

import './App.css';
import { useWeather } from './hooks';
import { TransitionProps } from '@mui/material/transitions';
import React from 'react';

const LocationForm: FC<
  Readonly<{ handleSubmit: (option: GeocodingInfo) => void }>
> = ({ handleSubmit }) => {
  const [options, setOptions] = useState<Array<GeocodingInfo>>([]);
  const [search, setSearch] = useState<string>('Kyiv');

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

  const handleSearch = () => {
    const value = options.find((x) => x.name === search);

    if (!value) {
      setSearch('');

      return;
    }

    handleSubmit(value);
  };

  return (
    <Stack direction='row' gap={0.5} sx={{ width: '100%' }}>
      <InputBase
        value={search}
        style={{ width: '100%' }}
        placeholder='What is your city?'
        onChange={({ target }) => setSearch(target.value)}
        onKeyDown={(event) => {
          if (event.code === 'Enter') {
            handleSearch();
          }
        }}
      />

      <IconButton sx={{ minWidth: 56 }} onClick={handleSearch}>
        <Search />
      </IconButton>
    </Stack>
  );
};

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction='right' ref={ref} {...props} />;
});

function LocationSearchDialog({
  handleSubmit,
}: {
  handleSubmit: (value: GeocodingInfo) => void;
}) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <IconButton onClick={handleClickOpen}>
        <Menu />
      </IconButton>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
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
            <LocationForm
              handleSubmit={(city) => {
                handleSubmit(city);
                handleClose();
              }}
            />
          </Toolbar>
        </AppBar>

        {/* <DialogTitle>Looking for your city?</DialogTitle> */}
        {/* <DialogContent>
          <DialogContentText id='alert-dialog-slide-description'>
           
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={handleClose}>Agree</Button>
        </DialogActions> */}
      </Dialog>
    </>
  );
}

function App() {
  const [city, setCity] = useState<
    Pick<GeocodingInfo, 'latitude' | 'longitude' | 'name' | 'timezone'>
  >({
    latitude: 50.4547,
    longitude: 30.5238,
    name: 'Kyiv',
    timezone: 'auto',
  });

  const { forecast, loading, error } = useWeather(city);

  return (
    <>
      {loading && (
        <Box sx={{ width: '100%', top: '1rem', position: 'absolute' }}>
          <LinearProgress color='secondary' />
        </Box>
      )}
      <Snackbar
        open={!!error}
        autoHideDuration={3000}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert severity='error' sx={{ width: '100%' }}>
          {error?.message}
        </Alert>
      </Snackbar>
      <Container maxWidth='xl' sx={{ pt: 2, pb: 2 }}>
        {forecast && (
          <Grid container spacing={2}>
            <Grid xs={12}>
              <Stack
                direction='row'
                alignItems='center'
                justifyContent='space-between'
              >
                <LocationSearchDialog handleSubmit={setCity} />

                <Typography variant='h5'>{city?.name}</Typography>
              </Stack>
            </Grid>
            <Grid xs={12} md={6}>
              <Stack
                gap={2}
                sx={{ justifyContent: 'space-between', height: '100%' }}
              >
                <Box sx={{ p: 1 }}>
                  <CurrentReport weatherInfo={forecast} />
                </Box>
                <Card>
                  <CardContent>
                    <h3>Today's forecast</h3>
                    <HourlyReport weatherInfo={forecast} />
                  </CardContent>
                </Card>
              </Stack>
            </Grid>
            <Grid xs={12} md={6}>
              <Card>
                <CardContent>
                  <h3>7-days forecast</h3>
                  <DailyReport weatherInfo={forecast} />
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        )}
      </Container>
    </>
  );
}

export default App;
