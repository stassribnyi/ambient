import React from 'react';
import ReactDOM from 'react-dom/client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { createHashRouter, RouterProvider } from 'react-router-dom';

import App from './App.tsx';

import { Layout } from './components';
import { ErrorPage } from './components/ErrorPage.tsx';
import { Welcome } from './components/Menu/Welcome.tsx';
import { LocationList } from './components/Menu/LocationList';
import { LocationSearch } from './components/Menu/LocationSearch.tsx';

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

    // loader: https://reactrouter.com/en/main/route/loader,
    children: [
      {
        path: 'welcome',
        element: <Welcome />,
      },
      {
        path: 'settings',
        element: <LocationList />,
      },
      {
        path: 'search',
        element: <LocationSearch />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Layout>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </Layout>
  </React.StrictMode>,
);
