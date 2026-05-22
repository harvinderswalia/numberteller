import { useState } from 'react';
import { Building2, Users, Lightbulb, ChevronDown, ChevronUp, Plus, Trash2, ArrowLeft, Sparkles, Star, AlertTriangle, CheckCircle, Hash } from 'lucide-react';
import SiteNavigation from './SiteNavigation';
import SiteFooter from './SiteFooter';
import { reduceToSingleDigit, getLetterValue, cleanName, calculateLifePath } from '../utils/numerology';

interface BusinessNumerologyPageProps {
  onNavigate: (page: string) => void;
  onShowAuth: () => void;
  onShowSignIn?: () => void;
}

// ─── PYTHAGOREAN LETTER VALUES ─────────────────────────────────────────────

function calculateNameNumber(name: string): number | string {
  const cleaned = cleanName(name);
  if (!cleaned) return 0;
  const sum = cleaned.split('').reduce((t, l) => t + getLetterValue(l), 0);
  return reduceToSingleDigit(sum);
}

function getBaseNumber(val: number | string): number {
  if (typeof val === 'string') return parseInt(val.split('/').pop() || val);
  return val;
}

// ─── NUMBER MEANINGS FOR BUSINESS ─────────────────────────────────────────

const BUSINESS_NUMBER_PROFILES: Record<number, {
  name: string;
  strengths: string[];
  challenges: string[];
  idealFor: string[];
  energy: string;
  colour: string;
}> = {
  1: {
    name: 'Pioneer & Leader',
    energy: 'Innovation, independence, and bold leadership. Number 1 businesses stand out, lead markets, and chart new territory.',
    strengths: ['Strong brand identity', 'Market leadership potential', 'Entrepreneurial drive', 'Innovation-focused culture'],
    challenges: ['Can be resistant to collaboration', 'May struggle with partnerships', 'Risk of ego-driven decisions'],
    idealFor: ['Tech startups', 'Solo consultancies', 'Leadership coaching', 'Disruptive brands', 'Personal brands'],
    colour: 'amber',
  },
  2: {
    name: 'Partnership & Service',
    energy: 'Cooperation, diplomacy, and client-centric service. Number 2 businesses thrive on relationships and trust.',
    strengths: ['Excellent client relationships', 'Strong team culture', 'Trustworthy reputation', 'Diplomatic leadership'],
    challenges: ['May avoid conflict to its detriment', 'Can be indecisive', 'Over-reliance on partnerships'],
    idealFor: ['Consulting firms', 'HR services', 'Mediation', 'Event management', 'Hospitality'],
    colour: 'blue',
  },
  3: {
    name: 'Creative Communicator',
    energy: 'Creativity, expression, and social magnetism. Number 3 businesses attract through charm, communication, and originality.',
    strengths: ['Strong brand voice', 'Creative output', 'Social media presence', 'Customer engagement'],
    challenges: ['Scattered focus', 'Inconsistent follow-through', 'Difficulty with structure'],
    idealFor: ['Marketing agencies', 'PR firms', 'Media companies', 'Restaurants', 'Entertainment'],
    colour: 'orange',
  },
  4: {
    name: 'Builder & Foundation',
    energy: 'Structure, reliability, and disciplined growth. Number 4 businesses build to last and are trusted for their consistency.',
    strengths: ['Systematic operations', 'Long-term stability', 'Strong reputation', 'Reliable delivery'],
    challenges: ['Slow to adapt', 'Can be rigid', 'Risk of over-caution'],
    idealFor: ['Construction', 'Accounting firms', 'Law firms', 'Manufacturing', 'Real estate'],
    colour: 'green',
  },
  5: {
    name: 'Dynamic Transformer',
    energy: 'Freedom, change, and versatile energy. Number 5 businesses are adaptable, exciting, and excellent in fast-moving markets.',
    strengths: ['Rapid adaptation', 'Exciting brand', 'Multiple revenue streams', 'Market agility'],
    challenges: ['Inconsistency', 'High staff turnover', 'Difficulty sustaining focus'],
    idealFor: ['Travel agencies', 'E-commerce', 'Digital media', 'Sales organisations', 'Import/export'],
    colour: 'cyan',
  },
  6: {
    name: 'Nurturer & Caregiver',
    energy: 'Responsibility, care, and community focus. Number 6 businesses are beloved for their service to others and family values.',
    strengths: ['Client loyalty', 'Compassionate culture', 'Community trust', 'Service excellence'],
    challenges: ['Can over-give without boundaries', 'Perfectionism', 'Emotional decision-making'],
    idealFor: ['Healthcare', 'Dental clinics', 'Schools', 'Childcare', 'Restaurants', 'Wellness centres'],
    colour: 'rose',
  },
  7: {
    name: 'Expert & Analyst',
    energy: 'Depth, expertise, and specialised knowledge. Number 7 businesses are trusted for their intellectual authority and precision.',
    strengths: ['Deep expertise', 'Research capability', 'Niche authority', 'High trust'],
    challenges: ['Can be too niche', 'Difficulty scaling', 'May undermarket'],
    idealFor: ['Research firms', 'Law practices', 'Scientific companies', 'Technology specialists', 'Financial advisory'],
    colour: 'violet',
  },
  8: {
    name: 'Power & Abundance',
    energy: 'Material mastery, ambition, and large-scale achievement. Number 8 businesses are built to generate wealth and significant impact.',
    strengths: ['Financial acumen', 'Authority in market', 'Scalable model', 'Executive presence'],
    challenges: ['Can become domineering', 'Over-focus on profit', 'Work-life imbalance'],
    idealFor: ['Investment firms', 'Real estate companies', 'Corporate consulting', 'Jewellery', 'Luxury brands'],
    colour: 'amber',
  },
  9: {
    name: 'Humanitarian & Visionary',
    energy: 'Universal service, compassion, and global vision. Number 9 businesses are purpose-driven and attract loyal communities.',
    strengths: ['Strong mission and purpose', 'Community loyalty', 'Inclusive culture', 'Global perspective'],
    challenges: ['May sacrifice profit for purpose', 'Difficulty with hard business decisions', 'Can be idealistic'],
    idealFor: ['Non-profits', 'Wellness brands', 'Educational organisations', 'Humanitarian services', 'Creative agencies'],
    colour: 'teal',
  },
  11: {
    name: 'Visionary Illuminator',
    energy: 'Inspiration, spiritual vision, and elevated purpose. Number 11 businesses lead through insight and inspire transformational change.',
    strengths: ['Visionary leadership', 'Inspirational brand', 'Attracts aligned talent', 'Spiritual/wellness niche'],
    challenges: ['High nervous energy', 'May be ahead of the market', 'Difficulty with mundane operations'],
    idealFor: ['Coaching', 'Spiritual services', 'Creative studios', 'Publishing', 'Personal development'],
    colour: 'blue',
  },
  22: {
    name: 'Master Builder',
    energy: 'The most powerful business number — builds large-scale systems and organisations that serve many. Long-term legacy.',
    strengths: ['Massive potential', 'Practical visionary', 'Long-term legacy', 'Institutional strength'],
    challenges: ['Heavy responsibility', 'Risk of overwhelm', 'Needs strong team'],
    idealFor: ['Large corporations', 'Global NGOs', 'Architecture firms', 'Tech companies', 'Multi-national brands'],
    colour: 'amber',
  },
  33: {
    name: 'Master Healer',
    energy: 'Highest service vibration. Number 33 businesses are rare and carry a mission of deep healing and universal compassion.',
    strengths: ['Profound service mission', 'Universal appeal', 'Deep community trust', 'Transformational impact'],
    challenges: ['Very high standards', 'Emotional weight', 'Must avoid martyrdom'],
    idealFor: ['Healing centres', 'Master coaching', 'Large-scale humanitarian work', 'Spiritual organisations'],
    colour: 'rose',
  },
};

