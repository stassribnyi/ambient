import { LineChart } from '@mui/x-charts/LineChart';

export default function Combining({ values }: { values: Array<number> }) {
  return (
    <LineChart
      series={[
        {
          color: '#ce93d8',
          showMark: true,
          data: values,
        },
      ]}
      height={64}
      margin={{
        left: 8,
        top: 8,
        bottom: 8,
        right: 8,
      }}
      axisHighlight={{
        x: 'none',
        y: 'none',
      }}
      bottomAxis={null}
      leftAxis={null}
    />
  );
}
