import React, { useEffect, useRef } from 'react';
import './camera-assemble.css';

// EXPERIMENT (exp/3d): a photoreal camera pinned to the screen from the top of the
// home page. It starts as an exploded view and comes together stage by stage as the
// visitor scrolls past each section. Just before the portfolio it moves to centre
// stage, the shutter fires with a flash, and the Selected Works grid is revealed out
// of the flash. Scrolling back up takes it apart again.
const STAGES = ['exploded', 'mid', 'hero'];
const clamp01 = (t) => Math.min(1, Math.max(0, t));
const smooth = (t) => t * t * (3 - 2 * t);
const lerp = (a, b, t) => a + (b - a) * t;

export default function CameraAssemble({ targetId = 'selected-works' }) {
  const wrapRef = useRef(null);
  const rigRef = useRef(null);
  const imgRefs = useRef([]);
  const flashRef = useRef(null);
  const dimRef = useRef(null);

  useEffect(() => {
    const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return undefined; // reduce-motion: no overlay, portfolio shows normally
    const root = document.documentElement;
    const target = () => document.getElementById(targetId);
    let raf = 0;
    let current = 0;
    let goal = 0;
    let armed = true;
    root.classList.add('es-cam-on');

    const setRevealed = (on) => {
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

    const apply = (p) => {
      const phone = window.innerWidth < 768;
      // Stage weights: exploded -> mid (30%-55%) -> assembled (55%-80%).
      const a = smooth(clamp01((p - 0.3) / 0.25));
      const b = smooth(clamp01((p - 0.55) / 0.25));
      const w = [1 - a, a * (1 - b), b];
      imgRefs.current.forEach((img, i) => {
        if (!img) return;
        img.style.opacity = String(w[i]);
        // soft blur while blending hides small differences between stages
        const blend = Math.min(w[i], 1 - w[i]) * 2;
        img.style.filter = blend > 0.02 ? `blur(${(blend * 3).toFixed(2)}px)` : 'none';
      });
      // Parts drift inward a little inside each stage so it never feels frozen.
      const drift = 1 - smooth(clamp01(p / 0.8));
      const centre = smooth(clamp01((p - 0.8) / 0.1));
      const sideX = phone ? 22 : 24;   // vw
      const sideY = phone ? 26 : 6;    // vh
      const sideS = phone ? 0.5 : 0.55;
      const x = lerp(sideX, 0, centre);
      const y = lerp(sideY, 0, centre);
      const s = lerp(sideS * (1.06 + 0.08 * drift), phone ? 1 : 0.9, centre);
      const rot = lerp(-4 * drift, 0, centre);
      if (rigRef.current) rigRef.current.style.transform = `translate3d(${x}vw, ${y}vh, 0) scale(${s}) rotate(${rot}deg)`;
      if (dimRef.current) dimRef.current.style.opacity = String(centre * 0.92);
      // Fade the whole overlay out once the portfolio is on screen.
      const out = clamp01((p - 1.0) / 0.12);
      if (wrapRef.current) {
        wrapRef.current.style.opacity = String(1 - out);
        wrapRef.current.style.visibility = out >= 1 ? 'hidden' : 'visible';
      }
      if (armed && p >= 0.95) {
        armed = false;
        const el = flashRef.current;
        if (el) { el.classList.remove('es-cam_flash--on'); void el.offsetWidth; el.classList.add('es-cam_flash--on'); }
        setRevealed(true);
      }
      if (!armed && p < 0.88) { armed = true; setRevealed(false); }
      if (p > 1.15) setRevealed(true); // safety: never leave the grid hidden
    };

    const frame = () => {
      raf = 0;
      const diff = goal - current;
      current += diff * 0.14;
      if (Math.abs(diff) < 0.0005) current = goal;
      apply(current);
      if (current !== goal) raf = requestAnimationFrame(frame);
    };
    const onScroll = () => { goal = progress(); if (!raf && !document.hidden) raf = requestAnimationFrame(frame); };

    goal = current = progress();
    apply(current);
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(raf);
      root.classList.remove('es-cam-on');
      setRevealed(false);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [targetId]);

  return (
    <div className="es-cam" ref={wrapRef} aria-hidden="true">
      <div className="es-cam_dim" ref={dimRef} />
      <div className="es-cam_rig" ref={rigRef}>
        {STAGES.map((name, i) => (
          <img
            key={name}
            ref={(el) => { imgRefs.current[i] = el; }}
            className="es-cam_img"
            src={`/camera/r6-${name}-1400.webp`}
            srcSet={`/camera/r6-${name}-760.webp 760w, /camera/r6-${name}-1400.webp 1400w`}
            sizes="(max-width: 767px) 100vw, 70vw"
            alt=""
            decoding="async"
            loading={i === 0 ? 'eager' : 'lazy'}
            style={{ opacity: i === 0 ? 1 : 0 }}
          />
        ))}
      </div>
      <div className="es-cam_flash" ref={flashRef} />
    </div>
  );
}
