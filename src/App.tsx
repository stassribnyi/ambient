import { ArrowDownward, LocationOn } from '@mui/icons-material';
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
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { Chart, CurrentReport, DailyReport, HourlyReport, LocationSearchDialog, UnitSwitch } from './components';

import './App.css';
import { useForecast, useLocations, useUserSettings } from './hooks';
import { format } from 'date-fns';
import PullToRefresh from 'react-simple-pull-to-refresh';

// import { useGeolocated } from 'react-geolocated';
// import axios from 'axios';

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

function App() {
  const [settings, setSettings] = useUserSettings();
  const { currentForecast: forecast, error, loading, refresh } = useForecast();
  const { current } = useLocations();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

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
      <PullToRefresh
        resistance={3}
        pullDownThreshold={56}
        isPullable={!loading}
        onRefresh={refresh}
        pullingContent={
          <Stack sx={{ color: 'secondary.light', p: '24px 16px 0' }} justifyContent="center" gap={2} direction="row">
            <ArrowDownward />
            <Typography>Pull down to check the sky</Typography>
            <ArrowDownward />
          </Stack>
        }
        refreshingContent={
          <Stack sx={{ color: 'secondary.light', p: '24px 16px 0' }} justifyContent="center" gap={2} direction="row">
            <CircularProgress color="inherit" size={24} />
            <Typography>Checking the sky for you…</Typography>
          </Stack>
        }
      >
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
              {!isMobile ? (
                <Grid xs={12}>
                  <Card>
                    <CardContent>
                      <Typography gutterBottom variant="h6">
                        Atmospheric Conditions
                      </Typography>
                      <Chart info={forecast} />
                    </CardContent>
                  </Card>
                </Grid>
              ) : null}
            </Grid>
          )}
        </Container>
      </PullToRefresh>
    </>
  );
}

export default App;