// ─── LP COMPATIBILITY WITH BUSINESS NUMBERS ───────────────────────────────

const LP_COMPATIBLE_BUSINESS_NUMBERS: Record<number, { primary: number[]; secondary: number[]; avoid: number[] }> = {
  1: { primary: [1, 5, 9], secondary: [3, 8], avoid: [2, 6] },
  2: { primary: [2, 6, 8], secondary: [4, 9], avoid: [1, 5] },
  3: { primary: [3, 6, 9], secondary: [1, 5], avoid: [4, 7] },
  4: { primary: [4, 8, 2], secondary: [6, 1], avoid: [3, 5, 9] },
  5: { primary: [5, 1, 7], secondary: [3, 9], avoid: [2, 4, 6] },
  6: { primary: [6, 3, 9], secondary: [2, 4], avoid: [1, 5, 7] },
  7: { primary: [7, 2, 5], secondary: [9, 3], avoid: [1, 4, 8] },
  8: { primary: [8, 4, 2], secondary: [1, 6], avoid: [3, 5, 9] },
  9: { primary: [9, 3, 6], secondary: [1, 5], avoid: [2, 4, 8] },
  11: { primary: [11, 2, 7], secondary: [3, 9], avoid: [4, 8] },
  22: { primary: [22, 4, 8], secondary: [1, 2], avoid: [3, 5] },
  33: { primary: [33, 6, 9], secondary: [3, 2], avoid: [1, 4] },
};

const LP_IDEAL_INDUSTRIES: Record<number, string[]> = {
  1: ['Technology & Innovation', 'Startups & Entrepreneurship', 'Leadership Consulting', 'Personal Branding', 'Advertising'],
  2: ['Human Resources', 'Counselling & Therapy', 'Hospitality', 'Mediation', 'Event Management', 'Partnership Businesses'],
  3: ['Marketing & Creative', 'Media & Entertainment', 'Food & Beverage', 'Fashion', 'Public Speaking', 'Coaching'],
  4: ['Real Estate', 'Construction & Engineering', 'Finance & Accounting', 'Manufacturing', 'Law'],
  5: ['Travel & Tourism', 'Sales & Distribution', 'Digital Marketing', 'Import & Export', 'Fitness & Sports'],
  6: ['Healthcare & Wellness', 'Education', 'Dental & Medical Clinics', 'Childcare', 'Interior Design', 'Catering'],
  7: ['Research & Development', 'Pharmaceuticals', 'Legal Services', 'Technology Consulting', 'Scientific Fields'],
  8: ['Finance & Investment', 'Real Estate Development', 'Luxury Goods', 'Jewellery', 'Corporate Consulting'],
  9: ['Non-Profit & Social Enterprise', 'Arts & Culture', 'Global Services', 'Education', 'Spiritual & Wellness'],
  11: ['Spiritual & Wellness', 'Publishing & Media', 'Creative Arts', 'Life Coaching', 'Personal Development'],
  22: ['Architecture & Large-scale Construction', 'Technology Platforms', 'Global NGOs', 'Multinational Business'],
  33: ['Healing Arts', 'Master Coaching', 'Humanitarian Organisations', 'Spiritual Services'],
};

// ─── UNIVERSAL SUFFIXES / PREFIXES FOR NAME SUGGESTIONS ───────────────────

const UNIVERSAL_PREFIXES = ['Global', 'Prime', 'Peak', 'Apex', 'Core', 'Nova', 'Vibe', 'Lumis', 'Crest', 'Arise', 'Nexus', 'Solus', 'Aura', 'Vital', 'Edge', 'Bright', 'True', 'Pure', 'Bold', 'Swift', 'Zara', 'Alto', 'Ora', 'Iris', 'Arc', 'Dena', 'Mira', 'Faro'];
const UNIVERSAL_SUFFIXES = ['Solutions', 'Services', 'Group', 'Co', 'Labs', 'Studio', 'Works', 'Hub', 'Pro', 'Plus', 'Zone', 'Space', 'Point', 'Circle', 'Edge', 'Craft', 'Force', 'Vibe', 'Flow', 'Path'];

function generateNameSuggestions(keywords: string[], targetNumber: number, count: number = 8): Array<{ name: string; number: number | string }> {
  const suggestions: Array<{ name: string; number: number | string }> = [];
  const seen = new Set<string>();

  const tryAdd = (name: string) => {
    const clean = name.trim();
    if (seen.has(clean.toLowerCase())) return;
    const num = calculateNameNumber(clean);
    const base = getBaseNumber(num);
    if (base === targetNumber) {
      seen.add(clean.toLowerCase());
      suggestions.push({ name: clean, number: num });
    }
  };

  // Keyword + suffix combos
  for (const kw of keywords) {
    for (const suf of UNIVERSAL_SUFFIXES) {
      tryAdd(`${kw} ${suf}`);
      tryAdd(`${kw}${suf}`);
    }
    for (const pre of UNIVERSAL_PREFIXES) {
      tryAdd(`${pre} ${kw}`);
      tryAdd(`${pre}${kw}`);
    }
    // Double keyword
    if (keywords.length >= 2) {
      tryAdd(`${keywords[0]} ${keywords[1]}`);
      tryAdd(`${keywords[0]} & ${keywords[1]}`);
    }
  }

  // Prefix + suffix combos targeting number (brute force through prefixes)
  for (const pre of UNIVERSAL_PREFIXES) {
    for (const suf of UNIVERSAL_SUFFIXES) {
      if (suggestions.length >= count * 2) break;
      tryAdd(`${pre} ${suf}`);
    }
  }

  return suggestions.slice(0, count);
}

