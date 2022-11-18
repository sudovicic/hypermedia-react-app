import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './routes/Home';
import GenericError from './components/ui/GenericError';
import { RecoilRoot } from 'recoil';
import Scaffold from './routes/Scaffold';
import Watchlist from './routes/Watchlist';
import Details from './routes/Details';
import Root from './routes/Root';
import Shelf from './routes/Shelf';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Scaffold />,
    children: [
      {
        path: '/',
        element: <Root />,
        errorElement: <GenericError />,
      },
      {
        path: 'home',
        element: <Home />,
        errorElement: <GenericError />,
      },
      {
        path: 'list',
        element: <Watchlist />,
        errorElement: <GenericError />,
      },
      {
        path: 'shelf',
        element: <Shelf />,
        errorElement: <GenericError />,
      },
      {
        path: 'details/:resourceId',
        element: <Details />,
      },
    ],
    errorElement: <GenericError />,
  },
]);

export default function App() {
  return (
    <RecoilRoot>
      <RouterProvider router={router} />
    </RecoilRoot>
  );
}
