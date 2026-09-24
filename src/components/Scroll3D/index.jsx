import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './scroll3d.css';

// EXPERIMENT (exp/3d branch): scroll-responsive 3D depth.
// - Photo blocks tilt back in 3D below the fold and flatten as they reach the middle of the screen.
// - Cards tilt toward the pointer / finger.
// - Hero content sinks back in depth as the visitor scrolls past it.
const TILT_SELECTOR = '.es-works_item, .es-cat_card, .cs-card, .cs-portfolio, img.cs-radius_15, .cs-funfact_wrap';
const POINTER_SELECTOR = '.es-works_item, .es-cat_card, .cs-card';

export default function Scroll3D() {
  const { pathname } = useLocation();
  useEffect(() => {
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    document.body.classList.add('es-3d');
    let els = [];
    let frame = 0;
    const collect = () => { els = [...document.querySelectorAll(TILT_SELECTOR)]; };
    const update = () => {
      frame = 0;
      const vh = window.innerHeight;
      els.forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.bottom < -100 || r.top > vh + 100) return;
        const center = r.top + r.height / 2;
        const p = Math.max(-1, Math.min(1, (center - vh / 2) / (vh / 2))); // -1 top, 0 middle, 1 bottom
        el.style.setProperty('--es-rx', `${(p * 14).toFixed(2)}deg`);
        el.style.setProperty('--es-tz', `${(-Math.abs(p) * 60).toFixed(1)}px`);
      });
      const hero = document.querySelector('.cs-hero');
      if (hero) {
        const h = hero.offsetHeight || 1;
        const q = Math.min(1, Math.max(0, window.scrollY / h));
        hero.style.setProperty('--es-hero-rx', `${(q * 18).toFixed(2)}deg`);
        hero.style.setProperty('--es-hero-tz', `${(-q * 220).toFixed(1)}px`);
        hero.style.setProperty('--es-hero-o', `${(1 - q * 0.9).toFixed(3)}`);
      }
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update); };
    const onMove = (e) => {
      const card = e.target.closest && e.target.closest(POINTER_SELECTOR);
      if (!card) return;
      const r = card.getBoundingClientRect();
      const x = ((e.clientX - r.left) / r.width - 0.5) * 2;
      const y = ((e.clientY - r.top) / r.height - 0.5) * 2;
      card.style.setProperty('--es-py', `${(x * 10).toFixed(2)}deg`);
      card.style.setProperty('--es-px', `${(-y * 10).toFixed(2)}deg`);
      card.classList.add('es-3d_hover');
    };
    const onLeave = (e) => {
      const card = e.target.closest && e.target.closest(POINTER_SELECTOR);
      if (!card) return;
      card.style.setProperty('--es-py', '0deg');
      card.style.setProperty('--es-px', '0deg');
      card.classList.remove('es-3d_hover');
    };
    collect(); update();
    const mo = new MutationObserver(() => { collect(); onScroll(); });
    mo.observe(document.body, { childList: true, subtree: true });
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    document.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('pointerout', onLeave, { passive: true });
    return () => {
      mo.disconnect();
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      document.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerout', onLeave);
      cancelAnimationFrame(frame);
    };
  }, [pathname]);
  return null;
}
