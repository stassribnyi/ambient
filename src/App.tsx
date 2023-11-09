import { ArrowDownward, LocationOn } from '@mui/icons-material';
import {
  Alert,
  Backdrop,
  CircularProgress,
  Container,
  Unstable_Grid2 as Grid,
  Snackbar,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { Chart, InfoBlock, MenuDialog, UnitSwitch } from './components';
import { CurrentReport, DailyReport, HourlyReport } from './components/Reports';

import './App.css';
import { useForecast, useLocations, useUserSettings } from './hooks';
import PullToRefresh from 'react-simple-pull-to-refresh';
import { useEffect } from 'react';

import { Time } from './components/Time';

// function setRelIcon(iconUrl: string) {
//   const link = document.querySelector('link[rel="icon"]');

//   if (link) {
//     link.setAttribute('href', iconUrl);
//   }
// }

function App() {
  const [settings, setSettings] = useUserSettings();
  const { currentForecast: forecast, error, loading, refresh } = useForecast();
  const { current } = useLocations();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    if (!forecast) {
      return;
    }

    document.title = `${current.name}, ${current.country} - ${forecast.current.temperature}°, ${forecast.current.description} | Ambient`;

    // if (forecast.current.iconUrl) {
    //   setRelIcon(forecast.current.iconUrl);
    // }
  }, [current.country, current.name, current.temperature, forecast]);

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
                    <MenuDialog />
                    <Typography variant="body1">
                      <Time value={forecast.current.time} format="EEEE, MMM dd" />
                    </Typography>
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
                  <CurrentReport value={forecast.current} />
                  <InfoBlock title="Today">
                    <HourlyReport value={forecast.hourly} />
                  </InfoBlock>
                </Stack>
              </Grid>
              <Grid xs={12} md={6}>
                <InfoBlock title="10-Days Forecast">
                  <DailyReport value={forecast.daily} />
                </InfoBlock>
              </Grid>
              {!isMobile ? (
                <Grid xs={12}>
                  <InfoBlock title="Atmospheric Conditions">
                    <Chart series={forecast.series} />
                  </InfoBlock>
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
