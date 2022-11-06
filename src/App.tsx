import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Root from './routes/root';
import Home from './routes/home';
import GenericError from './components/GenericError';
import { RecoilRoot } from 'recoil';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
  },
  {
    path: 'home',
    element: <Home />,
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
