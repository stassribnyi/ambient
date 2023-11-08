import { FC } from 'react';
import { format } from 'date-fns';
import { LineSeriesType, LineChart, mangoFusionPaletteLight as chartPalette } from '@mui/x-charts';

const formatPercentage = (scale: number) => `${scale}%`;
const formatDate = (date: Date) => format(date, 'MMM dd');

const DEFAULT_SERIES_OPTIONS: Partial<LineSeriesType> = {
  area: true,
  curve: 'natural',
  showMark: false,
  valueFormatter: (scale: number) => `${scale}%`,
};

export const Chart: FC<
  Readonly<{
    series: Readonly<{
      time: Array<Date>;
      cloud_cover: Array<number>;
      relative_humidity_2m: Array<number>;
      precipitation_probability: Array<number>;
    }>;
  }>
> = ({ series: { time, cloud_cover, relative_humidity_2m, precipitation_probability } }) => {
  return (
    <LineChart
      sx={{ width: '100%' }}
      colors={chartPalette}
      height={300}
      margin={{ top: 56, bottom: 32 }}
      yAxis={[
        {
          data: [0, 25, 50, 75, 100],
          valueFormatter: formatPercentage,
        },
      ]}
      xAxis={[
        {
          data: time,
          scaleType: 'time',
          valueFormatter: formatDate,
        },
      ]}
      series={[
        {
          ...DEFAULT_SERIES_OPTIONS,
          data: cloud_cover,
          label: 'Cloud Cover',
        },
        {
          ...DEFAULT_SERIES_OPTIONS,
          area: false,
          data: relative_humidity_2m,
          label: 'Relative Humidity',
        },
        {
          ...DEFAULT_SERIES_OPTIONS,
          data: precipitation_probability,
          color: '#ab47bc',
          label: 'Precipitation probability',
        },
      ]}
    />
  );
};
