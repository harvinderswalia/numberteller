import Seo from '../components/seo/Seo';
import { Link } from 'react-router-dom';
import { Home, Layers, Tag, BookOpen, Compass } from 'lucide-react';

const links = [
  { to: '/', label: 'Home', icon: Home },
  { to: '/features', label: 'Features', icon: Layers },
  { to: '/pricing', label: 'Pricing', icon: Tag },
  { to: '/learn', label: 'Learn', icon: BookOpen },
];

export default function NotFound() {
  return (
    <>
      <Seo
        title="Page not found | NumberTeller"
        description="Page not found"
        path="/404"
        noindex
      />
      <section className="min-h-[70vh] flex items-center justify-center py-24 bg-slate-900">
        <div className="max-w-xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/5 border border-white/10 mb-8">
            <Compass className="w-8 h-8 text-cyan-400" />
          </div>
          <p className="text-6xl font-bold text-white mb-4">404</p>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            This page doesn't exist
          </h1>
          <p className="text-lg text-gray-400 mb-10">
            The page you're looking for may have moved, or the link might be
            broken. Here are some places you can go from here.
          </p>
          <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
            {links.map(({ to, label, icon: Icon }) => (
              <Link
                key={to}
                to={to}
                className="flex items-center gap-3 px-5 py-4 bg-white/5 border border-white/10 rounded-2xl text-white font-medium hover:bg-white/10 hover:border-white/25 transition-all"
              >
                <Icon className="w-5 h-5 text-cyan-400" />
                {label}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
