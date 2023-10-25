import { FC } from 'react';
import {
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
} from '@mui/material';
import { format, subHours, compareAsc, addHours } from 'date-fns';

import { WeatherInfo } from '../vite-env';
import { getWMOInfoHourly } from '../getWMOInfo';

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
        value: weatherInfo.hourly.temperature_2m[idx],
        units: '°',
      },
    }));
}
export const HourlyReport: FC<Readonly<{ weatherInfo: WeatherInfo }>> = ({
  weatherInfo,
}) => {
  // TODO: is it required for desktop?
  // const ref = useRef<HTMLElement>() as React.MutableRefObject<HTMLElement>;
  // const { events } = useDraggable(ref);

  return (
    <TableContainer sx={{ padding: 2 }}>
      <Table size='small'>
        <TableBody>
          <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
            {getHourlyInfo(weatherInfo).map(
              ({ time, imageUrl, temperature }, idx) => (
                <TableCell key={idx} sx={{ p: 0 }}>
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                    }}
                  >
                    <p style={{ margin: 0 }}>{format(time, 'HH:mm')}</p>
                    <img
                      draggable={false}
                      src={imageUrl}
                      style={{ width: '56px', minWidth: '56px' }}
                    />
                    <strong style={{ margin: 0 }}>
                      {temperature.value}
                      {temperature.units}
                    </strong>
                  </div>
                </TableCell>
              )
            )}
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};
