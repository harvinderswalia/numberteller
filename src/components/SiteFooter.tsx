import { Hash, Phone, Mail, MapPin } from 'lucide-react';

interface SiteFooterProps {
  onNavigate: (page: string) => void;
}

export default function SiteFooter({ onNavigate }: SiteFooterProps) {
  const nav = (page: string) => onNavigate(page);

  const tools = [
    { label: 'Core Chart Reading', page: 'calculator' },
    { label: 'Lo Shu Grid Analysis', page: 'loshu' },
    { label: 'AI Name Correction', page: 'name-correction' },
    { label: 'Compatibility Calculator', page: 'compatibility' },
    { label: 'House / Car / Mobile Number', page: 'house' },
    { label: 'AI Tarot Reading', page: 'tarot' },
    { label: 'Business Numerology', page: 'business' },
    { label: 'Saved Charts', page: 'saved' },
  ];

  const company = [
    { label: 'About Us', page: 'about' },
    { label: 'Features', page: 'features' },
    { label: 'Pricing', page: 'pricing' },
    { label: 'Contact Us', page: 'contact' },
    { label: 'Resources', page: 'resources' },
  ];

  const legal = [
    { label: 'Terms of Use', page: 'terms' },
    { label: 'Privacy Policy', page: 'privacy' },
    { label: 'Billing Policy', page: 'billing' },
  ];

  const keywords = [
    'numerology calculator', 'pythagorean numerology', 'lo shu grid calculator',
    'life path number', 'expression number', 'soul urge number', 'name correction numerology',
    'best numerology calculator app', 'numerology for practitioners', 'numerology chart reading',
    'karmic debt numbers', 'master numbers', 'transit chart numerology', 'compatibility numerology',
  ];

  return (
    <footer className="bg-slate-950 border-t border-white/10">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                <Hash className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">NumberTeller</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              The professional-grade numerology platform built for practitioners. Accurate calculations, AI-powered name correction, and client chart management — everything under one roof.
            </p>
            <div className="space-y-2 text-sm text-gray-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                <span>Docully SaaS Technologies Co. LLC<br />Dubai, UAE</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-blue-400 flex-shrink-0" />
                <a href="tel:+971565043131" className="hover:text-white transition-colors">+971 56 504 3131</a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-blue-400 flex-shrink-0" />
                <a href="mailto:support@numberteller.com" className="hover:text-white transition-colors">support@numberteller.com</a>
              </div>
            </div>
          </div>

          {/* Tools */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Tools</h4>
            <ul className="space-y-2">
              {tools.map(t => (
                <li key={t.page}>
                  <button
                    onClick={() => nav(t.page)}
                    className="text-sm text-gray-400 hover:text-white transition-colors text-left"
                  >
                    {t.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Company</h4>
            <ul className="space-y-2">
              {company.map(c => (
                <li key={c.page}>
                  <button
                    onClick={() => nav(c.page)}
                    className="text-sm text-gray-400 hover:text-white transition-colors text-left"
                  >
                    {c.label}
                  </button>
                </li>
              ))}
            </ul>
            <h4 className="text-white font-semibold mt-6 mb-4 text-sm uppercase tracking-wider">Legal</h4>
            <ul className="space-y-2">
              {legal.map(l => (
                <li key={l.page}>
                  <button
                    onClick={() => nav(l.page)}
                    className="text-sm text-gray-400 hover:text-white transition-colors text-left"
                  >
                    {l.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* WhatsApp CTA */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Connect With Us</h4>
            <a
              href="https://wa.me/971565043131"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-3 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold rounded-xl transition-colors mb-6"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Chat on WhatsApp
            </a>
            <p className="text-xs text-gray-500 leading-relaxed">
              NumberTeller is a product of Docully SaaS Technologies Co. LLC, registered in Dubai, UAE. Built exclusively for numerology practitioners and consultants worldwide.
            </p>
          </div>
        </div>
      </div>

      {/* SEO Keywords Bar */}
      <div className="border-t border-white/5 bg-slate-950/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
          <p className="text-xs text-gray-600 text-center mb-3">Popular searches on NumberTeller:</p>
          <div className="flex flex-wrap justify-center gap-2">
            {keywords.map(kw => (
              <span key={kw} className="text-xs text-gray-600 bg-slate-900 px-2.5 py-1 rounded-full border border-white/5 hover:text-gray-400 cursor-default transition-colors">
                {kw}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-gray-500">
            &copy; {new Date().getFullYear()} Docully SaaS Technologies Co. LLC. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-xs text-gray-500">
            <button onClick={() => nav('terms')} className="hover:text-gray-300 transition-colors">Terms</button>
            <button onClick={() => nav('privacy')} className="hover:text-gray-300 transition-colors">Privacy</button>
            <button onClick={() => nav('billing')} className="hover:text-gray-300 transition-colors">Billing</button>
          </div>
        </div>
      </div>
    </footer>
  );
}