// ─── PARTNER COMPATIBILITY ────────────────────────────────────────────────

const LP_COMPATIBILITY_MATRIX: Record<string, { score: number; dynamic: string; strengths: string[]; watchouts: string[] }> = {
  '1-1': { score: 75, dynamic: 'Two Leaders', strengths: ['Shared ambition', 'High energy', 'Both driven to succeed'], watchouts: ['Power struggles', 'Competing egos', 'Both may want to lead'] },
  '1-2': { score: 80, dynamic: 'Leader & Diplomat', strengths: ['Complementary styles', 'Leader drives, partner smooths', 'Balanced decision-making'], watchouts: ['2 may feel overshadowed', 'Speed mismatch', '1 must slow down sometimes'] },
  '1-3': { score: 85, dynamic: 'Visionary & Creative', strengths: ['High energy creative force', 'Strong communication', 'Innovation + expression'], watchouts: ['Both can scatter focus', 'Need systems person', 'Risk of grand plans without follow-through'] },
  '1-4': { score: 70, dynamic: 'Pioneer & Builder', strengths: ['Vision meets execution', '4 builds what 1 imagines', 'Long-term stability'], watchouts: ['Speed conflict (1 fast, 4 methodical)', 'Friction over risk-taking', '1 may frustrate 4'] },
  '1-5': { score: 90, dynamic: 'Dynamo Partnership', strengths: ['Both love freedom', 'High energy', 'Adaptable', 'Market agility'], watchouts: ['No one holds the foundation', 'Both resist routine', 'Need grounding partner or system'] },
  '1-6': { score: 65, dynamic: 'Leader & Nurturer', strengths: ['6 brings care and client focus', '1 provides drive and vision'], watchouts: ['Very different values at core', '1 may dismiss 6\'s emotional approach', '6 may resent 1\'s aggression'] },
  '1-7': { score: 72, dynamic: 'Visionary & Analyst', strengths: ['7 provides deep analysis for 1\'s bold moves', 'Strong intellectual partnership'], watchouts: ['1 may act too fast for 7', '7 may seem cold to 1', 'Communication style clash'] },
  '1-8': { score: 88, dynamic: 'Power Duo', strengths: ['Both ambitious', 'Strong wealth potential', 'Executive energy', 'Natural authority'], watchouts: ['Can be ruthlessly competitive internally', 'Need to define roles clearly', 'Both want final say'] },
  '1-9': { score: 78, dynamic: 'Pioneer & Humanitarian', strengths: ['Vision + purpose', '9 softens 1\'s sharp edges', 'Can build something meaningful'], watchouts: ['Different motivations (profit vs purpose)', '9 may feel 1 is too self-serving', 'Values alignment critical'] },
  '2-2': { score: 70, dynamic: 'Two Diplomats', strengths: ['Excellent client service', 'Harmonious culture', 'Strong partnerships'], watchouts: ['Both avoid conflict — issues fester', 'Indecision', 'Need a decisive advisor'] },
  '2-3': { score: 82, dynamic: 'Heart & Voice', strengths: ['3 communicates what 2 feels', 'Excellent client-facing energy', 'Warm brand'], watchouts: ['Both can be emotionally reactive', 'Need structure and deadlines', '2 may follow 3 too easily'] },
  '2-4': { score: 88, dynamic: 'Heart & Structure', strengths: ['Ideal balance — care + discipline', 'Reliable service with warmth', 'Stable culture'], watchouts: ['4 may feel 2 is too soft', '2 may find 4 cold', 'Regular communication essential'] },
  '2-6': { score: 92, dynamic: 'Harmony Pair', strengths: ['Deeply aligned values', 'Exceptional service culture', 'Client loyalty', 'Community trust'], watchouts: ['Both may over-give and burn out', 'Can avoid hard business decisions', 'Need profit-focused advisor'] },
  '2-8': { score: 78, dynamic: 'Service & Power', strengths: ['8 drives growth, 2 retains clients', 'Strong financial + relational balance'], watchouts: ['8 may be too aggressive for 2', '2 may feel undervalued', 'Mutual respect is key'] },
  '3-3': { score: 72, dynamic: 'Creative Spark', strengths: ['Brilliant creative energy', 'Exceptionally fun brand', 'Social impact'], watchouts: ['No structure between them', 'Very scattered', 'Need operations specialist urgently'] },
  '3-6': { score: 87, dynamic: 'Creative Caregiver', strengths: ['Beautiful service brand', 'Clients adore the culture', 'Creative + caring'], watchouts: ['Both can overextend', 'Financial discipline needed', 'Easy to over-promise'] },
  '3-9': { score: 85, dynamic: 'Artist & Visionary', strengths: ['Purpose-driven creative force', 'Inspiring brand', 'Community magnet'], watchouts: ['May prioritise mission over margins', 'Both very idealistic', 'Business fundamentals must be covered'] },
  '4-4': { score: 80, dynamic: 'Twin Builders', strengths: ['Exceptional execution', 'Rock-solid reliability', 'Systems and process masters'], watchouts: ['Very resistant to change', 'Can be too conservative', 'Innovation gap'] },
  '4-8': { score: 95, dynamic: 'Power Builder', strengths: ['Most financially powerful combination', 'Vision + execution + capital', 'Built to scale'], watchouts: ['Can be inflexible', 'May neglect human element', 'Risk of workaholism culture'] },
  '5-5': { score: 65, dynamic: 'Double Freedom', strengths: ['Exciting, adaptable brand', 'Never stagnant', 'Strong sales energy'], watchouts: ['No anchor at all', 'Very hard to sustain', 'Urgently need structure and systems'] },
  '5-9': { score: 80, dynamic: 'Freedom & Purpose', strengths: ['Energetic + meaningful', 'Attracts broad audience', 'Adaptable mission'], watchouts: ['5 may chase opportunity while 9 focuses on purpose', 'Direction conflicts', 'Regular strategic alignment needed'] },
  '6-6': { score: 85, dynamic: 'Double Nurturer', strengths: ['Deeply caring culture', 'Exceptional client loyalty', 'Community-beloved brand'], watchouts: ['Both may over-give without asserting needs', 'Conflict avoidance', 'Profit discipline essential'] },
  '6-9': { score: 90, dynamic: 'Love & Service', strengths: ['Deeply purpose-aligned', 'Client devotion', 'Humanitarian business potential', 'Beloved brand'], watchouts: ['Both can sacrifice profit for values', 'Need financial realism', 'Boundary-setting important'] },
  '7-7': { score: 78, dynamic: 'Deep Thinkers', strengths: ['Exceptional intellectual depth', 'Niche authority', 'Research powerhouse'], watchouts: ['Can be too insular', 'Marketing and sales gap', 'May undervalue the human/social element'] },
  '7-8': { score: 82, dynamic: 'Analyst & Executive', strengths: ['7 provides insight, 8 drives revenue', 'Sharp strategic mind', 'Authority brand'], watchouts: ['8 may be too fast for 7', '7 may seem too academic for 8', 'Execution vs research tension'] },
  '8-8': { score: 85, dynamic: 'Double Power', strengths: ['Maximum ambition', 'High financial ceiling', 'Strong authority'], watchouts: ['Both may fight for control', 'Can be ruthless', 'Culture may suffer', 'Define roles meticulously'] },
  '8-9': { score: 72, dynamic: 'Wealth & Wisdom', strengths: ['Financial ambition tempered by purpose', 'Can build something lasting and meaningful'], watchouts: ['Very different core values', '8 wants profit, 9 wants impact', 'Must find shared definition of success'] },
  '9-9': { score: 82, dynamic: 'Twin Visionaries', strengths: ['Inspiring shared mission', 'Strong community impact', 'Universal appeal'], watchouts: ['Both may struggle with hard business decisions', 'Financial realism needed', 'Need operational partner'] },
};

