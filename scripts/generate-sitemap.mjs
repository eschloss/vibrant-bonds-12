import fs from 'node:fs/promises'

const EN_DOMAIN = 'https://pulsenow.app'
const ES_DOMAIN = 'https://es.pulsenow.app'
const TODAY = new Date().toISOString().slice(0, 10)

const baseRoutes = [
  { path: '/', changefreq: 'weekly', priority: '1.0' },
  { path: '/cities', changefreq: 'weekly', priority: '0.8' },
  { path: '/cities-expanded', changefreq: 'weekly', priority: '0.8' },
  { path: '/communities', changefreq: 'weekly', priority: '0.8' },
  { path: '/about', changefreq: 'monthly', priority: '0.7' },
  { path: '/contact', changefreq: 'monthly', priority: '0.7' },
  { path: '/blog', changefreq: 'weekly', priority: '0.8' },
  { path: '/matchmaking', changefreq: 'weekly', priority: '0.9' },
  { path: '/partners', changefreq: 'monthly', priority: '0.7' },
  { path: '/ambassador-program', changefreq: 'monthly', priority: '0.7' },
  { path: '/careers', changefreq: 'monthly', priority: '0.7' },
  { path: '/meet-pip', changefreq: 'monthly', priority: '0.7' },
  { path: '/plan-ideas', changefreq: 'monthly', priority: '0.7' },
  { path: '/activities', changefreq: 'weekly', priority: '0.8' },
  { path: '/how-it-works', changefreq: 'monthly', priority: '0.7' },
  { path: '/download', changefreq: 'monthly', priority: '0.8' },
  { path: '/faq', changefreq: 'monthly', priority: '0.7' },
  { path: '/loneliness-epidemic', changefreq: 'monthly', priority: '0.7' },
  { path: '/real-life-magic', changefreq: 'monthly', priority: '0.7' },
  { path: '/terms', changefreq: 'yearly', priority: '0.3' },
  { path: '/privacy', changefreq: 'yearly', priority: '0.3' }
]

// Keep in sync with Careers page viewable roles
const careerSlugs = [
  'social-growth-intern',
  'social-media-intern',
  'partnership-manager-intern',
  'affiliate-marketing-manager-intern',
  'social-media-talent-pool',
  'growth-team-talent-pool',
  'technical-talent-pool',
  'partnership-talent-pool',
  'community-manager-talent-pool'
]

async function fetchCities() {
  try {
    const res = await fetch('https://api.kikiapp.eu/auth/get_all_cities', { cache: 'no-store' })
    if (!res.ok) throw new Error(`Failed to fetch cities: ${res.status}`)
    const data = await res.json()
    // Expecting objects with url2 like '/london', '/london/queer', etc.
    const unique = new Set()
    const urls = []
    for (const c of data || []) {
      if (!c?.url2 || typeof c.url2 !== 'string') continue
      const path = '/cities' + c.url2
      if (!unique.has(path)) {
        unique.add(path)
        urls.push(path)
      }
    }
    return urls.sort()
  } catch (e) {
    console.error('[sitemap] Using existing sitemap cities fallback due to error:', e?.message || e)
    return []
  }
}

function xmlUrl(loc, lastmod, changefreq, priority) {
  return `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${lastmod}</lastmod>\n    ${changefreq ? `<changefreq>${changefreq}</changefreq>` : ''}\n    ${priority ? `<priority>${priority}</priority>` : ''}\n  </url>`
}

async function generate() {
  const urls = []

  // Base routes (EN only)
  for (const r of baseRoutes) {
    urls.push(xmlUrl(EN_DOMAIN + r.path, TODAY, r.changefreq, r.priority))
  }

  // Careers detail pages
  for (const slug of careerSlugs) {
    urls.push(xmlUrl(`${EN_DOMAIN}/careers/${slug}`, TODAY, 'monthly', '0.6'))
  }

  // Cities (EN + ES domains)
  const cityPaths = await fetchCities()
  for (const p of cityPaths) {
    urls.push(xmlUrl(EN_DOMAIN + p, TODAY, 'weekly', '0.8'))
    urls.push(xmlUrl(ES_DOMAIN + p, TODAY, 'weekly', '0.8'))
  }

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...urls,
    '</urlset>'
  ].join('\n')

  await fs.writeFile(new URL('../public/sitemap.xml', import.meta.url), xml)
  console.log(`[sitemap] Wrote ${urls.length} URLs with lastmod ${TODAY}`)
}

generate().catch((e) => {
  console.error('[sitemap] Failed:', e)
  process.exit(1)
})


