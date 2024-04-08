import { FC, PropsWithChildren } from 'react';
import { Link } from 'react-router-dom';

import { AppBar, Toolbar, Stack, IconButton } from '@mui/material';
import { ChevronLeft } from '@mui/icons-material';

import { DialogLayout } from './DialogLayout';

export const BaseMenuPage: FC<
  PropsWithChildren<
    Readonly<
      Partial<{
        backTo: string | null;
        header: React.ReactElement;
      }>
    >
  >
> = ({ backTo, children, header }) => (
  <>
    <AppBar sx={{ position: 'relative' }}>
      <Toolbar>
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ width: '100%' }}>
          {backTo ? (
            <IconButton
              aria-label="close"
              component={Link}
              color="inherit"
              edge="start"
              to={backTo}
              sx={{ fontSize: '2rem' }}
            >
              <ChevronLeft fontSize="inherit" />
            </IconButton>
          ) : null}
          {header}
        </Stack>
      </Toolbar>
    </AppBar>
    <DialogLayout>{children}</DialogLayout>
  </>
);
