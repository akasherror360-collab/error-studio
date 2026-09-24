// Casual photo protection: no right-click / long-press menu and no dragging on
// photos. Clicking and tapping still work, so lightboxes and links are unchanged.
// This stops casual copying only; the admin area is left alone.
const hasBgImage = (el) => {
  try {
    const bg = window.getComputedStyle(el).backgroundImage;
    return bg && bg !== 'none' && bg.indexOf('url(') !== -1;
  } catch (e) {
    return false;
  }
};

const hasOwnText = (el) => Array.from(el.childNodes || []).some((n) => n.nodeType === 3 && n.textContent.trim());

const isPhoto = (target) => {
  if (!target || target.nodeType !== 1) return false;
  const tag = target.tagName;
  if (tag === 'IMG' || tag === 'PICTURE' || tag === 'CANVAS') return true;
  if (target.closest && target.closest('picture')) return true;
  // Background-image photos (hero, cards): block only on the picture area itself,
  // never on text, links, buttons or form fields sitting on top of it.
  if (target.closest && target.closest('a[href], button, input, textarea, select, [contenteditable]')) return false;
  if (hasOwnText(target)) return false;
  let el = target;
  for (let i = 0; el && el !== document.body && i < 3; i += 1) {
    if (hasBgImage(el)) return true;
    el = el.parentElement;
  }
  return false;
};

const inAdmin = () => window.location.pathname.indexOf('/admin') === 0;

export default function installImageGuard() {
  if (typeof document === 'undefined') return;
  document.addEventListener('contextmenu', (e) => {
    if (!inAdmin() && isPhoto(e.target)) e.preventDefault();
  });
  document.addEventListener('dragstart', (e) => {
    if (!inAdmin() && isPhoto(e.target)) e.preventDefault();
  });
  document.documentElement.classList.add('es-img-guard');
}
