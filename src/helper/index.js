const siteName = 'Error Studio';
const siteUrl = 'https://www.errorstudio.in';

const seoByTitle = {
  Home: {
    path: '/',
    title: 'Error Studio | Wedding Photographer in Cuddalore, Tamil Nadu',
    description: 'Error Studio is a wedding photographer in Cuddalore offering candid wedding photography, cinematic films, album design and event coverage across Tamil Nadu.',
  },
  About: {
    path: '/about',
    title: 'About Error Studio | Photography & Post-Production',
    description: 'Learn about Error Studio, a Tamil Nadu photography and post-production agency focused on visual storytelling.',
  },
  Service: {
    path: '/service',
    title: 'Photography, Videography & Editing Services | Error Studio',
    description: 'Explore Error Studio services including wedding photography, cinematic videography, creative editing and commercial visuals.',
  },
  'Wedding Photography': {
    path: '/service/wedding-photography',
    title: 'Wedding Photography | Error Studio',
    description: 'Explore Error Studio wedding photography services for documenting celebrations and lasting moments.',
  },
  'Cinematic Videography': {
    path: '/service/videography',
    title: 'Cinematic Videography | Error Studio',
    description: 'Explore cinematic videography services from Error Studio for weddings, events and brand stories.',
  },
  'Creative Editing': {
    path: '/service/video-editing',
    title: 'Creative Video Editing | Error Studio',
    description: 'Explore Error Studio post-production and creative video editing services for polished visual stories.',
  },
  'Brand & Commercial': {
    path: '/service/commercial',
    title: 'Brand & Commercial Visuals | Error Studio',
    description: 'Explore Error Studio photography and videography services for brands, products and commercial projects.',
  },
  Portfolio: {
    path: '/portfolio',
    title: 'Photography & Videography Portfolio | Error Studio',
    description: 'View selected photography, videography and creative work from Error Studio.',
  },
  Blog: {
    path: '/blog',
    title: 'Photography & Creative Blog | Error Studio',
    description: 'Read photography, visual storytelling and creative business articles from Error Studio.',
  },
  'Contact Us': {
    path: '/contact',
    title: 'Contact Error Studio | Book a Shoot',
    description: 'Contact Error Studio to discuss photography, videography, editing or commercial visual projects.',
  },
  'Frequently Asked Questions': {
    path: '/faq',
    title: 'Frequently Asked Questions | Error Studio',
    description: 'Find answers to frequently asked questions about working with Error Studio.',
  },
  Error: {
    title: 'Page Not Found | Error Studio',
    description: 'The requested page could not be found.',
    noindex: true,
  },
};

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
