import React, { useState } from 'react';
import {
  Calculator, Star, Zap, FileText, Heart, TrendingUp,
  Clock, Award, Users, ChevronRight, CheckCircle, ArrowLeft,
  BarChart3, Download, Save, BookOpen
} from 'lucide-react';

interface NewHomepageProps {
  onNavigate: (page: string) => void;
  onShowAuth?: () => void;
  onBack: () => void;
}

export default function NewHomepage({ onNavigate, onShowAuth, onBack }: NewHomepageProps) {
  const [testimonialIndex, setTestimonialIndex] = useState(0);

  const testimonials = [
    {
      name: "Dr. Rajesh Kumar",
      location: "Delhi",
      profession: "Vedic Astrologer & Numerologist",
      text: "This platform cut my calculation time by 80%. The Name Correction tool is invaluable for client consultations.",
      rating: 5,
      avatar: "RK"
    },
    {
      name: "Meera Joshi",
      location: "Mumbai",
      profession: "Professional Numerologist",
      text: "The Lo Shu Grid analysis and PDF export features are game-changers. My clients love the detailed reports.",
      rating: 5,
      avatar: "MJ"
    },
    {
      name: "Amit Patel",
      location: "Bangalore",
      profession: "Life Coach & Numerology Consultant",
      text: "Perfect tool for professionals. Accurate calculations, clean interface, and saves all my client charts.",
      rating: 5,
      avatar: "AP"
    }
  ];

  const features = [
    {
      icon: Calculator,
      title: "Name Correction Tool",
      hook: "Advanced Name Analysis",
      description: "BD, LP, EX & SU Core Number Alignment",
      tease: "Rhyme-preserving vowel adjustments",
      cta: "Try Tool",
      gradient: "from-blue-600 to-cyan-600",
      stat: "Professional"
    },
    {
      icon: TrendingUp,
      title: "Lo Shu Grid Analysis",
      hook: "Chinese Numerology Grid",
      description: "9-Grid energy mapping from birth date",
      tease: "Missing & repeated number analysis",
      cta: "Calculate Grid",
      gradient: "from-emerald-600 to-teal-600",
      stat: "Ancient Method"
    },
    {
      icon: Heart,
      title: "Compatibility Calculator",
      hook: "Relationship Analysis",
      description: "Life Path & Expression compatibility",
      tease: "Detailed compatibility scoring",
      cta: "Check Match",
      gradient: "from-rose-600 to-pink-600",
      stat: "Multi-Factor"
    },
    {
      icon: FileText,
      title: "Complete Numerology Chart",
      hook: "Full Chart Analysis",
      description: "Life Path, Expression, Soul Urge & more",
      tease: "Export professional PDF reports",
      cta: "Generate Chart",
      gradient: "from-amber-600 to-orange-600",
      stat: "10+ Numbers"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">

      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-800 via-slate-900 to-slate-800">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.15), transparent 50%),
                             radial-gradient(circle at 80% 80%, rgba(16, 185, 129, 0.15), transparent 50%),
                             radial-gradient(circle at 40% 20%, rgba(245, 158, 11, 0.1), transparent 50%)`
          }} />
          {/* Floating Numbers Animation */}
          <div className="absolute inset-0 opacity-5">
            {[1,2,3,4,5,6,7,8,9].map((num, i) => (
              <div
                key={num}
                className="absolute text-6xl font-bold text-white animate-pulse"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${i * 0.5}s`,
                  animationDuration: '3s'
                }}
              >
                {num}
              </div>
            ))}
          </div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-6xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-blue-600/20 border border-blue-500/30 text-blue-300 px-6 py-2 rounded-full mb-6">
            <Award className="w-4 h-4" />
            <span className="text-sm font-semibold">Professional Numerology Platform</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Professional Tools for <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Numerologists</span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-300 mb-4 max-w-3xl mx-auto">
            Advanced Calculation Suite for Client Consultations
          </p>

          <p className="text-lg text-gray-400 mb-8 max-w-2xl mx-auto">
            Accurate calculations, professional reports, and client chart management
          </p>

          {/* Dual CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <button
              onClick={() => onNavigate('calculator')}
              className="group bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-2xl hover:shadow-blue-500/50 transition-all transform hover:scale-105 flex items-center gap-2"
            >
              <Calculator className="w-5 h-5" />
              Start Calculating
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={onShowAuth}
              className="bg-white/10 backdrop-blur-sm border-2 border-white/20 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white/20 transition-all flex items-center gap-2"
            >
              Sign In / Register
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Key Benefits */}
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <Clock className="w-8 h-8 text-blue-400 mb-3 mx-auto" />
              <div className="text-white font-semibold mb-1">Save Time</div>
              <div className="text-gray-400 text-sm">Instant calculations for client sessions</div>
            </div>
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <Download className="w-8 h-8 text-emerald-400 mb-3 mx-auto" />
              <div className="text-white font-semibold mb-1">Export Reports</div>
              <div className="text-gray-400 text-sm">Professional PDF charts for clients</div>
            </div>
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <Save className="w-8 h-8 text-amber-400 mb-3 mx-auto" />
              <div className="text-white font-semibold mb-1">Save Charts</div>
              <div className="text-gray-400 text-sm">Manage all client charts in one place</div>
            </div>
          </div>
        </div>
      </section>

      {/* Why NumberTeller Section */}
      <section className="py-16 bg-gradient-to-b from-slate-900 to-slate-800">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-4xl font-bold text-white mb-6">
                Built for Professional Numerologists
              </h2>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <BarChart3 className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">Accurate Calculations</h3>
                  <p className="text-gray-400">Pythagorean and Vedic numerology methods with precision algorithms</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">Professional Reports</h3>
                  <p className="text-gray-400">Export detailed PDF charts with all core numbers and interpretations</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-amber-600 to-orange-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">Client Management</h3>
                  <p className="text-gray-400">Save and access all your client charts securely</p>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl blur-2xl opacity-20" />
              <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 border border-white/10">
                <p className="text-2xl font-semibold text-white mb-4">
                  Trusted by Numerology Professionals
                </p>
                <p className="text-gray-400 text-lg mb-8">
                  Everything you need for client consultations in one platform
                </p>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-3xl font-bold text-blue-400">500+</div>
                    <div className="text-sm text-gray-400">Practitioners</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-emerald-400">10K+</div>
                    <div className="text-sm text-gray-400">Charts Created</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-slate-800">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Complete Calculation Suite
            </h2>
            <p className="text-xl text-gray-400">
              All the tools you need for comprehensive numerology consultations
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const getNavigationTarget = (title: string) => {
                if (title === "Name Correction Tool") return "name-correction";
                if (title === "Lo Shu Grid Analysis") return "loshu";
                if (title === "Compatibility Calculator") return "compatibility";
                if (title === "Complete Numerology Chart") return "calculator";
                return "calculator";
              };

              return (
                <div
                  key={index}
                  className="group relative bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-6 border border-white/10 hover:border-white/30 transition-all hover:transform hover:scale-105 hover:shadow-2xl flex flex-col"
                >
                  <div className="absolute top-4 right-4 bg-blue-500/20 text-blue-400 text-xs font-bold px-3 py-1 rounded-full">
                    {feature.stat}
                  </div>

                  <div className={`w-14 h-14 bg-gradient-to-br ${feature.gradient} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <feature.icon className="w-7 h-7 text-white" />
                  </div>

                  <h3 className="text-xl font-bold text-white mb-2">
                    {feature.title}
                  </h3>

                  <div className="text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 mb-3">
                    {feature.hook}
                  </div>

                  <p className="text-gray-400 text-sm mb-3">
                    {feature.description}
                  </p>

                  <div className="bg-white/5 rounded-lg p-3 mb-4">
                    <p className="text-gray-300 text-sm">
                      {feature.tease}
                    </p>
                  </div>

                  <button
                    onClick={() => onNavigate(getNavigationTarget(feature.title))}
                    className={`w-full bg-gradient-to-r ${feature.gradient} text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2 mt-auto`}
                  >
                    {feature.cta}
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-gradient-to-b from-slate-800 to-slate-900">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              Trusted by Numerology Professionals
            </h2>
            <div className="flex items-center justify-center gap-6 text-gray-400">
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
                <span className="font-semibold">500+ Practitioners</span>
              </div>
              <div className="w-1 h-1 bg-gray-600 rounded-full" />
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-blue-500" />
                <span className="font-semibold">10K+ Charts Created</span>
              </div>
            </div>
          </div>

          {/* Testimonial Carousel */}
          <div className="relative max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 border border-white/10">
              <div className="flex items-start gap-6">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-full flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
                  {testimonials[testimonialIndex].avatar}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-1 mb-3">
                    {[...Array(testimonials[testimonialIndex].rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-amber-500 fill-amber-500" />
                    ))}
                  </div>
                  <p className="text-gray-300 text-lg mb-4">
                    "{testimonials[testimonialIndex].text}"
                  </p>
                  <div className="text-white font-semibold">
                    {testimonials[testimonialIndex].name}
                  </div>
                  <div className="text-blue-400 text-sm mb-1">
                    {testimonials[testimonialIndex].profession}
                  </div>
                  <div className="text-gray-400 text-sm">
                    {testimonials[testimonialIndex].location}
                  </div>
                </div>
              </div>
            </div>

            {/* Carousel Navigation */}
            <div className="flex justify-center gap-2 mt-6">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setTestimonialIndex(i)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    i === testimonialIndex
                      ? 'bg-gradient-to-r from-blue-600 to-cyan-600 w-8'
                      : 'bg-gray-600 hover:bg-gray-500'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-700 via-cyan-700 to-blue-800">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Streamline Your Practice?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join hundreds of professional numerologists using NumberTeller
          </p>

          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
            <div className="max-w-md mx-auto space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => onNavigate('calculator')}
                  className="bg-white text-blue-600 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all flex items-center justify-center gap-2"
                >
                  <Calculator className="w-5 h-5" />
                  Try Tools
                </button>
                <button
                  onClick={onShowAuth}
                  className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-4 rounded-xl font-bold text-lg shadow-2xl hover:shadow-blue-500/50 transition-all transform hover:scale-105 flex items-center justify-center gap-2"
                >
                  Sign Up Free
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 py-12 border-t border-white/10">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 text-center md:text-left">
            <div>
              <div className="flex items-center gap-2 justify-center md:justify-start mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-lg" />
                <span className="text-xl font-bold text-white">NumberTeller</span>
              </div>
              <p className="text-gray-400 text-sm">
                Professional numerology platform for practitioners
              </p>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Tools</h4>
              <div className="space-y-2 text-gray-400 text-sm">
                <div className="hover:text-white cursor-pointer" onClick={() => onNavigate('calculator')}>Core Number Calculator</div>
                <div className="hover:text-white cursor-pointer" onClick={() => onNavigate('loshu')}>Lo Shu Grid</div>
                <div className="hover:text-white cursor-pointer" onClick={() => onNavigate('compatibility')}>Compatibility Check</div>
                <div className="hover:text-white cursor-pointer" onClick={() => onNavigate('name-correction')}>Name Correction</div>
              </div>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Account</h4>
              <div className="space-y-2 text-gray-400 text-sm">
                <div className="hover:text-white cursor-pointer" onClick={onShowAuth}>Sign In</div>
                <div className="hover:text-white cursor-pointer" onClick={() => onNavigate('saved')}>Saved Charts</div>
                <div className="hover:text-white cursor-pointer">Support</div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
