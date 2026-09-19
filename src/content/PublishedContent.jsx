import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { applyPatches, loadPublished } from './contentManager';

const revealPage = () => document.documentElement.classList.add('published-content-ready');

export default function PublishedContent() {
  const { pathname, search } = useLocation();
  useEffect(() => {
    let active = true;
    let observer;

    // The admin owns the preview DOM. Applying public content after the iframe loads
    // would overwrite the draft the owner is trying to edit.
    if (new URLSearchParams(search).has('adminPreview')) {
      revealPage();
      return undefined;
    }

    const apply = async () => {
      try {
        const patches = await loadPublished(pathname);
        if (!active) return;
        const run = () => applyPatches(patches);
        run();
        observer = new MutationObserver(run);
        observer.observe(document.getElementById('root'), { childList: true, subtree: true });
        // Reveal only after the bundled React tree and the published overrides agree,
        // so visitors never see stale bundled text flash before a published change.
        requestAnimationFrame(() => requestAnimationFrame(revealPage));
      } catch (error) {
        console.warn('Using bundled content because published overrides could not load.', error);
        revealPage();
      }
    };
    apply();
    return () => { active = false; observer?.disconnect(); };
  }, [pathname, search]);
  return null;
}
