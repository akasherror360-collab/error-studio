import React, { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import qrcode from '../vendor/qrcode';
import logo from '../assets/images/error-studio-logo.png';
import { eventUrl, getEvent } from './eventStore';
import './events.css';

function qrSvg(text) {
  const qr = qrcode(0, 'M');
  qr.addData(text);
  qr.make();
  return qr.createSvgTag({ cellSize: 8, margin: 0, scalable: true });
}

export default function EventPoster() {
  const { slug } = useParams();
  const [event, setEvent] = useState(undefined);
  const url = eventUrl(slug);
  const svg = useMemo(() => qrSvg(url), [url]);

  useEffect(() => { getEvent(slug).then(setEvent).catch(() => setEvent(null)); }, [slug]);
  useEffect(() => {
    const meta = document.createElement('meta');
    meta.name = 'robots'; meta.content = 'noindex, nofollow';
    document.head.appendChild(meta);
    return () => meta.remove();
  }, []);

  const downloadPng = () => {
    const image = new Image();
    image.onload = () => {
      const size = 1200; const pad = 80;
      const canvas = document.createElement('canvas');
      canvas.width = size + pad * 2; canvas.height = size + pad * 2;
      const ctx = canvas.getContext('2d');
      ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(image, pad, pad, size, size);
      const link = document.createElement('a');
      link.download = `ErrorStudio-${slug}-QR.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    };
    image.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
  };

  return <main className="esg-poster-page">
    <div className="esg-poster-tools">
      <button className="esg-btn esg-btn-red" onClick={() => window.print()}>Print / Save PDF (A5)</button>
      <button className="esg-btn esg-btn-gold" onClick={downloadPng}>Download QR image</button>
      <Link className="esg-btn esg-btn-ghost" style={{ color: '#fff' }} to={`/events/${slug}`}>Open gallery</Link>
    </div>
    <div className="esg-poster">
      <img className="esg-poster-logo" src={logo} alt="Error Studio" />
      <div>
        <p className="esg-poster-kicker">Your photos are here</p>
        <h1>{event?.title || 'Event Photos'}</h1>
      </div>
      <div className="esg-poster-qr" dangerouslySetInnerHTML={{ __html: svg }} />
      <p className="esg-poster-steps">Scan with your phone camera<br />View and download the event photos</p>
      <div>
        <p className="esg-poster-url">{url.replace(/^https?:\/\//, '')}</p>
        <p className="esg-poster-foot">Error Studio · 63845 68059 · @errorstudio.official</p>
      </div>
    </div>
  </main>;
}
