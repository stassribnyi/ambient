import { FC, PropsWithChildren } from 'react';
import { format, isEqual } from 'date-fns';
import { Box, Unstable_Grid2 as Grid, Stack, Typography } from '@mui/material';

import { getWMOInfo } from '../getWMOInfo';
import { WeatherInfo } from '../vite-env';

// import windSock from '@bybas/weather-icons/production/fill/all/windsock.svg';
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

import windBeaufort0 from '@bybas/weather-icons/production/fill/all/wind-beaufort-0.svg';
import windBeaufort1 from '@bybas/weather-icons/production/fill/all/wind-beaufort-1.svg';
import windBeaufort2 from '@bybas/weather-icons/production/fill/all/wind-beaufort-2.svg';
import windBeaufort3 from '@bybas/weather-icons/production/fill/all/wind-beaufort-3.svg';
import windBeaufort4 from '@bybas/weather-icons/production/fill/all/wind-beaufort-4.svg';
import windBeaufort5 from '@bybas/weather-icons/production/fill/all/wind-beaufort-5.svg';
import windBeaufort6 from '@bybas/weather-icons/production/fill/all/wind-beaufort-6.svg';
import windBeaufort7 from '@bybas/weather-icons/production/fill/all/wind-beaufort-7.svg';
import windBeaufort8 from '@bybas/weather-icons/production/fill/all/wind-beaufort-8.svg';
import windBeaufort9 from '@bybas/weather-icons/production/fill/all/wind-beaufort-9.svg';
import windBeaufort10 from '@bybas/weather-icons/production/fill/all/wind-beaufort-10.svg';
import windBeaufort11 from '@bybas/weather-icons/production/fill/all/wind-beaufort-11.svg';
import windBeaufort12 from '@bybas/weather-icons/production/fill/all/wind-beaufort-12.svg';

import { changeTimeZone } from '../changeTimezone';
import { useUnitsConverter } from '../hooks';
import { InfoBlock } from './InfoBlock';

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

const WIND_BEAUFORT = new Map([
  [1, windBeaufort1],
  [2, windBeaufort2],
  [3, windBeaufort3],
  [4, windBeaufort4],
  [5, windBeaufort5],
  [6, windBeaufort6],
  [7, windBeaufort7],
  [8, windBeaufort8],
  [9, windBeaufort9],
  [10, windBeaufort10],
  [11, windBeaufort11],
  [12, windBeaufort12],
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

function getWindBeaufortImage(index: number) {
  return WIND_BEAUFORT.get(index) || windBeaufort0;
}

function getWindBeaufortInfo(windspeed: number) {
  let description = 'N/A';
  let windIndex = 0;

  switch (true) {
    case windspeed < 1:
      description = 'Calm';
      windIndex = 0;
      break;
    case 1 <= windspeed && windspeed <= 5:
      description = 'Light air';
      windIndex = 1;
      break;
    case 6 <= windspeed && windspeed <= 11:
      description = 'Light Breeze';
      windIndex = 2;
      break;
    case 12 <= windspeed && windspeed <= 19:
      description = 'Gentle Breeze';
      windIndex = 3;
      break;
    case 20 <= windspeed && windspeed <= 28:
      description = 'Moderate Breeze';
      windIndex = 4;
      break;
    case 29 <= windspeed && windspeed <= 38:
      description = 'Fresh Breeze';
      windIndex = 5;
      break;
    case 39 <= windspeed && windspeed <= 49:
      description = 'Strong Breeze';
      windIndex = 6;
      break;
    case 50 <= windspeed && windspeed <= 61:
      description = 'Near Gale';
      windIndex = 7;
      break;
    case 62 <= windspeed && windspeed <= 74:
      description = 'Gale';
      windIndex = 8;
      break;
    case 75 <= windspeed && windspeed <= 88:
      description = 'Severe Gale';
      windIndex = 9;
      break;
    case 89 <= windspeed && windspeed <= 102:
      description = 'Storm';
      windIndex = 10;
      break;
    case 103 <= windspeed && windspeed <= 117:
      description = 'Violent Storm';
      windIndex = 11;
      break;
    case 118 <= windspeed:
      description = 'Hurricane';
      windIndex = 12;
      break;
    default:
      break;
  }

  return {
    description,
    imageUrl: getWindBeaufortImage(windIndex),
  };
}

const CurrentInfo: FC<PropsWithChildren<Readonly<{ iconUrl: string; title: string }>>> = ({
  iconUrl,
  children,
  title,
}) => {
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

export const CurrentReport: FC<Readonly<{ weatherInfo: WeatherInfo }>> = ({ weatherInfo }) => {
  const wmoInfo = getWMOInfo(weatherInfo);
  const currentDateTimeZone = changeTimeZone(new Date(), weatherInfo.timezone);
  const { convert, units } = useUnitsConverter();

  const currentIdx = weatherInfo.hourly.time.findIndex((t) =>
    isEqual(currentDateTimeZone.setMinutes(0, 0, 0), new Date(t)),
  );
  const dayIdx = weatherInfo.daily.time.findIndex((t) =>
    isEqual(currentDateTimeZone.setHours(0, 0, 0, 0), new Date(t).setHours(0, 0, 0, 0)),
  );

  const current = {
    isDay: weatherInfo.current.is_day,
    temperature: Math.floor(convert('temperature', weatherInfo.current.temperature_2m)),
    apparentTemperature: Math.floor(convert('temperature', weatherInfo.current.apparent_temperature)),
    windspeed: Math.round(convert('windspeed', weatherInfo.current.windspeed_10m)),
    relativeHumidity: Math.round(weatherInfo.current.relativehumidity_2m),
    sunset: weatherInfo.daily.sunset[dayIdx],
    sunrise: weatherInfo.daily.sunrise[dayIdx],
    imageUrl: wmoInfo?.image,
    description: wmoInfo?.description,
    uvIndex: getUVIndexInfo(weatherInfo.hourly.uv_index[currentIdx]),
  };

  const windspeedInfo = getWindBeaufortInfo(weatherInfo.current.windspeed_10m);

  return (
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
          <Typography variant="h2">{current.temperature}°</Typography>
          <Typography variant="h6">{current.description}</Typography>
          <Typography color="secondary" variant="caption">
            Feels like {current.apparentTemperature}°
          </Typography>
        </Stack>
      </Box>
      <Grid container spacing={2}>
        <Grid xs={6} md={3}>
          <CurrentInfo title="Humidity" iconUrl={humidity}>
            {current.relativeHumidity}%
          </CurrentInfo>
        </Grid>
        <Grid xs={6} md={3}>
          <CurrentInfo title={windspeedInfo.description} iconUrl={windspeedInfo.imageUrl}>
            {current.windspeed} {units.windspeed}
          </CurrentInfo>
        </Grid>
        <Grid xs={6} md={3}>
          <CurrentInfo title="UV Index" iconUrl={current.uvIndex.imageUrl}>
            {current.uvIndex.description}
          </CurrentInfo>
        </Grid>
        <Grid xs={6} md={3}>
          <CurrentInfo title={current.isDay ? 'Sunset' : 'Sunrise'} iconUrl={current.isDay ? sunrise : sunset}>
            {format(new Date(current.isDay ? current.sunset : current.sunrise), 'HH:mm')}
          </CurrentInfo>
        </Grid>
      </Grid>
    </Stack>
  );
};
