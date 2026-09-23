import { collection, deleteDoc, doc, getDoc, getDocs, query, serverTimestamp, setDoc, where } from 'firebase/firestore';
import { db } from '../firebase';

// Events live in the existing publicPages collection (public read, owner-only write),
// under ids like "gallery--arun-weds-priya". This keeps the current Firestore rules unchanged.
const COLLECTION = 'publicPages';
const PREFIX = 'gallery--';

export const slugify = text => String(text || '')
  .toLowerCase()
  .normalize('NFKD').replace(/[\u0300-\u036f]/g, '')
  .replace(/[^a-z0-9]+/g, '-')
  .replace(/^-+|-+$/g, '')
  .slice(0, 60);

export const WATERMARK_POSITIONS = [
  ['bottom-right', 'Bottom right'],
  ['bottom-left', 'Bottom left'],
  ['top-right', 'Top right'],
  ['top-left', 'Top left'],
  ['center', 'Centre'],
  ['bottom-center', 'Bottom centre'],
];

export const defaultWatermark = { enabled: true, position: 'bottom-right', size: 18, opacity: 70 };

export const eventUrl = slug => `${window.location.origin}/events/${slug}`;

export async function getEvent(slug) {
  const snapshot = await getDoc(doc(db, COLLECTION, PREFIX + slug));
  if (!snapshot.exists()) return null;
  const data = snapshot.data();
  return data.type === 'event' ? { ...data, slug } : null;
}

export async function listEvents() {
  const snapshot = await getDocs(query(collection(db, COLLECTION), where('type', '==', 'event')));
  return snapshot.docs
    .map(item => ({ ...item.data(), slug: item.id.replace(PREFIX, '') }))
    .sort((a, b) => String(b.date || '').localeCompare(String(a.date || '')));
}

export async function saveEvent(slug, data, email) {
  await setDoc(doc(db, COLLECTION, PREFIX + slug), {
    ...data,
    type: 'event',
    slug,
    updatedAt: serverTimestamp(),
    updatedBy: email,
  }, { merge: true });
}

export async function deleteEvent(slug) {
  await deleteDoc(doc(db, COLLECTION, PREFIX + slug));
}
