import { FC } from 'react';
import { format } from 'date-fns';

export const Time: FC<Readonly<{ value: Date }>> = ({ value }) => {
  return format(value, 'HH:mm');
};
