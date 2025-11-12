import { readFileSync } from 'node:fs';
import { run } from 'react-snap';

const staticRoutes = [
  '/',
  '/about',
  '/contact',
  '/communities',
  '/blog',
  '/matchmaking',
  '/partners',
  '/ambassador-program',
  '/careers',
  '/meet-pip',
  '/plan-ideas',
  '/activities',
  '/download',
  '/almost-there',
  '/how-it-works',
  '/press',
  '/faq',
  '/loneliness-epidemic',
  '/real-life-magic',
  '/terms',
  '/privacy',
  '/do-not-share',
  '/cities',
  '/cities-expanded',
];

const cities = JSON.parse(readFileSync('cities_expanded.json', 'utf8'));
const citySlugs = [
  ...new Set(
    cities
      .map((c) => String(c.url2 || '').replace(/^\//, ''))
      .filter(Boolean),
  ),
];

const include = [
  ...staticRoutes,
  ...citySlugs.flatMap((s) => [`/cities/${s}`, `/cities/${s}/queer`]),
];

await run({
  source: 'dist',
  destination: 'dist',
  include,
  concurrency: 1,
  skipThirdPartyRequests: false,
  puppeteerArgs: ['--no-sandbox'],
  removeBlobs: true,
  cacheAjaxRequests: false,
  timeout: 30000,
});


