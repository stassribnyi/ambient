import { FC } from 'react';
import { Table, TableBody, TableRow, TableCell, Stack, Box, useTheme, useMediaQuery } from '@mui/material';
import { isToday, format } from 'date-fns';

import { WeatherInfo } from '../../vite-env';
import { getWMOInfoDaily } from '../../getWMOInfo';
import { Precipitation } from '../Precipitation';
import { useUnitsConverter } from '../../hooks';

export const DailyReport: FC<Readonly<{ weatherInfo: WeatherInfo }>> = ({ weatherInfo }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { convert } = useUnitsConverter();

  function getDailyInfo(weatherInfo: WeatherInfo) {
    return weatherInfo.daily.time
      .map((t, idx) => ({
        idx,
        time: new Date(t),
      }))
      .map(({ time, idx }) => ({
        time,
        imageUrl: getWMOInfoDaily(weatherInfo, idx)?.image,
        description: getWMOInfoDaily(weatherInfo, idx)?.description,
        temperature: {
          min: Math.floor(convert('temperature', weatherInfo.daily.temperature_2m_min[idx])),
          max: Math.floor(convert('temperature', weatherInfo.daily.temperature_2m_max[idx])),
        },
        precipitationProbability: weatherInfo.daily.precipitation_probability_max[idx],
      }));
  }

  return (
    <Table aria-label="10 Days forecast" size="small">
      <TableBody>
        {getDailyInfo(weatherInfo).map(
          ({ time, description, imageUrl, temperature, precipitationProbability }, idx) => (
            <TableRow
              key={idx}
              sx={{ '&:last-child td, &:last-child th': { border: 0 }, '& td': { ...(isMobile ? { p: 0 } : null) } }}
            >
              <TableCell>{isToday(time) ? 'Today' : format(time, 'eeee')}</TableCell>
              <TableCell align="center" sx={{ width: '4rem' }}>
                <Precipitation showLabel level={precipitationProbability} size={12} />
              </TableCell>
              <TableCell align="center">
                <Box component="img" src={imageUrl} sx={{ minWidth: '32px', width: '32px' }} alt={description} />
              </TableCell>
              <TableCell align="center" sx={{ width: '4rem', fontSize: '1rem' }}>
                <Stack direction="row" gap={1} justifyContent="space-between">
                  <strong>{temperature.max}°</strong>
                  <strong>{temperature.min}°</strong>
                </Stack>
              </TableCell>
            </TableRow>
          ),
        )}
      </TableBody>
    </Table>
  );
};
