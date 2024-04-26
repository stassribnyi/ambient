import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { createHashRouter, Navigate, RouterProvider } from 'react-router-dom';

import App from './App.tsx';

import { SplashFallback, Layout } from './components';
import { ErrorPage } from './components/ErrorPage.tsx';

import { AboutPage, LanguagesPage, WelcomePage, PlacesPage, SettingsPage, SearchPage } from './components/Menu/Pages';

import { MenuPageRoutes } from './components/Menu/routes.ts';

import './i18n';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 15 * 60 * 1000, // 15 minutes
    },
  },
});

const router = createHashRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: MenuPageRoutes.WELCOME,
        element: <WelcomePage />,
      },
      {
        path: MenuPageRoutes.SETTINGS,
        element: <SettingsPage />,
      },
      {
        path: MenuPageRoutes.LANGUAGES,
        element: <LanguagesPage />,
      },
      {
        path: MenuPageRoutes.PLACES,
        element: <PlacesPage />,
      },
      {
        path: MenuPageRoutes.SEARCH,
        element: <SearchPage />,
      },
      {
        path: MenuPageRoutes.ABOUT,
        element: <AboutPage />,
      },
    ],
  },
  {
    path: '*',
    element: <Navigate to="/" />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Layout>
      <Suspense fallback={<SplashFallback />}>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </Suspense>
    </Layout>
  </React.StrictMode>,
);
