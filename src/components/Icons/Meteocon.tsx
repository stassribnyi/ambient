import { FC } from 'react';
import { Box, SxProps, Theme } from '@mui/material';

export type MeteoconProps = Readonly<{
  animated?: boolean;
  alt: string;
  name: Ambient.MeteoconSvg;
  size?: number;
  variant?: 'animated' | 'static';
  sx?: SxProps<Theme>;
}>;

function getMeteoconUrl(name: MeteoconProps['name'], variant: MeteoconProps['variant']) {
  const url =
    variant === 'animated'
      ? new URL(`../../assets/svg/${name}.svg`, import.meta.url)
      : new URL(`../../assets/svg-static/${name}.svg`, import.meta.url);

  return url.href;
}

export const Meteocon: FC<MeteoconProps> = ({ alt, name, animated = false, size = 48, sx }) => (
  <Box
    draggable={false}
    component="img"
    src={getMeteoconUrl(name, animated ? 'animated' : 'static')}
    alt={alt}
    sx={{ width: `${size}px`, height: `${size}px`, ...sx }}
  />
);
