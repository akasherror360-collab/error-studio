import { originalUrl } from './drive';

export const WATERMARK_SRC = '/watermark-logo.png';

// Returns CSS for the logo overlay on previews. size = logo width as % of the photo width.
export function overlayStyle(watermark) {
  const size = Math.min(60, Math.max(6, Number(watermark?.size) || 18));
  const margin = '3%';
  const style = { width: `${size}%`, opacity: (Number(watermark?.opacity) || 70) / 100 };
  const pos = watermark?.position || 'bottom-right';
  if (pos === 'center') return { ...style, left: '50%', top: '50%', transform: 'translate(-50%, -50%)' };
  if (pos === 'bottom-center') return { ...style, left: '50%', bottom: margin, transform: 'translateX(-50%)' };
  if (pos.includes('top')) style.top = margin; else style.bottom = margin;
  if (pos.includes('left')) style.left = margin; else style.right = margin;
  return style;
}

const loadImage = src => new Promise((resolve, reject) => {
  const image = new Image();
  image.crossOrigin = 'anonymous';
  image.onload = () => resolve(image);
  image.onerror = () => reject(new Error('Could not load image'));
  image.src = src;
});

let logoPromise;
const loadLogo = () => { logoPromise = logoPromise || loadImage(WATERMARK_SRC); return logoPromise; };

// Draws the photo plus the logo on a canvas and returns a JPEG blob.
export async function watermarkedBlob(photoId, watermark) {
  const [photo, logo] = await Promise.all([loadImage(originalUrl(photoId)), loadLogo()]);
  const maxSide = 3000;
  const scale = Math.min(1, maxSide / Math.max(photo.naturalWidth, photo.naturalHeight));
  const width = Math.round(photo.naturalWidth * scale);
  const height = Math.round(photo.naturalHeight * scale);
  const canvas = document.createElement('canvas');
  canvas.width = width; canvas.height = height;
  const ctx = canvas.getContext('2d');
  ctx.drawImage(photo, 0, 0, width, height);
  const size = Math.min(60, Math.max(6, Number(watermark?.size) || 18)) / 100;
  const logoWidth = width * size;
  const logoHeight = logoWidth * (logo.naturalHeight / logo.naturalWidth);
  const margin = width * 0.03;
  const pos = watermark?.position || 'bottom-right';
  let x = width - logoWidth - margin;
  let y = height - logoHeight - margin;
  if (pos.includes('left')) x = margin;
  if (pos.includes('top')) y = margin;
  if (pos === 'center') { x = (width - logoWidth) / 2; y = (height - logoHeight) / 2; }
  if (pos === 'bottom-center') x = (width - logoWidth) / 2;
  ctx.globalAlpha = (Number(watermark?.opacity) || 70) / 100;
  ctx.drawImage(logo, x, y, logoWidth, logoHeight);
  return new Promise((resolve, reject) => canvas.toBlob(blob => blob ? resolve(blob) : reject(new Error('Export failed')), 'image/jpeg', 0.92));
}

export async function originalBlob(photoId) {
  const response = await fetch(originalUrl(photoId));
  if (!response.ok) throw new Error('Download failed');
  return response.blob();
}

export function saveBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url; link.download = filename;
  document.body.appendChild(link); link.click(); link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 4000);
}
