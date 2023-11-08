import { FC, PropsWithChildren } from 'react';
import { Box, Unstable_Grid2 as Grid, Stack, Typography } from '@mui/material';

import humiditySvg from '@bybas/weather-icons/production/fill/all/humidity.svg';
import sunriseSvg from '@bybas/weather-icons/production/fill/all/sunrise.svg';
import sunsetSvg from '@bybas/weather-icons/production/fill/all/sunset.svg';

import { InfoBlock } from '../InfoBlock';
import { Windspeed } from '../Windspeed';
import { Humidity } from '../Humidity';
import { Temperature } from '../Temperature';
import { Time } from '../Time';

import type { CurrentReportType } from '../../mappers/mapForecastToCurrent';

const Tile: FC<PropsWithChildren<Readonly<{ iconUrl: string; title: string }>>> = ({ iconUrl, children, title }) => {
  return (
    <InfoBlock>
      <Box sx={{ display: 'grid', placeContent: 'center', placeItems: 'center' }}>
        <Box component="img" src={iconUrl} alt={title} sx={{ width: '48px', mb: 1 }} />
        <Typography variant="body1">{title}</Typography>
        <Typography variant="caption" color="secondary">
          {children}
        </Typography>
      </Box>
    </InfoBlock>
  );
};

export const CurrentReport: FC<Readonly<{ value: CurrentReportType }>> = ({
  value: {
    apparentTemperature,
    description,
    iconUrl,
    isDay,
    relativeHumidity,
    sunriseTime,
    sunsetTime,
    temperature,
    uvIndex,
    windspeed,
  },
}) => {
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
        {/* TODO: use css to make items same size */}
        <Box component="img" alt={description} src={iconUrl} sx={{ width: '184px', height: '184px' }} />
        <Stack alignItems="center" justifyContent="center">
          <Typography variant="h2">
            <Temperature value={temperature} />
          </Typography>
          <Typography variant="h6">{description}</Typography>
          <Typography color="secondary" variant="caption">
            Feels like <Temperature value={apparentTemperature} />
          </Typography>
        </Stack>
      </Box>
      <Grid container spacing={2}>
        <Grid xs={6} md={3}>
          <Tile title="Humidity" iconUrl={humiditySvg}>
            <Humidity value={relativeHumidity} />
          </Tile>
        </Grid>
        <Grid xs={6} md={3}>
          <Tile title={windspeed.description} iconUrl={windspeed.iconUrl}>
            <Windspeed value={windspeed.value} />
          </Tile>
        </Grid>
        <Grid xs={6} md={3}>
          <Tile title="UV Index" iconUrl={uvIndex.iconUrl}>
            {uvIndex.description}
          </Tile>
        </Grid>
        <Grid xs={6} md={3}>
          {isDay ? (
            <Tile title="Sunset" iconUrl={sunsetSvg}>
              <Time value={sunsetTime} format="HH:mm" />
            </Tile>
          ) : (
            <Tile title="Sunrise" iconUrl={sunriseSvg}>
              <Time value={sunriseTime} format="HH:mm" />
            </Tile>
          )}
        </Grid>
      </Grid>
    </Stack>
  );
};
