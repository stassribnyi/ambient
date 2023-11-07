import { FC } from 'react';
import { Table, TableBody, TableRow, TableCell, TableContainer, Box } from '@mui/material';

import { Precipitation } from '../Precipitation';
import { Temperature } from '../Temperature';
import { Time } from '../Time';

import type { HourlyReportType } from '../../getHourlyReportInfo';

export const HourlyReport: FC<Readonly<{ value: Array<HourlyReportType> }>> = ({ value }) => {
  return (
    <>
      <TableContainer sx={{ pb: '1rem' }}>
        <Box sx={{ minWidth: 'fit-content' }}>
          <Table size="small">
            <TableBody>
              <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                {value.map(({ time, iconUrl, precipitation, temperature }, idx) => (
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
                      <Box component="img" draggable={false} src={iconUrl} sx={{ width: '40px', minWidth: '40px' }} />
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
