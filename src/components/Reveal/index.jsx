import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './reveal.css';

// Light bottom-to-top reveal for photos as they scroll into view.
const SELECTOR = '.es-works_item, img.cs-radius_15, .cs-portfolio, .cs-card, .cs-reel_item';

export default function Reveal() {
  const { pathname } = useLocation();
  useEffect(() => {
    if (!('IntersectionObserver' in window)) return undefined;
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add('es-reveal--in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    const scan = () => {
      document.querySelectorAll(SELECTOR).forEach((el) => {
        if (el.dataset.esReveal) return;
        el.dataset.esReveal = '1';
        const r = el.getBoundingClientRect();
        if (r.top < window.innerHeight && r.bottom > 0) return; // already on screen: leave as-is
        el.classList.add('es-reveal');
        io.observe(el);
      });
    };
    scan();
    const mo = new MutationObserver(scan);
    mo.observe(document.body, { childList: true, subtree: true });
    return () => { mo.disconnect(); io.disconnect(); };
  }, [pathname]);
  return null;
}
