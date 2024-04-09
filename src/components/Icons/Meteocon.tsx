import { FC } from 'react';
import { Box } from '@mui/material';

import type { MeteoconSvg } from '@typings/assets';

export type MeteoconProps = Readonly<{
  animated?: boolean;
  alt: string;
  name: MeteoconSvg;
  size?: number;
  variant?: 'animated' | 'static';
}>;

function getMeteoconUrl(name: MeteoconProps['name'], variant: MeteoconProps['variant']) {
  const url =
    variant === 'animated'
      ? new URL(`../../assets/svg/${name}.svg`, import.meta.url)
      : new URL(`../../assets/svg-static/${name}.svg`, import.meta.url);

  return url.href;
}

export const Meteocon: FC<MeteoconProps> = ({ alt, name, animated = false, size = 48 }) => (
  <Box
    draggable={false}
    component="img"
    src={getMeteoconUrl(name, animated ? 'animated' : 'static')}
    alt={alt}
    sx={{ width: `${size}px`, height: `${size}px` }}
  />
);
