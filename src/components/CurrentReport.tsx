import { FC } from 'react';

import { getWMOInfo } from '../getWMOInfo';
import { WeatherInfo } from '../vite-env';
import { Box, Stack, Typography } from '@mui/material';

import windSock from '@bybas/weather-icons/production/fill/all/windsock.svg';
import humidity from '@bybas/weather-icons/production/fill/all/humidity.svg';

export const CurrentReport: FC<Readonly<{ weatherInfo: WeatherInfo }>> = ({
  weatherInfo,
}) => {
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
          <img
            src={current.imageUrl}
            style={{ width: '184px', height: '184px' }}
          />
          <Stack alignItems='center'>
            <Typography variant='h2'>
              {current.temperature.value}
              {current.temperature.units}
            </Typography>
            <Typography variant='h6'>{current.description}</Typography>
            <Typography color='secondary' variant='caption'>
              Feels like {current.apparentTemperature.value}
              {current.apparentTemperature.units}
            </Typography>
          </Stack>
        </Box>
        <Stack direction='row' justifyContent='space-between'>
          <div style={{ justifySelf: 'end' }}>
            <p
              style={{
                fontSize: '1.25rem',
                margin: 0,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.25rem',
              }}
            >
              <img src={humidity} style={{ width: '36px' }} />{' '}
              {current.relativeHumidity.value}
              {current.relativeHumidity.units}
            </p>
          </div>
          <div style={{ justifySelf: 'end' }}>
            <p
              style={{
                fontSize: '1.25rem',
                margin: 0,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.25rem',
              }}
            >
              <img src={windSock} style={{ width: '36px' }} />{' '}
              {current.windspeed.value}
              {current.windspeed.units}
            </p>
          </div>
        </Stack>
      </Stack>
    </>
  );
};
