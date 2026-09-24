import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Reveal from '../Reveal';
import Scroll3D from '../Scroll3D';
import CustomCursor from '../CustomCursor';
import Footer from '../Footer';
import Header from '../Header';

export default function Layout({ headerVariant }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <Header variant={headerVariant} />
      <Outlet />
      <Reveal />
      <Scroll3D />
      <CustomCursor />
      <Footer />
    </>
  );
}
