export const MAX_IMAGE_BYTES = 620 * 1024;
export const MAX_IMAGE_EDGE = 2400;

export const formatBytes = bytes => {
  if (!Number.isFinite(bytes)) return '';
  if (bytes < 1024) return `${bytes} B`;
  return `${(bytes / 1024).toFixed(bytes < 10240 ? 1 : 0)} KB`;
};

const canvasToBlob = (canvas, type, quality) => new Promise((resolve, reject) => {
  canvas.toBlob(blob => blob ? resolve(blob) : reject(new Error('This browser could not compress the image.')), type, quality);
});

const blobToDataUrl = blob => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.onload = () => resolve(reader.result);
  reader.onerror = () => reject(reader.error || new Error('Could not read the compressed image.'));
  reader.readAsDataURL(blob);
});

export async function compressImage(file, { maxBytes = MAX_IMAGE_BYTES, maxEdge = MAX_IMAGE_EDGE } = {}) {
  if (!file || !/^image\/(jpeg|png|webp|gif)$/.test(file.type)) throw new Error('Use a JPG, PNG, WebP or GIF image.');
  const bitmap = await createImageBitmap(file);
  const scale = Math.min(1, maxEdge / Math.max(bitmap.width, bitmap.height));
  let width = Math.max(1, Math.round(bitmap.width * scale));
  let height = Math.max(1, Math.round(bitmap.height * scale));
  let best;

  for (let resize = 0; resize < 7; resize += 1) {
    const canvas = document.createElement('canvas');
    canvas.width = width; canvas.height = height;
    const context = canvas.getContext('2d', { alpha: false });
    context.imageSmoothingEnabled = true;
    context.imageSmoothingQuality = 'high';
    context.fillStyle = '#ffffff'; context.fillRect(0, 0, width, height);
    context.drawImage(bitmap, 0, 0, width, height);

    for (const quality of [0.9, 0.82, 0.74, 0.66, 0.58, 0.5]) {
      const blob = await canvasToBlob(canvas, 'image/webp', quality);
      if (!best || blob.size < best.size) best = blob;
      if (blob.size <= maxBytes) {
        bitmap.close?.();
        return { dataUrl: await blobToDataUrl(blob), blob, width, height, originalBytes: file.size, compressedBytes: blob.size };
      }
    }
    width = Math.max(640, Math.round(width * 0.82));
    height = Math.max(360, Math.round(height * 0.82));
  }
  bitmap.close?.();
  if (!best || best.size > maxBytes) throw new Error('The image is still too large after compression. Try a smaller crop.');
  return { dataUrl: await blobToDataUrl(best), blob: best, width, height, originalBytes: file.size, compressedBytes: best.size };
}
