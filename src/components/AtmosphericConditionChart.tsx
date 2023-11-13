import { FC } from 'react';
import { format } from 'date-fns';
import { LineSeriesType, LineChart } from '@mui/x-charts';

import { SeriesForecast } from '../mappers';

const percentageFormatter = (scale: number) => `${scale}%`;
const dateFormatter = (date: Date) => format(date, 'MMM dd');

const DEFAULT_SERIES_OPTIONS: Partial<LineSeriesType> = {
  area: true,
  curve: 'natural',
  showMark: false,
  valueFormatter: percentageFormatter,
};

const AtmosphericConditionChart: FC<Readonly<{ series: SeriesForecast }>> = ({
  series: { time, cloudCover, humidity, precipitation },
}) => {
  return (
    <LineChart
      sx={{ width: '100%' }}
      height={300}
      margin={{ top: 56, bottom: 32 }}
      yAxis={[
        {
          data: [0, 25, 50, 75, 100],
          valueFormatter: percentageFormatter,
        },
      ]}
      xAxis={[
        {
          data: time,
          scaleType: 'time',
          valueFormatter: dateFormatter,
        },
      ]}
      series={[
        {
          ...DEFAULT_SERIES_OPTIONS,
          data: cloudCover,
          color: '#9080B8',
          label: 'Cloud Cover',
        },
        {
          ...DEFAULT_SERIES_OPTIONS,
          area: false,
          color: '#E0CFDF',
          data: humidity,
          label: 'Relative Humidity',
        },
        {
          ...DEFAULT_SERIES_OPTIONS,
          data: precipitation,
          color: '#474772',
          label: 'Precipitation probability',
        },
      ]}
    />
  );
};

export default AtmosphericConditionChart;
