import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Reveal from '../Reveal';
import CameraAssemble from '../CameraAssemble';
import CustomCursor from '../CustomCursor';
import Footer from '../Footer';
import Header from '../Header';

export default function Layout({ headerVariant }) {
  const isHome = useLocation().pathname === '/';
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <Header variant={headerVariant} />
      <Outlet />
      {isHome && <CameraAssemble />}
      <Reveal />
      <CustomCursor />
      <Footer />
    </>
  );
}
