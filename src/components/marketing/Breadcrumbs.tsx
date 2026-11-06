import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { Head } from 'vite-react-ssg';
import { breadcrumbSchema } from '../seo/schema';

interface BreadcrumbsProps {
  items: { name: string; path: string }[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  const fullItems = [{ name: 'Home', path: '/' }, ...items];

  return (
    <>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(breadcrumbSchema(fullItems)),
          }}
        />
      </Head>
      <nav
        aria-label="Breadcrumb"
        className="flex items-center gap-1.5 text-sm text-gray-500 flex-wrap"
      >
        {fullItems.map((item, i) => (
          <span key={item.path} className="flex items-center gap-1.5">
            {i > 0 && <ChevronRight className="w-3 h-3 text-gray-600" />}
            {i < fullItems.length - 1 ? (
              <Link to={item.path} className="hover:text-gray-300 transition-colors">
                {item.name}
              </Link>
            ) : (
              <span className="text-gray-400">{item.name}</span>
            )}
          </span>
        ))}
      </nav>
    </>
  );
}
