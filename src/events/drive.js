// Reads event photos from a public Google Drive folder ("Anyone with the link - Viewer").
// The key below is a browser key limited to the Drive API and to errorstudio.in pages.
const DRIVE_KEY = 'AIzaSyBENwkUysOcSETyA7UybLYi-S-Au68hb7A';

export function parseFolderId(input = '') {
  const text = String(input).trim();
  const match = text.match(/folders\/([a-zA-Z0-9_-]{10,})/) || text.match(/[?&]id=([a-zA-Z0-9_-]{10,})/);
  if (match) return match[1];
  return /^[a-zA-Z0-9_-]{10,}$/.test(text) ? text : '';
}

export const folderUrl = folderId => `https://drive.google.com/drive/folders/${folderId}`;

// Google's image server returns resized copies of public Drive images with open CORS headers.
export const imageUrl = (id, width = 800) => `https://lh3.googleusercontent.com/d/${id}=w${width}`;
export const originalUrl = id => `https://lh3.googleusercontent.com/d/${id}=s0`;

export async function listFolderImages(folderId, { order = 'name' } = {}) {
  if (!folderId) throw new Error('Missing Drive folder.');
  const files = [];
  let pageToken = '';
  do {
    const params = new URLSearchParams({
      q: `'${folderId}' in parents and mimeType contains 'image/' and trashed = false`,
      fields: 'nextPageToken, files(id, name, createdTime, imageMediaMetadata(width, height))',
      pageSize: '1000',
      orderBy: order === 'newest' ? 'createdTime desc' : order === 'oldest' ? 'createdTime' : 'name_natural',
      supportsAllDrives: 'true',
      includeItemsFromAllDrives: 'true',
      key: DRIVE_KEY,
    });
    if (pageToken) params.set('pageToken', pageToken);
    const response = await fetch(`https://www.googleapis.com/drive/v3/files?${params}`);
    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
      const reason = data?.error?.message || `Drive error ${response.status}`;
      if (response.status === 404) throw new Error('Drive folder not found. Check the link and that it is shared as "Anyone with the link".');
      throw new Error(reason);
    }
    (data.files || []).forEach(file => files.push({
      id: file.id,
      name: file.name,
      createdTime: file.createdTime,
      width: file.imageMediaMetadata?.width || 0,
      height: file.imageMediaMetadata?.height || 0,
    }));
    pageToken = data.nextPageToken || '';
  } while (pageToken);
  return files;
}
