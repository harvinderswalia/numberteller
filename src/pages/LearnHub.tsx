import Seo from '../components/seo/Seo';
import Breadcrumbs from '../components/marketing/Breadcrumbs';
import CTABand from '../components/marketing/CTABand';
import { Link } from 'react-router-dom';
import { SITE } from '../config/site';
import { breadcrumbSchema } from '../components/seo/schema';
import { getAllLearnDocs } from '../utils/contentLoader';
import { BookOpen, Clock, ArrowRight } from 'lucide-react';

interface Article {
  slug: string;
  title: string;
  description: string;
  category: string;
  readingTime: string;
}

function groupByCategory(docs: ReturnType<typeof getAllLearnDocs>): { name: string; articles: Article[] }[] {
  const groups: Record<string, Article[]> = {};
  for (const doc of docs) {
    const category = (doc.frontmatter.category as string) || 'Guides';
    if (!groups[category]) groups[category] = [];
    groups[category].push({
      slug: doc.slug,
      title: doc.title,
      description: doc.description,
      category,
      readingTime: (doc.frontmatter.readingTime as string) || '',
    });
  }
  const order = [
    'Fundamentals',
    'Calculation rules',
    'Lo Shu Grid',
    'Name Correction',
    'Forecasting',
    'Compatibility',
    'Client services',
    'Practice',
    'Guides',
  ];
  return order
    .filter((name) => groups[name])
    .map((name) => ({ name, articles: groups[name] }))
    .concat(
      Object.entries(groups)
        .filter(([name]) => !order.includes(name))
        .map(([name, articles]) => ({ name, articles }))
    );
}

const collectionPageSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'Numerology Calculation Guides for Practitioners',
  description:
    'Practical guides on Pythagorean calculation rules, the Lo Shu grid, name correction and running a numerology practice.',
  url: `${SITE.url}/learn`,
  isPartOf: {
    '@type': 'WebSite',
    name: SITE.name,
    url: SITE.url,
  },
});

export default function LearnHub() {
  const allDocs = getAllLearnDocs();
  const categories = groupByCategory(allDocs);
  const totalArticles = allDocs.length;

  return (
    <>
      <Seo
        title="Numerology Calculation Guides for Practitioners"
        description="Practical guides on Pythagorean calculation rules, the Lo Shu grid, name correction and running a numerology practice."
        path="/learn"
        jsonLd={[collectionPageSchema(), breadcrumbSchema([{ name: 'Learn', path: '/learn' }])]}
      />
      <section className="py-20 bg-slate-900">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <Breadcrumbs items={[{ name: 'Learn', path: '/learn' }]} />
          <div className="mt-8 mb-12">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 mb-5">
              <BookOpen className="w-6 h-6 text-cyan-400" />
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-5 max-w-3xl">
              Numerology guides for practitioners
            </h1>
            <p className="text-lg text-gray-400 max-w-2xl">
              Practical guides on Pythagorean calculation rules, the Lo Shu
              grid, name correction and running a numerology practice. Written
              for practising numerologists, astrologers and coaches who want the
              maths behind the readings.
            </p>
          </div>

          <div className="space-y-12">
            {categories.map((cat) => (
              <div key={cat.name}>
                <h2 className="text-xl font-bold text-white mb-5 flex items-center gap-3">
                  {cat.name}
                  <span className="text-sm font-normal text-gray-500">
                    {cat.articles.length} {cat.articles.length === 1 ? 'article' : 'articles'}
                  </span>
                </h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {cat.articles.map((article) => (
                    <Link
                      key={article.slug}
                      to={`/learn/${article.slug}`}
                      className="group bg-slate-800/60 border border-white/10 rounded-xl p-5 flex flex-col justify-between gap-3 hover:border-white/25 hover:bg-slate-800/80 transition-all"
                    >
                      <div className="min-w-0">
                        <h3 className="text-white font-medium leading-snug mb-1 group-hover:text-cyan-300 transition-colors">
                          {article.title}
                        </h3>
                        <p className="text-sm text-gray-500 line-clamp-2">{article.description}</p>
                      </div>
                      {article.readingTime && (
                        <span className="inline-flex items-center gap-1.5 text-xs text-gray-500">
                          <Clock className="w-3.5 h-3.5" /> {article.readingTime}
                        </span>
                      )}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <p className="text-sm text-gray-500 mt-12">
            {totalArticles} guides and counting. We publish calculation guides
            for practitioners, not consumer horoscopes. If there is a topic you
            want covered, let us know on WhatsApp.
          </p>
        </div>
      </section>
      <CTABand />
    </>
  );
}
