// Client work-status lookup. Read-only. Needs env: NOTION_TOKEN (internal integration shared with the
// Clients database only). Optional: UPSTASH_REDIS_REST_URL / UPSTASH_REDIS_REST_TOKEN for shared rate limits.
const crypto = require('crypto');

const DATA_SOURCE_ID = process.env.NOTION_CLIENTS_DATA_SOURCE_ID || 'f1e8d41c-2031-483a-a4bb-78ea19914abd';
const NOTION_VERSION = '2025-09-03';
const MIN_MS = 700; // every answer takes at least this long, so timing does not reveal anything

const GENERIC = { ok: false, message: 'We could not find a booking with those details. Please check your Booking ID and registered phone number, or call the studio on 99440 36606.' };
const LOCKED = { ok: false, message: 'Too many attempts. Please try again later or call the studio on 99440 36606.' };

// ---- rate limiting: shared store if configured, otherwise per-instance memory (weaker) ----
const mem = new Map();
async function hit(key, limit, windowSec) {
  const url = process.env.UPSTASH_REDIS_REST_URL, tok = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (url && tok) {
    try {
      const r = await fetch(url + '/pipeline', {
        method: 'POST', headers: { Authorization: 'Bearer ' + tok, 'Content-Type': 'application/json' },
        body: JSON.stringify([['INCR', key], ['EXPIRE', key, String(windowSec), 'NX']]),
      });
      const j = await r.json();
      return Number(j[0].result) <= limit;
    } catch (e) { /* fall through to memory */ }
  }
  const now = Date.now(); const e = mem.get(key);
  if (!e || e.reset < now) { mem.set(key, { n: 1, reset: now + windowSec * 1000 }); return true; }
  e.n += 1; return e.n <= limit;
}
const h = (s) => crypto.createHash('sha256').update(String(s)).digest();
const safeEq = (a, b) => crypto.timingSafeEqual(h(a), h(b));
const digits10 = (s) => String(s || '').replace(/\D/g, '').slice(-10);
const text = (p) => (p && p.rich_text ? p.rich_text.map((t) => t.plain_text).join('') : '').trim();
const sel = (p) => (p && p.select ? p.select.name : null);

const STAGE_LABEL = { 'Not started': 'Not started', Pending: 'Not started', 'In progress': 'In progress', 'Awaiting client': 'Waiting for you', Done: 'Done' };
// Service name -> property holding its stage. Only services ticked in "Services" are shown.
const SERVICE_STAGE_PROP = {
  'Traditional video edit': 'Traditional video status',
  'Album design': 'Album status',
  'Wedding highlight': 'Stage - Wedding highlight',
  'Outdoor shoot': 'Stage - Outdoor shoot',
  'Outdoor posters': 'Stage - Outdoor posters',
  'Instagram posters': 'Stage - Instagram posters',
};
const safeUrl = (u) => { try { const x = new URL(u); return x.protocol === 'https:' ? x.href : null; } catch (e) { return null; } };

// Builds the ONLY object the client ever receives. Internal columns (Notes, Pending deliverables, other clients) are never read.
function toPublic(page) {
  const p = page.properties || {};
  const services = ((p['Services'] && p['Services'].multi_select) || []).map((s) => s.name).map((name) => {
    const prop = SERVICE_STAGE_PROP[name];
    const raw = prop ? sel(p[prop]) : null;
    return { name, stage: raw ? (STAGE_LABEL[raw] || raw) : 'Not started' };
  });
  let balance = null;
  const amt = p['Pending payment (INR)'] ? p['Pending payment (INR)'].number : null;
  const pay = sel(p['Payment status']);
  if (typeof amt === 'number') balance = { amount: amt, label: amt === 0 ? 'No balance pending' : null };
  else if (pay === 'Paid') balance = { amount: 0, label: 'No balance pending' };
  return {
    ok: true,
    name: ((p['Client name'] && p['Client name'].title) || []).map((t) => t.plain_text).join('').trim(),
    eventDate: p['Event date'] && p['Event date'].date ? p['Event date'].date.start : null,
    services,
    delivered: {
      photos: p['Photos link'] ? safeUrl(p['Photos link'].url) : null,
      videos: p['Videos link'] ? safeUrl(p['Videos link'].url) : null,
    },
    balance,
    note: text(p['Client note']) || null,
    updated: page.last_edited_time || null,
  };
}

async function lookup(bookingId, phone) {
  const r = await fetch('https://api.notion.com/v1/data_sources/' + DATA_SOURCE_ID + '/query', {
    method: 'POST',
    headers: { Authorization: 'Bearer ' + process.env.NOTION_TOKEN, 'Notion-Version': NOTION_VERSION, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      page_size: 3,
      filter: { and: [
        { property: 'Booking ID', rich_text: { equals: bookingId } },
        { property: 'Show on website', checkbox: { equals: true } },
      ] },
    }),
  });
  if (!r.ok) throw new Error('notion ' + r.status);
  const j = await r.json();
  const rows = (j.results || []).filter((pg) => safeEq(text(pg.properties['Booking ID']).toUpperCase(), bookingId));
  if (rows.length !== 1) return null; // none, or ambiguous: never guess
  const stored = digits10(rows[0].properties['Phone'] && rows[0].properties['Phone'].phone_number);
  if (stored.length !== 10 || !safeEq(stored, phone)) return null;
  return toPublic(rows[0]);
}

module.exports = async (req, res) => {
  const started = Date.now();
  const send = async (code, body) => {
    const wait = MIN_MS - (Date.now() - started);
    if (wait > 0) await new Promise((r) => setTimeout(r, wait));
    res.setHeader('Cache-Control', 'no-store');
    res.setHeader('X-Robots-Tag', 'noindex, nofollow');
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.status(code).send(JSON.stringify(body));
  };
  try {
    if (req.method !== 'POST') return await send(405, { ok: false, message: 'Not allowed.' });
    if (!process.env.NOTION_TOKEN) return await send(503, { ok: false, message: 'Tracking is not available yet. Please call the studio on 99440 36606.' });
    const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});
    const bookingId = String(body.bookingId || '').trim().toUpperCase();
    const phone = digits10(body.phone);
    const ip = String((req.headers['x-forwarded-for'] || '').split(',')[0] || 'unknown').trim();
    if (!(await hit('trk:ip:' + ip, 20, 3600))) return await send(429, LOCKED);
    if (!/^ERR-[A-Z0-9-]{1,16}$/.test(bookingId) || phone.length !== 10) return await send(200, GENERIC);
    if (!(await hit("trk:id:" + bookingId, 8, 3600))) return await send(429, LOCKED);
    const result = await lookup(bookingId, phone);
    return await send(200, result || GENERIC);
  } catch (e) {
    return await send(200, GENERIC); // errors look the same as "not found"
  }
};
module.exports._toPublic = toPublic;
