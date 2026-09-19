import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { applyPatches, loadPublished } from './contentManager';

export default function PublishedContent() {
  const { pathname } = useLocation();
  useEffect(() => {
    let active = true;
    let observer;
    const apply = async () => {
      try {
        const patches = await loadPublished(pathname);
        if (!active) return;
        const run = () => applyPatches(patches);
        requestAnimationFrame(run);
        observer = new MutationObserver(run);
        observer.observe(document.getElementById('root'), { childList: true, subtree: true });
        setTimeout(() => observer?.disconnect(), 3000);
      } catch (error) { console.warn('Using bundled content because published overrides could not load.', error); }
    };
    apply();
    return () => { active = false; observer?.disconnect(); };
  }, [pathname]);
  return null;
}