function getCompatibility(lp1: number, lp2: number) {
  const key1 = `${Math.min(lp1, lp2)}-${Math.max(lp1, lp2)}`;
  const key2 = `${lp1}-${lp2}`;
  return LP_COMPATIBILITY_MATRIX[key1] || LP_COMPATIBILITY_MATRIX[key2] || {
    score: 70,
    dynamic: 'Unique Partnership',
    strengths: ['Complementary perspectives', 'Diverse skill sets', 'Combined strengths can be powerful'],
    watchouts: ['Clear role definition is essential', 'Regular communication and alignment needed', 'Respect individual working styles'],
  };
}

// ─── LP TEMPERAMENT ────────────────────────────────────────────────────────

const LP_TEMPERAMENT: Record<number, { style: string; strength: string; blindspot: string; roleInBusiness: string }> = {
  1: { style: 'Visionary Pioneer', strength: 'Bold initiator — starts businesses, drives new ideas, leads by example', blindspot: 'Can steamroll others and neglect collaboration', roleInBusiness: 'Founder, CEO, Sales Lead, Brand Visionary' },
  2: { style: 'Diplomatic Collaborator', strength: 'Master of relationships — keeps peace, reads people perfectly', blindspot: 'Can be indecisive and avoid necessary conflict', roleInBusiness: 'Partner Relations, HR, Client Services, COO' },
  3: { style: 'Creative Communicator', strength: 'Natural marketer — brilliant at expression, storytelling, and connecting with audiences', blindspot: 'Scattered and prone to losing focus', roleInBusiness: 'Creative Director, Marketing Lead, Brand Voice, Sales' },
  4: { style: 'Methodical Builder', strength: 'Reliable executor — builds systems, creates processes, delivers consistently', blindspot: 'Rigid and slow to change, can be inflexible', roleInBusiness: 'COO, Operations Director, Finance, Project Manager' },
  5: { style: 'Dynamic Adaptor', strength: 'Market antenna — spots trends early, excellent in sales and fast-moving environments', blindspot: 'Inconsistent, resists routine, can start but not finish', roleInBusiness: 'Sales Lead, Business Development, Market Expansion' },
  6: { style: 'Caring Nurturer', strength: 'Client loyalty builder — creates trust, community and deep brand affinity', blindspot: 'Over-gives, avoids hard decisions, perfectionist', roleInBusiness: 'Client Relations, Customer Experience, HR, Service Lead' },
  7: { style: 'Intellectual Specialist', strength: 'Deep expertise and research capacity — the trusted authority in their niche', blindspot: 'Can be too academic, resists marketing, prefers depth over breadth', roleInBusiness: 'Research Director, Strategy, Legal, Technical Lead' },
  8: { style: 'Executive Powerhouse', strength: 'Financial and organisational mastery — natural authority and deal-making ability', blindspot: 'Can become controlling, places profit above people', roleInBusiness: 'CEO, CFO, Board Member, Investment Lead' },
  9: { style: 'Humanitarian Visionary', strength: 'Purpose-driven leader — inspires loyalty through a bigger mission', blindspot: 'Too idealistic, sacrifices profit, avoids necessary endings', roleInBusiness: 'Mission Lead, Brand Vision, Community Relations, Purpose Director' },
  11: { style: 'Inspired Illuminator', strength: 'Visionary at a higher frequency — brings inspiration and elevates company culture', blindspot: 'High-strung, can be impractical, may be ahead of the market', roleInBusiness: 'Brand Visionary, Thought Leader, Spiritual/Creative Director' },
  22: { style: 'Master Architect', strength: 'Can build organisations at scale with both vision and practical execution', blindspot: 'Carries immense weight, prone to overwhelm without support', roleInBusiness: 'Founder, CEO, Chief Architect of large-scale systems' },
  33: { style: 'Master Healer', strength: 'Brings a healing and compassionate force that transforms team culture and brand', blindspot: 'Self-sacrificing to a fault, sets impossibly high standards', roleInBusiness: 'Company Culture Lead, Purpose Director, Founder of service organisations' },
};

// ─── INDUSTRY TYPES ────────────────────────────────────────────────────────

