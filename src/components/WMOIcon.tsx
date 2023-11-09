import { FC } from 'react';
import { getWMODetails, WMO } from '../utils';
import { Box } from '@mui/material';

type WMOIconProps = Readonly<{
  code?: keyof typeof WMO;
  variant?: 'day' | 'night';
  size?: number;
}>;

export const WMOIcon: FC<WMOIconProps> = ({ code, variant = 'day', size = 48 }) => {
  const details = getWMODetails(code);
  const { description, iconUrl } = variant === 'day' ? details.day : details.night;

  return <Box component="img" alt={description} src={iconUrl} sx={{ width: `${size}px` }} />;
};
