import React, { useEffect, useRef, useState } from 'react';
import './camera-assemble.css';

// EXPERIMENT (exp/3d): a 3D camera whose parts float apart, assemble as the visitor
// scrolls toward the end of the page, then fire the shutter (flash).
// three.js is loaded lazily, only when this section is close to the screen.
export default function CameraAssemble() {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);
  const flashRef = useRef(null);
  const stageRef = useRef(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    let scene = null;
    let disposed = false;
    const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const progress = () => {
      const r = section.getBoundingClientRect();
      const total = r.height - window.innerHeight;
      if (total <= 0) return 1;
      return Math.min(1, Math.max(0, -r.top / total));
    };
    // Keep the stage pinned to the viewport while the section scrolls past
    // (done in JS because a parent's overflow setting breaks CSS sticky).
    const pin = () => {
      const r = section.getBoundingClientRect();
      const total = Math.max(0, r.height - window.innerHeight);
      const y = Math.min(total, Math.max(0, -r.top));
      if (stageRef.current) stageRef.current.style.transform = `translate3d(0, ${y}px, 0)`;
    };
    const onScroll = () => { pin(); if (scene) scene.setProgress(reduce ? 1 : progress()); };

    const start = () => {
      import('./cameraScene').then(({ createCameraScene }) => {
        if (disposed) return;
        scene = createCameraScene(canvasRef.current, {
          onFlash: () => {
            const el = flashRef.current;
            if (!el) return;
            el.classList.remove('es-cam_flash--on');
            void el.offsetWidth;
            el.classList.add('es-cam_flash--on');
          },
          staticMode: reduce,
        });
        setReady(true);
        onScroll();
      });
    };

    const io = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !scene) { io.disconnect(); start(); }
    }, { rootMargin: '600px 0px' });
    io.observe(section);
    pin();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      disposed = true;
      io.disconnect();
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (scene) scene.dispose();
    };
  }, []);

  return (
    <section className="es-cam" ref={sectionRef} aria-label="Error Studio camera">
      <div className="es-cam_sticky" ref={stageRef}>
        <canvas ref={canvasRef} className={`es-cam_canvas${ready ? ' is-ready' : ''}`} />
        <div className="es-cam_flash" ref={flashRef} />
      </div>
    </section>
  );
}
