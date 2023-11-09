import { FC } from 'react';
import { Table, TableBody, TableRow, TableCell, TableContainer, Box } from '@mui/material';

import { Precipitation } from '../Precipitation';
import { Temperature } from '../Temperature';
import { Time } from '../Time';

import type { HourlyForecast } from '../../mappers';
import { WMOIcon } from '../WMOIcon';

export const HourlyReport: FC<Readonly<{ value: Array<HourlyForecast> }>> = ({ value }) => {
  return (
    <>
      <TableContainer sx={{ pb: '1rem' }}>
        <Box sx={{ minWidth: 'fit-content' }}>
          <Table size="small">
            <TableBody>
              <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                {value.map(({ time, isDay, precipitation, temperature, weathercode }, idx) => (
                  <TableCell key={idx} sx={{ p: 0.5 }}>
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                      }}
                    >
                      <strong style={{ fontSize: '1rem', margin: 0 }}>
                        <Temperature value={temperature} />
                      </strong>
                      <WMOIcon variant={isDay ? 'day' : 'night'} code={weathercode} size={40} />
                      <Box sx={{ margin: 0, fontSize: '0.75rem', mb: 1 }}>
                        <Time value={time} format="HH:mm" />
                      </Box>
                      <Precipitation showLabel level={precipitation} size={12} />
                    </div>
                  </TableCell>
                ))}
              </TableRow>
            </TableBody>
          </Table>
        </Box>
      </TableContainer>
    </>
  );
};
