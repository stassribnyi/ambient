import celsius from '@bybas/weather-icons/production/fill/all/celsius.svg';
import fahrenheit from '@bybas/weather-icons/production/fill/all/fahrenheit.svg';

import { Switch, styled } from '@mui/material';

// TODO: This is awful, reimplement from scratch
export const UnitSwitch = styled(Switch)(({ theme }) => ({
  padding: 0,
  width: 48,
  height: 28,
  '& .MuiSwitch-switchBase': {
    padding: 0,
    '&.Mui-checked': {
      '&.Mui-checked + .MuiSwitch-track, &.Mui-disabled + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: theme.palette.common.white,
      },
      '& .MuiSwitch-thumb': {
        '&:before': {
          maskImage: `url(${celsius})`,
        },
      },
    },
    '& .MuiSwitch-thumb': {
      backgroundColor: theme.palette.secondary.dark,
      boxShadow: 'none',
      margin: 2,
      overflow: 'hidden',
      width: 24,
      height: 24,
      '&:before': {
        content: "''",
        position: 'absolute',
        width: '100%',
        height: '100%',
        left: 0,
        top: 0,
        backgroundColor: theme.palette.secondary.light,
        maskImage: `url(${fahrenheit})`,
        maskSize: 32,
        maskPosition: 'center',
      },
    },
  },
  '& .MuiSwitch-track': {
    opacity: 1,
    borderRadius: 28 / 2,
    '&:before, &:after': {
      content: '""',
      position: 'absolute',
      top: '50%',
      transform: 'translateY(-50%)',
      width: 16,
      height: 16,
    },
    '&:before': {
      backgroundColor: theme.palette.secondary.dark,
      maskImage: `url(${fahrenheit})`,
      maskSize: '32px',
      maskPosition: 'center',
      left: 4,
    },
    '&:after': {
      backgroundColor: theme.palette.secondary.dark,
      maskImage: `url(${celsius})`,
      maskSize: '32px',
      maskPosition: 'center',
      right: 4,
    },
  },
}));
