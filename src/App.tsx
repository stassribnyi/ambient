import { useEffect, useMemo } from 'react';
import { Location } from './vite-env';

import { LocationOn } from '@mui/icons-material';
import {
  Alert,
  Backdrop,
  Card,
  CardContent,
  CircularProgress,
  Container,
  Unstable_Grid2 as Grid,
  Snackbar,
  Stack,
  Typography,
} from '@mui/material';
import { CurrentReport, DailyReport, HourlyReport, LocationSearchDialog, UnitSwitch } from './components';

import './App.css';
import { useUserSettings, useWeather } from './hooks';
import { format } from 'date-fns';
import { useLocalStorage } from 'usehooks-ts';
import { useLocationsWeather } from './hooks/useLocationsWeather';
// import { useGeolocated } from 'react-geolocated';
// import axios from 'axios';

const DEFAULT_LOCATION: Location = {
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
};

function App() {
  const [settings, setSettings] = useUserSettings();

  const [locations, setLocations] = useLocalStorage<Array<Location>>('locations', [DEFAULT_LOCATION]);
  const current = useMemo(
    () => locations.find((item) => item.id === settings.currentLocationId) ?? DEFAULT_LOCATION,
    [locations, settings.currentLocationId],
  );

  const { forecast, loading, error } = useWeather(current);
  // TODO: combine, rename or simplify. have no idea at this point
  const { forecast: locationsForecast } = useLocationsWeather(locations);

  // // TODO: needs some work
  // const { coords, isGeolocationAvailable, isGeolocationEnabled } = useGeolocated({
  //   positionOptions: {
  //     enableHighAccuracy: false,
  //   },
  //   userDecisionTimeout: 5000,
  // });

  // useEffect(() => {
  //   if (!locations.length) {
  //     return;
  //   }

  //   if (!isGeolocationAvailable || !isGeolocationEnabled) {
  //     setLocations([DEFAULT_LOCATION]);

  //     return;
  //   }

  //   axios
  //     .get<BigDataLocation>(
  //       `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${coords?.latitude}&longitude=${coords?.longitude}&localityLanguage=en`,
  //     )
  //     .then(({ data }) =>
  //       setLocations([
  //         {
  //           current: true,
  //           admin1: data.principalSubdivision,
  //           admin1_id: data.localityInfo.administrative.find((a) => a.adminLevel === 4)?.geonameId || 0,
  //           country: data.countryName,
  //           country_code: data.countryCode,
  //           country_id: data.localityInfo.administrative.find((a) => a.adminLevel === 2)?.geonameId || 0,
  //           elevation: coords?.altitude || 0,
  //           feature_code: 'PPLC',
  //           id: data.localityInfo.administrative.find((a) => a.adminLevel === 2)?.geonameId || 0,
  //           latitude: data.latitude,
  //           longitude: data.longitude,
  //           name: data.city,
  //           timezone: data.localityInfo.informative.find((i) => i.description === 'time zone')?.name || 'auto',
  //         },
  //       ]),
  //     )
  //     .catch(console.log);
  // }, [
  //   coords?.altitude,
  //   coords?.latitude,
  //   coords?.longitude,
  //   isGeolocationAvailable,
  //   isGeolocationEnabled,
  //   locations.length,
  //   setLocations,
  // ]);

  useEffect(() => {
    if (!locationsForecast?.length) {
      return;
    }

    // TODO: reference update also works as there is excessive amount of UI updates
    const updated = locations.map((location, idx) => ({
      ...location,
      temperature: locationsForecast[idx]?.current.temperature_2m,
      weathercode: locationsForecast[idx]?.current.weathercode,
    }));

    if (JSON.stringify(updated) !== JSON.stringify(locations)) {
      setLocations(updated);
    }
  }, [locations, locationsForecast, setLocations]);

  const handleMeasurementSystemChange = () =>
    setSettings((prev) => ({
      ...prev,
      units: prev.units === 'metric' ? 'imperial' : 'metric',
    }));

  return (
    <>
      {loading && (
        <Backdrop sx={{ color: 'secondary.dark', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
          <CircularProgress color="inherit" />
        </Backdrop>
      )}
      <Snackbar open={!!error} autoHideDuration={3000} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <Alert severity="error" sx={{ width: '100%' }}>
          {error?.message}
        </Alert>
      </Snackbar>
      <Container maxWidth="xl" sx={{ pt: 2, pb: 2 }}>
        {forecast && (
          <Grid container spacing={2}>
            <Grid xs={12}>
              <Stack>
                <Stack direction="row" alignItems="center" sx={{ width: '100%', height: '2.25rem' }}>
                  <LocationSearchDialog />
                  <Typography variant="body1">{format(new Date(forecast.current.time), 'EEEE, MMM dd')}</Typography>
                  <UnitSwitch
                    sx={{ ml: 'auto' }}
                    checked={settings.units === 'metric'}
                    onClick={handleMeasurementSystemChange}
                  />
                </Stack>
                <Typography
                  color="secondary"
                  variant="caption"
                  sx={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.25rem',
                  }}
                >
                  <LocationOn sx={{ width: '1rem', height: '1rem' }} />
                  {[current.name, current.admin1, current.country].filter(Boolean).join(', ')}
                </Typography>
              </Stack>
            </Grid>
            <Grid xs={12} md={6}>
              <Stack gap={2} sx={{ justifyContent: 'space-between', height: '100%' }}>
                <CurrentReport weatherInfo={forecast} />
                <Card>
                  <CardContent>
                    <Typography gutterBottom variant="h6">
                      Today
                    </Typography>
                    <HourlyReport weatherInfo={forecast} />
                  </CardContent>
                </Card>
              </Stack>
            </Grid>
            <Grid xs={12} md={6}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Typography gutterBottom variant="h6">
                    10-Days Forecast
                  </Typography>
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
