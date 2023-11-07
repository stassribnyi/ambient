import { FC } from 'react';

export const Humidity: FC<Readonly<{ value: number }>> = ({ value }) => {
  return <>{Math.round(value)}%</>;
};
