import { FC, PropsWithChildren } from 'react';
import { Box, Unstable_Grid2 as Grid, Stack, Typography } from '@mui/material';

import { InfoBlock } from '../InfoBlock';
import { Windspeed } from '../Windspeed';
import { Humidity } from '../Humidity';
import { Temperature } from '../Temperature';
import { Time } from '../Time';
import {
  BeaufortIcon,
  Meteocon,
  UVIndexIcon,
  WMOIcon,
  UV_INDEX_DESCRIPTION,
  WIND_BEAUFORT_DESCRIPTION,
  WMO_DESCRIPTION,
} from '../Icons';

import type { CurrentForecast } from '../../mappers';

const Tile: FC<PropsWithChildren<Readonly<{ icon: React.ReactNode; title: string }>>> = ({ icon, children, title }) => {
  return (
    <InfoBlock>
      <Box sx={{ display: 'grid', placeContent: 'center', placeItems: 'center' }}>
        <Box sx={{ display: 'grid', gap: 1, placeItems: 'center' }}>
          {icon}
          <Typography variant="body1">{title}</Typography>
        </Box>
        <Typography variant="caption" color="secondary">
          {children}
        </Typography>
      </Box>
    </InfoBlock>
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
  const details = WMO_DESCRIPTION.get(weathercode);
  const description = isDay ? details?.day : details?.night;

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
          <Tile title="Humidity" icon={<Meteocon alt="Humidity" name="humidity" />}>
            <Humidity value={relativeHumidity} />
          </Tile>
        </Grid>
        <Grid xs={6} md={3}>
          <Tile
            title={WIND_BEAUFORT_DESCRIPTION.get(beaufortScale) ?? 'N/A'}
            icon={<BeaufortIcon scale={beaufortScale} />}
          >
            <Windspeed value={windspeed} />
          </Tile>
        </Grid>
        <Grid xs={6} md={3}>
          <Tile title="UV Index" icon={<UVIndexIcon scale={uvIndex} />}>
            {UV_INDEX_DESCRIPTION.get(uvIndex) ?? 'N/A'}
          </Tile>
        </Grid>
        <Grid xs={6} md={3}>
          {isDay ? (
            <Tile title="Sunset" icon={<Meteocon alt="Sunset" name="sunset" />}>
              <Time value={sunsetTime} format="HH:mm" />
            </Tile>
          ) : (
            <Tile title="Sunrise" icon={<Meteocon alt="Sunrise" name="sunrise" />}>
              <Time value={sunriseTime} format="HH:mm" />
            </Tile>
          )}
        </Grid>
      </Grid>
    </Stack>
  );
};
