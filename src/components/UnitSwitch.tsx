import { FC } from 'react';
import { css, styled, Switch as MuiSwitch, SxProps, Theme } from '@mui/material';

import { useUserSettings } from '@hooks/useUserSettings';

import celsius from '@assets/svg/celsius.svg';
import fahrenheit from '@assets/svg/fahrenheit.svg';

const commonMaskImageStyles = css`
  content: '';

  top: 50%;
  width: 24px;
  height: 24px;
  position: absolute;
  transform: translateY(-50%);

  mask-size: 32px;
  mask-position: center;
`;

const Switch = styled(MuiSwitch)`
  padding: 0;
  width: 52px;
  height: 28px;

  & .MuiSwitch-switchBase {
    padding: 0;

    &,
    &.Mui-checked,
    &.Mui-disabled {
      & + .MuiSwitch-track {
        opacity: 1;
        border-radius: 14px;
        background-color: ${({ theme }) => theme.palette.common.white};
      }
    }

    & + .MuiSwitch-track {
      &:before,
      &:after {
        ${commonMaskImageStyles}
        background-color: ${({ theme }) => theme.palette.secondary.dark};
      }

      &:before {
        left: 2px;
        mask-image: url(${fahrenheit});
      }
      &:after {
        right: 2px;
        mask-image: url(${celsius});
      }
    }

    & .MuiSwitch-thumb {
      box-shadow: none;
      background-color: ${({ theme }) => theme.palette.secondary.dark};

      margin: 2px;
      width: 24px;
      height: 24px;
      overflow: hidden;
      position: relative;

      &:before {
        ${commonMaskImageStyles}
        background-color: ${({ theme }) => theme.palette.secondary.light};
        mask-image: url(${fahrenheit});
      }
    }

    &.Mui-checked {
      transform: translateX(24px);

      & .MuiSwitch-thumb {
        &:before {
          mask-image: url(${celsius});
        }
      }
    }
  }
`;

export const UnitSwitch: FC<
  Readonly<{
    sx?: SxProps<Theme>;
  }>
> = ({ sx }) => {
  const [settings, setSettings] = useUserSettings();

  const handleMeasurementSystemChange = () =>
    setSettings((prev) => ({
      ...prev,
      units: prev.units === 'metric' ? 'imperial' : 'metric',
    }));

  return <Switch sx={sx} checked={settings.units === 'metric'} onClick={handleMeasurementSystemChange} />;
};
