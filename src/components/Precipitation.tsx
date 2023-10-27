import { FC } from 'react';
import { Box, Stack, Typography } from '@mui/material';

import raindrop from '../assets/raindrop.svg';

export const Precipitation: FC<
  Readonly<{
    level: number;
    size?: number;
    showLabel?: boolean;
  }>
> = ({ level, size = 18, showLabel = false }) => {
  const height = Math.ceil((size * level) / 100);

  return (
    <Stack direction="row" alignItems="center" gap={0.25}>
      <Box
        sx={{
          width: `${size}px`,
          height: `${size}px`,

          position: 'relative',
        }}
      >
        <Box
          component="img"
          src={raindrop}
          sx={{
            minWidth: `${size}px`,
            width: `${size}px`,
            display: 'block',
            filter: 'brightness(0.5)',

            aspectRatio: '1/1',
          }}
          alt="Precipitation Probability"
        />
        <Box
          sx={{
            position: 'absolute',
            bottom: 0,
            height: `${height}px`,
            overflow: 'hidden',
          }}
        >
          <Box
            component="img"
            src={raindrop}
            sx={{
              minWidth: `${size}px`,
              width: `${size}px`,
              display: 'block',
              aspectRatio: '1/1',
              mt: `${height - size}px`,
            }}
            alt="Precipitation Probability"
          />
        </Box>
      </Box>
      {showLabel ? <Typography sx={{ fontSize: size }}>{level}%</Typography> : null}
    </Stack>
  );
};