const INDUSTRY_TYPES = [
  'Restaurant / Food & Beverage',
  'Production House / Film & Media',
  'Sales Company / Distribution',
  'Dental Clinic / Medical Practice',
  'Jewellery Store / Luxury Goods',
  'Technology / Software',
  'Real Estate / Property',
  'Healthcare / Wellness Centre',
  'Education / Training',
  'Retail / Fashion',
  'Consulting / Professional Services',
  'Manufacturing / Engineering',
  'Finance / Investment',
  'Beauty / Salon',
  'Law Firm',
  'Travel / Hospitality',
  'Construction / Architecture',
  'Marketing / Creative Agency',
  'Non-Profit / Social Enterprise',
  'Other',
];

// ─── COLOUR MAP ────────────────────────────────────────────────────────────

const colourMap: Record<string, string> = {
  amber: 'text-amber-400 border-amber-500/30 bg-amber-500/5',
  blue: 'text-blue-400 border-blue-500/30 bg-blue-500/5',
  orange: 'text-orange-400 border-orange-500/30 bg-orange-500/5',
  green: 'text-green-400 border-green-500/30 bg-green-500/5',
  cyan: 'text-cyan-400 border-cyan-500/30 bg-cyan-500/5',
  rose: 'text-rose-400 border-rose-500/30 bg-rose-500/5',
  violet: 'text-violet-400 border-violet-500/30 bg-violet-500/5',
  teal: 'text-teal-400 border-teal-500/30 bg-teal-500/5',
};

// ─── COMPONENTS ───────────────────────────────────────────────────────────

type Tab = 'company' | 'owner' | 'partner';

export default function BusinessNumerologyPage({ onNavigate, onShowAuth, onShowSignIn }: BusinessNumerologyPageProps) {
  const [activeTab, setActiveTab] = useState<Tab>('company');

  const tabs: { id: Tab; label: string; icon: React.ReactNode; desc: string }[] = [
    { id: 'company', label: 'Company Name Calculator', icon: <Hash className="w-5 h-5" />, desc: 'Analyse any business name or get suggestions' },
    { id: 'owner', label: 'Owner Profile & Compatibility', icon: <Star className="w-5 h-5" />, desc: 'Find your ideal business number based on Life Path' },
    { id: 'partner', label: 'Business Partner Compatibility', icon: <Users className="w-5 h-5" />, desc: 'Check compatibility between 2 or more partners' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <SiteNavigation onNavigate={onNavigate} onShowAuth={onShowAuth} onShowSignIn={onShowSignIn} />

      <div className="pt-24 pb-16 px-4 max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-6 text-sm"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </button>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center">
              <Building2 className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-white">Business Numerology</h1>
          </div>
          <p className="text-slate-400 text-base max-w-2xl">
            Apply Pythagorean numerology to your business decisions — from naming your company to evaluating partnerships and identifying your ideal industry.
          </p>
        </div>

        {/* Tab Selector */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`p-4 rounded-xl border text-left transition-all ${
                activeTab === tab.id
                  ? 'border-amber-500/50 bg-amber-500/10 text-white'
                  : 'border-white/10 bg-white/5 text-slate-400 hover:border-white/20 hover:text-slate-200'
              }`}
            >
              <div className={`mb-2 ${activeTab === tab.id ? 'text-amber-400' : 'text-slate-500'}`}>{tab.icon}</div>
              <div className="font-semibold text-sm mb-1">{tab.label}</div>
              <div className="text-xs opacity-70">{tab.desc}</div>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === 'company' && <CompanyNameTool />}
        {activeTab === 'owner' && <OwnerProfileTool />}
        {activeTab === 'partner' && <PartnerCompatibilityTool />}
      </div>

      <SiteFooter onNavigate={onNavigate} onShowAuth={onShowAuth} />
    </div>
  );
}

// ─── COMPANY NAME TOOL ────────────────────────────────────────────────────

