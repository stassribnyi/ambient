import { FC } from 'react';
import { useUnitsConverter } from '../hooks';

export const Temperature: FC<Readonly<{ value: number }>> = ({ value }) => {
  const { convert } = useUnitsConverter();

  return <>{Math.floor(convert('temperature', value))}&deg;</>;
};
