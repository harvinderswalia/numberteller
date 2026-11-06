import { Link, useParams } from 'react-router-dom';
import Seo from '../components/seo/Seo';
import Breadcrumbs from '../components/marketing/Breadcrumbs';
import CTABand from '../components/marketing/CTABand';
import MarkdownContent from '../components/marketing/MarkdownContent';
import { getLearnDoc, getAllLearnDocs } from '../utils/contentLoader';
import { breadcrumbSchema, articleSchema } from '../components/seo/schema';
import { ArrowLeft, Clock } from 'lucide-react';

export default function LearnArticlePage() {
  const { slug } = useParams<{ slug: string }>();
  const doc = slug ? getLearnDoc(slug) : undefined;

  if (!doc) {
    return (
      <section className="py-20 bg-slate-900">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="text-3xl font-bold text-white mb-4">Article not found</h1>
          <Link to="/learn" className="text-cyan-400 hover:underline">Browse all guides</Link>
        </div>
      </section>
    );
  }

  const fm = doc.frontmatter;
  const category = (fm.category as string) || 'Guides';
  const author = (fm.author as string) || 'NumberTeller Editorial Team';
  const published = String(fm.published || '');
  const updated = String(fm.updated || published);
  const readingTime = (fm.readingTime as string) || '';
  const related = (fm.related as string[]) || [];

  const allDocs = getAllLearnDocs();
  const relatedDocs = related
    .map((r) => getLearnDoc(r))
    .filter((d): d is NonNullable<typeof d> => d !== undefined);

  return (
    <>
      <Seo
        title={`${doc.title} | NumberTeller`}
        description={doc.description}
        path={`/learn/${doc.slug}`}
        type="article"
        jsonLd={[
          articleSchema({
            title: doc.title,
            description: doc.description,
            author,
            published: String(published),
            updated: String(updated),
            slug: doc.slug,
          }),
          breadcrumbSchema([
            { name: 'Learn', path: '/learn' },
            { name: doc.title, path: `/learn/${doc.slug}` },
          ]),
        ]}
      />

      <section className="py-20 bg-slate-900">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <Breadcrumbs
            items={[
              { name: 'Learn', path: '/learn' },
              { name: doc.title, path: `/learn/${doc.slug}` },
            ]}
          />

          <div className="mt-8 mb-8">
            <Link
              to="/learn"
              className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-white transition-colors mb-6"
            >
              <ArrowLeft className="w-4 h-4" /> All guides
            </Link>
            <span className="inline-block px-3 py-1 rounded-full text-sm font-medium bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 mb-4">
              {category}
            </span>
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">{doc.title}</h1>
            <p className="text-lg text-gray-400 mb-4">{doc.description}</p>
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
              <span>{author}</span>
              {published && <span>· {published}</span>}
              {readingTime && (
                <span className="inline-flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" /> {readingTime}
                </span>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-slate-950">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <MarkdownContent content={doc.body} />
        </div>
      </section>

      {relatedDocs.length > 0 && (
        <section className="py-12 bg-slate-900">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <h2 className="text-xl font-bold text-white mb-5">Related guides</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {relatedDocs.map((r) => (
                <Link
                  key={r.slug}
                  to={`/learn/${r.slug}`}
                  className="group bg-slate-800/60 border border-white/10 rounded-xl p-5 hover:border-white/25 transition-all"
                >
                  <h3 className="text-white font-medium leading-snug mb-1 group-hover:text-cyan-300 transition-colors">
                    {r.title}
                  </h3>
                  <p className="text-sm text-gray-500 line-clamp-2">{r.description}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <CTABand />
    </>
  );
}
