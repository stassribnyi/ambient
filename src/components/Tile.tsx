import { FC, PropsWithChildren } from 'react';
import { Card, CardContent } from '@mui/material';

export const Tile: FC<PropsWithChildren> = ({ children }) => (
  <Card sx={{ backgroundColor: 'rgba(17, 25, 31, 0.5)' }}>
    <CardContent sx={{ '&, &:last-child': { p: '12px 16px' } }}>{children}</CardContent>
  </Card>
);
