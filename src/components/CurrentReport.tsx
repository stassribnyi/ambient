import { FC, PropsWithChildren } from 'react';
import { format, isEqual } from 'date-fns';
import { Box, Unstable_Grid2 as Grid, Stack, Typography } from '@mui/material';

import { getWMOInfo } from '../getWMOInfo';
import { WeatherInfo } from '../vite-env';

import windSock from '@bybas/weather-icons/production/fill/all/windsock.svg';
import humidity from '@bybas/weather-icons/production/fill/all/humidity.svg';

import sunrise from '@bybas/weather-icons/production/fill/all/sunrise.svg';
import sunset from '@bybas/weather-icons/production/fill/all/sunset.svg';

// TODO: extract into separate file
import uvIdxNA from '@bybas/weather-icons/production/fill/all/uv-index.svg';
import uvIdx1 from '@bybas/weather-icons/production/fill/all/uv-index-1.svg';
import uvIdx2 from '@bybas/weather-icons/production/fill/all/uv-index-2.svg';
import uvIdx3 from '@bybas/weather-icons/production/fill/all/uv-index-3.svg';
import uvIdx4 from '@bybas/weather-icons/production/fill/all/uv-index-4.svg';
import uvIdx5 from '@bybas/weather-icons/production/fill/all/uv-index-5.svg';
import uvIdx6 from '@bybas/weather-icons/production/fill/all/uv-index-6.svg';
import uvIdx7 from '@bybas/weather-icons/production/fill/all/uv-index-7.svg';
import uvIdx8 from '@bybas/weather-icons/production/fill/all/uv-index-8.svg';
import uvIdx9 from '@bybas/weather-icons/production/fill/all/uv-index-9.svg';
import uvIdx10 from '@bybas/weather-icons/production/fill/all/uv-index-10.svg';
import uvIdx11 from '@bybas/weather-icons/production/fill/all/uv-index-11.svg';
import { changeTimeZone } from '../changeTimezone';

const UV_INDEX = new Map([
  [1, uvIdx1],
  [2, uvIdx2],
  [3, uvIdx3],
  [4, uvIdx4],
  [5, uvIdx5],
  [6, uvIdx6],
  [7, uvIdx7],
  [8, uvIdx8],
  [9, uvIdx9],
  [10, uvIdx10],
  [11, uvIdx11],
]);

function getUVIndexImage(index: number) {
  return UV_INDEX.get(index) || uvIdxNA;
}

function getUVIndexInfo(index: number) {
  const approximateIdx = Math.round(index);
  let description = 'N/A';

  switch (true) {
    case approximateIdx <= 2:
      description = 'Low';
      break;
    case 3 <= approximateIdx && approximateIdx <= 5:
      description = 'Moderate';
      break;
    case 6 <= approximateIdx && approximateIdx <= 7:
      description = 'High';
      break;
    case 8 < approximateIdx && approximateIdx <= 9:
      description = 'Very High';
      break;
    case 11 <= approximateIdx:
      description = 'Extreme';
      break;
    default:
      break;
  }

  return {
    description,
    imageUrl: getUVIndexImage(approximateIdx),
  };
}

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
  const currentDateTimeZone = changeTimeZone(new Date(), weatherInfo.timezone);

  const currentIdx = weatherInfo.hourly.time.findIndex((t) =>
    isEqual(currentDateTimeZone.setMinutes(0, 0, 0), new Date(t)),
  );
  const dayIdx = weatherInfo.daily.time.findIndex((t) =>
    isEqual(currentDateTimeZone.setHours(0, 0, 0, 0), new Date(t).setHours(0, 0, 0, 0)),
  );

  const uvIndex = weatherInfo.hourly.uv_index[currentIdx];
  const sunriseTime = weatherInfo.daily.sunrise[dayIdx];
  const sunsetTime = weatherInfo.daily.sunset[dayIdx];

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
    sun: {
      value: weatherInfo.current.is_day ? sunsetTime : sunriseTime,
    },
    imageUrl: wmoInfo?.image,
    description: wmoInfo?.description,
    uvIndex: getUVIndexInfo(uvIndex),
  };

  return (
    <>
      <Stack gap={2} flex={1}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            height: '100%',
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
            <InfoBlock title="UV Index" imageUrl={current.uvIndex.imageUrl}>
              {current.uvIndex.description}
            </InfoBlock>
          </Grid>
          <Grid xs={6} md={3}>
            <InfoBlock
              title={weatherInfo.current.is_day ? 'Sunset' : 'Sunrise'}
              imageUrl={weatherInfo.current.is_day ? sunrise : sunset}
            >
              {format(new Date(current.sun.value), 'HH:mm')}
            </InfoBlock>
          </Grid>
        </Grid>
      </Stack>
    </>
  );
};
