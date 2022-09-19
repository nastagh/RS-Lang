import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from './footer/footer';
import Header from './header/header';

export default function Layout() {
  return (
    <div className="appWrapper">
      <Header />
      <main className="main">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
