import { FC } from 'react';
import { useUnitsConverter } from '../hooks';

export const Windspeed: FC<Readonly<{ value: number }>> = ({ value }) => {
  const { convert, units } = useUnitsConverter();

  return (
    <>
      {Math.round(convert('windspeed', value))} {units.windspeed}
    </>
  );
};
