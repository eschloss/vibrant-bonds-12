export const onRequestGet: PagesFunction = async ({ request }) => {
  try {
    const reqUrl = new URL(request.url);
    const fileUrl = reqUrl.searchParams.get('url');
    const filename = reqUrl.searchParams.get('filename') || 'asset';
    if (!fileUrl) {
      return new Response('Missing url parameter', { status: 400 });
    }

    const upstream = await fetch(fileUrl, { redirect: 'follow' });
    if (!upstream.ok) {
      return new Response(`Upstream error: ${upstream.status}`, { status: 502 });
    }

    const contentType = upstream.headers.get('content-type') || 'application/octet-stream';
    const body = await upstream.arrayBuffer();

    return new Response(body, {
      headers: {
        'content-type': contentType,
        'content-disposition': `attachment; filename="${filename}"`,
        'cache-control': 'public, max-age=31536000, immutable'
      }
    });
  } catch (err) {
    return new Response('Download failed', { status: 500 });
  }
};


