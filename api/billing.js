// Owner-only billing actions: quotation->invoice conversion, client tracking access, reset.
// Auth: Firebase ID token (Google sign-in) restricted to the studio owner email.
// Storage of client identity + tracking access lives in the existing Notion "Photographer
// Bookings & Delivery Tracker" so website login, tracker and invoices stay one record per client.
const crypto = require('crypto');

const DS_ID = process.env.NOTION_CLIENTS_DATA_SOURCE_ID || '81fd404c-6c10-837b-a664-07d2b479420e';
const NV = '2025-09-03';
const OWNER = 'akasherror360@gmail.com';
const PROJECT = 'error-studio-fd96c';
const BASE = 'https://www.errorstudio.in';

// ---------- Firebase ID token verification ----------
let jwksCache = { at: 0, keys: null };
async function jwks() {
  if (jwksCache.keys && Date.now() - jwksCache.at < 6 * 3600e3) return jwksCache.keys;
  const r = await fetch('https://www.googleapis.com/service_accounts/v1/jwk/securetoken@system.gserviceaccount.com');
  if (!r.ok) throw new Error('jwks ' + r.status);
  jwksCache = { at: Date.now(), keys: (await r.json()).keys };
  return jwksCache.keys;
}
const b64u = (s) => Buffer.from(s.replace(/-/g, '+').replace(/_/g, '/'), 'base64');
async function verifyOwner(req) {
  const m = /^Bearer (.+)$/.exec(String(req.headers.authorization || ''));
  if (!m) return false;
  const parts = m[1].split('.');
  if (parts.length !== 3) return false;
  let header, claims;
  try { header = JSON.parse(b64u(parts[0]).toString('utf8')); claims = JSON.parse(b64u(parts[1]).toString('utf8')); }
  catch (e) { return false; }
  if (claims.iss !== 'https://securetoken.google.com/' + PROJECT || claims.aud !== PROJECT) return false;
  if (typeof claims.exp !== 'number' || claims.exp * 1000 < Date.now()) return false;
  if (claims.email !== OWNER || claims.email_verified !== true) return false;
  const keys = await jwks();
  const jwk = keys.find((k) => k.kid === header.kid);
  if (!jwk) return false;
  const key = crypto.createPublicKey({ key: jwk, format: 'jwk' });
  return crypto.verify('RSA-SHA256', Buffer.from(parts[0] + '.' + parts[1]), key, b64u(parts[2]));
}

// ---------- rate limiting (same pattern as api/track.js) ----------
const mem = new Map();
async function hit(key, limit, windowSec) {
  const url = process.env.UPSTASH_REDIS_REST_URL, tok = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (url && tok) {
    try {
      const r = await fetch(url + '/pipeline', { method: 'POST', headers: { Authorization: 'Bearer ' + tok, 'Content-Type': 'application/json' }, body: JSON.stringify([['INCR', key], ['EXPIRE', key, String(windowSec), 'NX']]) });
      const j = await r.json();
      return Number(j[0].result) <= limit;
    } catch (e) { /* fall through */ }
  }
  const now = Date.now(); const e = mem.get(key);
  if (!e || e.reset < now) { mem.set(key, { n: 1, reset: now + windowSec * 1000 }); return true; }
  e.n += 1; return e.n <= limit;
}

// ---------- Notion helpers ----------
async function nf(path, method, body) {
  const r = await fetch('https://api.notion.com/v1' + path, {
    method: method || 'GET',
    headers: { Authorization: 'Bearer ' + process.env.NOTION_TOKEN, 'Notion-Version': NV, 'Content-Type': 'application/json' },
    body: body ? JSON.stringify(body) : undefined,
  });
  const j = await r.json().catch(() => ({}));
  if (!r.ok) { const e = new Error('notion ' + r.status); e.status = r.status; e.body = j; throw e; }
  return j;
}
const rt = (s) => ({ rich_text: [{ type: 'text', text: { content: String(s) } }] });
const text = (p) => (p && p.rich_text ? p.rich_text.map((t) => t.plain_text).join('') : '').trim();
const digits = (s) => String(s || '').replace(/\D/g, '');
const last10 = (s) => { const d = digits(s); return d.length > 10 ? d.slice(-10) : d; };

