import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './routes/Home';
import GenericError from './components/GenericError';
import { RecoilRoot } from 'recoil';
import Layout from './routes/Layout';
import List from './routes/List';
import Details from './routes/Details';
import Root from './routes/Root';
import Shelf from './routes/Shelf';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
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
        element: <List />,
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
  },
]);

export default function App() {
  return (
    <RecoilRoot>
      <RouterProvider router={router} />
    </RecoilRoot>
  );
}
