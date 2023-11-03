import { FC } from 'react';
import { format } from 'date-fns';
import { LineSeriesType, LineChart, mangoFusionPaletteLight as chartPalette } from '@mui/x-charts';

import { WeatherInfo } from '../vite-env';

const formatPercentage = (scale: number) => `${scale}%`;

const DEFAULT_SERIES_OPTIONS: Partial<LineSeriesType> = {
  area: true,
  curve: 'natural',
  showMark: false,
  valueFormatter: (scale: number) => `${scale}%`,
};

export const Chart: FC<
  Readonly<{
    info: WeatherInfo;
  }>
> = ({
  info: {
    hourly: { time, cloud_cover, relative_humidity_2m, precipitation_probability },
  },
}) => {
  return (
    <LineChart
      colors={chartPalette}
      height={300}
      margin={{ top: 64, bottom: 20 }}
      yAxis={[
        {
          data: [0, 25, 50, 75, 100],
          valueFormatter: formatPercentage,
        },
      ]}
      xAxis={[
        {
          data: time.map((x) => new Date(x)),
          scaleType: 'time',
          valueFormatter: (date) => format(date, 'MMM dd'),
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
          label: 'Precipitation probability',
        },
      ]}
    />
  );
};
