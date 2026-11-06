import { Head } from 'vite-react-ssg';
import { SITE } from '../../config/site';

interface SeoProps {
  title: string;
  description: string;
  path: string;
  noindex?: boolean;
  type?: 'website' | 'article';
  jsonLd?: object[];
}

function truncateTitle(title: string): string {
  const suffix = ' | NumberTeller';
  if (title.endsWith(suffix)) {
    const base = title.slice(0, -suffix.length);
    if (base.length + suffix.length <= 60) return title;
    if (base.length <= 60) return base;
  } else {
    if (title.length <= 60) return title;
  }
  const base = title.endsWith(suffix) ? title.slice(0, -suffix.length) : title;
  const cut = base.slice(0, 57);
  const lastSpace = cut.lastIndexOf(' ');
  return (lastSpace > 30 ? cut.slice(0, lastSpace) : cut) + '\u2026';
}

export default function Seo({
  title,
  description,
  path,
  noindex,
  type = 'website',
  jsonLd = [],
}: SeoProps) {
  const canonical = `${SITE.url}${path}`;
  const ogImage = `${SITE.url}${SITE.ogImage}`;
  const finalTitle = truncateTitle(title);

  return (
    <Head>
      <title>{finalTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />
      <meta
        name="robots"
        content={
          noindex
            ? 'noindex, nofollow'
            : 'index, follow, max-image-preview:large'
        }
      />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={SITE.name} />
      <meta property="og:title" content={finalTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:locale" content={SITE.locale} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={finalTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      {jsonLd.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </Head>
  );
}
