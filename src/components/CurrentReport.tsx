import { FC, PropsWithChildren } from 'react';

import { getWMOInfo } from '../getWMOInfo';
import { WeatherInfo } from '../vite-env';
import { Box, Unstable_Grid2 as Grid, Stack, Typography } from '@mui/material';

import windSock from '@bybas/weather-icons/production/fill/all/windsock.svg';
import humidity from '@bybas/weather-icons/production/fill/all/humidity.svg';
import uvIdx from '@bybas/weather-icons/production/fill/all/uv-index-10.svg';

const InfoBlock: FC<PropsWithChildren<Readonly<{ imageUrl: string; title: string }>>> = ({
  imageUrl,
  children,
  title,
}) => {
  return (
    <Box
      sx={{
        fontSize: '1rem',
        margin: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        background: '#11191f',
        padding: 1.5,
        borderRadius: '1rem',
        color: '#fff',
        boxShadow: '0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)',
        backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05))',
      }}
    >
      <Box component="img" src={imageUrl} alt={title} sx={{ width: '48px', mb: 1 }} />
      <Typography variant="body1">{title}</Typography>
      <Typography variant="caption" color="secondary">
        {children}
      </Typography>
    </Box>
  );
};

export const CurrentReport: FC<Readonly<{ weatherInfo: WeatherInfo }>> = ({ weatherInfo }) => {
  const wmoInfo = getWMOInfo(weatherInfo);

  const current = {
    temperature: {
      value: Math.floor(weatherInfo.current.temperature_2m),
      units: '°',
    },
    apparentTemperature: {
      value: Math.floor(weatherInfo.current.apparent_temperature),
      units: '°',
    },
    windspeed: {
      value: Math.round(weatherInfo.current.windspeed_10m),
      units: weatherInfo.current_units.windspeed_10m,
    },
    relativeHumidity: {
      value: Math.round(weatherInfo.current.relativehumidity_2m),
      units: weatherInfo.current_units.relativehumidity_2m,
    },
    imageUrl: wmoInfo?.image,
    description: wmoInfo?.description,
  };

  return (
    <>
      <Stack gap={2}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            justifyContent: 'space-between',
          }}
        >
          <img alt={current.description} src={current.imageUrl} style={{ width: '184px', height: '184px' }} />
          <Stack alignItems="center">
            <Typography variant="h2">
              {current.temperature.value}
              {current.temperature.units}
            </Typography>
            <Typography variant="h6">{current.description}</Typography>
            <Typography color="secondary" variant="caption">
              Feels like {current.apparentTemperature.value}
              {current.apparentTemperature.units}
            </Typography>
          </Stack>
        </Box>
        <Grid container spacing={2}>
          <Grid xs={6} md={3}>
            <InfoBlock title="Humidity" imageUrl={humidity}>
              {current.relativeHumidity.value}
              {current.relativeHumidity.units}
            </InfoBlock>
          </Grid>
          <Grid xs={6} md={3}>
            <InfoBlock title="Wind" imageUrl={windSock}>
              {current.windspeed.value}
              {current.windspeed.units}
            </InfoBlock>
          </Grid>
          <Grid xs={6} md={3}>
            <InfoBlock title="UV Index" imageUrl={uvIdx}>
              High
            </InfoBlock>
          </Grid>
          <Grid xs={6} md={3}>
            <InfoBlock title="Wind" imageUrl={windSock}>
              {current.windspeed.value}
              {current.windspeed.units}
            </InfoBlock>
          </Grid>
        </Grid>
      </Stack>
    </>
  );
};
