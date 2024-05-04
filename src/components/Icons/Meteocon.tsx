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

const TRIM_FACTOR = 10;

export const Meteocon: FC<MeteoconProps> = ({ alt, name, animated = false, size = 48, sx }) => {
  // each icon has a lot of empty space around it, making it challenging to place within other UI components.
  // therefore, each icon should calculate the margin to trim from each side based on its size.
  const compensateSpacing = size / TRIM_FACTOR;

  // the idea is to generate some arbitrary spacing based on the icon size and trim factor.
  // since this space is for a single side only, we need to account for both sides.
  const compensatedSize = compensateSpacing * 2;

  return (
    <Box
      sx={{
        width: `${size}px`,
        height: `${size}px`,
        display: 'inline-block',
        ...sx,
      }}
    >
      <Box
        draggable={false}
        component="img"
        src={getMeteoconUrl(name, animated ? 'animated' : 'static')}
        alt={alt}
        sx={{
          width: `${size + compensatedSize}px`,
          height: `${size + compensatedSize}px`,
          m: `${-compensateSpacing}px`,
        }}
      />
    </Box>
  );
};
