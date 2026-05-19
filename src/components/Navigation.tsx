import { useState } from 'react';
import { Sparkles, Home, Calculator, ChevronDown, LogIn, UserPlus, Menu, X, BookOpen, Grid3x3, Heart, Phone, Save, LogOut, User, Wand2 } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface NavigationProps {
  onNavigate: (page: string) => void;
  onShowAuth?: () => void;
}

export default function Navigation({ onNavigate, onShowAuth }: NavigationProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [calculatorDropdownOpen, setCalculatorDropdownOpen] = useState(false);
  const [mobileCalculatorOpen, setMobileCalculatorOpen] = useState(false);
  const { user, signOut } = useAuth();

  const calculatorSubmenu = [
    { label: 'Numerology', page: 'calculator', icon: BookOpen },
    { label: 'Lo Shu Grid', page: 'loshu', icon: Grid3x3 },
    { label: 'Name Correction', page: 'name-correction', icon: Wand2 },
    { label: 'Compatibility', page: 'compatibility', icon: Heart },
    { label: 'House/Phone/Account Number', page: 'house', icon: Phone },
    { label: 'Saved Charts', page: 'saved', icon: Save }
  ];

  return (
    <nav className="relative bg-slate-900/80 backdrop-blur-md border-b border-slate-700/50 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => onNavigate('home')}>
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-white hidden sm:block">NumberTeller</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-2">
            <button
              onClick={() => onNavigate('home')}
              className="flex items-center gap-2 px-4 py-2 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
            >
              <Home className="w-4 h-4" />
              <span className="text-sm font-medium">Home</span>
            </button>

            {/* Calculator Dropdown */}
            <div className="relative"
              onMouseEnter={() => setCalculatorDropdownOpen(true)}
              onMouseLeave={() => setCalculatorDropdownOpen(false)}
            >
              <button
                className="flex items-center gap-2 px-4 py-2 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
              >
                <Calculator className="w-4 h-4" />
                <span className="text-sm font-medium">Calculator</span>
                <ChevronDown className="w-3 h-3" />
              </button>

              {calculatorDropdownOpen && (
                <div className="absolute top-full left-0 mt-1 w-56 bg-slate-800 border border-slate-700 rounded-lg shadow-xl overflow-hidden">
                  {calculatorSubmenu.map((item) => {
                    const Icon = item.icon;
                    return (
                      <button
                        key={item.page}
                        onClick={() => {
                          onNavigate(item.page);
                          setCalculatorDropdownOpen(false);
                        }}
                        className="w-full flex items-center gap-3 px-4 py-3 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors text-left"
                      >
                        <Icon className="w-4 h-4" />
                        <span className="text-sm font-medium">{item.label}</span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {user ? (
              <button
                onClick={() => signOut()}
                className="flex items-center gap-2 px-4 py-2 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span className="text-sm font-medium">Sign Out</span>
              </button>
            ) : (
              <>
                <button
                  onClick={() => onShowAuth?.()}
                  className="flex items-center gap-2 px-4 py-2 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
                >
                  <LogIn className="w-4 h-4" />
                  <span className="text-sm font-medium">Sign In</span>
                </button>

                <button
                  onClick={() => onShowAuth?.()}
                  className="flex items-center gap-2 px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg transition-colors"
                >
                  <UserPlus className="w-4 h-4" />
                  <span className="text-sm font-medium">Sign Up</span>
                </button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile & Tablet Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-slate-700/50">
            <div className="flex flex-col gap-2">
              {/* Home */}
              <button
                onClick={() => {
                  onNavigate('home');
                  setMobileMenuOpen(false);
                }}
                className="flex items-center gap-3 px-4 py-3 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors text-left"
              >
                <Home className="w-5 h-5" />
                <span className="font-medium">Home</span>
              </button>

              {/* Calculator with Submenu */}
              <div>
                <button
                  onClick={() => setMobileCalculatorOpen(!mobileCalculatorOpen)}
                  className="w-full flex items-center justify-between px-4 py-3 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Calculator className="w-5 h-5" />
                    <span className="font-medium">Calculator</span>
                  </div>
                  <ChevronDown className={`w-4 h-4 transition-transform ${mobileCalculatorOpen ? 'rotate-180' : ''}`} />
                </button>

                {mobileCalculatorOpen && (
                  <div className="ml-4 mt-2 space-y-2 pl-4 border-l-2 border-slate-700">
                    {calculatorSubmenu.map((item) => {
                      const Icon = item.icon;
                      return (
                        <button
                          key={item.page}
                          onClick={() => {
                            onNavigate(item.page);
                            setMobileMenuOpen(false);
                            setMobileCalculatorOpen(false);
                          }}
                          className="w-full flex items-center gap-3 px-4 py-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors text-left text-sm"
                        >
                          <Icon className="w-4 h-4" />
                          <span>{item.label}</span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              {user ? (
                <button
                  onClick={() => {
                    signOut();
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center gap-3 px-4 py-3 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors text-left"
                >
                  <LogOut className="w-5 h-5" />
                  <span className="font-medium">Sign Out</span>
                </button>
              ) : (
                <>
                  {/* Sign In */}
                  <button
                    onClick={() => {
                      onShowAuth?.();
                      setMobileMenuOpen(false);
                    }}
                    className="flex items-center gap-3 px-4 py-3 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors text-left"
                  >
                    <LogIn className="w-5 h-5" />
                    <span className="font-medium">Sign In</span>
                  </button>

                  {/* Sign Up */}
                  <button
                    onClick={() => {
                      onShowAuth?.();
                      setMobileMenuOpen(false);
                    }}
                    className="flex items-center gap-3 px-4 py-3 bg-amber-600 hover:bg-amber-700 text-white rounded-lg transition-colors text-left"
                  >
                    <UserPlus className="w-5 h-5" />
                    <span className="font-medium">Sign Up</span>
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
