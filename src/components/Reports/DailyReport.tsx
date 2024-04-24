import { FC } from 'react';
import { isToday } from 'date-fns';
import { useTranslation } from 'react-i18next';

import { Table, TableBody, TableRow, TableCell, Stack, useTheme, useMediaQuery, Typography } from '@mui/material';
import { ArrowRightRounded } from '@mui/icons-material';

import { Precipitation } from '../Precipitation';
import { Temperature } from '../Temperature';
import { WMOIcon } from '../Icons';

import type { DailyForecast } from '../../mappers';

const Weekday: FC<{ date: Date; selected?: boolean }> = ({ date, selected }) => {
  const { t } = useTranslation();

  return (
    <Typography sx={{ position: 'relative', fontWeight: selected ? 700 : null }}>
      {selected ? <ArrowRightRounded sx={{ position: 'absolute', left: '-1.25rem' }} /> : null}
      {t('report.daily.weekday', { date })}
    </Typography>
  );
};

export const DailyReport: FC<Readonly<{ value: Array<DailyForecast> }>> = ({ value }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Table aria-label="10 Days forecast" size="small">
      <TableBody>
        {value.map(({ time, weathercode, temperature, precipitationProbability }, idx) => (
          <TableRow
            key={idx}
            sx={{ '&:last-child td, &:last-child th': { border: 0 }, '& td': { ...(isMobile ? { p: 0 } : null) } }}
          >
            <TableCell>
              <Weekday selected={isToday(time)} date={time} />
            </TableCell>
            <TableCell sx={{ width: '4rem' }}>
              <Precipitation showLabel level={precipitationProbability} size={12} />
            </TableCell>
            <TableCell align="center">
              <WMOIcon code={weathercode} size={32} />
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
