import { FC } from 'react';
import { Table, TableBody, TableRow, TableCell, Stack, Box, useTheme, useMediaQuery } from '@mui/material';
import { isToday } from 'date-fns';

import { Precipitation } from '../Precipitation';
import { Temperature } from '../Temperature';
import { Time } from '../Time';

import type { DailyReportType } from '../../getDailyReportInfo';

export const DailyReport: FC<Readonly<{ value: Array<DailyReportType> }>> = ({ value }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Table aria-label="10 Days forecast" size="small">
      <TableBody>
        {value.map(({ time, description, iconUrl, temperature, precipitationProbability }, idx) => (
          <TableRow
            key={idx}
            sx={{ '&:last-child td, &:last-child th': { border: 0 }, '& td': { ...(isMobile ? { p: 0 } : null) } }}
          >
            <TableCell>{isToday(time) ? 'Today' : <Time value={time} format="eeee" />}</TableCell>
            <TableCell align="center" sx={{ width: '4rem' }}>
              <Precipitation showLabel level={precipitationProbability} size={12} />
            </TableCell>
            <TableCell align="center">
              <Box component="img" src={iconUrl} sx={{ minWidth: '32px', width: '32px' }} alt={description} />
            </TableCell>
            <TableCell align="center" sx={{ width: '4rem', fontSize: '1rem' }}>
              <Stack direction="row" gap={1} justifyContent="space-between">
                <strong>
                  <Temperature value={temperature.max} />
                </strong>
                <strong>
                  <Temperature value={temperature.min} />
                </strong>
              </Stack>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
