import React, { useState } from 'react';
import './trackwork.css';

const GENERIC = 'Something went wrong. Please call the studio on 99440 36606.';
const fmt = (d) => {
  if (!d) return '';
  const x = new Date(d);
  return Number.isNaN(x.getTime()) ? '' : x.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });
};
const badge = (s) => (s === 'Done' ? 'tw-done' : s === 'In progress' ? 'tw-prog' : s === 'Waiting for you' ? 'tw-wait' : 'tw-none');

function Result({ r }) {
  const services = r.services || [];
  const total = services.length;
  const done = services.filter((s) => s.stage === 'Done').length;
  const score = services.reduce((n, s) => n + (s.stage === 'Done' ? 1 : s.stage === 'In progress' || s.stage === 'Waiting for you' ? 0.5 : 0), 0);
  const pct = total ? Math.round((score / total) * 100) : 0;
  const d = r.delivered || {};
  return (
    <div className="tw-card" aria-live="polite">
      <h3 className="tw-name">{r.name}</h3>
      {r.eventDate ? <div className="tw-meta">Event date: {fmt(r.eventDate)}</div> : null}
      {total ? (
        <div className="tw-ovr">
          <div className="tw-top"><span>Overall progress &middot; {done} of {total} done</span><span className="tw-pct">{pct}%</span></div>
          <div className="tw-bar" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow={pct}><div className="tw-fill" style={{ width: pct + '%' }} /></div>
        </div>
      ) : null}
      {total ? (
        <div className="tw-sec"><h4>Your work</h4>
          <ul className="tw-svc">{services.map((s) => <li key={s.name}><span>{s.name}</span><span className={'tw-badge ' + badge(s.stage)}>{s.stage}</span></li>)}</ul>
        </div>
      ) : null}
      {(d.photos || d.videos) ? (
        <div className="tw-sec tw-links"><h4>Delivered</h4>
          {d.photos ? <a href={d.photos} target="_blank" rel="noopener noreferrer">View photos</a> : null}
          {d.videos ? <a href={d.videos} target="_blank" rel="noopener noreferrer">View videos</a> : null}
        </div>
      ) : null}
      {r.balance ? <div className="tw-sec"><h4>Payment</h4><div className="tw-bal">{r.balance.label ? r.balance.label : 'Balance pending: \u20B9' + Number(r.balance.amount).toLocaleString('en-IN')}</div></div> : null}
      {r.note ? <div className="tw-sec"><h4>Note from the studio</h4><div>{r.note}</div></div> : null}
      {r.updated ? <div className="tw-foot">Last updated: {fmt(r.updated)}</div> : null}
    </div>
  );
}

export default function TrackWork() {
  const [bid, setBid] = useState('');
  const [pw, setPw] = useState('');
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState('');
  const [result, setResult] = useState(null);
  const submit = async (e) => {
    e.preventDefault();
    setMsg(''); setResult(null);
    if (!bid.trim() || !pw.trim()) { setMsg('Please enter your Booking ID and password.'); return; }
    setBusy(true);
    try {
      const res = await fetch('/api/track', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ bookingId: bid.trim(), password: pw.trim() }) });
      const j = await res.json();
      if (j && j.ok) { setResult(j); setPw(''); } else setMsg((j && j.message) || GENERIC);
    } catch (_) { setMsg(GENERIC); }
    setBusy(false);
  };
  return (
    <section className="tw-wrap" id="track-my-work" aria-labelledby="tw-title">
      <div className="container">
        <div className="tw-inner">
          <span className="tw-eyebrow">Existing clients</span>
          <h2 id="tw-title" className="tw-title">Track My Work</h2>
          <p className="tw-lead">Enter the Booking ID and password we sent you to see where your photos, album and video work stand.</p>
          <form className="tw-form" onSubmit={submit} autoComplete="off" noValidate>
            <div><label htmlFor="tw-bid">Booking ID</label><input id="tw-bid" value={bid} onChange={(e) => setBid(e.target.value)} placeholder="ERR-..." autoCapitalize="characters" spellCheck="false" /></div>
            <div><label htmlFor="tw-pw">Password</label><input id="tw-pw" type="password" value={pw} onChange={(e) => setPw(e.target.value)} autoComplete="current-password" autoCapitalize="none" spellCheck="false" placeholder="Password from the studio" /></div>
            <button className="tw-go" type="submit" disabled={busy}>{busy ? 'Checking...' : 'Check status'}</button>
          </form>
          {msg ? <div className="tw-msg" role="alert">{msg}</div> : null}
          {result ? <Result r={result} /> : null}
          <p className="tw-hint">Need help? Call the studio on <a href="tel:+919944036606">99440 36606</a>.</p>
        </div>
      </div>
    </section>
  );
}
