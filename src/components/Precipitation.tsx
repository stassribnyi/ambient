import { FC } from 'react';
import { Box, Typography } from '@mui/material';

import raindrop from '../assets/raindrop.svg';
import { Humidity } from './Humidity';

export const Precipitation: FC<
  Readonly<{
    level: number;
    size?: number;
    showLabel?: boolean;
  }>
> = ({ level, size = 18, showLabel = false }) => {
  const height = Math.ceil((size * level) / 100);

  return (
    <Typography
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        color: 'secondary.light',
        fontSize: size,
        gap: 0.25,
        m: 0,
      }}
    >
      <Box
        component="span"
        sx={{
          display: 'block',
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
          component="span"
          sx={{
            display: 'block',
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
      {showLabel ? (
        <Typography component="span" sx={{ all: 'inherit' }}>
          <Humidity value={level} />
        </Typography>
      ) : null}
    </Typography>
  );
};
