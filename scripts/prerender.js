// Writes one static HTML file per public route so crawlers (Google, Bing,
// AI assistants) get the right title, description and canonical before any
// JavaScript runs. The React app still boots from the same bundle.
const fs = require('fs');
const path = require('path');
const seo = require('../src/helper/seo.json');

const siteUrl = 'https://www.errorstudio.in';
const buildDir = path.join(__dirname, '..', 'build');
const template = fs.readFileSync(path.join(buildDir, 'index.html'), 'utf8');

const esc = (v) => String(v).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const pages = Object.values(seo).filter((p) => p.path);
const nav = pages.map((p) => `<li><a href="${p.path}">${esc(p.h1)}</a></li>`).join('');

const setTag = (html, re, replacement) => {
  if (!re.test(html)) throw new Error('prerender: tag not found ' + re);
  return html.replace(re, replacement);
};

for (const page of pages) {
  const url = page.path === '/' ? `${siteUrl}/` : `${siteUrl}${page.path}`;
  let html = template;
  html = setTag(html, /<title>[^<]*<\/title>/, `<title>${esc(page.title)}</title>`);
  html = setTag(html, /<meta name="description" content="[^"]*"\s*\/?>/, `<meta name="description" content="${esc(page.description)}"/>`);
  html = setTag(html, /<link rel="canonical" href="[^"]*"\s*\/?>/, `<link rel="canonical" href="${url}"/>`);
  html = html.replace(/<meta property="og:url" content="[^"]*"\s*\/?>/, `<meta property="og:url" content="${url}"/>`);
  html = html.replace(/<meta property="og:title" content="[^"]*"\s*\/?>/, `<meta property="og:title" content="${esc(page.title)}"/>`);
  html = html.replace(/<meta property="og:description" content="[^"]*"\s*\/?>/, `<meta property="og:description" content="${esc(page.description)}"/>`);
  html = html.replace(/<meta name="twitter:title" content="[^"]*"\s*\/?>/, `<meta name="twitter:title" content="${esc(page.title)}"/>`);
  html = html.replace(/<meta name="twitter:description" content="[^"]*"\s*\/?>/, `<meta name="twitter:description" content="${esc(page.description)}"/>`);
  const body = `<noscript><h1>${esc(page.h1)}</h1><p>${esc(page.description)}</p><p>Error Studio, Co-operative Nagar, Koothapakkam, Cuddalore, Tamil Nadu 607401.</p><ul>${nav}</ul></noscript>`;
  html = setTag(html, /<noscript>[\s\S]*?<\/noscript>/, body);
  const out = page.path === '/' ? path.join(buildDir, 'index.html') : path.join(buildDir, `${page.path.slice(1)}.html`);
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, html);
  console.log('prerendered', page.path, '->', path.relative(buildDir, out));
}
