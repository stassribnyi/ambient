import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { LineSeriesType, LineChart } from '@mui/x-charts';

import { SeriesForecast } from '../mappers';

const AtmosphericConditionChart: FC<Readonly<{ series: SeriesForecast }>> = ({
  series: { time, cloudCover, humidity, precipitation },
}) => {
  const { t, i18n } = useTranslation();

  const percentageFormatter = (scale: number) => t('common.percent', { value: scale / 100 });
  const dateFormatter = (date: Date) => t('atmospheric_conditions.date', { date });

  const DEFAULT_SERIES_OPTIONS: Partial<LineSeriesType> = {
    area: true,
    curve: 'natural',
    showMark: false,
    valueFormatter: percentageFormatter,
  };

  return (
    <>
      <button onClick={() => i18n.changeLanguage(i18n.language === 'en' ? 'uk' : 'en')}>Change lang</button>
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
            label: t('atmospheric_conditions.cloud_cover'),
          },
          {
            ...DEFAULT_SERIES_OPTIONS,
            area: false,
            color: '#E0CFDF',
            data: humidity,
            label: t('atmospheric_conditions.relative_humidity'),
          },
          {
            ...DEFAULT_SERIES_OPTIONS,
            data: precipitation,
            color: '#474772',
            label: t('atmospheric_conditions.precipitation_probability'),
          },
        ]}
      />
    </>
  );
};

export default AtmosphericConditionChart;
