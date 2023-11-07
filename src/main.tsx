import React, { FC, PropsWithChildren } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';

import { CssBaseline, GlobalStyles, ThemeProvider, createTheme, useMediaQuery } from '@mui/material';

import type { GlobalStylesProps } from '@mui/material';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

const globalStyles: GlobalStylesProps['styles'] = {
  body: {
    margin: 0,
    padding: 0,
    height: '100dvh',
    backgroundImage:
      'url(https://img.freepik.com/free-vector/gradient-fluid-abstract-background_23-2148908978.jpg?w=2000&t=st=1699311107~exp=1699311707~hmac=590ea4ee61b389aded0846ba114db2441415341db770739b310223499010a871)',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
  },

  '#root': {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    overflow: 'auto',
    backgroundColor: 'rgba(17, 25, 31, 0.8)',
    backdropFilter: 'blur(100px)',
  },
};

// TODO: extract into separate file
const Layout: FC<PropsWithChildren> = ({ children }) => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)') || true; // TODO: make dynamic

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          background: {
            default: '#11191f',
            paper: '#11191f',
          },
          mode: prefersDarkMode ? 'dark' : 'light',
        },
        shape: {
          borderRadius: 16,
        },
      }),
    [prefersDarkMode],
  );

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles styles={globalStyles} />
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Layout>
      <App />
    </Layout>
  </React.StrictMode>,
);
