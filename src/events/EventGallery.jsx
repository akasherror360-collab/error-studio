import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import logo from '../assets/images/error-studio-logo.png';
import { folderUrl, imageUrl, listFolderImages } from './drive';
import { getEvent } from './eventStore';
import { WATERMARK_SRC, originalBlob, overlayStyle, saveBlob, watermarkedBlob } from './watermark';
import './events.css';

const PAGE = 48;
const WHATSAPP = '916384568059';
const PHONE_DISPLAY = '+91 63845 68059';

const formatDate = value => {
  if (!value) return '';
  const date = new Date(`${value}T00:00:00`);
  return Number.isNaN(date.getTime()) ? value : date.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });
};

function useNoIndex(title) {
  useEffect(() => {
    const previousTitle = document.title;
    const meta = document.createElement('meta');
    meta.name = 'robots'; meta.content = 'noindex, nofollow';
    document.head.appendChild(meta);
    if (title) document.title = `${title} | Photos by Error Studio`;
    return () => { meta.remove(); document.title = previousTitle; };
  }, [title]);
}

function Photo({ photo, watermark, onOpen, index }) {
  return <button className="esg-tile" onClick={() => onOpen(index)} aria-label={`Open photo ${index + 1}`}>
    <img src={imageUrl(photo.id, 600)} alt="" loading="lazy" decoding="async" draggable="false" onContextMenu={e => watermark?.enabled && e.preventDefault()} />
    {watermark?.enabled && <img className="esg-wm" src={WATERMARK_SRC} alt="" style={overlayStyle(watermark)} draggable="false" />}
  </button>;
}

function Viewer({ photos, index, setIndex, watermark, slug }) {
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState('');
  const touch = useRef(null);
  const photo = photos[index];
  const go = useCallback(step => setIndex(current => (current + step + photos.length) % photos.length), [photos.length, setIndex]);

  useEffect(() => {
    const onKey = event => {
      if (event.key === 'Escape') setIndex(null);
      if (event.key === 'ArrowRight') go(1);
      if (event.key === 'ArrowLeft') go(-1);
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = ''; };
  }, [go, setIndex]);

  useEffect(() => { setMessage(''); }, [index]);

  if (!photo) return null;
  const download = async () => {
    setBusy(true); setMessage('Preparing download…');
    try {
      const base = (photo.name || `photo-${index + 1}`).replace(/\.[^.]+$/, '');
      const blob = watermark?.enabled ? await watermarkedBlob(photo.id, watermark) : await originalBlob(photo.id);
      saveBlob(blob, `ErrorStudio-${slug}-${base}.jpg`);
      setMessage('Downloaded.');
    } catch (_) {
      setMessage('Download failed. Please check your connection and try again.');
    } finally { setBusy(false); }
  };

  return <div className="esg-viewer" role="dialog" aria-modal="true" aria-label="Photo viewer"
    onTouchStart={e => { touch.current = e.touches[0].clientX; }}
    onTouchEnd={e => { if (touch.current == null) return; const dx = e.changedTouches[0].clientX - touch.current; if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1); touch.current = null; }}>
    <div className="esg-viewer-bar">
      <span>{index + 1} / {photos.length}</span>
      <div>
        <button className="esg-btn esg-btn-gold" disabled={busy} onClick={download}>{busy ? 'Preparing…' : 'Download'}</button>
        <button className="esg-icon" onClick={() => setIndex(null)} aria-label="Close">×</button>
      </div>
    </div>
    <div className="esg-viewer-stage">
      <button className="esg-nav esg-prev" onClick={() => go(-1)} aria-label="Previous photo">‹</button>
      <div className="esg-viewer-frame">
        <img key={photo.id} src={imageUrl(photo.id, 1800)} alt="" draggable="false" onContextMenu={e => watermark?.enabled && e.preventDefault()} />
        {watermark?.enabled && <img className="esg-wm" src={WATERMARK_SRC} alt="" style={overlayStyle(watermark)} draggable="false" />}
      </div>
      <button className="esg-nav esg-next" onClick={() => go(1)} aria-label="Next photo">›</button>
    </div>
    {message && <p className="esg-viewer-msg" role="status">{message}</p>}
  </div>;
}