async function findByBookingId(bid) {
  const j = await nf('/data_sources/' + DS_ID + '/query', 'POST', { page_size: 3, filter: { property: 'Booking ID', rich_text: { equals: bid } } });
  return (j.results || [])[0] || null;
}
async function findByPhone(phone) {
  const p = last10(phone);
  if (p.length < 10) return null;
  const j = await nf('/data_sources/' + DS_ID + '/query', 'POST', { page_size: 5, filter: { property: 'Phone', rich_text: { contains: p } } });
  return (j.results || [])[0] || null;
}
async function nextBookingId() {
  let cursor, max = 0;
  do {
    const j = await nf('/data_sources/' + DS_ID + '/query', 'POST', { page_size: 100, start_cursor: cursor, filter: { property: 'Booking ID', rich_text: { is_not_empty: true } } });
    for (const pg of j.results || []) {
      const m = /^ERR-0*(\d+)$/.exec(text(pg.properties['Booking ID']).toUpperCase());
      if (m) max = Math.max(max, parseInt(m[1], 10));
    }
    cursor = j.has_more ? j.next_cursor : null;
  } while (cursor);
  return 'ERR-' + String(max + 1).padStart(3, '0');
}
async function ensureSetupColumns() {
  const ds = await nf('/data_sources/' + DS_ID);
  const props = ds.properties || {};
  const add = {};
  if (!props['Setup token hash']) add['Setup token hash'] = { rich_text: {} };
  if (!props['Setup token expiry']) add['Setup token expiry'] = { rich_text: {} };
  if (Object.keys(add).length) await nf('/data_sources/' + DS_ID, 'PATCH', { properties: add });
}
async function setSetupToken(pageId, hash, expiryIso) {
  await nf('/pages/' + pageId, 'PATCH', { properties: { 'Setup token hash': rt(hash), 'Setup token expiry': rt(expiryIso) } });
}
function newSetup() {
  const token = crypto.randomBytes(24).toString('base64url');
  const hash = crypto.createHash('sha256').update(token).digest('hex');
  const expiry = new Date(Date.now() + 7 * 24 * 3600e3).toISOString();
  return { token, hash, expiry };
}

