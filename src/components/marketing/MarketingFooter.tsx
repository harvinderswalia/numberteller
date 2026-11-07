import { Link } from 'react-router-dom';
import { Hash, Phone, Mail, MessageCircle } from 'lucide-react';
import { SITE } from '../../config/site';

const toolLinks = [
  { label: 'Core Chart Reading', path: '/features/core-chart' },
  { label: 'Lo Shu Grid', path: '/features/lo-shu-grid' },
  { label: 'Free Lo Shu grid calculator', path: '/lo-shu-grid-calculator' },
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

const forLinks = [
  { label: 'Numerologists', path: '/for/numerologists' },
  { label: 'Vedic astrologers', path: '/for/vedic-astrologers' },
  { label: 'Life coaches', path: '/for/life-coaches' },
];

const productLinks = [
  { label: 'Features', path: '/features' },
  { label: 'Pricing', path: '/pricing' },
  { label: 'Sample report', path: '/sample-report' },
  { label: 'Book a demo', path: '/demo' },
  { label: 'Learn', path: '/learn' },
];

const compareLinks = [
  { label: 'vs Manual calculation', path: '/compare/manual-calculation' },
];

const companyLinks = [
  { label: 'About', path: '/about' },
  { label: 'Contact', path: '/contact' },
  { label: 'Terms of Use', path: '/terms' },
  { label: 'Privacy Policy', path: '/privacy' },
  { label: 'Billing Policy', path: '/billing-policy' },
];

export default function MarketingFooter() {
  return (
    <footer className="bg-slate-950 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                <Hash className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">NumberTeller</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Numerology software for practising numerologists. Pythagorean
              charts, Lo Shu grid, name correction and client PDF reports —
              calculated for you.
            </p>
            <div className="space-y-2 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-blue-400 flex-shrink-0" />
                <a href={SITE.contact.phoneHref} className="hover:text-white transition-colors">
                  {SITE.contact.phone}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-blue-400 flex-shrink-0" />
                <a href={`mailto:${SITE.contact.email}`} className="hover:text-white transition-colors">
                  {SITE.contact.email}
                </a>
              </div>
              <a
                href={SITE.contact.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-3 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold rounded-xl transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                Chat on WhatsApp
              </a>
            </div>
          </div>

          {/* Tools */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
              Tools
            </h4>
            <ul className="space-y-2">
              {toolLinks.map((t) => (
                <li key={t.path}>
                  <Link to={t.path} className="text-sm text-gray-400 hover:text-white transition-colors">
                    {t.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* For */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
              For
            </h4>
            <ul className="space-y-2">
              {forLinks.map((l) => (
                <li key={l.path}>
                  <Link to={l.path} className="text-sm text-gray-400 hover:text-white transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Product */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
              Product
            </h4>
            <ul className="space-y-2">
              {productLinks.map((l) => (
                <li key={l.path}>
                  <Link to={l.path} className="text-sm text-gray-400 hover:text-white transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
            <h4 className="text-white font-semibold mt-6 mb-4 text-sm uppercase tracking-wider">
              Compare
            </h4>
            <ul className="space-y-2">
              {compareLinks.map((l) => (
                <li key={l.path}>
                  <Link to={l.path} className="text-sm text-gray-400 hover:text-white transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
              Company
            </h4>
            <ul className="space-y-2">
              {companyLinks.map((l) => (
                <li key={l.path}>
                  <Link to={l.path} className="text-sm text-gray-400 hover:text-white transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-2">
          <p className="text-xs text-gray-500 leading-relaxed">
            {SITE.footerLegal}
          </p>
          <p className="text-xs text-gray-500">
            &copy; {new Date().getFullYear()} NumberTeller. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
