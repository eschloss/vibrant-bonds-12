export function getFilenameFromUrl(url: string): string {
  try {
    const parsed = new URL(url, window.location.origin);
    const base = parsed.pathname.split('/').pop() || 'asset';
    return base;
  } catch {
    const parts = url.split('?')[0].split('#')[0].split('/');
    return parts[parts.length - 1] || 'asset';
  }
}

export async function downloadAsset(url: string, suggestedName?: string): Promise<void> {
  try {
    // Prefer serverless proxy when available (avoids CORS issues on cross-origin assets)
    const filename = suggestedName || getFilenameFromUrl(url);
    const proxy = `/api/download?url=${encodeURIComponent(url)}&filename=${encodeURIComponent(filename)}`;

    // In production (Cloudflare Pages), this path will be handled by a function.
    // In local Vite dev, fallback to direct fetch+blob.
    if (location.hostname !== 'localhost') {
      const a = document.createElement('a');
      a.href = proxy;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      return;
    }

    const response = await fetch(url, { mode: 'cors', credentials: 'omit' });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const blob = await response.blob();
    const objectUrl = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = objectUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(objectUrl);
  } catch (err) {
    // Fallback: open in new tab if direct download fails
    window.open(url, '_blank');
  }
}


