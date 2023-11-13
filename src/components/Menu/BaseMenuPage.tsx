import { FC, PropsWithChildren } from 'react';
import { AppBar, Toolbar, Stack, DialogContent, Slide, IconButton, Box } from '@mui/material';
import { ChevronLeft } from '@mui/icons-material';

export const BaseMenuPage: FC<
  PropsWithChildren<
    Readonly<
      Partial<{
        header: React.ReactElement;
        actions: React.ReactElement;
        showActions: boolean;
        showBackButton: boolean;
        handleBackButton: () => void;
      }>
    >
  >
> = ({ actions, children, header, showActions, showBackButton, handleBackButton }) => {
  return (
    <>
      {header ? (
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ width: '100%' }}>
              {showBackButton ? (
                <IconButton
                  sx={{ fontSize: '2rem' }}
                  edge="start"
                  color="inherit"
                  onClick={handleBackButton}
                  aria-label="close"
                >
                  <ChevronLeft fontSize="inherit" />
                </IconButton>
              ) : null}
              {header}
            </Stack>
          </Toolbar>
        </AppBar>
      ) : null}
      <DialogContent
        sx={{
          p: 1,
          display: 'flex',
          flexDirection: 'column',
          borderRadius: '16px',
        }}
      >
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {children}
        </Box>
      </DialogContent>
      <Slide mountOnEnter unmountOnExit in={showActions} direction="up">
        <Box>{actions}</Box>
      </Slide>
    </>
  );
};