export default function EventGallery() {
  const { slug } = useParams();
  const [event, setEvent] = useState(undefined);
  const [photos, setPhotos] = useState([]);
  const [error, setError] = useState('');
  const [loadingPhotos, setLoadingPhotos] = useState(true);
  const [shown, setShown] = useState(PAGE);
  const [open, setOpen] = useState(null);
  const sentinel = useRef(null);
  useNoIndex(event?.title);

  useEffect(() => {
    let active = true;
    getEvent(slug).then(data => { if (active) setEvent(data && data.visible !== false ? data : null); })
      .catch(() => { if (active) setEvent(null); });
    return () => { active = false; };
  }, [slug]);

  useEffect(() => {
    if (!event?.folderId) return undefined;
    let active = true;
    const load = async () => {
      try {
        const list = await listFolderImages(event.folderId, { order: event.order || 'name' });
        if (active) { setPhotos(list); setError(''); }
      } catch (err) {
        if (active) setError('Photos could not load right now. Please refresh in a minute.');
      } finally { if (active) setLoadingPhotos(false); }
    };
    load();
    // During a live event, new photos synced to the Drive folder appear within about a minute.
    const timer = event.live ? setInterval(() => { if (document.visibilityState === 'visible') load(); }, 60000) : null;
    return () => { active = false; if (timer) clearInterval(timer); };
  }, [event]);

  useEffect(() => {
    const node = sentinel.current;
    if (!node) return undefined;
    const observer = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting)) setShown(current => current + PAGE);
    }, { rootMargin: '800px' });
    observer.observe(node);
    return () => observer.disconnect();
  }, [photos.length, shown]);

  const visible = useMemo(() => photos.slice(0, shown), [photos, shown]);
  const watermark = event?.watermark;
  const bookText = encodeURIComponent(`Hi Error Studio, I saw your photos from ${event?.title || 'an event'}. I'd like to know about booking.`);

  if (event === undefined) return <main className="esg-page esg-center"><div className="esg-spinner" aria-label="Loading" /></main>;
  if (event === null) return <main className="esg-page esg-center">
    <img src={logo} alt="Error Studio" className="esg-logo-lg" />
    <h1>Gallery not found</h1>
    <p>This gallery link is not active. Please check the link or contact Error Studio.</p>
    <Link className="esg-btn esg-btn-red" to="/">Visit Error Studio</Link>
  </main>;

  return <main className="esg-page">
    <header className="esg-hero">
      <Link to="/" className="esg-brand"><img src={logo} alt="Error Studio" /></Link>
      <p className="esg-kicker">Photos by Error Studio</p>
      <h1>{event.title}</h1>
      <p className="esg-meta">{[formatDate(event.date), event.place].filter(Boolean).join(' · ')}</p>
      {event.message && <p className="esg-message">{event.message}</p>}
      <div className="esg-actions">
        <span className="esg-count">{loadingPhotos ? 'Loading photos…' : `${photos.length} photo${photos.length === 1 ? '' : 's'}`}</span>
        {event.live && <span className="esg-live">Updates automatically</span>}
        {!watermark?.enabled && event.allowDownloadAll !== false && photos.length > 0 &&
          <a className="esg-btn esg-btn-ghost" href={folderUrl(event.folderId)} target="_blank" rel="noopener noreferrer">Download all</a>}
      </div>
    </header>

    {error && <p className="esg-error" role="alert">{error}</p>}
    {!loadingPhotos && !error && photos.length === 0 && <p className="esg-empty">Photos will appear here soon.</p>}

    <section className="esg-grid" aria-label="Event photos">
      {visible.map((photo, index) => <Photo key={photo.id} photo={photo} index={index} watermark={watermark} onOpen={setOpen} />)}
    </section>
    {shown < photos.length && <div ref={sentinel} className="esg-sentinel"><div className="esg-spinner" /></div>}

    <section className="esg-book">
      <img src={logo} alt="" className="esg-book-logo" />
      <h2>Planning a wedding or event?</h2>
      <p>Error Studio covers weddings, receptions and events across Tamil Nadu - photography, cinematic films and albums.</p>
      <div className="esg-book-actions">
        <a className="esg-btn esg-btn-red" href={`https://wa.me/${WHATSAPP}?text=${bookText}`} target="_blank" rel="noopener noreferrer">Book on WhatsApp</a>
        <a className="esg-btn esg-btn-ghost" href="tel:+916384568059">Call {PHONE_DISPLAY}</a>
      </div>
      <div className="esg-links">
        <a href="https://www.instagram.com/errorstudio.official/" target="_blank" rel="noopener noreferrer">Instagram @errorstudio.official</a>
        <Link to="/portfolio">See our portfolio</Link>
      </div>
    </section>
    <footer className="esg-foot">© Error Studio · Cuddalore, Tamil Nadu</footer>

    {open !== null && <Viewer photos={photos} index={open} setIndex={setOpen} watermark={watermark} slug={slug} />}
  </main>;
}
