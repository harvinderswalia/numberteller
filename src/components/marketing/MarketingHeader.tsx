import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ChevronDown, Hash } from 'lucide-react';

const featureLinks = [
  { label: 'Core Chart Reading', path: '/features/core-chart' },
  { label: 'Lo Shu Grid', path: '/features/lo-shu-grid' },
  { label: 'AI Name Correction', path: '/features/name-correction' },
  { label: 'Compatibility', path: '/features/compatibility' },
  { label: 'Transit Chart', path: '/features/transit-chart' },
  { label: 'Karmic Lessons', path: '/features/karmic-lessons' },
  { label: 'House, Car & Mobile', path: '/features/house-car-mobile' },
  { label: 'Business Numerology', path: '/features/business-numerology' },
  { label: 'AI Tarot Reading', path: '/features/ai-tarot' },
  { label: 'PDF Reports', path: '/features/pdf-reports' },
  { label: 'Over-Energy Analysis', path: '/features/over-energy-analysis' },
  { label: 'Remedies', path: '/features/remedies' },
  { label: 'Personal Year Forecast', path: '/features/personal-year-forecast' },
  { label: 'Saved Client Charts', path: '/features/saved-client-charts' },
  { label: 'Harmony Analysis', path: '/features/harmony-analysis' },
  { label: 'AI Numerology', path: '/features/ai-numerology' },
];

const navLinks = [
  { label: 'Pricing', path: '/pricing' },
  { label: 'Sample report', path: '/sample-report' },
  { label: 'Learn', path: '/learn' },
  { label: 'About', path: '/about' },
  { label: 'Contact', path: '/contact' },
];

export default function MarketingHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [featuresOpen, setFeaturesOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-slate-900/95 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
              <Hash className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-white group-hover:text-blue-300 transition-colors">
              NumberTeller
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {/* Features dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setFeaturesOpen(true)}
              onMouseLeave={() => setFeaturesOpen(false)}
            >
              <Link
                to="/features"
                className="flex items-center gap-1 px-4 py-2 text-gray-300 hover:text-white text-sm font-medium rounded-lg hover:bg-white/5 transition-colors"
              >
                Features <ChevronDown className={`w-4 h-4 transition-transform ${featuresOpen ? 'rotate-180' : ''}`} />
              </Link>
              {featuresOpen && (
                <div className="absolute top-full left-0 mt-1 w-60 bg-slate-800 border border-white/10 rounded-xl shadow-2xl overflow-hidden">
                  <Link
                    to="/features"
                    className="block w-full text-left px-4 py-3 text-xs font-semibold text-blue-400 hover:bg-white/5 border-b border-white/5"
                  >
                    All 16 tools →
                  </Link>
                  {featureLinks.map((f) => (
                    <Link
                      key={f.path}
                      to={f.path}
                      className="block w-full text-left px-4 py-3 text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-colors border-b border-white/5 last:border-0"
                    >
                      {f.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {navLinks.map((l) => (
              <Link
                key={l.path}
                to={l.path}
                className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
              >
                {l.label}
              </Link>
            ))}
          </nav>

          {/* Desktop auth */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              to="/app/login"
              className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white transition-colors"
            >
              Sign in
            </Link>
            <Link
              to="/app/signup"
              className="px-5 py-2 text-sm font-semibold bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg hover:from-blue-500 hover:to-cyan-500 transition-all shadow-lg shadow-blue-500/20"
            >
              Start free trial
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 text-gray-300 hover:text-white"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-slate-900 border-t border-white/10 px-4 py-4 space-y-1 max-h-[calc(100vh-4rem)] overflow-y-auto">
          <div className="pb-2 mb-2 border-b border-white/10">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-3 mb-2">
              Features
            </p>
            <Link
              to="/features"
              onClick={() => setMobileOpen(false)}
              className="block px-3 py-2.5 text-sm font-semibold text-blue-400 hover:bg-white/5 rounded-lg"
            >
              All 16 tools →
            </Link>
            {featureLinks.map((f) => (
              <Link
                key={f.path}
                to={f.path}
                onClick={() => setMobileOpen(false)}
                className="block px-3 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-white/5 rounded-lg"
              >
                {f.label}
              </Link>
            ))}
          </div>
          {navLinks.map((l) => (
            <Link
              key={l.path}
              to={l.path}
              onClick={() => setMobileOpen(false)}
              className="block px-3 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-white/5 rounded-lg"
            >
              {l.label}
            </Link>
          ))}
          <div className="pt-3 mt-2 border-t border-white/10 flex flex-col gap-2">
            <Link
              to="/app/login"
              onClick={() => setMobileOpen(false)}
              className="w-full py-2.5 text-sm font-medium text-gray-300 border border-white/20 rounded-lg text-center"
            >
              Sign in
            </Link>
            <Link
              to="/app/signup"
              onClick={() => setMobileOpen(false)}
              className="w-full py-2.5 text-sm font-semibold bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg text-center"
            >
              Start free trial
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
