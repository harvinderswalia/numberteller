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

  return (
    <Head>
      <title>{title}</title>
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
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:locale" content={SITE.locale} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
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
