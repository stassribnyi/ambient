import { FC, PropsWithChildren } from 'react';
import { useMediaQuery } from 'usehooks-ts';
import { AppBar, Toolbar, Stack, DialogContent, Slide, useTheme, IconButton, Box } from '@mui/material';
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
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

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
          height: '100%',
          minHeight: isMobile ? null : '500px',
          maxHeight: isMobile ? '100%' : '500px',
          minWidth: '360px',
          borderRadius: '16px',
        }}
      >
        {children}
      </DialogContent>
      <Slide mountOnEnter unmountOnExit in={showActions} direction="up">
        <Box>{actions}</Box>
      </Slide>
    </>
  );
};
