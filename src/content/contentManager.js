import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';

export const routeKey = (pathname = window.location.pathname) => pathname === '/' ? 'home' : pathname.replace(/^\/+|\/+$/g, '').replace(/[^a-zA-Z0-9_-]+/g, '__');

export function selectorFor(element, root = document.body) {
  if (!element || element === root) return '';
  const parts = [];
  let node = element;
  while (node && node !== root && node.nodeType === 1) {
    if (node.id) { parts.unshift(`#${CSS.escape(node.id)}`); break; }
    const tag = node.tagName.toLowerCase();
    const tagName = node.tagName;
    const siblings = node.parentElement ? [...node.parentElement.children].filter(child => child.tagName === tagName) : [];
    parts.unshift(siblings.length > 1 ? `${tag}:nth-of-type(${siblings.indexOf(node) + 1})` : tag);
    node = node.parentElement;
  }
  return parts.join(' > ');
}

export function applyPatches(patches = {}) {
  Object.entries(patches).forEach(([selector, patch]) => {
    try {
      const element = document.querySelector(selector);
      if (!element || element.closest('[data-admin-ui]')) return;
      if (patch.type === 'text' && element.textContent !== (patch.value ?? '')) element.textContent = patch.value ?? '';
      if (patch.type === 'image' && element.tagName === 'IMG') {
        const hidden = Boolean(patch.deleted);
        if (element.hidden !== hidden) element.hidden = hidden;
        if (patch.value && element.src !== patch.value) element.src = patch.value;
        if (patch.alt !== undefined && element.alt !== patch.alt) element.alt = patch.alt;
      }
    } catch (error) { console.warn('Skipped invalid content selector', selector, error); }
  });
}

export async function loadPublished(pathname) {
  const snapshot = await getDoc(doc(db, 'publicPages', routeKey(pathname)));
  return snapshot.exists() ? snapshot.data().patches || {} : {};
}
