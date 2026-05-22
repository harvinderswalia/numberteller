import { useState } from 'react';
import { BookOpen, Hash, ChevronRight, Clock, Tag, Search } from 'lucide-react';
import SiteNavigation from './SiteNavigation';
import SiteFooter from './SiteFooter';

interface ResourcesPageProps {
  onNavigate: (page: string) => void;
  onShowAuth: () => void;
  onShowSignIn?: () => void;
}

const articles = [
  {
    category: 'Beginner Guide',
    title: 'How to Calculate a Life Path Number — The Complete Practitioner\'s Guide',
    excerpt: 'The Life Path number is the cornerstone of any numerology reading. Learn the exact Pythagorean method, how to handle master numbers (11, 22, 33) correctly, and common mistakes practitioners make.',
    readTime: '8 min',
    keywords: ['life path number', 'pythagorean numerology', 'master numbers'],
    slug: 'life-path-number-guide',
  },
  {
    category: 'Advanced Technique',
    title: 'Karmic Debt Numbers 13, 14, 16 & 19 — What They Mean and How to Explain Them to Clients',
    excerpt: 'Karmic debt numbers are among the most misunderstood concepts in numerology. This guide covers their correct calculation, why they must never be reduced further, and practical language for client consultations.',
    readTime: '10 min',
    keywords: ['karmic debt numbers', 'numerology', '13 14 16 19 numerology'],
    slug: 'karmic-debt-numbers',
  },
  {
    category: 'Lo Shu Grid',
    title: 'Lo Shu Grid Calculator: The Practitioner\'s Guide to Chinese 9-Grid Numerology',
    excerpt: 'The Lo Shu Grid is one of the most powerful tools in numerology — yet one of the most poorly explained. Understand the 9 positions, the 3 planes, power arrows, and how to structure a complete grid reading.',
    readTime: '12 min',
    keywords: ['lo shu grid', 'lo shu grid calculator', 'chinese numerology', '9 grid numerology'],
    slug: 'lo-shu-grid-guide',
  },
  {
    category: 'Name Correction',
    title: 'Name Correction in Numerology — The Pythagorean Method Explained',
    excerpt: 'Name correction is one of the highest-value services a numerologist offers. This article explains the BD, LP, EX, and SU harmony framework, over-energy detection, and how AI-powered tools are transforming this service.',
    readTime: '9 min',
    keywords: ['name correction numerology', 'pythagorean numerology name', 'expression number name'],
    slug: 'name-correction-guide',
  },
  {
    category: 'Master Numbers',
    title: 'Master Numbers 11, 22, 33 in Pythagorean Numerology — A Practitioner\'s Reference',
    excerpt: 'Master numbers carry intensified vibrations and should never be reduced to single digits in a core chart. Learn when they appear, how to display them (always as "11/2", never bare "11"), and what they mean across different positions.',
    readTime: '7 min',
    keywords: ['master numbers numerology', '11 22 33 numerology', 'pythagorean numerology'],
    slug: 'master-numbers-guide',
  },
  {
    category: 'Business Numerology',
    title: 'How to Use Numerology for Business Names — A Guide for Consultants',
    excerpt: 'Business name numerology is a growing service area with corporate clients. Learn how to calculate a company\'s Expression number, how to check alignment with the founder\'s core chart, and how to present findings professionally.',
    readTime: '8 min',
    keywords: ['business name numerology', 'numerology calculator', 'best numerology calculator app'],
    slug: 'business-name-numerology',
  },
  {
    category: 'Compatibility',
    title: 'Numerology Compatibility — How to Read Relationship Charts Like a Pro',
    excerpt: 'Compatibility readings are among the most-requested numerology services. This guide covers the multi-factor scoring method: Life Path harmony, Expression alignment, Soul Urge compatibility, and how to avoid over-simplifying the reading.',
    readTime: '11 min',
    keywords: ['numerology compatibility', 'life path compatibility', 'relationship numerology'],
    slug: 'compatibility-guide',
  },
  {
    category: 'House Numbers',
    title: 'House Number Numerology — What Every Practitioner Should Know',
    excerpt: 'House and address number readings are quick wins for client consultations. Learn how to reduce addresses correctly (including units with letters), match them to Life Path numbers, and give actionable, non-alarming advice.',
    readTime: '6 min',
    keywords: ['house number numerology', 'numerology calculator', 'address numerology'],
    slug: 'house-number-numerology',
  },
  {
    category: 'Practice Tips',
    title: '7 Ways Professional Numerologists Use Technology to Deliver Better Consultations',
    excerpt: 'From instant chart generation to PDF reports and saved client histories, technology is reshaping what\'s possible in a numerology practice. Here\'s how leading practitioners are integrating digital tools without losing the human touch.',
    readTime: '7 min',
    keywords: ['numerology calculator', 'best numerology calculator app', 'numerology practitioner'],
    slug: 'technology-numerology-practice',
  },
  {
    category: 'Transit Charts',
    title: 'Personal Year Numbers 1–9 — A Complete Interpretation Guide for Practitioners',
    excerpt: 'The Personal Year cycle is the most practical forecasting tool in numerology. This reference guide covers all 9 years with detailed interpretive language, key themes, and how to contextualise them with the Universal Year.',
    readTime: '14 min',
    keywords: ['personal year numerology', 'transit chart numerology', 'pythagorean numerology'],
    slug: 'personal-year-guide',
  },
  {
    category: 'Fundamentals',
    title: 'The Pythagorean Number Table — Every Practitioner\'s Foundation',
    excerpt: 'The Pythagorean letter-to-number table (A=1 through Z=8 repeating) is the basis of all Western numerology calculations. This article covers the correct letter assignments, how to handle Y as a vowel or consonant, and how to verify your calculations.',
    readTime: '5 min',
    keywords: ['pythagorean numerology', 'numerology letter values', 'numerology calculator'],
    slug: 'pythagorean-table',
  },
  {
    category: 'Mobile & Car Numbers',
    title: 'Mobile and Car Number Numerology — A Growing Service for Practitioners in the GCC',
    excerpt: 'In the UAE and across the GCC, mobile number and car plate numerology is one of the fastest-growing client requests. Learn the calculation method, how to assess harmony with core numbers, and how to structure the advice.',
    readTime: '6 min',
    keywords: ['mobile number numerology', 'car number numerology', 'numerology UAE'],
    slug: 'mobile-car-number-numerology',
  },
];

