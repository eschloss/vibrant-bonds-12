export const onRequestGet: PagesFunction = async ({ request }) => {
  const country = request.headers.get('cf-ipcountry') || 'XX';
  // EEA + UK
  const EEA_UK = new Set([
    'AT','BE','BG','HR','CY','CZ','DK','EE','FI','FR','DE','GR','HU','IS','IE','IT','LV','LI','LT','LU','MT','NL','NO','PL','PT','RO','SK','SI','ES','SE','GB'
  ]);

  const body = JSON.stringify({ country, in_eea_uk: EEA_UK.has(country) });
  return new Response(body, {
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'cache-control': 'public, max-age=3600'
    },
  });
};