module.exports = async (req, res) => {
  const send = (code, body) => {
    res.setHeader('Cache-Control', 'no-store');
    res.setHeader('X-Robots-Tag', 'noindex, nofollow');
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.status(code).send(JSON.stringify(body));
  };
  try {
    if (req.method !== 'POST') return send(405, { ok: false, message: 'Not allowed.' });
    if (!(await hit('bill:ip:' + String((req.headers['x-forwarded-for'] || '').split(',')[0] || 'x'), 120, 3600))) return send(429, { ok: false, message: 'Too many attempts. Try again later.' });
    if (!process.env.NOTION_TOKEN) return send(503, { ok: false, message: 'Not connected yet.' });
    let authed = false;
    try { authed = await verifyOwner(req); } catch (e) { return send(503, { ok: false, message: 'Sign-in could not be verified. Try again.' }); }
    if (!authed) return send(401, { ok: false, message: 'Owner sign-in required.' });

    const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});
    const action = String(body.action || '');

    if (action === 'probe') {
      // Harmless write test: set the TEST row's Client note to its current value.
      let writable = false, detail = 'not tried';
      try {
        const t = await findByBookingId('ERR-TEST1');
        if (t) {
          const cur = text(t.properties['Client note']);
          await nf('/pages/' + t.id, 'PATCH', { properties: { 'Client note': rt(cur) } });
          writable = true; detail = 'write ok';
        } else { detail = 'test row missing'; }
      } catch (e) { detail = 'write failed: notion ' + (e.status || '?'); }
      return send(200, { ok: true, writable, detail, env: { notion: !!process.env.NOTION_TOKEN, upstash: !!(process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) } });
    }

    if (action === 'convert') {
      const clientName = String(body.clientName || '').trim().slice(0, 80);
      const phone = String(body.phone || '').trim().slice(0, 20);
      const eventDate = /^\d{4}-\d{2}-\d{2}$/.test(String(body.eventDate || '')) ? String(body.eventDate) : null;
      if (!clientName) return send(200, { ok: false, message: 'Client name is required.' });
      await ensureSetupColumns();
      let page = phone ? await findByPhone(phone) : null;
      let bookingId, created = false;
      if (page) {
        bookingId = text(page.properties['Booking ID']).toUpperCase();
        if (!/^ERR-[A-Z0-9-]{1,16}$/.test(bookingId)) return send(200, { ok: false, message: 'Existing client record has no Booking ID yet. Add it in the tracker first.' });
      } else {
        bookingId = await nextBookingId();
        const props = {
          'Shoot': { title: [{ type: 'text', text: { content: clientName } }] },
          'Booking ID': rt(bookingId),
          'Show on website': { checkbox: false },
        };
        if (phone) props['Phone'] = rt(phone);
        if (eventDate) props['Date'] = { date: { start: eventDate } };
        page = await nf('/pages', 'POST', { parent: { data_source_id: DS_ID }, properties: props });
        created = true;
      }
      const s = newSetup();
      await setSetupToken(page.id, s.hash, s.expiry);
      const accessActive = !!text(page.properties['Access hash']);
      return send(200, { ok: true, bookingId, created, accessActive, setupUrl: BASE + '/setup-access.html?id=' + encodeURIComponent(bookingId) + '&k=' + s.token });
    }

    if (action === 'reset') {
      const bid = String(body.bookingId || '').trim().toUpperCase();
      if (!/^ERR-[A-Z0-9-]{1,16}$/.test(bid)) return send(200, { ok: false, message: 'Unknown Booking ID.' });
      const page = await findByBookingId(bid);
      if (!page) return send(200, { ok: false, message: 'No tracker record for ' + bid + '.' });
      await ensureSetupColumns();
      const s = newSetup();
      await setSetupToken(page.id, s.hash, s.expiry);
      return send(200, { ok: true, bookingId: bid, setupUrl: BASE + '/setup-access.html?id=' + encodeURIComponent(bid) + '&k=' + s.token });
    }

    if (action === 'archive') {
      const bid = String(body.bookingId || '').trim().toUpperCase();
      if (!/^ERR-[A-Z0-9-]{1,16}$/.test(bid)) return send(200, { ok: false, message: 'Unknown Booking ID.' });
      const page = await findByBookingId(bid);
      if (!page) return send(200, { ok: false, message: 'No tracker record for ' + bid + '.' });
      await nf('/pages/' + page.id, 'PATCH', { archived: true });
      return send(200, { ok: true, archived: bid });
    }

    if (action === 'status') {
      const ids = Array.isArray(body.bookingIds) ? body.bookingIds.slice(0, 50) : [];
      const out = {};
      for (const raw of ids) {
        const bid = String(raw || '').trim().toUpperCase();
        if (!/^ERR-[A-Z0-9-]{1,16}$/.test(bid)) continue;
        const page = await findByBookingId(bid);
        if (!page) { out[bid] = { found: false }; continue; }
        const exp = text(page.properties['Setup token expiry']);
        out[bid] = { found: true, accessActive: !!text(page.properties['Access hash']), setupPending: !!text(page.properties['Setup token hash']) && !!exp && Date.parse(exp) > Date.now() };
      }
      return send(200, { ok: true, status: out });
    }

    return send(200, { ok: false, message: 'Unknown action.' });
  } catch (e) {
    const ro = e && e.status === 403;
    return send(200, { ok: false, message: ro ? 'Tracker connection is read-only right now; write access is needed.' : 'Something went wrong. Please try again.', notion403: !!ro });
  }
};
