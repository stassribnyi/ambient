import { FC, PropsWithChildren } from 'react';
import { CssBaseline, GlobalStyles, ThemeProvider, createTheme } from '@mui/material';

import type { GlobalStylesProps } from '@mui/material';

// TODO: consider using blurred background, will it be more performant than blurring on device?
import backgroundImg from '../assets/background-gradient.jpg';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

const globalStyles: GlobalStylesProps['styles'] = {
  body: {
    margin: 0,
    padding: 0,
    height: '100dvh',
    backgroundImage: `url(${backgroundImg})`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
  },

  '#root': {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    overflow: 'auto',
    backgroundColor: 'rgba(17, 25, 31, 0.85)',
    // backdropFilter: 'blur(100px)',
  },
};

const theme = createTheme({
  palette: {
    background: {
      default: '#11191f',
      paper: '#11191f',
    },
    mode: 'dark',
  },
  shape: {
    borderRadius: 16,
  },
});

export const Layout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles styles={globalStyles} />
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};