const categories = ['All', 'Beginner Guide', 'Advanced Technique', 'Lo Shu Grid', 'Name Correction', 'Master Numbers', 'Business Numerology', 'Compatibility', 'House Numbers', 'Practice Tips', 'Transit Charts', 'Fundamentals', 'Mobile & Car Numbers'];

export default function ResourcesPage({ onNavigate, onShowAuth, onShowSignIn }: ResourcesPageProps) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = articles.filter(a => {
    const matchesCategory = activeCategory === 'All' || a.category === activeCategory;
    const matchesSearch = !searchQuery ||
      a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.keywords.some(k => k.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-slate-900">
      <SiteNavigation onNavigate={onNavigate} onShowAuth={onShowAuth} onShowSignIn={onShowSignIn} currentPage="resources" />

      {/* Hero */}
      <section className="pt-32 pb-16 px-4 sm:px-6 relative overflow-hidden">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(ellipse at 30% 50%, rgba(59,130,246,0.1) 0%, transparent 55%)`
        }} />
        <div className="relative max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 text-blue-300 px-5 py-2 rounded-full mb-6 text-sm font-medium">
            <BookOpen className="w-4 h-4" />
            Practitioner Knowledge Base
          </div>
          <h1 className="text-5xl sm:text-6xl font-bold text-white mb-5 leading-tight">
            Numerology Resources
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
              for Professionals
            </span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-10">
            Guides, references, and insights for practising numerologists. Deepen your knowledge, stay sharp, and deliver better consultations.
          </p>

          {/* Search */}
          <div className="max-w-lg mx-auto relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
            <input
              type="text"
              placeholder="Search articles, topics, keywords..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full bg-slate-800 border border-white/10 focus:border-blue-500/40 rounded-xl pl-12 pr-4 py-3.5 text-white placeholder-gray-500 outline-none transition-colors"
            />
          </div>
        </div>
      </section>

      {/* Category filter */}
      <section className="px-4 sm:px-6 pb-8 border-b border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-2">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                  activeCategory === cat
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-800 text-gray-400 hover:text-white hover:bg-slate-700 border border-white/10'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Articles grid */}
      <section className="py-12 px-4 sm:px-6 pb-24">
        <div className="max-w-7xl mx-auto">
          {filtered.length === 0 ? (
            <div className="text-center py-16 text-gray-500">No articles match your search.</div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((article, i) => (
                <article
                  key={i}
                  className="group bg-slate-800/60 border border-white/10 hover:border-white/20 rounded-2xl p-6 flex flex-col cursor-pointer transition-all hover:shadow-xl hover:-translate-y-0.5"
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-semibold text-blue-400 bg-blue-500/10 border border-blue-500/20 px-3 py-1 rounded-full">
                      {article.category}
                    </span>
                    <div className="flex items-center gap-1 text-gray-500 text-xs">
                      <Clock className="w-3.5 h-3.5" />
                      {article.readTime} read
                    </div>
                  </div>

                  <h3 className="text-white font-bold text-lg mb-3 leading-snug group-hover:text-blue-300 transition-colors">
                    {article.title}
                  </h3>

                  <p className="text-gray-400 text-sm leading-relaxed mb-5 flex-1">
                    {article.excerpt}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {article.keywords.slice(0, 2).map(kw => (
                      <span key={kw} className="inline-flex items-center gap-1 text-xs text-gray-500 bg-slate-700/50 px-2.5 py-1 rounded-full">
                        <Tag className="w-3 h-3" />
                        {kw}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-1.5 text-sm font-medium text-blue-400 group-hover:text-blue-300 transition-colors">
                    Read article <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* SEO-rich intro section */}
      <section className="py-16 bg-slate-800/30 border-t border-white/5 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-6">About This Resource Library</h2>
          <div className="prose prose-invert max-w-none space-y-4 text-gray-400 leading-relaxed">
            <p>
              NumberTeller's resource library is written for professional numerologists and practitioners — not general audiences. Every article assumes a working knowledge of Pythagorean numerology and is designed to deepen expertise, sharpen technique, and help practitioners deliver more value to clients.
            </p>
            <p>
              Topics covered include the best practices for numerology calculators, the correct handling of master numbers and karmic debt numbers in Pythagorean numerology, advanced Lo Shu grid interpretation, AI-powered name correction methodologies, business numerology for consultants, and how to use technology to scale a numerology practice without compromising quality.
            </p>
            <p>
              Whether you're refining your understanding of personal year forecasting, looking for clearer language to explain karmic lessons to clients, or exploring the growing demand for mobile number and car number numerology in the GCC market — this library has you covered.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-slate-900 px-4 sm:px-6">
        <div className="max-w-2xl mx-auto text-center">
          <Hash className="w-10 h-10 text-blue-400 mx-auto mb-5" />
          <h2 className="text-3xl font-bold text-white mb-4">Put the Knowledge to Work</h2>
          <p className="text-gray-400 mb-8">
            NumberTeller gives you the tools to apply everything you know — instantly, accurately, and professionally.
          </p>
          <button
            onClick={onShowAuth}
            className="group inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold rounded-xl hover:from-blue-500 hover:to-cyan-500 transition-all shadow-lg"
          >
            Sign Up Free <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </section>

      <SiteFooter onNavigate={onNavigate} onShowAuth={onShowAuth} />
    </div>
  );
}
