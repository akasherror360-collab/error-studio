import React, { useEffect, useRef } from 'react';
import './camera-assemble.css';

// EXPERIMENT (exp/3d): a camera pinned to the screen from the top of the home page.
// Its parts assemble section by section as the visitor scrolls; just before the
// portfolio it moves to centre stage, the shutter fires with a flash, and the
// Selected Works grid is revealed out of the flash. Scrolling up takes it apart again.
// three.js loads only after the page itself has finished loading.
export default function CameraAssemble({ targetId = 'selected-works' }) {
  const wrapRef = useRef(null);
  const canvasRef = useRef(null);
  const flashRef = useRef(null);
  const dimRef = useRef(null);

  useEffect(() => {
    const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return undefined; // reduce-motion: no overlay, portfolio shows normally
    const root = document.documentElement;
    const target = () => document.getElementById(targetId);
    let scene = null;
    let disposed = false;
    let revealed = false;

    root.classList.add('es-cam-on');

    const setRevealed = (on) => {
      revealed = on;
      const el = target();
      if (el) el.classList.toggle('es-cam-revealed', on);
    };

    const progress = () => {
      const el = target();
      if (!el) return 0;
      const end = el.getBoundingClientRect().top + window.scrollY - window.innerHeight * 0.55;
      if (end <= 0) return 1;
      return window.scrollY / end;
    };

    const onScroll = () => {
      const p = progress();
      if (scene) scene.setProgress(p);
      // Fade the whole overlay out once the portfolio is on screen.
      const out = Math.min(1, Math.max(0, (p - 1.0) / 0.12));
      if (wrapRef.current) wrapRef.current.style.opacity = String(1 - out);
      if (wrapRef.current) wrapRef.current.style.visibility = out >= 1 ? 'hidden' : 'visible';
      if (p > 1.15 && !revealed) setRevealed(true); // safety: never leave the grid hidden
    };

    const start = () => {
      if (disposed) return;
      import('./cameraScene').then(({ createCameraScene }) => {
        if (disposed) return;
        scene = createCameraScene(canvasRef.current, {
          mobile: window.innerWidth < 768,
          staticMode: false,
          onPhase: (p, centre) => {
            if (dimRef.current) dimRef.current.style.opacity = String(centre * 0.92);
          },
          onFlash: (fired) => {
            if (!fired) { setRevealed(false); return; }
            const el = flashRef.current;
            if (el) { el.classList.remove('es-cam_flash--on'); void el.offsetWidth; el.classList.add('es-cam_flash--on'); }
            setRevealed(true);
          },
        });
        if (wrapRef.current) wrapRef.current.classList.add('is-ready');
        onScroll();
      }).catch(() => setRevealed(true));
    };

    const kickoff = () => {
      if ('requestIdleCallback' in window) window.requestIdleCallback(start, { timeout: 1500 });
      else setTimeout(start, 300);
    };
    if (document.readyState === 'complete') kickoff();
    else window.addEventListener('load', kickoff, { once: true });

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      disposed = true;
      root.classList.remove('es-cam-on');
      setRevealed(false);
      window.removeEventListener('load', kickoff);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (scene) scene.dispose();
    };
  }, [targetId]);

  return (
    <div className="es-cam" ref={wrapRef} aria-hidden="true">
      <div className="es-cam_dim" ref={dimRef} />
      <canvas ref={canvasRef} className="es-cam_canvas" />
      <div className="es-cam_flash" ref={flashRef} />
    </div>
  );
}
