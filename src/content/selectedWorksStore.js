import { collection, deleteDoc, doc, getDocs, query, serverTimestamp, setDoc, where } from 'firebase/firestore';
import { db } from '../firebase';
import selectedWorksDefaults from './selectedWorksDefaults';

// Selected Works items live in the existing publicPages collection (public read, owner-only write)
// under ids like "selected-work--p-14-3". Bundled posters only get a doc once the owner changes them.
const COLLECTION = 'publicPages';
const PREFIX = 'selected-work--';
const STEP = 10;

export async function loadSelectedWorkDocs() {
  const snapshot = await getDocs(query(collection(db, COLLECTION), where('type', '==', 'selectedWork')));
  return snapshot.docs.map(item => ({ ...item.data(), id: item.id.replace(PREFIX, '') }));
}

// Merge bundled posters with the owner's saved changes and uploads.
export function mergeSelectedWorks(docs = []) {
  const byId = Object.fromEntries(docs.map(item => [item.id, item]));
  const bundled = selectedWorksDefaults.map((item, index) => ({
    ...item, order: index * STEP, hidden: false, deleted: false, bundled: true, ...(byId[item.id] || {}),
    src: item.src,
  }));
  const bundledIds = new Set(selectedWorksDefaults.map(item => item.id));
  const uploads = docs.filter(item => !bundledIds.has(item.id) && item.src).map(item => ({ hidden: false, deleted: false, ...item, bundled: false }));
  return [...bundled, ...uploads].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
}

export const visibleWorks = items => items.filter(item => !item.hidden && !item.deleted);

export async function saveWork(item) {
  const { id, bundled, src, ...rest } = item;
  const data = { ...rest, type: 'selectedWork', updatedAt: serverTimestamp() };
  if (!bundled) data.src = src;
  delete data.w; delete data.h;
  await setDoc(doc(db, COLLECTION, PREFIX + id), data, { merge: true });
}

export async function removeUpload(id) {
  await deleteDoc(doc(db, COLLECTION, PREFIX + id));
}

export const newWorkId = () => `u-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`;
export const ORDER_STEP = STEP;