function CompanyNameTool() {
  const [companyName, setCompanyName] = useState('');
  const [result, setResult] = useState<{ num: number | string; base: number } | null>(null);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [keywords, setKeywords] = useState('');
  const [targetNum, setTargetNum] = useState('');
  const [industry, setIndustry] = useState('');
  const [suggestions, setSuggestions] = useState<Array<{ name: string; number: number | string }>>([]);
  const [suggestError, setSuggestError] = useState('');

  const analyseCompany = () => {
    if (!companyName.trim()) return;
    const num = calculateNameNumber(companyName.trim());
    const base = getBaseNumber(num);
    setResult({ num, base });
  };

  const generateSuggestions = () => {
    setSuggestError('');
    const kws = keywords.split(',').map(k => k.trim()).filter(Boolean);
    const target = parseInt(targetNum);
    if (!kws.length || isNaN(target) || target < 1 || target > 9) {
      setSuggestError('Please enter at least one keyword and a target number (1–9).');
      return;
    }
    const results = generateNameSuggestions(kws, target, 10);
    if (results.length === 0) {
      setSuggestError('No exact matches found for that target number with these keywords. Try different keywords or adjust the target.');
    }
    setSuggestions(results);
  };

  const profile = result ? BUSINESS_NUMBER_PROFILES[result.base] : null;
  const colClass = profile ? (colourMap[profile.colour] || colourMap.amber) : '';

  return (
    <div className="space-y-6">
      {/* Analyser */}
      <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
        <h2 className="text-white font-semibold text-lg mb-4 flex items-center gap-2">
          <Hash className="w-5 h-5 text-amber-400" /> Analyse a Company Name
        </h2>
        <p className="text-slate-400 text-sm mb-4">
          Enter any business or brand name to calculate its Pythagorean number and understand its energy.
        </p>
        <div className="flex gap-3">
          <input
            value={companyName}
            onChange={e => setCompanyName(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && analyseCompany()}
            placeholder="e.g. Apple, Amazon, Global Services Co"
            className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-amber-500/50 text-sm"
          />
          <button
            onClick={analyseCompany}
            className="px-6 py-3 bg-amber-600 hover:bg-amber-500 text-white font-semibold rounded-xl transition-colors text-sm"
          >
            Analyse
          </button>
        </div>

        {result && profile && (
          <div className={`mt-5 rounded-xl border p-5 ${colClass}`}>
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="text-4xl font-bold mb-1">{result.num}</div>
                <div className="font-semibold text-lg text-white">{profile.name}</div>
              </div>
              <div className="text-right">
                <div className="text-xs text-slate-400 mb-1">Pythagorean Value</div>
                <div className="text-sm text-slate-300">"{companyName}"</div>
              </div>
            </div>
            <p className="text-slate-300 text-sm mb-4">{profile.energy}</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
              <div>
                <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Strengths</div>
                <ul className="space-y-1">
                  {profile.strengths.map((s, i) => (
                    <li key={i} className="flex items-start gap-2 text-slate-300">
                      <CheckCircle className="w-3.5 h-3.5 text-green-400 mt-0.5 shrink-0" /> {s}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Watch Out For</div>
                <ul className="space-y-1">
                  {profile.challenges.map((c, i) => (
                    <li key={i} className="flex items-start gap-2 text-slate-300">
                      <AlertTriangle className="w-3.5 h-3.5 text-amber-400 mt-0.5 shrink-0" /> {c}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Ideal Industries</div>
                <ul className="space-y-1">
                  {profile.idealFor.map((ind, i) => (
                    <li key={i} className="flex items-start gap-2 text-slate-300">
                      <Star className="w-3.5 h-3.5 text-amber-400 mt-0.5 shrink-0" /> {ind}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Name Suggester */}
      <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
        <button
          onClick={() => setShowSuggestions(!showSuggestions)}
          className="flex items-center justify-between w-full text-left"
        >
          <h2 className="text-white font-semibold text-lg flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-amber-400" /> Business Name Suggester
          </h2>
          {showSuggestions ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
        </button>

        {showSuggestions && (
          <div className="mt-5 space-y-4">
            <p className="text-slate-400 text-sm">
              Enter keywords related to your business and a target number. We'll generate name combinations that match using Pythagorean calculation.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-medium text-slate-400 mb-2 block">Keywords (comma-separated)</label>
                <input
                  value={keywords}
                  onChange={e => setKeywords(e.target.value)}
                  placeholder="e.g. bright, dental, care"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-amber-500/50 text-sm"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-slate-400 mb-2 block">Target Number (1–9)</label>
                <input
                  value={targetNum}
                  onChange={e => setTargetNum(e.target.value)}
                  placeholder="e.g. 6"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-amber-500/50 text-sm"
                  type="number" min="1" max="9"
                />
              </div>
            </div>
            <div>
              <label className="text-xs font-medium text-slate-400 mb-2 block">Industry Type (optional)</label>
              <select
                value={industry}
                onChange={e => setIndustry(e.target.value)}
                className="w-full bg-slate-800 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-500/50 text-sm"
              >
                <option value="">Select industry...</option>
                {INDUSTRY_TYPES.map(ind => <option key={ind} value={ind}>{ind}</option>)}
              </select>
            </div>
            <button
              onClick={generateSuggestions}
              className="w-full py-3 bg-amber-600 hover:bg-amber-500 text-white font-semibold rounded-xl transition-colors text-sm flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4" /> Generate Name Suggestions
            </button>
            {suggestError && <p className="text-rose-400 text-sm">{suggestError}</p>}
            {suggestions.length > 0 && (
              <div>
                <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
                  Suggested Names — All reduce to {targetNum}
                  {industry ? ` | Ideal for ${industry}` : ''}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {suggestions.map((s, i) => (
                    <div key={i} className="flex items-center justify-between bg-white/5 border border-white/10 rounded-lg px-4 py-3">
                      <span className="text-white font-medium text-sm">{s.name}</span>
                      <span className="text-amber-400 font-bold text-sm ml-3">{s.number}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── OWNER PROFILE TOOL ───────────────────────────────────────────────────

function OwnerProfileTool() {
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  const [industry, setIndustry] = useState('');
  const [keywords, setKeywords] = useState('');
  const [result, setResult] = useState<{
    lp: number | string;
    base: number;
    compatibleNumbers: number[];
    industries: string[];
    temperament: typeof LP_TEMPERAMENT[1];
    suggestions: Array<{ name: string; number: number | string }>;
  } | null>(null);
  const [error, setError] = useState('');
  const [showNameSuggest, setShowNameSuggest] = useState(false);

  const calculate = () => {
    setError('');
    if (!dob) { setError('Please enter a date of birth.'); return; }
    const birth = new Date(dob);
    if (isNaN(birth.getTime())) { setError('Invalid date.'); return; }
    const lp = calculateLifePath(birth);
    const base = getBaseNumber(lp);
    const compat = LP_COMPATIBLE_BUSINESS_NUMBERS[base] || LP_COMPATIBLE_BUSINESS_NUMBERS[1];
    const industries = LP_IDEAL_INDUSTRIES[base] || [];
    const temperament = LP_TEMPERAMENT[base] || LP_TEMPERAMENT[1];
    setResult({ lp, base, compatibleNumbers: compat.primary, industries, temperament, suggestions: [] });
    setShowNameSuggest(false);
  };

  const generateBrandSuggestions = () => {
    if (!result) return;
    const kws = keywords.split(',').map(k => k.trim()).filter(Boolean);
    if (!kws.length) { setError('Please enter keywords for name suggestions.'); return; }
    const allSuggestions: Array<{ name: string; number: number | string }> = [];
    for (const n of result.compatibleNumbers) {
      const s = generateNameSuggestions(kws, n, 3);
      allSuggestions.push(...s);
    }
    setResult({ ...result, suggestions: allSuggestions.slice(0, 9) });
  };

  const compat = result ? LP_COMPATIBLE_BUSINESS_NUMBERS[result.base] : null;

  return (
    <div className="space-y-6">
      <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
        <h2 className="text-white font-semibold text-lg mb-4 flex items-center gap-2">
          <Star className="w-5 h-5 text-amber-400" /> Owner Business Profile
        </h2>
        <p className="text-slate-400 text-sm mb-5">
          Based on your Life Path number, discover your ideal business number, industry fit, and natural business temperament.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="text-xs font-medium text-slate-400 mb-2 block">Full Name (optional)</label>
            <input
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Your full name"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-amber-500/50 text-sm"
            />
          </div>
          <div>
            <label className="text-xs font-medium text-slate-400 mb-2 block">Date of Birth</label>
            <input
              type="date"
              value={dob}
              onChange={e => setDob(e.target.value)}
              className="w-full bg-slate-800 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-500/50 text-sm"
            />
          </div>
        </div>
        <div className="mb-4">
          <label className="text-xs font-medium text-slate-400 mb-2 block">Industry Interest (optional)</label>
          <select
            value={industry}
            onChange={e => setIndustry(e.target.value)}
            className="w-full bg-slate-800 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-500/50 text-sm"
          >
            <option value="">Select industry...</option>
            {INDUSTRY_TYPES.map(ind => <option key={ind} value={ind}>{ind}</option>)}
          </select>
        </div>
        {error && <p className="text-rose-400 text-sm mb-3">{error}</p>}
        <button
          onClick={calculate}
          className="w-full py-3 bg-amber-600 hover:bg-amber-500 text-white font-semibold rounded-xl transition-colors text-sm"
        >
          Calculate My Business Profile
        </button>
      </div>

      {result && compat && (
        <>
          {/* LP + Temperament */}
          <div className="bg-white/5 border border-amber-500/20 rounded-2xl p-6">
            <div className="flex items-start gap-4 mb-5">
              <div className="text-5xl font-bold text-amber-400">{result.lp}</div>
              <div>
                <div className="text-white font-semibold text-lg">{result.temperament.style}</div>
                <div className="text-slate-400 text-sm">Life Path Number</div>
                {name && <div className="text-slate-300 text-sm mt-1">{name}</div>}
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
              <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-4">
                <div className="text-green-400 font-semibold text-xs uppercase tracking-wider mb-2">Business Strength</div>
                <p className="text-slate-300">{result.temperament.strength}</p>
              </div>
              <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4">
                <div className="text-amber-400 font-semibold text-xs uppercase tracking-wider mb-2">Blind Spot</div>
                <p className="text-slate-300">{result.temperament.blindspot}</p>
              </div>
              <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4">
                <div className="text-blue-400 font-semibold text-xs uppercase tracking-wider mb-2">Ideal Business Role</div>
                <p className="text-slate-300">{result.temperament.roleInBusiness}</p>
              </div>
            </div>
          </div>

          {/* Compatible business numbers */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <h3 className="text-white font-semibold mb-4">Compatible Business Numbers for LP {result.lp}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
              {[
                { label: 'Most Compatible', nums: compat.primary, colour: 'green' },
                { label: 'Also Compatible', nums: compat.secondary, colour: 'amber' },
                { label: 'Proceed Carefully', nums: compat.avoid, colour: 'rose' },
              ].map(group => (
                <div key={group.label} className={`rounded-xl border p-4 ${
                  group.colour === 'green' ? 'bg-green-500/5 border-green-500/20' :
                  group.colour === 'amber' ? 'bg-amber-500/5 border-amber-500/20' :
                  'bg-rose-500/5 border-rose-500/20'
                }`}>
                  <div className={`text-xs font-semibold uppercase tracking-wider mb-3 ${
                    group.colour === 'green' ? 'text-green-400' :
                    group.colour === 'amber' ? 'text-amber-400' : 'text-rose-400'
                  }`}>{group.label}</div>
                  <div className="flex flex-wrap gap-2">
                    {group.nums.map(n => (
                      <span key={n} className="text-2xl font-bold text-white">{n}</span>
                    ))}
                  </div>
                  <div className="mt-2 space-y-1">
                    {group.nums.map(n => {
                      const p = BUSINESS_NUMBER_PROFILES[n];
                      return p ? (
                        <div key={n} className="text-xs text-slate-400">{n} — {p.name}</div>
                      ) : null;
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Industries */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <h3 className="text-white font-semibold mb-3">Ideal Industries & Professions for LP {result.lp}</h3>
            {industry && (
              <div className={`mb-4 rounded-xl p-3 text-sm flex items-center gap-2 ${
                result.industries.some(ind => ind.toLowerCase().includes(industry.toLowerCase().split('/')[0]))
                  ? 'bg-green-500/10 border border-green-500/20 text-green-300'
                  : 'bg-amber-500/10 border border-amber-500/20 text-amber-300'
              }`}>
                <CheckCircle className="w-4 h-4 shrink-0" />
                {result.industries.some(ind => ind.toLowerCase().includes(industry.toLowerCase().split('/')[0]))
                  ? `${industry} aligns well with your Life Path ${result.lp}.`
                  : `${industry} may not be your most natural fit. Consider consulting a numerologist for deeper guidance.`}
              </div>
            )}
            <div className="flex flex-wrap gap-2">
              {result.industries.map((ind, i) => (
                <span key={i} className="bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-sm text-slate-300">{ind}</span>
              ))}
            </div>
          </div>

          {/* Brand Name Suggestions */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <button
              onClick={() => setShowNameSuggest(!showNameSuggest)}
              className="flex items-center justify-between w-full text-left"
            >
              <h3 className="text-white font-semibold flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-amber-400" /> Suggest Compatible Brand Names
              </h3>
              {showNameSuggest ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
            </button>
            {showNameSuggest && (
              <div className="mt-4 space-y-4">
                <p className="text-slate-400 text-sm">
                  We'll generate name combinations that match your compatible business numbers ({compat.primary.join(', ')}).
                </p>
                <div className="flex gap-3">
                  <input
                    value={keywords}
                    onChange={e => setKeywords(e.target.value)}
                    placeholder="Keywords, comma-separated (e.g. bright, care, pro)"
                    className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-amber-500/50 text-sm"
                  />
                  <button
                    onClick={generateBrandSuggestions}
                    className="px-5 py-3 bg-amber-600 hover:bg-amber-500 text-white font-semibold rounded-xl transition-colors text-sm"
                  >
                    Generate
                  </button>
                </div>
                {result.suggestions.length > 0 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {result.suggestions.map((s, i) => (
                      <div key={i} className="flex items-center justify-between bg-white/5 border border-white/10 rounded-lg px-4 py-3">
                        <span className="text-white font-medium text-sm">{s.name}</span>
                        <span className="text-amber-400 font-bold text-sm ml-3">{s.number}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

// ─── PARTNER COMPATIBILITY TOOL ───────────────────────────────────────────

interface Partner {
  name: string;
  dob: string;
}

function PartnerCompatibilityTool() {
  const [partners, setPartners] = useState<Partner[]>([{ name: '', dob: '' }, { name: '', dob: '' }]);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState('');

  const addPartner = () => {
    if (partners.length >= 5) return;
    setPartners([...partners, { name: '', dob: '' }]);
  };

  const removePartner = (i: number) => {
    if (partners.length <= 2) return;
    setPartners(partners.filter((_, idx) => idx !== i));
  };

  const updatePartner = (i: number, field: keyof Partner, value: string) => {
    const updated = [...partners];
    updated[i] = { ...updated[i], [field]: value };
    setPartners(updated);
  };

  const calculate = () => {
    setError('');
    const profiles = partners.map((p, i) => {
      if (!p.dob) { setError(`Please enter a date of birth for partner ${i + 1}.`); return null; }
      const birth = new Date(p.dob);
      if (isNaN(birth.getTime())) { setError(`Invalid date for partner ${i + 1}.`); return null; }
      const lp = calculateLifePath(birth);
      const base = getBaseNumber(lp);
      const temperament = LP_TEMPERAMENT[base] || LP_TEMPERAMENT[1];
      return { name: p.name || `Partner ${i + 1}`, lp, base, temperament };
    });

    if (profiles.some(p => p === null)) return;

    // Calculate pairwise compatibilities
    const pairs: any[] = [];
    for (let a = 0; a < profiles.length; a++) {
      for (let b = a + 1; b < profiles.length; b++) {
        const pa = profiles[a]!;
        const pb = profiles[b]!;
        const compat = getCompatibility(pa.base, pb.base);
        pairs.push({ a: pa, b: pb, compat });
      }
    }

    // Overall group score
    const avgScore = Math.round(pairs.reduce((s, p) => s + p.compat.score, 0) / pairs.length);

    setResult({ profiles, pairs, avgScore });
  };

  const scoreColour = (score: number) => {
    if (score >= 85) return 'text-green-400 bg-green-500/10 border-green-500/30';
    if (score >= 70) return 'text-amber-400 bg-amber-500/10 border-amber-500/30';
    return 'text-rose-400 bg-rose-500/10 border-rose-500/30';
  };

  return (
    <div className="space-y-6">
      <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
        <h2 className="text-white font-semibold text-lg mb-2 flex items-center gap-2">
          <Users className="w-5 h-5 text-amber-400" /> Business Partner Compatibility
        </h2>
        <p className="text-slate-400 text-sm mb-5">
          Enter details for 2–5 business partners. Based on Life Path numbers, we'll assess compatibility, combined energy, and things to be mindful of.
        </p>

        <div className="space-y-3 mb-4">
          {partners.map((p, i) => (
            <div key={i} className="grid grid-cols-1 sm:grid-cols-5 gap-3 items-center">
              <div className="sm:col-span-2">
                <input
                  value={p.name}
                  onChange={e => updatePartner(i, 'name', e.target.value)}
                  placeholder={`Partner ${i + 1} name`}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-amber-500/50 text-sm"
                />
              </div>
              <div className="sm:col-span-2">
                <input
                  type="date"
                  value={p.dob}
                  onChange={e => updatePartner(i, 'dob', e.target.value)}
                  className="w-full bg-slate-800 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-500/50 text-sm"
                />
              </div>
              <div className="flex justify-end">
                {i >= 2 && (
                  <button
                    onClick={() => removePartner(i)}
                    className="p-2 text-slate-500 hover:text-rose-400 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="flex gap-3">
          {partners.length < 5 && (
            <button
              onClick={addPartner}
              className="flex items-center gap-2 px-4 py-2 text-sm text-slate-400 hover:text-white border border-white/10 rounded-xl hover:border-white/20 transition-colors"
            >
              <Plus className="w-4 h-4" /> Add Partner
            </button>
          )}
        </div>

        {error && <p className="text-rose-400 text-sm mt-3">{error}</p>}

        <button
          onClick={calculate}
          className="w-full mt-4 py-3 bg-amber-600 hover:bg-amber-500 text-white font-semibold rounded-xl transition-colors text-sm"
        >
          Analyse Partnership Compatibility
        </button>
      </div>

      {result && (
        <>
          {/* Overall score */}
          <div className={`rounded-2xl border p-6 text-center ${scoreColour(result.avgScore)}`}>
            <div className="text-5xl font-bold mb-2">{result.avgScore}%</div>
            <div className="font-semibold text-lg text-white">Overall Partnership Compatibility</div>
            <div className="text-sm text-slate-400 mt-1">
              {result.avgScore >= 85 ? 'Highly compatible — strong foundation for a powerful business partnership.' :
               result.avgScore >= 70 ? 'Good compatibility — clear strengths and manageable differences.' :
               'Moderate compatibility — significant differences require conscious effort and clear role definition.'}
            </div>
          </div>

          {/* Individual profiles */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <h3 className="text-white font-semibold mb-4">Individual Business Profiles</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {result.profiles.map((p: any, i: number) => (
                <div key={i} className="bg-slate-800/50 border border-white/10 rounded-xl p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400 font-bold">
                      {p.lp}
                    </div>
                    <div>
                      <div className="text-white font-semibold text-sm">{p.name}</div>
                      <div className="text-amber-400 text-xs">LP {p.lp} — {p.temperament.style}</div>
                    </div>
                  </div>
                  <div className="space-y-2 text-xs">
                    <div className="text-slate-400"><span className="text-green-400 font-medium">Strength: </span>{p.temperament.strength}</div>
                    <div className="text-slate-400"><span className="text-amber-400 font-medium">Blind spot: </span>{p.temperament.blindspot}</div>
                    <div className="text-slate-400"><span className="text-blue-400 font-medium">Natural role: </span>{p.temperament.roleInBusiness}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pairwise compatibility */}
          {result.pairs.map((pair: any, i: number) => (
            <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-white font-semibold">
                  {pair.a.name} <span className="text-slate-500">&</span> {pair.b.name}
                </h3>
                <div className={`text-lg font-bold px-4 py-1 rounded-full border ${scoreColour(pair.compat.score)}`}>
                  {pair.compat.score}%
                </div>
              </div>
              <div className="mb-4">
                <div className="text-amber-400 font-semibold text-sm mb-1">{pair.compat.dynamic}</div>
                <div className="text-xs text-slate-400">
                  LP {pair.a.lp} ({pair.a.temperament.style}) + LP {pair.b.lp} ({pair.b.temperament.style})
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="text-xs font-semibold text-green-400 uppercase tracking-wider mb-2">Combined Strengths</div>
                  <ul className="space-y-1">
                    {pair.compat.strengths.map((s: string, j: number) => (
                      <li key={j} className="flex items-start gap-2 text-slate-300">
                        <CheckCircle className="w-3.5 h-3.5 text-green-400 mt-0.5 shrink-0" /> {s}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <div className="text-xs font-semibold text-amber-400 uppercase tracking-wider mb-2">Watch Out For</div>
                  <ul className="space-y-1">
                    {pair.compat.watchouts.map((w: string, j: number) => (
                      <li key={j} className="flex items-start gap-2 text-slate-300">
                        <AlertTriangle className="w-3.5 h-3.5 text-amber-400 mt-0.5 shrink-0" /> {w}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
}
