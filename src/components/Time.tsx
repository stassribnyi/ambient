import { FC } from 'react';
import { format } from 'date-fns';

export const Time: FC<Readonly<{ value: Date; format: string }>> = (props) => {
  return format(props.value, props.format);
};
