import seoData from './seo.json';
const siteName = 'Error Studio';
const siteUrl = 'https://www.errorstudio.in';

const seoByTitle = seoData;

const setMeta = (selector, attribute, value) => {
  let element = document.head.querySelector(selector);
  if (!element) {
    element = document.createElement('meta');
    const [key, keyValue] = selector.match(/meta\[([^=]+)="([^"]+)"\]/).slice(1);
    element.setAttribute(key, keyValue);
    document.head.appendChild(element);
  }
  element.setAttribute(attribute, value);
};

export const pageTitle = (title) => {
  const seo = seoByTitle[title] || {
    title: `${title} | ${siteName}`,
    description: 'Photography, videography and creative post-production by Error Studio.',
  };
  const path = seo.path || window.location.pathname;
  const canonicalUrl = `${siteUrl}${path === '/' ? '/' : path.replace(/\/$/, '')}`;

  document.title = seo.title;
  setMeta('meta[name="description"]', 'content', seo.description);
  setMeta('meta[name="robots"]', 'content', seo.noindex ? 'noindex, follow' : 'index, follow');
  setMeta('meta[property="og:title"]', 'content', seo.title);
  setMeta('meta[property="og:description"]', 'content', seo.description);
  setMeta('meta[property="og:url"]', 'content', canonicalUrl);
  setMeta('meta[name="twitter:title"]', 'content', seo.title);
  setMeta('meta[name="twitter:description"]', 'content', seo.description);

  let canonical = document.head.querySelector('link[rel="canonical"]');
  if (!canonical) {
    canonical = document.createElement('link');
    canonical.setAttribute('rel', 'canonical');
    document.head.appendChild(canonical);
  }
  canonical.setAttribute('href', canonicalUrl);

  return document.title;
};
