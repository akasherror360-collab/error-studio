import React, { useCallback, useEffect, useState } from 'react';
import selectedWorksDefaults from '../../content/selectedWorksDefaults';
import { loadSelectedWorkDocs, mergeSelectedWorks, visibleWorks } from '../../content/selectedWorksStore';
import './selected-works.css';

const INITIAL_COUNT = 12;

export default function SelectedWorks() {
  const [items, setItems] = useState(null);
  const [showAll, setShowAll] = useState(false);
  const [open, setOpen] = useState(-1);

  useEffect(() => {
    let active = true;
    const fallback = setTimeout(() => {
      if (active) setItems(current => current || visibleWorks(mergeSelectedWorks([])));
    }, 4000);
    loadSelectedWorkDocs()
      .then(docs => { if (active) setItems(visibleWorks(mergeSelectedWorks(docs))); })
      .catch(() => { if (active) setItems(current => current || visibleWorks(mergeSelectedWorks([]))); })
      .finally(() => clearTimeout(fallback));
    return () => { active = false; clearTimeout(fallback); };
  }, []);

  const list = items || [];
  const shown = showAll ? list : list.slice(0, INITIAL_COUNT);

  const close = useCallback(() => setOpen(-1), []);
  const step = useCallback(delta => setOpen(index => (index + delta + list.length) % list.length), [list.length]);

  useEffect(() => {
    if (open < 0) return undefined;
    const onKey = event => {
      if (event.key === 'Escape') close();
      if (event.key === 'ArrowRight') step(1);
      if (event.key === 'ArrowLeft') step(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, close, step]);

  if (!items) {
    return (
      <div className="container">
        <div className="es-works_grid">
          {selectedWorksDefaults.slice(0, 8).map(item => <div className="es-works_item es-works_skeleton" key={item.id} />)}
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="es-works_grid">
        {shown.map((item, index) => (
          <button type="button" className="es-works_item" key={item.id} onClick={() => setOpen(index)} aria-label={item.caption || 'Open Error Studio work'}>
            <img src={item.src} alt={item.caption || 'Error Studio poster design'} loading="lazy" decoding="async" />
            {item.caption && <span className="es-works_caption">{item.caption}</span>}
          </button>
        ))}
      </div>
      {list.length > INITIAL_COUNT && (
        <div className="es-works_more">
          <button type="button" className="cs-btn cs-style1" onClick={() => setShowAll(value => !value)}>
            <span>{showAll ? 'Show fewer' : `View all works (${list.length})`}</span>
          </button>
        </div>
      )}
      {open >= 0 && list[open] && (
        <div className="es-works_lightbox" role="dialog" aria-modal="true" onClick={close}>
          <button type="button" className="es-works_close" onClick={close} aria-label="Close">×</button>
          {list.length > 1 && <button type="button" className="es-works_nav es-works_prev" onClick={event => { event.stopPropagation(); step(-1); }} aria-label="Previous">‹</button>}
          <img src={list[open].src} alt={list[open].caption || 'Error Studio poster design'} onClick={event => event.stopPropagation()} />
          {list.length > 1 && <button type="button" className="es-works_nav es-works_next" onClick={event => { event.stopPropagation(); step(1); }} aria-label="Next">›</button>}
        </div>
      )}
    </div>
  );
}
