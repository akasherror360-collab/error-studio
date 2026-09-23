import React, { useEffect, useMemo, useRef, useState } from 'react';
import { GoogleAuthProvider, browserLocalPersistence, getRedirectResult, onAuthStateChanged, setPersistence, signInWithPopup, signInWithRedirect, signOut } from 'firebase/auth';
import { deleteDoc, doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';
import { routeKey, selectorFor } from '../content/contentManager';
import { compressImage, formatBytes } from './imageCompression';
import EventsAdmin from './EventsAdmin';
import './admin.css';

const OWNER_EMAIL = 'akasherror360@gmail.com';
const REDIRECT_PENDING_KEY = 'esAdminGoogleRedirectPending';
const REDIRECT_PENDING_MAX_AGE_MS = 10 * 60 * 1000;

const markRedirectPending = () => { try { localStorage.setItem(REDIRECT_PENDING_KEY, String(Date.now())); } catch (_) {} };
const takeRedirectPending = () => {
  try {
    const raw = localStorage.getItem(REDIRECT_PENDING_KEY);
    localStorage.removeItem(REDIRECT_PENDING_KEY);
    const at = Number(raw);
    return Number.isFinite(at) && Date.now() - at < REDIRECT_PENDING_MAX_AGE_MS;
  } catch (_) { return false; }
};
const EDITABLE_TEXT = 'h1,h2,h3,h4,h5,h6,p,li,span,a,button,label,blockquote,figcaption,small,strong,em';
const hasOwnText = element => [...element.childNodes].some(node => node.nodeType === Node.TEXT_NODE && node.textContent.trim());
const pages = [
  ['Home','/'],['About','/about'],['Services','/service'],['Wedding photography','/service/wedding-photography'],
  ['Videography','/service/videography'],['Video editing','/service/video-editing'],['Commercial','/service/commercial'],
  ['Portfolio','/portfolio'],['Blog','/blog'],['Contact','/contact'],['Team','/team'],['FAQ','/faq']
];

const friendlyAuthError = error => {
  if (error?.code === 'auth/popup-closed-by-user' || error?.code === 'auth/cancelled-popup-request') return 'The Google window was closed before sign-in finished. Please try again.';
  if (error?.code === 'auth/network-request-failed') return 'The network interrupted Google sign-in. Check your connection and try again.';
  if (error?.code === 'auth/unauthorized-domain') return 'This website is not authorized for Google sign-in. Please contact support.';
  if (error?.code === 'auth/missing-or-invalid-nonce' || error?.code === 'auth/no-auth-event') return 'The secure sign-in response was not recognized. This happens when sign-in starts in one browser or app and finishes in another. Open https://www.errorstudio.in/admin directly in Chrome or Safari and try again.';
  if (error?.code === 'auth/web-storage-unsupported' || error?.code === 'auth/operation-not-supported-in-this-environment') return 'This browser blocks the storage Google sign-in needs. Allow cookies and site data, or open https://www.errorstudio.in/admin directly in Chrome or Safari.';
  return error?.message || 'Please try again.';
};

export default function AdminPanel() {
  const [user, setUser] = useState(undefined);
  const [path, setPath] = useState('/');
  const [draft, setDraft] = useState({});
  const [selected, setSelected] = useState(null);
  const [status, setStatus] = useState('');
  const [busy, setBusy] = useState(false);
  const [pendingImage, setPendingImage] = useState(null);
  const [tab, setTab] = useState(() => new URLSearchParams(window.location.search).get('tab') === 'events' ? 'events' : 'site');
  const iframeRef = useRef(null);
  const key = useMemo(() => routeKey(path), [path]);

  useEffect(() => {
    let active = true;
    const unsubscribe = onAuthStateChanged(auth, current => {
      if (active) setUser(current);
    });

    const wasReturning = takeRedirectPending();
    getRedirectResult(auth).then(async result => {
      if (!active) return;
      if (!result?.user) {
        if (wasReturning) setStatus('Google sign-in finished, but this browser did not keep the secure session. This happens when sign-in starts in one browser or app and finishes in another. Open https://www.errorstudio.in/admin directly in Chrome or Safari and sign in again.');
        return;
      }
      if (result.user.email !== OWNER_EMAIL) {
        await signOut(auth);
        if (active) setStatus('This Google account is not authorized. Sign in with akasherror360@gmail.com.');
      } else if (active) {
        setStatus('Signed in successfully.');
      }
    }).catch(error => {
      if (active) setStatus(`Google sign-in failed: ${friendlyAuthError(error)}`);
    });

    return () => { active = false; unsubscribe(); };
  }, []);
  useEffect(() => {
    if (user?.email !== OWNER_EMAIL) return;
    (async () => {
      const snapshot = await getDoc(doc(db, 'draftPages', key));
      setDraft(snapshot.exists() ? snapshot.data().patches || {} : {});
      setSelected(null); setPendingImage(null);
    })().catch(error => setStatus(`Could not load draft: ${error.message}`));
  }, [key, user]);

  const frameReady = () => {
    const frameDoc = iframeRef.current?.contentDocument;
    if (!frameDoc) return;
    applyToFrame(frameDoc, draft);
    frameDoc.querySelectorAll(`${EDITABLE_TEXT},img`).forEach(element => { element.dataset.adminEditable = 'true'; });
    // Some site copy is rendered in plain divs by template components rather than p tags.
    // Include only divs that own text, not layout wrappers, so every paragraph-like block
    // can be edited without turning the whole section into one giant text field.
    frameDoc.querySelectorAll('div').forEach(element => {
      if (hasOwnText(element)) element.dataset.adminEditable = 'true';
    });
    frameDoc.addEventListener('click', selectElement, true);
  };

  const selectElement = event => {
    const element = event.target.closest?.('[data-admin-editable="true"]');
    if (!element) return;
    event.preventDefault(); event.stopPropagation();
    const selector = selectorFor(element, iframeRef.current.contentDocument.body);
    const type = element.tagName === 'IMG' ? 'image' : 'text';
    const existing = draft[selector];
    setSelected({ selector, type, value: existing?.value ?? (type === 'image' ? element.currentSrc || element.src : element.textContent.trim()), alt: existing?.alt ?? element.alt ?? '' });
  };

  const applyToFrame = (frameDoc, patches) => {
    Object.entries(patches).forEach(([selector, patch]) => {
      try {
        const element = frameDoc.querySelector(selector);
        if (!element) return;
        if (patch.type === 'text') element.textContent = patch.value ?? '';
        if (patch.type === 'image' && element.tagName === 'IMG') { element.hidden = Boolean(patch.deleted); if (patch.value) element.src = patch.value; element.alt = patch.alt || ''; }
      } catch (_) {}
    });
  };

  const updateSelected = next => {
    const patch = { type: selected.type, value: next.value, ...(selected.type === 'image' ? { alt: next.alt, deleted: Boolean(next.deleted) } : {}) };
    const nextDraft = { ...draft, [selected.selector]: patch };
    setDraft(nextDraft); setSelected({ ...selected, ...patch });
    applyToFrame(iframeRef.current.contentDocument, nextDraft);
  };

  const saveDraft = async () => {
    setBusy(true); setStatus('Saving draft…');
    try { await setDoc(doc(db, 'draftPages', key), { path, patches: draft, updatedAt: serverTimestamp(), updatedBy: user.email }); setStatus('Draft saved. Public site is unchanged.'); }
    catch (error) { setStatus(`Save failed: ${error.message}`); }
    finally { setBusy(false); }
  };

  const publish = async () => {
    if (!window.confirm(`Publish ${Object.keys(draft).length} change(s) to ${path}?`)) return;
    setBusy(true); setStatus('Publishing…');
    try { await setDoc(doc(db, 'publicPages', key), { path, patches: draft, publishedAt: serverTimestamp(), publishedBy: user.email }); setStatus('Published. Open the public page to verify.'); }
    catch (error) { setStatus(`Publish failed: ${error.message}`); }
    finally { setBusy(false); }
  };

  const restore = async () => {
    if (!window.confirm(`Remove all published overrides for ${path} and restore the bundled page?`)) return;
    setBusy(true);
    try { await deleteDoc(doc(db, 'publicPages', key)); setStatus('Bundled page restored. The saved draft is still available.'); }
    catch (error) { setStatus(`Restore failed: ${error.message}`); }
    finally { setBusy(false); }
  };

  const removeChange = () => {
    const next = { ...draft }; delete next[selected.selector]; setDraft(next); setSelected(null);
    iframeRef.current.contentWindow.location.reload();
  };

  const uploadImage = async event => {
    const file = event.target.files?.[0]; if (!file) return;
    setBusy(true); setPendingImage(null); setStatus('Optimizing image for the website…');
    try {
      const result = await compressImage(file);
      setPendingImage({ ...result, name: file.name, alt: selected.alt || '' });
      setStatus(`Preview ready: ${formatBytes(result.originalBytes)} → ${formatBytes(result.compressedBytes)}. Review it, then use this image.`);
    } catch (error) { setStatus(`Image optimization failed: ${error.message}`); }
    finally { setBusy(false); event.target.value = ''; }
  };

  const acceptPendingImage = () => {
    if (!pendingImage) return;
    updateSelected({ ...selected, value: pendingImage.dataUrl, alt: pendingImage.alt, deleted: false });
    setStatus(`Image added to the draft at ${formatBytes(pendingImage.compressedBytes)}. Save draft or publish when ready.`);
    setPendingImage(null);
  };

  const signIn = async () => {
    setBusy(true);
    setStatus('Opening secure Google sign-in…');
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' });
    const mobileBrowser = /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent) || window.matchMedia('(pointer: coarse) and (max-width: 900px)').matches;

    try {
      if (mobileBrowser) {
        setStatus('Taking you to Google sign-in. You will return here automatically.');
        await setPersistence(auth, browserLocalPersistence);
        markRedirectPending();
        await signInWithRedirect(auth, provider);
        return;
      }

      const result = await signInWithPopup(auth, provider);
      if (result.user.email !== OWNER_EMAIL) {
        await signOut(auth);
        setStatus('This Google account is not authorized. Sign in with akasherror360@gmail.com.');
      }
    } catch (error) {
      const redirectable = ['auth/popup-blocked', 'auth/operation-not-supported-in-this-environment', 'auth/web-storage-unsupported'].includes(error.code);
      if (redirectable) {
        setStatus('The sign-in popup was blocked. Switching to full-page Google sign-in…');
        try {
          await setPersistence(auth, browserLocalPersistence);
          markRedirectPending();
          await signInWithRedirect(auth, provider);
          return;
        } catch (redirectError) {
          setStatus(`Google sign-in failed: ${friendlyAuthError(redirectError)}`);
        }
      } else {
        setStatus(`Google sign-in failed: ${friendlyAuthError(error)}`);
      }
    } finally {
      setBusy(false);
    }
  };

  if (user === undefined) return <main className="admin-login">Loading secure admin…</main>;
  if (!user || user.email !== OWNER_EMAIL) return <main className="admin-login" data-admin-ui><section><h1>Error Studio Admin</h1><p>Sign in with the owner Google account to edit the website.</p><button disabled={busy} onClick={signIn}>{busy ? 'Opening Google sign-in…' : 'Sign in with Google'}</button>{status && <p role="alert">{status}</p>}<small>On phones, sign-in opens as a full page and returns here automatically.</small></section></main>;

  const tabs = <div className="admin-tabs"><button className={tab === 'site' ? 'active' : ''} onClick={() => setTab('site')}>Website</button><button className={tab === 'events' ? 'active' : ''} onClick={() => setTab('events')}>Event galleries</button></div>;
  if (tab === 'events') return <main className="admin-shell events-mode" data-admin-ui>
    <header><div><strong>Error Studio Admin</strong><small>{user.email}</small></div><nav>{tabs}<button className="secondary" onClick={() => signOut(auth)}>Sign out</button></nav></header>
    <EventsAdmin user={user} />
  </main>;

  return <main className="admin-shell" data-admin-ui>
    <header><div><strong>Error Studio Admin</strong><small>{user.email}</small></div><nav>{tabs}<a href={path} target="_blank" rel="noreferrer">Open public page</a><button onClick={() => signOut(auth)}>Sign out</button></nav></header>
    <aside>
      <label>Page<select value={path} onChange={e => setPath(e.target.value)}>{pages.map(([name,url]) => <option key={url} value={url}>{name}</option>)}</select></label>
      <p className="hint">Click highlighted text or an image in the preview.</p>
      {selected ? <section className="editor"><h2>{selected.type === 'image' ? 'Edit image' : 'Edit text'}</h2><code>{selected.selector}</code>
        {selected.type === 'text' ? <textarea rows="8" value={selected.value} onChange={e => updateSelected({ ...selected, value: e.target.value })}/> : <><img src={selected.value} alt="Selected preview"/><label>Replace image<input type="file" accept="image/jpeg,image/png,image/webp,image/gif" onChange={uploadImage}/></label>{pendingImage && <div className="image-review"><strong>Compressed preview</strong><img src={pendingImage.dataUrl} alt="Compressed upload preview"/><small>{pendingImage.width} × {pendingImage.height} · {formatBytes(pendingImage.originalBytes)} → {formatBytes(pendingImage.compressedBytes)}</small><label>Alt text<input value={pendingImage.alt} onChange={e => setPendingImage({ ...pendingImage, alt: e.target.value })}/></label><div><button onClick={acceptPendingImage}>Use this image</button><button className="secondary" onClick={() => setPendingImage(null)}>Cancel</button></div></div>}<label>Alt text<input value={selected.alt} onChange={e => updateSelected({ ...selected, alt: e.target.value })}/></label><button className="secondary danger" onClick={() => updateSelected({ ...selected, deleted: !selected.deleted })}>{selected.deleted ? 'Restore image in draft' : 'Remove image from page'}</button></>}
        <button className="secondary danger" onClick={removeChange}>Remove this draft change</button>
      </section> : <div className="empty">Nothing selected</div>}
      <div className="actions"><button disabled={busy} onClick={saveDraft}>Save draft</button><button disabled={busy} onClick={publish}>Publish</button><button className="secondary danger" disabled={busy} onClick={restore}>Restore bundled page</button></div>
      {status && <p className="status" role="status">{status}</p>}
    </aside>
    <section className="preview"><div className="preview-bar">Preview: {path} · {Object.keys(draft).length} draft change(s)</div><iframe ref={iframeRef} title="Website preview" src={`${path}?adminPreview=1`} onLoad={frameReady}/></section>
  </main>;
}
