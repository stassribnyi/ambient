import { FC, PropsWithChildren } from 'react';
import { Box, Unstable_Grid2 as Grid, Stack, Typography } from '@mui/material';

import { Windspeed } from '../Windspeed';
import { Humidity } from '../Humidity';
import { Temperature } from '../Temperature';
import { Time } from '../Time';
import { Tile } from '../Tile';
import { BeaufortIcon, Meteocon, UVIndexIcon, WMOIcon, UV_INDEX_SCALE, WIND_BEAUFORT_SCALE, WMO_INFO } from '../Icons';

import type { CurrentForecast } from '../../mappers';

const ReportTile: FC<PropsWithChildren<Readonly<{ icon: React.ReactNode; title: string }>>> = ({
  icon,
  children,
  title,
}) => {
  return (
    <Tile>
      <Box sx={{ display: 'grid', placeContent: 'center', placeItems: 'center' }}>
        <Box sx={{ display: 'grid', gap: 1, placeItems: 'center' }}>
          {icon}
          <Typography variant="body1" sx={{ whiteSpace: 'nowrap' }}>
            {title}
          </Typography>
        </Box>
        <Typography variant="caption" color="secondary">
          {children}
        </Typography>
      </Box>
    </Tile>
  );
};

export const CurrentReport: FC<Readonly<{ value: CurrentForecast }>> = ({
  value: {
    apparentTemperature,
    isDay,
    relativeHumidity,
    sunriseTime,
    sunsetTime,
    temperature,
    uvIndex,
    windspeed,
    weathercode,
    beaufortScale,
  },
}) => {
  const details = WMO_INFO.get(weathercode);
  const description = (isDay ? details?.day : details?.night)?.description;

  return (
    <Stack gap={2} flex={1}>
      <Box
        sx={{
          gap: 2,
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <WMOIcon variant={isDay ? 'day' : 'night'} code={weathercode} size={184} />
        <Stack alignItems="center" justifyContent="center">
          <Typography variant="h2">
            <Temperature value={temperature} />
          </Typography>
          <Typography variant="h6">{description ?? 'N/A'}</Typography>
          <Typography color="secondary" variant="caption">
            Feels like <Temperature value={apparentTemperature} />
          </Typography>
        </Stack>
      </Box>
      <Grid container spacing={2}>
        <Grid xs={6} md={3}>
          <ReportTile title="Humidity" icon={<Meteocon alt="Humidity" name="humidity" />}>
            <Humidity value={relativeHumidity} />
          </ReportTile>
        </Grid>
        <Grid xs={6} md={3}>
          <ReportTile
            title={WIND_BEAUFORT_SCALE.get(beaufortScale)?.description ?? 'N/A'}
            icon={<BeaufortIcon scale={beaufortScale} />}
          >
            <Windspeed value={windspeed} />
          </ReportTile>
        </Grid>
        <Grid xs={6} md={3}>
          <ReportTile title="UV Index" icon={<UVIndexIcon scale={uvIndex} />}>
            {UV_INDEX_SCALE.get(uvIndex)?.description ?? 'N/A'}
          </ReportTile>
        </Grid>
        <Grid xs={6} md={3}>
          {isDay ? (
            <ReportTile title="Sunset" icon={<Meteocon alt="Sunset" name="sunset" />}>
              <Time value={sunsetTime} format="HH:mm" />
            </ReportTile>
          ) : (
            <ReportTile title="Sunrise" icon={<Meteocon alt="Sunrise" name="sunrise" />}>
              <Time value={sunriseTime} format="HH:mm" />
            </ReportTile>
          )}
        </Grid>
      </Grid>
    </Stack>
  );
};
