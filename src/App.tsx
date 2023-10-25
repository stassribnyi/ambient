import { forwardRef, useEffect, useState } from 'react';
import { GeocodingInfo } from './vite-env';

import {
  ChevronLeft,
  LocationCity,
  LocationOn,
  Menu,
  Search,
} from '@mui/icons-material';
import {
  Alert,
  AppBar,
  Box,
  Card,
  CardContent,
  Container,
  Dialog,
  DialogContent,
  DialogContentText,
  Divider,
  Unstable_Grid2 as Grid,
  IconButton,
  InputBase,
  LinearProgress,
  List,
  ListItem,
  ListItemText,
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
import { format } from 'date-fns';

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction='right' ref={ref} {...props} />;
});

// const LocationForm: FC<
//   Readonly<{ handleSubmit: (option: GeocodingInfo) => void }>
// > = ({ handleSubmit }) => {
//   const [options, setOptions] = useState<Array<GeocodingInfo>>([]);
//   const [search, setSearch] = useState<string>('Kyiv');

//   useEffect(() => {
//     if (!search?.trim().length) {
//       return;
//     }

//     const url = new URL(
//       `https://geocoding-api.open-meteo.com/v1/search?name=${search}&count=10&language=en&format=json`
//     );
//     fetch(url.toString())
//       .then((resp) => resp.json())
//       .then((res) =>
//         setOptions(
//           ((res.results || []) as Array<GeocodingInfo>).filter(
//             (x) => x.latitude && x.longitude
//           )
//         )
//       )
//       .catch(console.log);
//   }, [search]);

//   const handleSearch = () => {
//     const value = options.find((x) => x.name === search);

//     if (!value) {
//       setSearch('');

//       return;
//     }

//     handleSubmit(value);
//   };

//   return (
//     <Stack direction='row' gap={0.5} sx={{ width: '100%' }}>
//       <InputBase
//         value={search}
//         style={{ width: '100%' }}
//         placeholder='What is your city?'
//         onChange={({ target }) => setSearch(target.value)}
//         onKeyDown={(event) => {
//           if (event.code === 'Enter') {
//             handleSearch();
//           }
//         }}
//       />

//       <IconButton sx={{ minWidth: 56 }} onClick={handleSearch}>
//         <Search />
//       </IconButton>
//     </Stack>
//   );
// };

function LocationSearchDialog({
  handleSubmit,
}: {
  handleSubmit: (value: GeocodingInfo) => void;
}) {
  const [open, setOpen] = useState(false);
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
            <Stack direction='row' gap={0.5} sx={{ width: '100%' }}>
              <InputBase
                value={search}
                style={{ width: '100%' }}
                placeholder='What is your city?'
                onChange={({ target }) => setSearch(target.value)}
              />

              <IconButton sx={{ minWidth: 56 }} onClick={() => setSearch('')}>
                <Search />
              </IconButton>
            </Stack>
          </Toolbar>
        </AppBar>

        {options.length ? (
          <List>
            {options.map((option, idx) => (
              <>
                <ListItem onClick={() => handleSubmit(option)}>
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
            }}
          >
            <DialogContentText>
              {search.trim().length === 0
                ? 'Please enter your location.'
                : 'Nothing has been found.'}
            </DialogContentText>
          </DialogContent>
        )}
      </Dialog>
    </>
  );
}

function App() {
  const [city, setCity] = useState<GeocodingInfo>({
    admin1: 'Kyiv City',
    admin1_id: 703447,
    country: 'Ukraine',
    country_code: 'UA',
    country_id: 690791,
    elevation: 187,
    feature_code: 'PPLC',
    id: 703448,
    latitude: 50.45466,
    longitude: 30.5238,
    name: 'Kyiv',
    population: 2797553,
    timezone: 'Europe/Kyiv',
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
                <Stack>
              <Stack
                direction='row'
                alignItems='center'
                justifyContent='space-between'
              >
                <LocationSearchDialog handleSubmit={setCity} />

                  <Typography variant='body1'>
                    {format(new Date(forecast.current.time), 'EEEE, MMM dd')}
                  </Typography>
                  
                </Stack>
                <Typography
                    color='secondary'
                    variant='caption'
                    sx={{
                      alignSelf: 'end',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.25rem',
                    }}
                  >
                    <LocationOn /> {city.name}, {city.admin1}, {city.country}
                  </Typography>
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
                    <h3>Today</h3>
                    <HourlyReport weatherInfo={forecast} />
                  </CardContent>
                </Card>
              </Stack>
            </Grid>
            <Grid xs={12} md={6}>
              <Card>
                <CardContent>
                  <h3>7-Days Forecast</h3>
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
