// Public one-time client password setup. Client follows the setup link on their invoice,
// chooses their own password here; we store only a salted scrypt hash in the tracker,
// exactly the format /api/track verifies. Token is single-use and expires.
const crypto = require('crypto');

const DS_ID = process.env.NOTION_CLIENTS_DATA_SOURCE_ID || '81fd404c-6c10-837b-a664-07d2b479420e';
const NV = '2025-09-03';
const MIN_MS = 900;
const GENERIC = { ok: false, message: 'This setup link is invalid or has already been used. Please ask the studio for a new link.' };
const LOCKED = { ok: false, message: 'Too many attempts. Please try again later or call the studio on 99440 36606.' };

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
async function nf(path, method, body) {
  const r = await fetch('https://api.notion.com/v1' + path, {
    method: method || 'GET',
    headers: { Authorization: 'Bearer ' + process.env.NOTION_TOKEN, 'Notion-Version': NV, 'Content-Type': 'application/json' },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!r.ok) { const e = new Error('notion ' + r.status); e.status = r.status; throw e; }
  return r.json();
}
const text = (p) => (p && p.rich_text ? p.rich_text.map((t) => t.plain_text).join('') : '').trim();
const sha = (s) => crypto.createHash('sha256').update(String(s)).digest('hex');
const tokenEq = (given, storedHex) => /^[0-9a-f]{64}$/.test(storedHex) && crypto.timingSafeEqual(Buffer.from(sha(given), 'hex'), Buffer.from(storedHex, 'hex'));

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
    if (!process.env.NOTION_TOKEN) return await send(503, GENERIC);
    const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});
    const bookingId = String(body.bookingId || '').trim().toUpperCase();
    const token = String(body.token || '').trim();
    const password = String(body.password || '');
    const ip = String((req.headers['x-forwarded-for'] || '').split(',')[0] || 'unknown').trim();
    if (!(await hit('set:ip:' + ip, 20, 3600))) return await send(429, LOCKED);
    if (!/^ERR-[A-Z0-9-]{1,16}$/.test(bookingId) || token.length < 20 || token.length > 120) return await send(200, GENERIC);
    if (password.length < 8 || password.length > 64) return await send(200, { ok: false, message: 'Password must be 8 to 64 characters.' });
    if (!(await hit('set:id:' + bookingId, 8, 3600))) return await send(429, LOCKED);

    const j = await nf('/data_sources/' + DS_ID + '/query', 'POST', { page_size: 3, filter: { property: 'Booking ID', rich_text: { equals: bookingId } } });
    const page = (j.results || [])[0];
    const storedHash = page ? text(page.properties['Setup token hash']) : '';
    const expiry = page ? Date.parse(text(page.properties['Setup token expiry']) || 0) : 0;
    const valid = !!page && !!storedHash && expiry > Date.now() && tokenEq(token, storedHash);
    if (!valid) return await send(200, GENERIC);

    const salt = crypto.randomBytes(16).toString('hex');
    const hash = crypto.scryptSync(password.trim().toLowerCase(), Buffer.from(salt, 'hex'), 32).toString('hex');
    const rt = (s) => ({ rich_text: s ? [{ type: 'text', text: { content: s } }] : [] });
    await nf('/pages/' + page.id, 'PATCH', { properties: {
      'Access hash': rt('s1$' + salt + '$' + hash),
      'Setup token hash': rt(''),
      'Setup token expiry': rt(''),
    } });
    return await send(200, { ok: true });
  } catch (e) {
    return await send(200, GENERIC);
  }
};
