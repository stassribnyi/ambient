import { FC } from 'react';
import { Table, TableBody, TableRow, TableCell, TableContainer, Box } from '@mui/material';
import { format, subHours, compareAsc, addHours } from 'date-fns';

import { WeatherInfo } from '../vite-env';
import { getWMOInfoHourly } from '../getWMOInfo';
import { Precipitation } from './Precipitation';
import Combining from './Chart';
import { useElementSize } from 'usehooks-ts';

function getHourlyInfo(weatherInfo: WeatherInfo) {
  return weatherInfo.hourly.time
    .map((t, idx) => ({
      idx,
      time: new Date(t),
    }))
    .filter((slot) => {
      const from = subHours(Date.now(), 1);
      const to = addHours(from, 12);

      return compareAsc(from, slot.time) - compareAsc(slot.time, to) === 0;
    })
    .map(({ time, idx }) => ({
      time,
      imageUrl: getWMOInfoHourly(weatherInfo, idx)?.image,
      temperature: {
        value: Math.floor(weatherInfo.hourly.temperature_2m[idx]),
        units: '°',
      },
      precipitation: {
        value: weatherInfo.hourly.precipitation_probability[idx],
        unit: weatherInfo.hourly_units.precipitation_probability,
      },
    }));
}
export const HourlyReport: FC<Readonly<{ weatherInfo: WeatherInfo }>> = ({ weatherInfo }) => {
  const hourlyInfo = getHourlyInfo(weatherInfo);
  const [itemRef, { width }] = useElementSize();

  return (
    <>
      <TableContainer sx={{ pb: '1rem' }}>
        <Box sx={{ minWidth: 'fit-content' }}>
          <Table size="small">
            <TableBody>
              <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                {hourlyInfo.map(({ time, imageUrl, precipitation, temperature }, idx) => (
                  <TableCell key={idx} sx={{ p: 0 }}>
                    <div
                      ref={idx === 0 ? itemRef : null}
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                      }}
                    >
                      <strong style={{ fontSize: '1rem', margin: 0 }}>
                        {temperature.value}
                        {temperature.units}
                      </strong>
                      <Box
                        component="img"
                        draggable={false}
                        src={imageUrl}
                        sx={{ width: '48px', minWidth: '48px', mb: 1, mt: -1 }}
                      />
                      <Box sx={{ margin: 0, fontSize: '0.85rem', mb: 1 }}>{format(time, 'HH:mm')}</Box>
                      <Precipitation showLabel level={precipitation.value} size={13.6} />
                    </div>
                  </TableCell>
                ))}
              </TableRow>
            </TableBody>
          </Table>
          <Box sx={{ width: '100%', p: 2, pl: `${width / 2}px`, pr: `${width / 2}px` }}>
            <Combining values={hourlyInfo.map((i) => i.temperature.value)} />
          </Box>
        </Box>
      </TableContainer>
    </>
  );
};
