import { FC } from 'react';
import { Table, TableBody, TableRow, TableCell, TableContainer, Box } from '@mui/material';
import { format, compareAsc, addHours, subHours } from 'date-fns';

import { WeatherInfo } from '../../vite-env';
import { getWMOInfoHourly } from '../../getWMOInfo';
import { Precipitation } from '../Precipitation';
// import Combining from './Chart';
// import { useElementSize } from 'usehooks-ts';
import { changeTimeZone } from '../../changeTimezone';
import { useUnitsConverter } from '../../hooks';

export const HourlyReport: FC<Readonly<{ weatherInfo: WeatherInfo }>> = ({ weatherInfo }) => {
  const { convert } = useUnitsConverter();

  // const [itemRef, { width }] = useElementSize();

  function getHourlyInfo(weatherInfo: WeatherInfo) {
    return weatherInfo.hourly.time
      .map((t, idx) => ({
        idx,
        time: changeTimeZone(t, weatherInfo.timezone),
      }))
      .filter((slot) => {
        // TODO: revisit and fix consistency
        const current = changeTimeZone(new Date(), weatherInfo.timezone);

        // -1 hour, so if time is less than hour in the past, we still show forecast
        const from = subHours(current.setMinutes(0, 0, 0), 1);
        // 24(+1) hour, so if time is less than hour in the future, we still show forecast
        const to = addHours(current, 25);

        return compareAsc(from, slot.time) - compareAsc(slot.time, to) === 0;
      })
      .map(({ time, idx }) => ({
        time,
        imageUrl: getWMOInfoHourly(weatherInfo, idx)?.image,
        temperature: Math.floor(convert('temperature', weatherInfo.hourly.temperature_2m[idx])),
        precipitation: weatherInfo.hourly.precipitation_probability[idx],
      }));
  }

  return (
    <>
      <TableContainer sx={{ pb: '1rem' }}>
        <Box sx={{ minWidth: 'fit-content' }}>
          <Table size="small">
            <TableBody>
              <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                {getHourlyInfo(weatherInfo).map(({ time, imageUrl, precipitation, temperature }, idx) => (
                  <TableCell key={idx} sx={{ p: 0.5 }}>
                    <div
                      // ref={idx === 0 ? itemRef : null}
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                      }}
                    >
                      <strong style={{ fontSize: '1rem', margin: 0 }}>{temperature}°</strong>
                      <Box component="img" draggable={false} src={imageUrl} sx={{ width: '40px', minWidth: '40px' }} />
                      <Box sx={{ margin: 0, fontSize: '0.75rem', mb: 1 }}>{format(time, 'HH:mm')}</Box>
                      <Precipitation showLabel level={precipitation} size={12} />
                    </div>
                  </TableCell>
                ))}
              </TableRow>
            </TableBody>
          </Table>
          {/* <Box sx={{ width: '100%', p: 2, pl: `${width / 2}px`, pr: `${width / 2}px` }}>
            <Combining values={hourlyInfo.map((i) => i.temperature.value)} />
          </Box> */}
        </Box>
      </TableContainer>
    </>
  );
};
