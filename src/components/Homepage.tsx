import { useState } from 'react';
import { Sparkles, Heart, Home, Users, Grid3x3, Star, Menu, X, Calculator, BookOpen, Save, ChevronDown, LogIn, UserPlus, Phone, Wand2, Eye } from 'lucide-react';
import NewHomepage from './NewHomepage';

interface HomepageProps {
  onNavigate: (page: string) => void;
  onShowAuth?: () => void;
}

export default function Homepage({ onNavigate, onShowAuth }: HomepageProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [calculatorDropdownOpen, setCalculatorDropdownOpen] = useState(false);
  const [mobileCalculatorOpen, setMobileCalculatorOpen] = useState(false);
  const [showNewDesign, setShowNewDesign] = useState(false);

  if (showNewDesign) {
    return <NewHomepage onNavigate={onNavigate} onShowAuth={onShowAuth} onBack={() => setShowNewDesign(false)} />;
  }
  const features = [
    {
      icon: Star,
      title: 'Life Path Number',
      description: 'Discover your core life purpose and journey through the Life Path calculation',
      color: 'from-amber-500 to-orange-600'
    },
    {
      icon: Sparkles,
      title: 'Core Numbers',
      description: 'Unlock Expression, Soul Urge, Personality, and more essential numerology insights',
      color: 'from-blue-500 to-cyan-600'
    },
    {
      icon: Heart,
      title: 'Compatibility',
      description: 'Analyze relationship harmony and compatibility between two individuals',
      color: 'from-rose-500 to-pink-600'
    },
    {
      icon: Home,
      title: 'House & Phone Numbers',
      description: 'Understand the energetic influence of your house, mobile, and bank numbers',
      color: 'from-emerald-500 to-teal-600'
    },
    {
      icon: Grid3x3,
      title: 'Lo Shu Grid',
      description: 'Ancient Chinese numerology system revealing life patterns and energies',
      color: 'from-violet-500 to-purple-600',
      action: 'loshu'
    },
    {
      icon: Users,
      title: 'Karmic Lessons',
      description: 'Identify missing numbers and karmic challenges to overcome in this lifetime',
      color: 'from-indigo-500 to-blue-600'
    }
  ];

  const calculatorSubmenu = [
    { label: 'Numerology', page: 'calculator', icon: BookOpen },
    { label: 'Lo Shu Grid', page: 'loshu', icon: Grid3x3 },
    { label: 'Name Correction', page: 'name-correction', icon: Wand2 },
    { label: 'Compatibility', page: 'compatibility', icon: Heart },
    { label: 'House/Phone/Account Number', page: 'house', icon: Phone },
    { label: 'Saved Charts', page: 'saved', icon: Save }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNiIgc3Ryb2tlPSIjZmZmIiBzdHJva2Utb3BhY2l0eT0iLjA1IiBzdHJva2Utd2lkdGg9IjEiLz48L2c+PC9zdmc+')] opacity-20"></div>

      {/* Navigation Bar */}
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
              </div>
            </div>
          )}
        </div>
      </nav>

      <div className="relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 md:pt-20 pb-16">
          <div className="text-center mb-12 md:mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 mb-6 shadow-lg shadow-amber-500/50">
              <Sparkles className="w-8 h-8 md:w-10 md:h-10 text-white" />
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 leading-tight px-4">
              NumberTeller
            </h1>

            <p className="text-lg sm:text-xl md:text-2xl text-amber-400 font-semibold mb-4 md:mb-6 px-4">
              The Most Advanced Pythagorean Numerology Calculator
            </p>

            <p className="text-base sm:text-lg md:text-xl text-slate-300 mb-6 md:mb-8 max-w-2xl mx-auto leading-relaxed px-4">
              Discover profound insights into your life purpose, personality, and destiny through the ancient wisdom of Pythagorean Numerology
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => onNavigate('calculator')}
                className="inline-flex items-center gap-2 px-6 py-3 md:px-8 md:py-4 bg-gradient-to-r from-amber-500 to-orange-600 text-white font-semibold rounded-full hover:from-amber-600 hover:to-orange-700 transition-all duration-200 shadow-lg shadow-amber-500/50 hover:shadow-xl hover:scale-105"
              >
                <Star className="w-5 h-5" />
                Calculate Now
              </button>

              <button
                onClick={() => setShowNewDesign(true)}
                className="inline-flex items-center gap-2 px-6 py-3 md:px-8 md:py-4 bg-gradient-to-r from-blue-500 to-cyan-600 text-white font-semibold rounded-full hover:from-blue-600 hover:to-cyan-700 transition-all duration-200 shadow-lg shadow-blue-500/50 hover:shadow-xl hover:scale-105"
              >
                <Eye className="w-5 h-5" />
                Preview New Design
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-12">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  onClick={() => feature.action && onNavigate(feature.action)}
                  className={`group bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50 hover:border-slate-600 transition-all duration-300 hover:transform hover:scale-105 hover:shadow-xl ${feature.action ? 'cursor-pointer' : ''}`}
                >
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>

                  <h3 className="text-xl font-semibold text-white mb-2">
                    {feature.title}
                  </h3>

                  <p className="text-slate-400 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="bg-gradient-to-r from-slate-800/80 to-slate-700/80 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-slate-600/50 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Why Pythagorean Numerology?
            </h2>
            <p className="text-sm md:text-base text-slate-300 max-w-3xl mx-auto leading-relaxed">
              Pythagorean numerology is an ancient system that assigns numerical values to letters, revealing hidden patterns in your name and birth date. This time-tested method provides accurate insights into your personality, life purpose, relationships, and future cycles. Used for thousands of years, it remains one of the most reliable forms of divination and self-discovery.
            </p>
          </div>
        </div>

        <footer className="border-t border-slate-700/50 py-6 md:py-8 mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs md:text-sm text-slate-400">
              <p>&copy; 2026 NumberTeller. All rights reserved.</p>
              <div className="flex flex-wrap justify-center gap-4 md:gap-6">
                <button className="hover:text-slate-200 transition-colors">Privacy Policy</button>
                <button className="hover:text-slate-200 transition-colors">Terms of Service</button>
                <button className="hover:text-slate-200 transition-colors whitespace-nowrap">Create Your Numerologist Page</button>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
