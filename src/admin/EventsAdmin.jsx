import React, { useEffect, useState } from 'react';
import { imageUrl, listFolderImages, parseFolderId } from '../events/drive';
import { WATERMARK_POSITIONS, defaultWatermark, deleteEvent, eventUrl, listEvents, saveEvent, slugify } from '../events/eventStore';
import { WATERMARK_SRC, overlayStyle } from '../events/watermark';
import './events-admin.css';

const emptyForm = () => ({
  title: '', slug: '', date: new Date().toISOString().slice(0, 10), place: '', message: '',
  folderLink: '', order: 'name', live: false, visible: true, allowDownloadAll: true,
  watermark: { ...defaultWatermark },
});

export default function EventsAdmin({ user }) {
  const [events, setEvents] = useState([]);
  const [form, setForm] = useState(null);
  const [editingSlug, setEditingSlug] = useState(null);
  const [check, setCheck] = useState(null);
  const [status, setStatus] = useState('');
  const [busy, setBusy] = useState(false);

  const refresh = () => listEvents().then(setEvents).catch(error => setStatus(`Could not load events: ${error.message}`));
  useEffect(() => { refresh(); }, []);

  const set = (key, value) => setForm(current => {
    const next = { ...current, [key]: value };
    if (key === 'title' && !editingSlug && (!current.slug || current.slug === slugify(current.title))) next.slug = slugify(value);
    return next;
  });
  const setWm = (key, value) => setForm(current => ({ ...current, watermark: { ...current.watermark, [key]: value } }));

  const startNew = () => { setForm(emptyForm()); setEditingSlug(null); setCheck(null); setStatus(''); };
  const startEdit = event => {
    setForm({ ...emptyForm(), ...event, folderLink: event.folderLink || event.folderId, watermark: { ...defaultWatermark, ...(event.watermark || {}) } });
    setEditingSlug(event.slug); setCheck(null); setStatus('');
  };

  const checkFolder = async () => {
    const folderId = parseFolderId(form.folderLink);
    if (!folderId) { setCheck({ error: 'Paste the Google Drive folder link.' }); return; }
    setCheck({ loading: true });
    try {
      const photos = await listFolderImages(folderId, { order: form.order });
      setCheck({ count: photos.length, sample: photos.slice(0, 6), folderId });
    } catch (error) {
      setCheck({ error: `${error.message} In Drive: right-click the folder → Share → General access → "Anyone with the link" (Viewer).` });
    }
  };

  const save = async () => {
    const folderId = parseFolderId(form.folderLink);
    const slug = editingSlug || slugify(form.slug || form.title);
    if (!form.title.trim()) { setStatus('Add the event name.'); return; }
    if (!slug) { setStatus('Add a link name (letters and numbers).'); return; }
    if (!folderId) { setStatus('Paste a valid Google Drive folder link.'); return; }
    if (!editingSlug && events.some(item => item.slug === slug)) { setStatus(`The link /events/${slug} is already used. Change the link name.`); return; }
    setBusy(true); setStatus('Saving…');
    try {
      const { folderLink, ...rest } = form;
      await saveEvent(slug, {
        ...rest, slug, folderId, folderLink: folderLink.trim(),
        title: form.title.trim(), place: form.place.trim(), message: form.message.trim(),
        watermark: { enabled: Boolean(form.watermark.enabled), position: form.watermark.position, size: Number(form.watermark.size), opacity: Number(form.watermark.opacity) },
      }, user.email);
      setStatus(`Saved. Gallery link: ${eventUrl(slug)}`);
      setEditingSlug(slug);
      setForm(current => ({ ...current, slug }));
      refresh();
    } catch (error) { setStatus(`Save failed: ${error.message}`); }
    finally { setBusy(false); }
  };

  const remove = async slug => {
    if (!window.confirm(`Delete the gallery page /events/${slug}? Photos in Google Drive are NOT deleted.`)) return;
    try { await deleteEvent(slug); setStatus('Gallery page deleted. Drive photos untouched.'); if (editingSlug === slug) setForm(null); refresh(); }
    catch (error) { setStatus(`Delete failed: ${error.message}`); }
  };

  const copy = async text => { try { await navigator.clipboard.writeText(text); setStatus('Link copied.'); } catch (_) { setStatus(text); } };
  const previewPhoto = check?.sample?.[0];

  return <section className="ev-admin">
    <div className="ev-top">
      <div><h2>Event galleries</h2><p className="hint">One Google Drive folder per event → one branded page + QR poster.</p></div>
      <button onClick={startNew}>+ New event</button>
    </div>

    {status && <p className="status" role="status">{status}</p>}

    {form && <div className="ev-form">
      <h3>{editingSlug ? `Edit: ${form.title}` : 'New event'}</h3>
      <div className="ev-cols">
        <div>
          <label>Event name<input value={form.title} placeholder="Arun weds Priya" onChange={e => set('title', e.target.value)} /></label>
          <label>Link name<input value={form.slug} disabled={Boolean(editingSlug)} placeholder="arun-weds-priya" onChange={e => set('slug', slugify(e.target.value))} /><small>errorstudio.in/events/{form.slug || '…'}</small></label>
          <label>Date<input type="date" value={form.date} onChange={e => set('date', e.target.value)} /></label>
          <label>Place (optional)<input value={form.place} placeholder="Cuddalore" onChange={e => set('place', e.target.value)} /></label>
          <label>Message for guests (optional)<textarea rows="3" value={form.message} onChange={e => set('message', e.target.value)} /></label>
          <label>Google Drive folder link<input value={form.folderLink} placeholder="https://drive.google.com/drive/folders/…" onChange={e => { set('folderLink', e.target.value); setCheck(null); }} /><small>Folder must be shared as "Anyone with the link - Viewer". Upload web-size JPEGs only (no RAW).</small></label>
          <button className="secondary" onClick={checkFolder}>Check folder</button>
          {check?.loading && <p className="hint">Checking…</p>}
          {check?.error && <p className="ev-warn">{check.error}</p>}
          {check?.count !== undefined && <p className="ev-ok">✓ {check.count} photo{check.count === 1 ? '' : 's'} found</p>}
          {check?.sample?.length > 0 && <div className="ev-thumbs">{check.sample.map(p => <img key={p.id} src={imageUrl(p.id, 200)} alt="" />)}</div>}
          <label>Photo order<select value={form.order} onChange={e => set('order', e.target.value)}><option value="name">By file name</option><option value="newest">Newest first</option><option value="oldest">Oldest first</option></select></label>
          <label className="ev-check"><input type="checkbox" checked={form.live} onChange={e => set('live', e.target.checked)} />Live event - page refreshes every minute for new uploads</label>
          <label className="ev-check"><input type="checkbox" checked={form.visible} onChange={e => set('visible', e.target.checked)} />Gallery is visible to guests</label>
        </div>
        <div>
          <h4>Watermark</h4>
          <label className="ev-check"><input type="checkbox" checked={form.watermark.enabled} onChange={e => setWm('enabled', e.target.checked)} />Show Error Studio logo on photos</label>
          {form.watermark.enabled && <>
            <label>Position<select value={form.watermark.position} onChange={e => setWm('position', e.target.value)}>{WATERMARK_POSITIONS.map(([value, name]) => <option key={value} value={value}>{name}</option>)}</select></label>
            <label>Logo size: {form.watermark.size}%<input type="range" min="8" max="45" value={form.watermark.size} onChange={e => setWm('size', Number(e.target.value))} /></label>
            <label>Opacity: {form.watermark.opacity}%<input type="range" min="25" max="100" value={form.watermark.opacity} onChange={e => setWm('opacity', Number(e.target.value))} /></label>
          </>}
          {!form.watermark.enabled && <label className="ev-check"><input type="checkbox" checked={form.allowDownloadAll} onChange={e => set('allowDownloadAll', e.target.checked)} />Show "Download all" (opens the Drive folder)</label>}
          <div className="ev-preview">
            {previewPhoto ? <img src={imageUrl(previewPhoto.id, 800)} alt="Watermark preview" /> : <div className="ev-preview-empty">Click "Check folder" to preview on a real photo</div>}
            {form.watermark.enabled && <img className="ev-wm" src={WATERMARK_SRC} alt="" style={overlayStyle(form.watermark)} />}
          </div>
          <small className="hint">Downloads get the same logo, same position. With the watermark on, the "Download all" Drive button is hidden so guests only get logo copies from the page.</small>
        </div>
      </div>
      <div className="ev-form-actions">
        <button disabled={busy} onClick={save}>{busy ? 'Saving…' : 'Save event'}</button>
        <button className="secondary" onClick={() => setForm(null)}>Close</button>
      </div>
    </div>}

    <div className="ev-list">
      {events.length === 0 && <p className="empty">No events yet. Click "+ New event".</p>}
      {events.map(event => <article key={event.slug} className="ev-card">
        <div>
          <strong>{event.title}</strong>
          <small>{event.date}{event.place ? ` · ${event.place}` : ''}{event.visible === false ? ' · hidden' : ''}{event.live ? ' · live' : ''}{event.watermark?.enabled ? ' · watermark' : ''}</small>
          <code>/events/{event.slug}</code>
        </div>
        <div className="ev-card-actions">
          <a href={`/events/${event.slug}`} target="_blank" rel="noreferrer">Open</a>
          <a href={`/events/${event.slug}/qr`} target="_blank" rel="noreferrer">QR poster</a>
          <button className="secondary" onClick={() => copy(eventUrl(event.slug))}>Copy link</button>
          <button className="secondary" onClick={() => startEdit(event)}>Edit</button>
          <button className="secondary danger" onClick={() => remove(event.slug)}>Delete</button>
        </div>
      </article>)}
    </div>
  </section>;
}
