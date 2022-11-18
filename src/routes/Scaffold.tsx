import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from '../components/ui/NavBar/NavBar';

export default function Scaffold() {
  return (
    <>
      <header>
        <NavBar />
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
}
