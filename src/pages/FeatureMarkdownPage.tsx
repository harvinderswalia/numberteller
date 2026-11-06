import { Link } from 'react-router-dom';
import Seo from '../components/seo/Seo';
import Breadcrumbs from '../components/marketing/Breadcrumbs';
import CTABand from '../components/marketing/CTABand';
import MarkdownContent from '../components/marketing/MarkdownContent';
import { getFeatureDoc, type ContentDoc } from '../utils/contentLoader';
import { breadcrumbSchema, softwareApplicationSchema } from '../components/seo/schema';
import { ArrowRight } from 'lucide-react';

interface FeaturePageProps {
  slug: string;
  path: string;
}

function relatedLinks(doc: ContentDoc): { href: string; title?: string }[] {
  const related = doc.frontmatter.related;
  if (!Array.isArray(related)) return [];
  return related.map((r: string) => ({ href: r }));
}

function pageTitle(doc: ContentDoc): string {
  return (doc.frontmatter.seoTitle as string) || doc.title;
}

export default function FeatureMarkdownPage({ slug, path }: FeaturePageProps) {
  const doc = getFeatureDoc(slug);
  if (!doc) {
    return (
      <section className="py-20 bg-slate-900">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="text-3xl font-bold text-white mb-4">Page not found</h1>
          <Link to="/features" className="text-cyan-400 hover:underline">View all features</Link>
        </div>
      </section>
    );
  }

  const fm = doc.frontmatter;
  const h1 = (fm.h1 as string) || doc.title;
  const heroSub = (fm.heroSub as string) || doc.description;
  const eyebrow = (fm.eyebrow as string) || '';
  const primaryCta = fm.primaryCta as { label: string; href: string } | undefined;
  const secondaryCta = fm.secondaryCta as { label: string; href: string } | undefined;
  const related = relatedLinks(doc);
  const breadcrumbName = h1.split(':')[0] || h1;

  return (
    <>
      <Seo
        title={pageTitle(doc)}
        description={doc.description}
        path={path}
        jsonLd={[
          softwareApplicationSchema(),
          breadcrumbSchema([
            { name: 'Features', path: '/features' },
            { name: breadcrumbName, path },
          ]),
        ]}
      />

      <section className="py-20 bg-slate-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <Breadcrumbs
            items={[
              { name: 'Features', path: '/features' },
              { name: breadcrumbName, path },
            ]}
          />

          <div className="mt-8 max-w-3xl">
            {eyebrow && (
              <span className="inline-block px-3 py-1 rounded-full text-sm font-medium bg-slate-700/50 text-slate-300 border border-slate-600 mb-6">
                {eyebrow}
              </span>
            )}
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-5">{h1}</h1>
            <p className="text-lg text-gray-400 mb-8">{heroSub}</p>
            <div className="flex flex-col sm:flex-row gap-4">
              {primaryCta && (
                <Link
                  to={primaryCta.href}
                  className="px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold text-lg rounded-xl shadow-2xl shadow-blue-500/25 hover:from-blue-500 hover:to-cyan-500 transition-all hover:scale-105"
                >
                  {primaryCta.label}
                </Link>
              )}
              {secondaryCta && (
                <Link
                  to={secondaryCta.href}
                  className="px-8 py-4 bg-white/5 border border-white/15 text-white font-semibold text-lg rounded-xl hover:bg-white/10 hover:border-white/25 transition-all"
                >
                  {secondaryCta.label}
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-slate-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <MarkdownContent content={doc.body} />
        </div>
      </section>

      {related.length > 0 && (
        <section className="py-16 bg-slate-900">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <h2 className="text-2xl font-bold text-white mb-6">Related tools and guides</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {related.map((r) => (
                <Link
                  key={r.href}
                  to={r.href}
                  className="group bg-slate-800/60 border border-white/10 rounded-xl p-5 hover:border-white/25 hover:bg-slate-800/80 transition-all"
                >
                  <span className="inline-flex items-center gap-1.5 text-sm text-cyan-400 group-hover:gap-2.5 transition-all">
                    {r.href.replace(/^\/(features|learn)\//, '').replace(/-/g, ' ')}
                    <ArrowRight className="w-4 h-4" />
                  </span>
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
