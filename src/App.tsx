import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Root from './routes/root';
import Home, { homeLoader } from './routes/home';
import GenericError from './components/GenericError';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
  },
  {
    path: 'home',
    element: <Home />,
    loader: homeLoader,
    errorElement: <GenericError />,
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
