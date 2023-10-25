import { FC } from 'react';
import { Air, Water } from '@mui/icons-material';

import { getWMOInfo } from '../getWMOInfo';
import { WeatherInfo } from '../vite-env';
import { Box, Stack, Typography } from '@mui/material';

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
      <div
      // style={{
      //   display: 'grid',
      //   gridTemplate: '1fr 1fr / 3fr minmax(100px, 1fr)',
      //   gap: '2rem',
      // }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <img
            src={current.imageUrl}
            style={{ width: '184px', height: '184px' }}
          />
          <Typography variant='h1' sx={{ mt: -8 }}>
            {current.temperature.value}
            {current.temperature.units}
          </Typography>
          <Typography variant='h6'>{current.description}</Typography>
          <Typography color='secondary' variant='caption'>
            Feels like {current.apparentTemperature.value}
            {current.apparentTemperature.units}
          </Typography>
        </Box>
        <Stack direction='row' justifyContent='space-between'>
          <div>
            <p style={{ fontSize: '1.5rem', margin: 0 }}>
              <Air /> {current.windspeed.value}
              {current.windspeed.units}
            </p>
            <p style={{ margin: 0 }}>Wind speed</p>
          </div>
          <div style={{ justifySelf: 'end' }}>
            <p style={{ fontSize: '1.5rem', margin: 0 }}>
              <Water /> {current.relativeHumidity.value}
              {current.relativeHumidity.units}
            </p>
            <p style={{ margin: 0 }}>Humidity</p>
          </div>
        </Stack>
      </div>
    </>
  );
};
