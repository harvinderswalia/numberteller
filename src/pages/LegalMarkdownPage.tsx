import { Link } from 'react-router-dom';
import Seo from '../components/seo/Seo';
import Breadcrumbs from '../components/marketing/Breadcrumbs';
import MarkdownContent from '../components/marketing/MarkdownContent';
import { getLegalDoc, type ContentDoc } from '../utils/contentLoader';
import { breadcrumbSchema } from '../components/seo/schema';

interface LegalPageProps {
  slug: string;
  path: string;
  breadcrumbName: string;
}

function replacePlaceholders(text: string): string {
  const date = new Date().toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  return text
    .replace(/{{EFFECTIVE_DATE}}/g, date)
    .replace(/{{CIN}}/g, '[to be inserted]')
    .replace(/{{GRIEVANCE_OFFICER_NAME}}/g, '[to be appointed]')
    .replace(/{{GRIEVANCE_OFFICER_DESIGNATION}}/g, 'Grievance Officer');
}

export default function LegalMarkdownPage({ slug, path, breadcrumbName }: LegalPageProps) {
  const doc = getLegalDoc(slug);
  if (!doc) {
    return (
      <section className="py-20 bg-slate-900">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="text-3xl font-bold text-white mb-4">Page not found</h1>
          <Link to="/" className="text-cyan-400 hover:underline">Back home</Link>
        </div>
      </section>
    );
  }

  const body = replacePlaceholders(doc.body);
  const title = (doc.frontmatter.seoTitle as string) || `${doc.title} | NumberTeller`;

  return (
    <>
      <Seo
        title={title}
        description={doc.description}
        path={path}
        jsonLd={[breadcrumbSchema([{ name: breadcrumbName, path }])]}
      />
      <section className="py-20 bg-slate-900">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <Breadcrumbs items={[{ name: breadcrumbName, path }]} />
          <div className="mt-8 mb-10">
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-3">{doc.title}</h1>
            <p className="text-gray-400">
              Last updated: {replacePlaceholders(String(doc.frontmatter.lastUpdated || ''))}
            </p>
          </div>
          <MarkdownContent content={body} />
          <div className="mt-12 pt-8 border-t border-white/10 text-sm text-gray-400">
            See also our{' '}
            {slug !== 'terms-of-use' && <Link to="/terms" className="text-cyan-400 hover:underline">Terms of Use</Link>}
            {slug !== 'terms-of-use' && slug !== 'privacy-policy' && ', '}
            {slug !== 'privacy-policy' && <Link to="/privacy" className="text-cyan-400 hover:underline">Privacy Policy</Link>}
            {slug !== 'billing-policy' && ' and '}
            {slug !== 'billing-policy' && <Link to="/billing-policy" className="text-cyan-400 hover:underline">Billing Policy</Link>}.
          </div>
        </div>
      </section>
    </>
  );
}
