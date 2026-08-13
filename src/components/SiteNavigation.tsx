import { useState } from 'react';
import { Menu, X, ChevronDown, Hash, LayoutDashboard, MessageCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { Page } from '../App';
import { WHATSAPP_LINK } from '../utils/subscription';

interface SiteNavigationProps {
  onNavigate: (page: string) => void;
  onShowAuth: () => void;
  onShowSignIn?: () => void;
  currentPage?: Page;
}

export default function SiteNavigation({ onNavigate, onShowAuth, onShowSignIn, currentPage }: SiteNavigationProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(false);
  const { user, signOut } = useAuth();

  const tools = [
    { label: 'Core Chart Reading', page: 'calculator' },
    { label: 'Lo Shu Grid', page: 'loshu' },
    { label: 'AI Name Correction', page: 'name-correction' },
    { label: 'Compatibility', page: 'compatibility' },
    { label: 'House / Car / Mobile Number', page: 'house' },
    { label: 'AI Tarot Reading', page: 'tarot', badge: 'NEW' },
    { label: 'Business Numerology', page: 'business', badge: 'NEW' },
  ];

  const navLinks = [
    { label: 'Features', page: 'features' },
    { label: 'Pricing', page: 'pricing' },
    { label: 'Resources', page: 'resources' },
    { label: 'About', page: 'about' },
    { label: 'Contact', page: 'contact' },
  ];

  const nav = (page: string) => {
    onNavigate(page);
    setMobileOpen(false);
    setToolsOpen(false);
  };

  const handleSignIn = () => {
    (onShowSignIn ?? onShowAuth)();
    setMobileOpen(false);
  };

  const handleSignUp = () => {
    onShowAuth();
    setMobileOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-slate-900/95 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <button
            onClick={() => nav(user ? 'dashboard' : 'home')}
            className="flex items-center gap-2 group"
          >
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
              <Hash className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-white group-hover:text-blue-300 transition-colors">
              NumberTeller
            </span>
          </button>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {/* Tools dropdown */}
            <div className="relative">
              <button
                onMouseEnter={() => setToolsOpen(true)}
                onMouseLeave={() => setToolsOpen(false)}
                className="flex items-center gap-1 px-4 py-2 text-gray-300 hover:text-white text-sm font-medium rounded-lg hover:bg-white/5 transition-colors"
              >
                Tools <ChevronDown className={`w-4 h-4 transition-transform ${toolsOpen ? 'rotate-180' : ''}`} />
              </button>
              {toolsOpen && (
                <div
                  onMouseEnter={() => setToolsOpen(true)}
                  onMouseLeave={() => setToolsOpen(false)}
                  className="absolute top-full left-0 mt-1 w-56 bg-slate-800 border border-white/10 rounded-xl shadow-2xl overflow-hidden"
                >
                  {tools.map(t => (
                    <button
                      key={t.page}
                      onClick={() => nav(t.page)}
                      className="w-full text-left px-4 py-3 text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-colors border-b border-white/5 last:border-0 flex items-center justify-between"
                    >
                      {t.label}
                      {t.badge && (
                        <span className="text-[9px] font-bold bg-blue-500 text-white px-1.5 py-0.5 rounded-full">{t.badge}</span>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {navLinks.map(l => (
              <button
                key={l.page}
                onClick={() => nav(l.page)}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                  currentPage === l.page
                    ? 'text-white bg-white/10'
                    : 'text-gray-300 hover:text-white hover:bg-white/5'
                }`}
              >
                {l.label}
              </button>
            ))}
          </nav>

          {/* Desktop Auth / User actions */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-2 text-sm font-semibold text-[#25D366] border border-[#25D366]/30 hover:bg-[#25D366]/10 rounded-lg transition-colors"
              title="Chat with us on WhatsApp"
            >
              <MessageCircle className="w-4 h-4" />
              WhatsApp
            </a>
            {user ? (
              <>
                <button
                  onClick={() => nav('dashboard')}
                  className="flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 rounded-lg transition-all shadow-md shadow-blue-500/20"
                >
                  <LayoutDashboard className="w-4 h-4" />
                  Dashboard
                </button>
                <button
                  onClick={() => { signOut(); nav('home'); }}
                  className="px-4 py-2 text-sm font-medium text-gray-400 hover:text-white border border-white/20 rounded-lg hover:border-white/40 transition-colors"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={handleSignIn}
                  className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white transition-colors"
                >
                  Sign In
                </button>
                <button
                  onClick={handleSignUp}
                  className="px-5 py-2 text-sm font-semibold bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg hover:from-blue-500 hover:to-cyan-500 transition-all shadow-lg shadow-blue-500/20"
                >
                  Sign Up Free
                </button>
              </>
            )}
          </div>

          {/* Mobile WhatsApp + hamburger */}
          <div className="lg:hidden flex items-center gap-2">
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-[#25D366] border border-[#25D366]/30 rounded-lg"
              title="Chat on WhatsApp"
            >
              <MessageCircle className="w-5 h-5" />
            </a>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 text-gray-300 hover:text-white"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-slate-900 border-t border-white/10 px-4 py-4 space-y-1">
          {user && (
            <button
              onClick={() => nav('dashboard')}
              className="w-full flex items-center gap-2 px-3 py-3 text-sm font-semibold text-white bg-gradient-to-r from-blue-600/20 to-cyan-600/20 border border-blue-500/30 rounded-xl mb-3"
            >
              <LayoutDashboard className="w-4 h-4 text-blue-400" />
              Dashboard
            </button>
          )}
          <div className="pb-2 mb-2 border-b border-white/10">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-3 mb-2">Tools</p>
            {tools.map(t => (
              <button
                key={t.page}
                onClick={() => nav(t.page)}
                className="w-full text-left px-3 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors flex items-center justify-between"
              >
                {t.label}
                {t.badge && (
                  <span className="text-[9px] font-bold bg-blue-500 text-white px-1.5 py-0.5 rounded-full">{t.badge}</span>
                )}
              </button>
            ))}
          </div>
          {navLinks.map(l => (
            <button
              key={l.page}
              onClick={() => nav(l.page)}
              className="w-full text-left px-3 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
            >
              {l.label}
            </button>
          ))}
          <div className="pt-3 mt-2 border-t border-white/10 flex flex-col gap-2">
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-2.5 text-sm font-semibold text-[#25D366] border border-[#25D366]/30 rounded-lg"
            >
              <MessageCircle className="w-4 h-4" />
              WhatsApp Us
            </a>
            {user ? (
              <button
                onClick={() => { signOut(); nav('home'); }}
                className="w-full py-2.5 text-sm font-medium text-gray-300 border border-white/20 rounded-lg"
              >
                Sign Out
              </button>
            ) : (
              <>
                <button
                  onClick={handleSignIn}
                  className="w-full py-2.5 text-sm font-medium text-gray-300 border border-white/20 rounded-lg"
                >
                  Sign In
                </button>
                <button
                  onClick={handleSignUp}
                  className="w-full py-2.5 text-sm font-semibold bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg"
                >
                  Sign Up Free
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
