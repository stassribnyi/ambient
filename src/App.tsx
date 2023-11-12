import { Suspense, lazy } from 'react';
import PullToRefresh from 'react-simple-pull-to-refresh';
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

import { useForecast, useLocations, useUserSettings } from './hooks';
import { useDocumentTitle } from 'usehooks-ts';

import { Block, MenuDialog, UnitSwitch, Time, WMO_DESCRIPTION, Fallback } from './components';
import { CurrentReport, DailyReport, HourlyReport } from './components/Reports';

import { delay } from './utils';

const AtmosphericConditionChart = lazy(async () =>
  delay(1000).then(() => import('./components/AtmosphericConditionChart')),
);

function App() {
  const [settings, setSettings] = useUserSettings();
  const { currentForecast: forecast, error, loading, refresh } = useForecast();
  const { current } = useLocations();

  // FIXME: refactor
  useDocumentTitle(
    forecast && current
      ? `${current.name}, ${current.country} - ${Math.round(forecast.current.temperature)}°, ${
          WMO_DESCRIPTION.get(forecast.current.weathercode)?.day ?? 'N/A'
        } | Ambient`
      : 'Ambient',
  );

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleMeasurementSystemChange = () =>
    setSettings((prev) => ({
      ...prev,
      units: prev.units === 'metric' ? 'imperial' : 'metric',
    }));

  const isReady = forecast && current;

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
          {
            <Grid container spacing={2}>
              <Grid xs={12}>
                <Stack>
                  <Stack
                    direction="row"
                    alignItems="center"
                    sx={{ width: '100%', height: '2.25rem', visibility: isReady ? 'visible' : 'hidden' }}
                  >
                    <MenuDialog />
                    {isReady && (
                      <Typography variant="body1">
                        <Time value={forecast.current.time} format="EEEE, MMM dd" />
                      </Typography>
                    )}
                    <UnitSwitch
                      sx={{ ml: 'auto' }}
                      checked={settings.units === 'metric'}
                      onClick={handleMeasurementSystemChange}
                    />
                  </Stack>
                  {isReady && (
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
                  )}
                </Stack>
              </Grid>
              {isReady && (
                <>
                  <Grid xs={12} md={6}>
                    <Stack gap={2} sx={{ justifyContent: 'space-between', height: '100%' }}>
                      <CurrentReport value={forecast.current} />
                      <Block title="Today">
                        <HourlyReport value={forecast.hourly} />
                      </Block>
                    </Stack>
                  </Grid>
                  <Grid xs={12} md={6}>
                    <Block title="10-Days Forecast">
                      <DailyReport value={forecast.daily} />
                    </Block>
                  </Grid>
                  {!isMobile ? (
                    <Grid xs={12}>
                      <Suspense fallback={<Fallback title="Checking Atmospheric Condition For You..." />}>
                        <Block title="Atmospheric Conditions">
                          <AtmosphericConditionChart series={forecast.series} />
                        </Block>
                      </Suspense>
                    </Grid>
                  ) : null}
                </>
              )}
            </Grid>
          }
        </Container>
      </PullToRefresh>
    </>
  );
}

export default App;
