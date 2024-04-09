import { Suspense, lazy, useEffect } from 'react';
import PullToRefresh from 'react-simple-pull-to-refresh';
import { ArrowDownward, LocationOn, RefreshOutlined } from '@mui/icons-material';
import {
  Alert,
  Backdrop,
  CircularProgress,
  Container,
  Unstable_Grid2 as Grid,
  IconButton,
  Snackbar,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';

import { useForecast, useLocations } from './hooks';
import { useDocumentTitle } from 'usehooks-ts';

import { Block, MenuDialog, UnitSwitch, Time, WMO_INFO, Fallback } from './components';
import { CurrentReport, DailyReport, HourlyReport } from './components/Reports';
import { safeJoin } from './utils';

const AtmosphericConditionChart = lazy(() => import('./components/AtmosphericConditionChart'));

function App() {
  const { data: forecast, isLoading, error, refetch } = useForecast();
  const { primary: location } = useLocations();

  // FIXME: refactor
  useDocumentTitle(
    forecast && location
      ? `${location.name}, ${location.country} ${Math.round(forecast.current.temperature)}°, ${
          WMO_INFO.get(forecast.current.weathercode)?.day?.description ?? 'N/A'
        } | Ambient`
      : 'Ambient',
  );

  // TODO: this is temporary fix for scrolling issue with pull to refresh library
  useEffect(() => {
    const ptr__children = document.querySelector<HTMLDivElement>('.ptr .ptr__children');

    if (!ptr__children) {
      return;
    }

    ptr__children.style.overflowX = 'hidden';
    ptr__children.style.overflowY = 'auto';
    ptr__children.style.transform = 'unset';
  }, []);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // TODO: use skeleton or do not remove old forecast when changing city to avoid blank screen
  const isReady = forecast && location;

  return (
    <>
      {isLoading && (
        <Backdrop sx={{ color: 'secondary.dark', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={isLoading}>
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
        isPullable={!isLoading}
        onRefresh={refetch}
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
                    <UnitSwitch sx={{ ml: 'auto' }} />
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
                      {safeJoin([location.name, location.admin1, location.country])}
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
                  <Grid xs={12}>
                    <Stack alignItems="center" direction="row" sx={{ p: '0 0.5rem' }}>
                      <IconButton edge="start" onClick={() => refetch()}>
                        <RefreshOutlined fontSize="inherit" />
                      </IconButton>
                      <Typography color="secondary.light" variant="body2">
                        Updated <Time value={forecast.lastUpdated} format="dd.mm, HH:mm" />
                      </Typography>
                      <Typography
                        component="a"
                        variant="body2"
                        color="secondary.light"
                        href="https://open-meteo.com/en/docs"
                        rel="noopener"
                        target="_blank"
                        sx={{ ml: 'auto' }}
                      >
                        Open Meteo
                      </Typography>
                    </Stack>
                  </Grid>
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
