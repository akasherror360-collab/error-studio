import React, { useEffect, useMemo, useState } from 'react';
import { compressImage, formatBytes } from './imageCompression';
import { ORDER_STEP, loadSelectedWorkDocs, mergeSelectedWorks, newWorkId, removeUpload, saveWork } from '../content/selectedWorksStore';
import './events-admin.css';

export default function SelectedWorksAdmin() {
  const [items, setItems] = useState([]);
  const [status, setStatus] = useState('Loading…');
  const [busy, setBusy] = useState(false);
  const [filter, setFilter] = useState('all');

  const refresh = () => loadSelectedWorkDocs()
    .then(docs => { setItems(mergeSelectedWorks(docs)); setStatus(''); })
    .catch(error => setStatus(`Could not load Selected Works: ${error.message}`));
  useEffect(() => { refresh(); }, []);

  const active = useMemo(() => items.filter(item => !item.deleted), [items]);
  const deleted = useMemo(() => items.filter(item => item.deleted), [items]);
  const shownCount = active.filter(item => !item.hidden).length;
  const list = filter === 'shown' ? active.filter(item => !item.hidden) : filter === 'hidden' ? active.filter(item => item.hidden) : active;

  const run = async (label, work) => {
    setBusy(true); setStatus(label);
    try { await work(); await refresh(); setStatus('Saved - live on the website now.'); }
    catch (error) { setStatus(`Could not save: ${error.message}`); }
    finally { setBusy(false); }
  };

  const toggle = item => run('Saving…', () => saveWork({ ...item, hidden: !item.hidden }));
  const remove = item => {
    if (!window.confirm('Delete this photo from Selected Works?')) return;
    run('Deleting…', () => item.bundled ? saveWork({ ...item, deleted: true }) : removeUpload(item.id));
  };
  const restore = item => run('Restoring…', () => saveWork({ ...item, deleted: false, hidden: false }));
  const setCaption = (item, caption) => run('Saving…', () => saveWork({ ...item, caption }));

  const move = (item, delta) => {
    const index = active.findIndex(entry => entry.id === item.id);
    const other = active[index + delta];
    if (!other) return;
    run('Moving…', async () => {
      const a = item.order ?? 0; const b = other.order ?? 0;
      await saveWork({ ...item, order: a === b ? b + delta : b });
      await saveWork({ ...other, order: a === b ? a : a });
    });
  };
  const moveToTop = item => {
    const top = Math.min(...active.map(entry => entry.order ?? 0));
    run('Moving…', () => saveWork({ ...item, order: top - ORDER_STEP }));
  };

  const upload = async event => {
    const files = [...(event.target.files || [])];
    event.target.value = '';
    if (!files.length) return;
    setBusy(true);
    let top = Math.min(0, ...items.map(entry => entry.order ?? 0));
    try {
      for (const [index, file] of files.entries()) {
        setStatus(`Compressing ${index + 1} of ${files.length}…`);
        const result = await compressImage(file, { maxBytes: 450 * 1024, maxEdge: 1600 });
        setStatus(`Uploading ${index + 1} of ${files.length} (${formatBytes(result.compressedBytes)})…`);
        top -= ORDER_STEP;
        await saveWork({ id: newWorkId(), bundled: false, src: result.dataUrl, caption: '', hidden: false, deleted: false, order: top });
      }
      await refresh();
      setStatus(`${files.length} photo${files.length > 1 ? 's' : ''} added at the top - live on the website now.`);
    } catch (error) {
      setStatus(`Upload stopped: ${error.message}`);
      await refresh();
    } finally { setBusy(false); }
  };

  return <section className="ev-admin sw-admin">
    <div className="ev-top">
      <div><h2>Selected Works (home page)</h2><small className="hint">{shownCount} shown on the website · {active.length - shownCount} hidden · changes go live immediately</small></div>
      <label className="sw-upload">+ Add photos<input type="file" accept="image/jpeg,image/png,image/webp,image/gif" multiple disabled={busy} onChange={upload} /></label>
    </div>
    {status && <p className="status" role="status">{status}</p>}
    <div className="sw-filters">
      {[['all', 'All'], ['shown', 'Shown'], ['hidden', 'Hidden']].map(([value, label]) => <button key={value} className={filter === value ? '' : 'secondary'} onClick={() => setFilter(value)}>{label}</button>)}
      <a href="/#selected-works" target="_blank" rel="noreferrer">Open home page</a>
    </div>
    <div className="sw-grid">
      {list.map(item => <div className={item.hidden ? 'sw-card sw-hidden' : 'sw-card'} key={item.id}>
        <img src={item.src} alt="" loading="lazy" />
        <label className="ev-check"><input type="checkbox" checked={!item.hidden} disabled={busy} onChange={() => toggle(item)} />Show on website</label>
        <input placeholder="Caption (optional)" defaultValue={item.caption || ''} disabled={busy} onBlur={event => { if ((event.target.value || '') !== (item.caption || '')) setCaption(item, event.target.value.trim()); }} />
        <div className="sw-actions">
          <button className="secondary" disabled={busy} onClick={() => move(item, -1)} title="Move earlier">↑</button>
          <button className="secondary" disabled={busy} onClick={() => move(item, 1)} title="Move later">↓</button>
          <button className="secondary" disabled={busy} onClick={() => moveToTop(item)}>Top</button>
          <button className="secondary danger" disabled={busy} onClick={() => remove(item)}>Delete</button>
        </div>
      </div>)}
    </div>
    {deleted.length > 0 && <details className="sw-deleted"><summary>Deleted photos ({deleted.length}) - restore</summary><div className="sw-grid">
      {deleted.map(item => <div className="sw-card sw-hidden" key={item.id}><img src={item.src} alt="" loading="lazy" /><button className="secondary" disabled={busy} onClick={() => restore(item)}>Restore</button></div>)}
    </div></details>}
  </section>;
}
