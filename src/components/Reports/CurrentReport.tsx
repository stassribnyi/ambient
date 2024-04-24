import { FC, PropsWithChildren } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Unstable_Grid2 as Grid, Stack, Typography } from '@mui/material';

import { Windspeed } from '../Windspeed';
import { Humidity } from '../Humidity';
import { Temperature } from '../Temperature';
import { Tile } from '../Tile';
import { BeaufortIcon, Meteocon, UVIndexIcon, WMOIcon } from '../Icons';

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
  const { t } = useTranslation();

  //FIXME: consider defaulting to day
  const variant = isDay ? 'day' : 'night';

  // TODO: review typescript checks, this should not be possible
  const description = weathercode !== undefined ? t(`wmo_codes.${weathercode}.${variant}`) : t('common.not_available');

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
        <WMOIcon animated variant={variant} code={weathercode} size={184} />
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
          <ReportTile
            title={t('report.current.humidity')}
            icon={<Meteocon animated alt={t('report.current.humidity')} name="humidity" />}
          >
            <Humidity value={relativeHumidity} />
          </ReportTile>
        </Grid>
        <Grid xs={6} md={3}>
          <ReportTile
            title={t(`beaufort_scale_codes.${beaufortScale}`) ?? t('common.not_available')}
            icon={<BeaufortIcon scale={beaufortScale} />}
          >
            <Windspeed value={windspeed} />
          </ReportTile>
        </Grid>
        <Grid xs={6} md={3}>
          <ReportTile title={t('report.current.uv_index')} icon={<UVIndexIcon scale={uvIndex} />}>
            {t(`uv_index_codes.${uvIndex}`) ?? t('common.not_available')}
          </ReportTile>
        </Grid>
        <Grid xs={6} md={3}>
          {isDay ? (
            <ReportTile
              title={t('report.current.sunset')}
              icon={<Meteocon animated alt={t('report.current.sunset')} name="sunset" />}
            >
              {t('common.time', { time: sunsetTime })}
            </ReportTile>
          ) : (
            <ReportTile
              title={t('report.current.sunrise')}
              icon={<Meteocon animated alt={t('report.current.sunrise')} name="sunrise" />}
            >
              {t('common.time', { time: sunriseTime })}
            </ReportTile>
          )}
        </Grid>
      </Grid>
    </Stack>
  );
};
