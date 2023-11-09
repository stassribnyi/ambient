import { FC } from 'react';
import { Box } from '@mui/material';

import { getWMODetails } from '../utils';
import { WMOCode } from '../vite-env';

type WMOIconProps = Readonly<{
  code?: WMOCode;
  variant?: 'day' | 'night';
  size?: number;
}>;

export const WMOIcon: FC<WMOIconProps> = ({ code, variant = 'day', size = 48 }) => {
  const details = getWMODetails(code);
  const { description, iconUrl } = variant === 'day' ? details.day : details.night;

  return <Box component="img" alt={description} src={iconUrl} sx={{ width: `${size}px` }} />;
};
