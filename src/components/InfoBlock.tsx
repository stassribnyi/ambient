import { FC, PropsWithChildren } from 'react';
import { Card, CardContent, Typography } from '@mui/material';

export const InfoBlock: FC<PropsWithChildren<Readonly<{ title?: React.ReactNode }>>> = ({ title, children }) => (
  <Card sx={{ backgroundColor: 'rgba(17, 25, 31, 0.5)' }}>
    <CardContent sx={{ '&, &:last-child': { p: '12px 16px' } }}>
      {title ? (
        <Typography gutterBottom variant="h6">
          {title}
        </Typography>
      ) : null}
      {children}
    </CardContent>
  </Card>
);
