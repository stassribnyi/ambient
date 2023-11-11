import { FC, PropsWithChildren } from 'react';
import { Typography } from '@mui/material';

import { Tile } from './Tile';

export const Block: FC<PropsWithChildren<Readonly<{ title?: React.ReactNode }>>> = ({ title, children }) => (
  <Tile>
    {title ? (
      <Typography gutterBottom variant="h6">
        {title}
      </Typography>
    ) : null}
    {children}
  </Tile>
);
