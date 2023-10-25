import { FC } from 'react';
import { Table, TableBody, TableRow, TableCell, Stack } from '@mui/material';
import { isToday, format } from 'date-fns';

import { WeatherInfo } from '../vite-env';
import { getWMOInfoDaily } from '../getWMOInfo';

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
        min: Math.floor(weatherInfo.daily.temperature_2m_min[idx]),
        max: Math.floor(weatherInfo.daily.temperature_2m_max[idx]),
        units: '°',
      },
    }));
}

export const DailyReport: FC<Readonly<{ weatherInfo: WeatherInfo }>> = ({
  weatherInfo,
}) => (
  <Table aria-label='7 Days forecast' size='small'>
    <TableBody>
      {getDailyInfo(weatherInfo).map(
        ({ time, description, imageUrl, temperature }, idx) => (
          <TableRow
            key={idx}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
          >
            <TableCell sx={{ p: 0 }}>
              {isToday(time) ? 'Today' : format(time, 'eeee')}
            </TableCell>
            <TableCell align='center' sx={{ p: 0 }}>
              <figure
                style={{
                  margin: 0,
                  fontSize: 'inherit',
                  display: 'flex',
                  gap: '0.5rem',
                  alignItems: 'center',
                }}
              >
                <img
                  src={imageUrl}
                  style={{ minWidth: '36px', width: '36px' }}
                  alt={description}
                />
                <figcaption
                  style={{
                    color: 'inherit',
                  }}
                >
                  {description}
                </figcaption>
              </figure>
            </TableCell>
            <TableCell align='center' sx={{ p: 0, width: '4rem' }}>
              <Stack direction="row" gap={1} justifyContent='space-between'>
                <span>
                  {temperature.max}
                  {temperature.units}
                </span>
                <span>
                  {temperature.min}
                  {temperature.units}
                </span>
              </Stack>
            </TableCell>
          </TableRow>
        )
      )}
    </TableBody>
  </Table>
);
