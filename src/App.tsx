import { useMemo } from 'react';
import { Location } from './vite-env';

import celsius from '@bybas/weather-icons/production/fill/all/celsius.svg';
import fahrenheit from '@bybas/weather-icons/production/fill/all/fahrenheit.svg';

import { LocationOn } from '@mui/icons-material';
import {
  Alert,
  Box,
  Card,
  CardContent,
  Container,
  Unstable_Grid2 as Grid,
  LinearProgress,
  Snackbar,
  Stack,
  Switch,
  Typography,
  styled,
} from '@mui/material';
import { CurrentReport, DailyReport, HourlyReport, LocationSearchDialog } from './components';

import './App.css';
import { useWeather } from './hooks';
import { format } from 'date-fns';
import { useLocalStorage } from 'usehooks-ts';

const DEFAULT_LOCATION = {
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

const UnitsSwitch = styled(Switch)(({ theme }) => ({
  padding: 8,
  '& .MuiSwitch-switchBase': {
    '&.Mui-checked': {
      '&.Mui-checked + .MuiSwitch-track, &.Mui-disabled + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: theme.palette.common.white,
      },
    },
  },
  '& .MuiSwitch-track': {
    opacity: 1,
    borderRadius: 22 / 2,
    '&:before, &:after': {
      content: '""',
      position: 'absolute',
      top: '50%',
      transform: 'translateY(-50%)',
      width: 16,
      height: 16,
    },
    '&:before': {
      backgroundColor: theme.palette.secondary.dark,
      maskImage: `url(${celsius})`,
      maskSize: '32px',
      maskPosition: 'center',
      left: 12,
    },
    '&:after': {
      backgroundColor: theme.palette.secondary.dark,
      maskImage: `url(${fahrenheit})`,
      maskSize: '32px',
      maskPosition: 'center',
      right: 12,
    },
  },
  '& .MuiSwitch-thumb': {
    backgroundColor: theme.palette.secondary.dark,
    boxShadow: 'none',
    width: 16,
    height: 16,
    margin: 2,
  },
}));

function App() {
  const [unit, setUnit] = useLocalStorage<'celsius' | 'fahrenheit'>('unit', 'celsius');

  const [locations] = useLocalStorage<Array<Location>>('locations', []);
  const current = useMemo(() => locations.find((item) => item.current) ?? DEFAULT_LOCATION, [locations]);

  const { forecast, loading, error } = useWeather(current, unit);

  return (
    <>
      {loading && (
        <Box sx={{ width: '100%', top: '1rem', position: 'absolute' }}>
          <LinearProgress color="secondary" />
        </Box>
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
                <Stack direction="row" alignItems="center" sx={{ width: '100%' }}>
                  <LocationSearchDialog />
                  <Typography variant="body1">{format(new Date(forecast.current.time), 'EEEE, MMM dd')}</Typography>
                  <UnitsSwitch
                    sx={{ ml: 'auto' }}
                    checked={unit === 'celsius'}
                    onClick={() => setUnit(unit === 'celsius' ? 'fahrenheit' : 'celsius')}
                  />
                </Stack>
                <Typography
                  color="secondary"
                  variant="caption"
                  sx={{
                    pl: 1,
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
