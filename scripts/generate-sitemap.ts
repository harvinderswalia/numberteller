import { writeFileSync, mkdirSync, readdirSync } from 'fs';
import { join } from 'path';
import { MARKETING_ROUTES } from '../src/config/routes';

function getLearnSlugs(): string[] {
  const dir = join(process.cwd(), 'src/content/learn');
  return readdirSync(dir)
    .filter((f) => f.endsWith('.md'))
    .map((f) => f.replace(/\.md$/, ''))
    .sort();
}

const SITE_URL = 'https://www.numberteller.com';
const today = new Date().toISOString().split('T')[0];

const routeUrls = MARKETING_ROUTES.filter((r) => !r.noindex).map((r) => ({
  loc: `${SITE_URL}${r.path}`,
  lastmod: today,
  changefreq: r.path === '/' ? 'weekly' : 'monthly',
  priority: r.path === '/' ? '1.0' : '0.8',
}));

const learnUrls = getLearnSlugs().map((slug) => ({
  loc: `${SITE_URL}/learn/${slug}`,
  lastmod: today,
  changefreq: 'monthly',
  priority: '0.6',
}));

const urls = [...routeUrls, ...learnUrls];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${u.lastmod}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>
`;

const distDir = join(process.cwd(), 'dist');
mkdirSync(distDir, { recursive: true });
writeFileSync(join(distDir, 'sitemap.xml'), xml, 'utf-8');
console.log(`Sitemap generated with ${urls.length} URLs`);
