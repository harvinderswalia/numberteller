import { useState, useCallback } from 'react';
import {
  Sparkles, ChevronRight, RotateCcw, Shuffle,
  FileText, Brain, Hash,
  RefreshCw, Copy, Check, Zap, Star
} from 'lucide-react';
import SiteNavigation from './SiteNavigation';
import SiteFooter from './SiteFooter';
import {
  ALL_CARDS, SPREAD_TEMPLATES, TarotCard, SpreadTemplate,
  TarotReadingResult, ToneType
} from '../data/tarotCards';
import { generateReading as nativeGenerateReading } from '../utils/tarotEngine';

interface SharedNumerologyContext {
  name?: string;
  lifePath?: string;
  expression?: string;
  soulUrge?: string;
  personalYear?: string;
  birthday?: string;
}

interface TarotPageProps {
  onNavigate: (page: string) => void;
  onShowAuth: () => void;
  sharedNumerology?: SharedNumerologyContext | null;
}

type Step = 'intention' | 'spread' | 'draw' | 'reading';

const TONE_OPTIONS: { value: ToneType; label: string; desc: string }[] = [
  { value: 'empowering', label: 'Empowering', desc: 'Uplifting & agency-focused' },
  { value: 'spiritual', label: 'Spiritual', desc: 'Soul journey & cosmic perspective' },
  { value: 'practical', label: 'Practical', desc: 'Concrete steps & real-world focus' },
  { value: 'direct', label: 'Direct', desc: 'Honest & no-fluff interpretation' },
  { value: 'vedic', label: 'Vedic-Flavoured', desc: 'Karma, dharma & cosmic timing' },
];

// ─── CARD ART SYSTEM ──────────────────────────────────────────────────────

// Parchment/cream colour palette per arcana/suit
const CARD_PALETTE: Record<string, { bg: string; border: string; accent: string; symbol: string; titleBg: string }> = {
  // Major arcana — ivory parchment with gold
  major: { bg: '#f5f0e0', border: '#b8960c', accent: '#8b6914', symbol: '#6b4c0a', titleBg: '#1a0a00' },
  wands:    { bg: '#fdf3e3', border: '#c2410c', accent: '#9a3412', symbol: '#7c2d12', titleBg: '#1c0a00' },
  cups:     { bg: '#eff6ff', border: '#1d4ed8', accent: '#1e40af', symbol: '#1e3a8a', titleBg: '#030712' },
  swords:   { bg: '#f1f5f9', border: '#475569', accent: '#334155', symbol: '#1e293b', titleBg: '#020617' },
  pentacles:{ bg: '#f0fdf4', border: '#15803d', accent: '#166534', symbol: '#14532d', titleBg: '#052e16' },
};

// Symbolic SVG art for each card — unique illustrations per card
const CARD_ART: Record<number, (size: 'sm' | 'md' | 'lg') => React.ReactNode> = {
  // THE FOOL
  0: (s) => {
    const [w, h] = s === 'sm' ? [48, 16] : s === 'md' ? [72, 22] : [96, 30];
    return (
      <svg viewBox="0 0 80 56" width={w} height={h * 1.4} className="mx-auto">
        <circle cx="40" cy="14" r="10" fill="#f59e0b" stroke="#b45309" strokeWidth="1.5"/>
        <line x1="40" y1="24" x2="40" y2="42" stroke="#78350f" strokeWidth="2"/>
        <line x1="40" y1="30" x2="28" y2="40" stroke="#78350f" strokeWidth="1.5"/>
        <line x1="40" y1="30" x2="55" y2="36" stroke="#78350f" strokeWidth="1.5"/>
        <line x1="40" y1="42" x2="32" y2="54" stroke="#78350f" strokeWidth="1.5"/>
        <line x1="40" y1="42" x2="50" y2="54" stroke="#78350f" strokeWidth="1.5"/>
        <circle cx="55" cy="20" r="4" fill="#fbbf24" stroke="#b45309" strokeWidth="1"/>
        <path d="M55 8 Q60 16 55 20 Q52 16 55 8Z" fill="#fbbf24" stroke="#b45309" strokeWidth="0.8"/>
        <path d="M15 50 Q20 42 28 48 Q22 52 15 50Z" fill="#16a34a" stroke="#15803d" strokeWidth="0.8"/>
      </svg>
    );
  },
  // THE MAGICIAN
  1: (s) => {
    const [w, h] = s === 'sm' ? [48, 16] : s === 'md' ? [72, 22] : [96, 30];
    return (
      <svg viewBox="0 0 80 56" width={w} height={h * 1.4} className="mx-auto">
        <path d="M40 4 L43 12 L52 12 L45 18 L48 26 L40 21 L32 26 L35 18 L28 12 L37 12Z" fill="#f59e0b" stroke="#b45309" strokeWidth="1"/>
        <circle cx="40" cy="32" r="8" fill="none" stroke="#b45309" strokeWidth="1.5"/>
        <line x1="40" y1="24" x2="40" y2="40" stroke="#b45309" strokeWidth="1.5"/>
        <line x1="32" y1="32" x2="48" y2="32" stroke="#b45309" strokeWidth="1.5"/>
        <text x="40" y="35" textAnchor="middle" fontSize="8" fill="#78350f">∞</text>
        <line x1="40" y1="8" x2="40" y2="4" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    );
  },
  // HIGH PRIESTESS
  2: (s) => {
    const [w, h] = s === 'sm' ? [48, 16] : s === 'md' ? [72, 22] : [96, 30];
    return (
      <svg viewBox="0 0 80 56" width={w} height={h * 1.4} className="mx-auto">
        <rect x="28" y="6" width="6" height="44" fill="#6b21a8" stroke="#4c1d95" strokeWidth="1" rx="1"/>
        <rect x="46" y="6" width="6" height="44" fill="#e5e7eb" stroke="#6b7280" strokeWidth="1" rx="1"/>
        <ellipse cx="40" cy="12" rx="8" ry="10" fill="#1e1b4b" stroke="#3730a3" strokeWidth="1.5"/>
        <circle cx="40" cy="12" r="4" fill="#fbbf24" stroke="#b45309" strokeWidth="1"/>
        <path d="M30 28 Q40 20 50 28 Q40 36 30 28Z" fill="#1e40af" stroke="#1d4ed8" strokeWidth="1"/>
        <text x="40" y="44" textAnchor="middle" fontSize="6" fill="#1e1b4b" fontWeight="bold">TORA</text>
      </svg>
    );
  },
  // THE EMPRESS
  3: (s) => {
    const [w, h] = s === 'sm' ? [48, 16] : s === 'md' ? [72, 22] : [96, 30];
    return (
      <svg viewBox="0 0 80 56" width={w} height={h * 1.4} className="mx-auto">
        <ellipse cx="40" cy="30" rx="18" ry="20" fill="#86efac" stroke="#16a34a" strokeWidth="1.5"/>
        <ellipse cx="40" cy="20" rx="10" ry="12" fill="#fde68a" stroke="#d97706" strokeWidth="1.5"/>
        <circle cx="40" cy="14" r="5" fill="#f9a8d4" stroke="#db2777" strokeWidth="1"/>
        <path d="M30 14 L28 10 L32 12Z" fill="#fbbf24" stroke="#b45309" strokeWidth="0.8"/>
        <path d="M50 14 L52 10 L48 12Z" fill="#fbbf24" stroke="#b45309" strokeWidth="0.8"/>
        <path d="M36 14 L34 10 L38 8 L42 10 L40 14" fill="#fbbf24" stroke="#b45309" strokeWidth="0.8"/>
        <circle cx="30" cy="42" r="3" fill="#f9a8d4" stroke="#db2777" strokeWidth="1"/>
        <circle cx="50" cy="42" r="3" fill="#f9a8d4" stroke="#db2777" strokeWidth="1"/>
        <path d="M26 46 Q33 38 40 46 Q47 38 54 46" fill="none" stroke="#16a34a" strokeWidth="1.5"/>
      </svg>
    );
  },
  // THE EMPEROR
  4: (s) => {
    const [w, h] = s === 'sm' ? [48, 16] : s === 'md' ? [72, 22] : [96, 30];
    return (
      <svg viewBox="0 0 80 56" width={w} height={h * 1.4} className="mx-auto">
        <rect x="24" y="24" width="32" height="28" fill="#dc2626" stroke="#991b1b" strokeWidth="1.5" rx="2"/>
        <rect x="20" y="20" width="40" height="8" fill="#b91c1c" stroke="#991b1b" strokeWidth="1" rx="1"/>
        <circle cx="40" cy="16" r="8" fill="#fde68a" stroke="#d97706" strokeWidth="1.5"/>
        <path d="M32 10 L40 6 L48 10 L46 16 L34 16Z" fill="#fbbf24" stroke="#b45309" strokeWidth="1"/>
        <rect x="36" y="32" width="8" height="12" fill="#fbbf24" stroke="#b45309" strokeWidth="1" rx="1"/>
        <circle cx="40" cy="38" r="3" fill="#dc2626" stroke="#991b1b" strokeWidth="0.8"/>
        <line x1="26" y1="44" x2="26" y2="52" stroke="#7f1d1d" strokeWidth="2"/>
        <line x1="54" y1="44" x2="54" y2="52" stroke="#7f1d1d" strokeWidth="2"/>
      </svg>
    );
  },
  // THE HIEROPHANT
  5: (s) => {
    const [w, h] = s === 'sm' ? [48, 16] : s === 'md' ? [72, 22] : [96, 30];
    return (
      <svg viewBox="0 0 80 56" width={w} height={h * 1.4} className="mx-auto">
        <rect x="34" y="28" width="12" height="24" fill="#d97706" stroke="#b45309" strokeWidth="1.5"/>
        <path d="M30 28 Q40 14 50 28Z" fill="#d97706" stroke="#b45309" strokeWidth="1.5"/>
        <circle cx="40" cy="16" r="6" fill="#fbbf24" stroke="#b45309" strokeWidth="1.5"/>
        <line x1="38" y1="10" x2="38" y2="4" stroke="#b45309" strokeWidth="2"/>
        <line x1="42" y1="10" x2="42" y2="4" stroke="#b45309" strokeWidth="2"/>
        <line x1="36" y1="6" x2="44" y2="6" stroke="#b45309" strokeWidth="1.5"/>
        <path d="M28 44 L26 52" stroke="#92400e" strokeWidth="2"/>
        <path d="M52 44 L54 52" stroke="#92400e" strokeWidth="2"/>
        <text x="40" y="38" textAnchor="middle" fontSize="7" fill="#7c2d12">†</text>
      </svg>
    );
  },
  // THE LOVERS
  6: (s) => {
    const [w, h] = s === 'sm' ? [48, 16] : s === 'md' ? [72, 22] : [96, 30];
    return (
      <svg viewBox="0 0 80 56" width={w} height={h * 1.4} className="mx-auto">
        <circle cx="30" cy="30" r="10" fill="#fde68a" stroke="#d97706" strokeWidth="1.5"/>
        <circle cx="50" cy="30" r="10" fill="#fbcfe8" stroke="#db2777" strokeWidth="1.5"/>
        <circle cx="30" cy="22" r="6" fill="#fde68a" stroke="#d97706" strokeWidth="1"/>
        <circle cx="50" cy="22" r="6" fill="#fbcfe8" stroke="#db2777" strokeWidth="1"/>
        <path d="M30 8 L33 14 L40 14 L35 18 L37 24 L30 20 L23 24 L25 18 L20 14 L27 14Z" fill="#fbbf24" stroke="#b45309" strokeWidth="1"/>
        <path d="M28 30 Q40 22 52 30" fill="none" stroke="#dc2626" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    );
  },
  // THE CHARIOT
  7: (s) => {
    const [w, h] = s === 'sm' ? [48, 16] : s === 'md' ? [72, 22] : [96, 30];
    return (
      <svg viewBox="0 0 80 56" width={w} height={h * 1.4} className="mx-auto">
        <rect x="20" y="26" width="40" height="20" fill="#1e40af" stroke="#1d4ed8" strokeWidth="1.5" rx="2"/>
        <circle cx="26" cy="50" r="5" fill="none" stroke="#6b7280" strokeWidth="2"/>
        <circle cx="54" cy="50" r="5" fill="none" stroke="#6b7280" strokeWidth="2"/>
        <circle cx="30" cy="22" r="8" fill="#fde68a" stroke="#d97706" strokeWidth="1.5"/>
        <circle cx="50" cy="22" r="8" fill="#e5e7eb" stroke="#6b7280" strokeWidth="1.5"/>
        <path d="M26 40 L26 22" stroke="#1d4ed8" strokeWidth="1.5"/>
        <path d="M54 40 L54 22" stroke="#1d4ed8" strokeWidth="1.5"/>
        <path d="M30 8 L32 14 L38 14 L33 18 L35 24 L30 20 L25 24 L27 18 L22 14 L28 14Z" fill="#fbbf24" stroke="#b45309" strokeWidth="1"/>
      </svg>
    );
  },
  // STRENGTH
  8: (s) => {
    const [w, h] = s === 'sm' ? [48, 16] : s === 'md' ? [72, 22] : [96, 30];
    return (
      <svg viewBox="0 0 80 56" width={w} height={h * 1.4} className="mx-auto">
        <ellipse cx="32" cy="34" rx="16" ry="14" fill="#fde68a" stroke="#d97706" strokeWidth="1.5"/>
        <circle cx="32" cy="24" r="7" fill="#fde68a" stroke="#d97706" strokeWidth="1.5"/>
        <path d="M48 38 Q60 32 58 44 Q52 50 46 44Z" fill="#d97706" stroke="#b45309" strokeWidth="1.5"/>
        <path d="M44 30 Q54 22 56 30 Q54 36 48 36Z" fill="#d97706" stroke="#b45309" strokeWidth="1.5"/>
        <path d="M48 34 Q44 30 44 38 Q46 42 50 40Z" fill="#d97706" stroke="#b45309" strokeWidth="1"/>
        <text x="32" y="26" textAnchor="middle" fontSize="7" fill="#78350f">∞</text>
        <path d="M20 46 Q26 38 34 44 Q28 50 20 46Z" fill="#86efac" stroke="#16a34a" strokeWidth="1"/>
      </svg>
    );
  },
  // THE HERMIT
  9: (s) => {
    const [w, h] = s === 'sm' ? [48, 16] : s === 'md' ? [72, 22] : [96, 30];
    return (
      <svg viewBox="0 0 80 56" width={w} height={h * 1.4} className="mx-auto">
        <line x1="40" y1="6" x2="40" y2="50" stroke="#374151" strokeWidth="3" strokeLinecap="round"/>
        <path d="M30 22 Q40 10 50 22 Q40 32 30 22Z" fill="#94a3b8" stroke="#475569" strokeWidth="1.5"/>
        <circle cx="55" cy="18" r="7" fill="#fde68a" stroke="#d97706" strokeWidth="1.5"/>
        <path d="M52 15 L55 11 L58 15 L56 18 L54 18Z" fill="#fbbf24" stroke="#b45309" strokeWidth="1"/>
        <path d="M48 18 L52 18 L55 22 L52 26 L48 26Z" fill="#fbbf24" stroke="#b45309" strokeWidth="1"/>
        <circle cx="55" cy="18" r="3" fill="#f97316" stroke="#ea580c" strokeWidth="1"/>
        <line x1="36" y1="44" x2="44" y2="50" stroke="#374151" strokeWidth="2"/>
        <line x1="36" y1="36" x2="26" y2="44" stroke="#374151" strokeWidth="1.5"/>
      </svg>
    );
  },
  // WHEEL OF FORTUNE
  10: (s) => {
    const [w, h] = s === 'sm' ? [48, 16] : s === 'md' ? [72, 22] : [96, 30];
    return (
      <svg viewBox="0 0 80 56" width={w} height={h * 1.4} className="mx-auto">
        <circle cx="40" cy="28" r="22" fill="none" stroke="#1d4ed8" strokeWidth="2"/>
        <circle cx="40" cy="28" r="14" fill="none" stroke="#1d4ed8" strokeWidth="1.5"/>
        <circle cx="40" cy="28" r="5" fill="#fbbf24" stroke="#b45309" strokeWidth="1.5"/>
        {[0,45,90,135,180,225,270,315].map((a,i) => {
          const r = a*Math.PI/180;
          return <line key={i} x1={40+14*Math.sin(r)} y1={28-14*Math.cos(r)} x2={40+22*Math.sin(r)} y2={28-22*Math.cos(r)} stroke="#1d4ed8" strokeWidth="1.5"/>;
        })}
        <text x="28" y="18" fontSize="7" fill="#dc2626" fontWeight="bold">T</text>
        <text x="52" y="18" fontSize="7" fill="#16a34a" fontWeight="bold">A</text>
        <text x="52" y="42" fontSize="7" fill="#d97706" fontWeight="bold">R</text>
        <text x="28" y="42" fontSize="7" fill="#1d4ed8" fontWeight="bold">O</text>
      </svg>
    );
  },
  // JUSTICE
  11: (s) => {
    const [w, h] = s === 'sm' ? [48, 16] : s === 'md' ? [72, 22] : [96, 30];
    return (
      <svg viewBox="0 0 80 56" width={w} height={h * 1.4} className="mx-auto">
        <line x1="40" y1="8" x2="40" y2="50" stroke="#374151" strokeWidth="2.5"/>
        <line x1="24" y1="20" x2="56" y2="20" stroke="#374151" strokeWidth="2"/>
        <circle cx="24" cy="28" r="6" fill="none" stroke="#d97706" strokeWidth="1.5"/>
        <circle cx="56" cy="22" r="6" fill="none" stroke="#d97706" strokeWidth="1.5"/>
        <path d="M20 28 L28 28" stroke="#d97706" strokeWidth="1.5"/>
        <path d="M52 22 L60 22" stroke="#d97706" strokeWidth="1.5"/>
        <path d="M34 8 L36 4 L40 2 L44 4 L46 8" fill="none" stroke="#fbbf24" strokeWidth="1.5"/>
        <rect x="34" y="38" width="12" height="10" fill="#dc2626" stroke="#991b1b" strokeWidth="1" rx="1"/>
        <line x1="40" y1="20" x2="40" y2="28" stroke="#6b7280" strokeWidth="1.5"/>
      </svg>
    );
  },
  // THE HANGED MAN
  12: (s) => {
    const [w, h] = s === 'sm' ? [48, 16] : s === 'md' ? [72, 22] : [96, 30];
    return (
      <svg viewBox="0 0 80 56" width={w} height={h * 1.4} className="mx-auto">
        <line x1="24" y1="6" x2="24" y2="50" stroke="#92400e" strokeWidth="3" strokeLinecap="round"/>
        <line x1="56" y1="6" x2="56" y2="50" stroke="#92400e" strokeWidth="3" strokeLinecap="round"/>
        <line x1="24" y1="10" x2="56" y2="10" stroke="#92400e" strokeWidth="2.5"/>
        <line x1="40" y1="10" x2="40" y2="24" stroke="#374151" strokeWidth="2"/>
        <circle cx="40" cy="28" r="6" fill="#fde68a" stroke="#d97706" strokeWidth="1.5"/>
        <path d="M34 34 Q34 44 40 44 Q46 44 46 34" fill="#1e40af" stroke="#1d4ed8" strokeWidth="1.5"/>
        <line x1="40" y1="40" x2="32" y2="48" stroke="#374151" strokeWidth="1.5"/>
        <line x1="40" y1="40" x2="48" y2="48" stroke="#374151" strokeWidth="1.5"/>
        <path d="M36 28 Q40 22 44 28" fill="none" stroke="#fbbf24" strokeWidth="1.5"/>
      </svg>
    );
  },
  // DEATH
  13: (s) => {
    const [w, h] = s === 'sm' ? [48, 16] : s === 'md' ? [72, 22] : [96, 30];
    return (
      <svg viewBox="0 0 80 56" width={w} height={h * 1.4} className="mx-auto">
        <path d="M18 50 L30 20 Q40 8 50 20 L62 50Z" fill="#1e293b" stroke="#334155" strokeWidth="1.5"/>
        <circle cx="40" cy="20" r="10" fill="#1e293b" stroke="#e2e8f0" strokeWidth="2"/>
        <circle cx="36" cy="18" r="2" fill="#e2e8f0"/>
        <circle cx="44" cy="18" r="2" fill="#e2e8f0"/>
        <path d="M36 24 Q40 26 44 24" fill="none" stroke="#e2e8f0" strokeWidth="1.5"/>
        <path d="M28 40 Q40 32 52 40" fill="none" stroke="#e2e8f0" strokeWidth="1.5"/>
        <path d="M24 10 Q40 2 56 10 Q52 20 40 18 Q28 20 24 10Z" fill="#dc2626" stroke="#991b1b" strokeWidth="1"/>
        <path d="M38 12 L40 6 L42 12 L48 12 L43 16 L45 22 L40 18 L35 22 L37 16 L32 12Z" fill="#fbbf24" stroke="#b45309" strokeWidth="0.8"/>
      </svg>
    );
  },
  // TEMPERANCE
  14: (s) => {
    const [w, h] = s === 'sm' ? [48, 16] : s === 'md' ? [72, 22] : [96, 30];
    return (
      <svg viewBox="0 0 80 56" width={w} height={h * 1.4} className="mx-auto">
        <path d="M26 14 L54 14 L54 42 L26 42Z" fill="none" stroke="#1d4ed8" strokeWidth="1.5"/>
        <ellipse cx="40" cy="14" rx="14" ry="5" fill="#93c5fd" stroke="#1d4ed8" strokeWidth="1.5"/>
        <ellipse cx="40" cy="42" rx="14" ry="5" fill="#6ee7b7" stroke="#059669" strokeWidth="1.5"/>
        <path d="M30 18 Q32 28 36 38" fill="none" stroke="#0ea5e9" strokeWidth="2" strokeLinecap="round"/>
        <path d="M50 18 Q48 28 44 38" fill="none" stroke="#0ea5e9" strokeWidth="2" strokeLinecap="round"/>
        <path d="M32 10 L36 2 L40 0 L44 2 L48 10" fill="none" stroke="#fbbf24" strokeWidth="1.5"/>
        <circle cx="40" cy="6" r="4" fill="#fbbf24" stroke="#b45309" strokeWidth="1"/>
      </svg>
    );
  },
  // THE DEVIL
  15: (s) => {
    const [w, h] = s === 'sm' ? [48, 16] : s === 'md' ? [72, 22] : [96, 30];
    return (
      <svg viewBox="0 0 80 56" width={w} height={h * 1.4} className="mx-auto">
        <path d="M30 18 Q40 4 50 18 Q56 28 40 32 Q24 28 30 18Z" fill="#1c1917" stroke="#dc2626" strokeWidth="1.5"/>
        <circle cx="40" cy="22" r="8" fill="#1c1917" stroke="#dc2626" strokeWidth="1.5"/>
        <circle cx="37" cy="21" r="1.5" fill="#dc2626"/>
        <circle cx="43" cy="21" r="1.5" fill="#dc2626"/>
        <path d="M37 26 Q40 24 43 26" fill="none" stroke="#dc2626" strokeWidth="1"/>
        <path d="M34 16 L30 10 L38 16Z" fill="#dc2626" stroke="#991b1b" strokeWidth="0.8"/>
        <path d="M46 16 L50 10 L42 16Z" fill="#dc2626" stroke="#991b1b" strokeWidth="0.8"/>
        <circle cx="28" cy="42" r="5" fill="#374151" stroke="#6b7280" strokeWidth="1.5"/>
        <circle cx="52" cy="42" r="5" fill="#374151" stroke="#6b7280" strokeWidth="1.5"/>
        <line x1="34" y1="32" x2="30" y2="38" stroke="#374151" strokeWidth="1.5"/>
        <line x1="46" y1="32" x2="50" y2="38" stroke="#374151" strokeWidth="1.5"/>
        <path d="M40" y1="30" />
        <path d="M36 30 Q40 28 44 30" stroke="#dc2626" strokeWidth="1"/>
      </svg>
    );
  },
  // THE TOWER
  16: (s) => {
    const [w, h] = s === 'sm' ? [48, 16] : s === 'md' ? [72, 22] : [96, 30];
    return (
      <svg viewBox="0 0 80 56" width={w} height={h * 1.4} className="mx-auto">
        <rect x="28" y="14" width="24" height="36" fill="#374151" stroke="#1f2937" strokeWidth="1.5" rx="1"/>
        <path d="M28 14 L40 6 L52 14Z" fill="#6b7280" stroke="#4b5563" strokeWidth="1.5"/>
        <rect x="36" y="6" width="8" height="8" fill="#374151" stroke="#1f2937" strokeWidth="1"/>
        <path d="M12 16 L20 28 L28 24" fill="none" stroke="#f59e0b" strokeWidth="2.5" strokeLinecap="round"/>
        <path d="M68 18 L60 28 L52 22" fill="none" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round"/>
        <circle cx="24" cy="44" r="4" fill="#fde68a" stroke="#d97706" strokeWidth="1"/>
        <circle cx="56" cy="40" r="3" fill="#fde68a" stroke="#d97706" strokeWidth="1"/>
        <rect x="36" y="24" width="8" height="10" fill="#1f2937" stroke="#374151" strokeWidth="1" rx="1"/>
        <line x1="40" y1="28" x2="40" y2="34" stroke="#6b7280" strokeWidth="1"/>
      </svg>
    );
  },
  // THE STAR
  17: (s) => {
    const [w, h] = s === 'sm' ? [48, 16] : s === 'md' ? [72, 22] : [96, 30];
    return (
      <svg viewBox="0 0 80 56" width={w} height={h * 1.4} className="mx-auto">
        <path d="M40 4 L43 14 L53 14 L45 20 L48 30 L40 24 L32 30 L35 20 L27 14 L37 14Z" fill="#fbbf24" stroke="#b45309" strokeWidth="1.5"/>
        {[[18,14],[62,14],[14,40],[66,40],[36,50],[44,50]].map(([cx,cy],i) => (
          <path key={i} d={`M${cx} ${cy-5} L${cx+1.5} ${cy-1.5} L${cx+5} ${cy-1.5} L${cx+2.5} ${cy+1} L${cx+4} ${cy+4.5} L${cx} ${cy+2.5} L${cx-4} ${cy+4.5} L${cx-2.5} ${cy+1} L${cx-5} ${cy-1.5} L${cx-1.5} ${cy-1.5}Z`} fill="#93c5fd" stroke="#3b82f6" strokeWidth="0.8"/>
        ))}
        <path d="M30 42 Q30 52 36 52" fill="none" stroke="#0ea5e9" strokeWidth="2" strokeLinecap="round"/>
        <path d="M50 38 Q50 52 44 52" fill="none" stroke="#6ee7b7" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    );
  },
  // THE MOON
  18: (s) => {
    const [w, h] = s === 'sm' ? [48, 16] : s === 'md' ? [72, 22] : [96, 30];
    return (
      <svg viewBox="0 0 80 56" width={w} height={h * 1.4} className="mx-auto">
        <path d="M40 6 Q54 6 56 18 Q50 14 42 16 Q32 18 32 28 Q32 38 40 40 Q28 42 26 30 Q24 16 40 6Z" fill="#e0e7ff" stroke="#818cf8" strokeWidth="1.5"/>
        <circle cx="30" cy="14" r="2" fill="#818cf8"/>
        <circle cx="36" cy="10" r="1.5" fill="#818cf8"/>
        <rect x="20" y="44" width="10" height="8" fill="#374151" stroke="#1f2937" strokeWidth="1" rx="1"/>
        <rect x="50" y="44" width="10" height="8" fill="#374151" stroke="#1f2937" strokeWidth="1" rx="1"/>
        <path d="M22 44 Q40 36 58 44" fill="none" stroke="#60a5fa" strokeWidth="1.5"/>
        <ellipse cx="40" cy="48" rx="10" ry="3" fill="#1e3a8a" stroke="#1d4ed8" strokeWidth="1"/>
        <path d="M34 38 L30 44" stroke="#374151" strokeWidth="1.5"/>
        <path d="M46 38 L50 44" stroke="#374151" strokeWidth="1.5"/>
      </svg>
    );
  },
  // THE SUN
  19: (s) => {
    const [w, h] = s === 'sm' ? [48, 16] : s === 'md' ? [72, 22] : [96, 30];
    return (
      <svg viewBox="0 0 80 56" width={w} height={h * 1.4} className="mx-auto">
        <circle cx="40" cy="22" r="14" fill="#fbbf24" stroke="#b45309" strokeWidth="2"/>
        {[0,30,60,90,120,150,180,210,240,270,300,330].map((a,i) => {
          const r = a*Math.PI/180;
          return <line key={i} x1={40+14*Math.sin(r)} y1={22-14*Math.cos(r)} x2={40+20*Math.sin(r)} y2={22-20*Math.cos(r)} stroke="#f59e0b" strokeWidth="2" strokeLinecap="round"/>;
        })}
        <circle cx="40" cy="22" r="7" fill="#fef3c7" stroke="#fbbf24" strokeWidth="1"/>
        <circle cx="40" cy="46" r="6" fill="#fde68a" stroke="#d97706" strokeWidth="1.5"/>
        <line x1="40" y1="36" x2="40" y2="40" stroke="#b45309" strokeWidth="1.5"/>
        <path d="M26 50 Q33 44 40 50 Q47 44 54 50" fill="none" stroke="#16a34a" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    );
  },
  // JUDGEMENT
  20: (s) => {
    const [w, h] = s === 'sm' ? [48, 16] : s === 'md' ? [72, 22] : [96, 30];
    return (
      <svg viewBox="0 0 80 56" width={w} height={h * 1.4} className="mx-auto">
        <path d="M32 4 Q40 0 48 4 Q52 10 48 16 Q40 20 32 16 Q28 10 32 4Z" fill="#fde68a" stroke="#d97706" strokeWidth="1.5"/>
        <path d="M34 16 L34 28 L38 28 L38 16" fill="#d97706" stroke="#b45309" strokeWidth="1"/>
        <path d="M42 16 L42 28 L46 28 L46 16" fill="#d97706" stroke="#b45309" strokeWidth="1"/>
        <rect x="22" y="36" width="12" height="16" fill="#e5e7eb" stroke="#6b7280" strokeWidth="1.5" rx="1"/>
        <rect x="46" y="36" width="12" height="16" fill="#e5e7eb" stroke="#6b7280" strokeWidth="1.5" rx="1"/>
        <circle cx="28" cy="32" r="4" fill="#fde68a" stroke="#d97706" strokeWidth="1"/>
        <circle cx="52" cy="32" r="4" fill="#fde68a" stroke="#d97706" strokeWidth="1"/>
        <path d="M28 28 L28 36" stroke="#6b7280" strokeWidth="1.5"/>
        <path d="M52 28 L52 36" stroke="#6b7280" strokeWidth="1.5"/>
        <path d="M34 28 Q40 24 46 28" fill="none" stroke="#fbbf24" strokeWidth="2"/>
      </svg>
    );
  },
  // THE WORLD
  21: (s) => {
    const [w, h] = s === 'sm' ? [48, 16] : s === 'md' ? [72, 22] : [96, 30];
    return (
      <svg viewBox="0 0 80 56" width={w} height={h * 1.4} className="mx-auto">
        <ellipse cx="40" cy="28" rx="22" ry="26" fill="none" stroke="#059669" strokeWidth="1.5" strokeDasharray="4 2"/>
        <ellipse cx="40" cy="28" rx="14" ry="18" fill="#d1fae5" stroke="#059669" strokeWidth="1.5"/>
        <circle cx="40" cy="28" r="7" fill="#fde68a" stroke="#d97706" strokeWidth="1.5"/>
        <circle cx="40" cy="28" r="3" fill="#fbbf24" stroke="#b45309" strokeWidth="1"/>
        <circle cx="20" cy="14" r="3" fill="#fbbf24" stroke="#b45309" strokeWidth="1"/>
        <circle cx="60" cy="14" r="3" fill="#ef4444" stroke="#b91c1c" strokeWidth="1"/>
        <circle cx="20" cy="44" r="3" fill="#3b82f6" stroke="#1d4ed8" strokeWidth="1"/>
        <circle cx="60" cy="44" r="3" fill="#16a34a" stroke="#166534" strokeWidth="1"/>
      </svg>
    );
  },
};

// Minor arcana suit symbols
const SUIT_SYMBOLS: Record<string, React.ReactNode> = {
  wands: (
    <svg viewBox="0 0 24 36" width="16" height="24" className="mx-auto">
      <line x1="12" y1="4" x2="12" y2="32" stroke="#c2410c" strokeWidth="2.5" strokeLinecap="round"/>
      <path d="M12 4 Q9 8 12 12 Q15 8 12 4Z" fill="#c2410c"/>
      <path d="M8 12 Q6 16 9 18 Q10 14 8 12Z" fill="#c2410c"/>
      <path d="M16 12 Q18 16 15 18 Q14 14 16 12Z" fill="#c2410c"/>
    </svg>
  ),
  cups: (
    <svg viewBox="0 0 24 36" width="16" height="24" className="mx-auto">
      <path d="M6 8 Q6 20 12 22 Q18 20 18 8Z" fill="none" stroke="#1d4ed8" strokeWidth="2"/>
      <path d="M8 8 L16 8" stroke="#1d4ed8" strokeWidth="2"/>
      <path d="M9 22 L9 28 L15 28 L15 22" fill="none" stroke="#1d4ed8" strokeWidth="1.5"/>
      <path d="M7 28 L17 28" stroke="#1d4ed8" strokeWidth="2"/>
    </svg>
  ),
  swords: (
    <svg viewBox="0 0 24 36" width="16" height="24" className="mx-auto">
      <line x1="12" y1="2" x2="12" y2="28" stroke="#475569" strokeWidth="2" strokeLinecap="round"/>
      <path d="M12 2 L9 8 L15 8Z" fill="#475569"/>
      <line x1="6" y1="24" x2="18" y2="24" stroke="#475569" strokeWidth="2"/>
      <line x1="10" y1="28" x2="14" y2="32" stroke="#92400e" strokeWidth="2"/>
    </svg>
  ),
  pentacles: (
    <svg viewBox="0 0 24 36" width="16" height="24" className="mx-auto">
      <path d="M12 4 L14 10 L20 10 L15 14 L17 20 L12 16 L7 20 L9 14 L4 10 L10 10Z" fill="none" stroke="#15803d" strokeWidth="1.5"/>
      <circle cx="12" cy="12" r="8" fill="none" stroke="#15803d" strokeWidth="1.5"/>
    </svg>
  ),
};

// Roman numerals for major arcana
const ROMAN = ['0','I','II','III','IV','V','VI','VII','VIII','IX','X','XI','XII','XIII','XIV','XV','XVI','XVII','XVIII','XIX','XX','XXI'];

function CardFlip({ card, reversed, size = 'md', onClick, selected }: {
  card: TarotCard;
  reversed: boolean;
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  selected?: boolean;
}) {
  const sizeMap = {
    sm: { w: 'w-[72px]', h: 'h-[112px]', pad: 'p-1', nameSize: 'text-[7px]', numSize: 'text-[7px]' },
    md: { w: 'w-[96px]', h: 'h-[148px]', pad: 'p-1.5', nameSize: 'text-[8px]', numSize: 'text-[8px]' },
    lg: { w: 'w-[128px]', h: 'h-[196px]', pad: 'p-2', nameSize: 'text-[9px]', numSize: 'text-[9px]' },
  };
  const s = sizeMap[size];
  const paletteKey = card.arcana === 'major' ? 'major' : (card.suit || 'major');
  const pal = CARD_PALETTE[paletteKey];
  const artFn = CARD_ART[card.id];

  return (
    <div
      onClick={onClick}
      className={`${s.w} ${s.h} flex-shrink-0 relative cursor-pointer transition-all duration-200 select-none ${
        selected ? 'ring-2 ring-blue-400 ring-offset-2 ring-offset-slate-900 scale-105' : 'hover:scale-105 hover:-translate-y-0.5'
      } ${reversed ? 'rotate-180' : ''}`}
      style={{ filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.5))' }}
    >
      {/* Outer frame — cream parchment */}
      <div
        className="w-full h-full rounded-lg flex flex-col overflow-hidden"
        style={{ backgroundColor: pal.bg, border: `2px solid ${pal.border}` }}
      >
        {/* Inner border rule */}
        <div className="absolute inset-[4px] rounded-md pointer-events-none" style={{ border: `1px solid ${pal.border}44` }} />

        {/* Top label — roman numeral or suit number */}
        <div className={`flex items-center justify-between ${s.pad} pb-0`} style={{ borderBottom: `1px solid ${pal.border}33` }}>
          <span className={`${s.numSize} font-bold leading-none`} style={{ color: pal.accent }}>
            {card.arcana === 'major' ? ROMAN[card.number] : card.number}
          </span>
          {card.arcana === 'minor' && card.suit && (
            <span style={{ color: pal.accent, fontSize: '9px' }}>
              {card.suit === 'wands' ? '🔥' : card.suit === 'cups' ? '💧' : card.suit === 'swords' ? '⚔' : '⭐'}
            </span>
          )}
        </div>

        {/* Art area */}
        <div className="flex-1 flex items-center justify-center py-0.5" style={{ backgroundColor: `${pal.bg}` }}>
          {artFn ? (
            artFn(size)
          ) : (
            /* Fallback for minor cards without custom art */
            <div className="flex flex-col items-center gap-1">
              {SUIT_SYMBOLS[card.suit || ''] || <span className="text-2xl">{card.emoji}</span>}
              <span style={{ color: pal.accent, fontSize: '10px' }}>{card.emoji}</span>
            </div>
          )}
        </div>

        {/* Name banner */}
        <div
          className={`${s.pad} pt-0`}
          style={{ borderTop: `1px solid ${pal.border}33` }}
        >
          <p
            className={`${s.nameSize} font-bold text-center leading-tight uppercase tracking-wider`}
            style={{ color: pal.titleBg === '#1a0a00' ? pal.accent : pal.accent }}
          >
            {card.name.length > 16 ? card.name.slice(0, 15) + '.' : card.name}
          </p>
        </div>
      </div>

      {/* Reversed indicator */}
      {reversed && (
        <div
          className="absolute z-20 bg-amber-500 text-white font-black px-1.5 py-0.5 rounded-full shadow-lg leading-none"
          style={{ top: '-6px', right: '-6px', fontSize: '7px', transform: 'rotate(0deg)' }}
        >
          REV
        </div>
      )}
    </div>
  );
}

function CardBack({ size = 'md', onClick, empty }: { size?: 'sm' | 'md' | 'lg'; onClick?: () => void; empty?: boolean }) {
  const sizeMap = {
    sm: { w: 'w-[72px]', h: 'h-[112px]' },
    md: { w: 'w-[96px]', h: 'h-[148px]' },
    lg: { w: 'w-[128px]', h: 'h-[196px]' },
  };
  const s = sizeMap[size];

  if (empty) {
    return (
      <div
        onClick={onClick}
        className={`${s.w} ${s.h} flex-shrink-0 rounded-lg border-2 border-dashed border-white/20 bg-slate-800/40 flex items-center justify-center cursor-pointer hover:border-white/40 hover:bg-slate-800/60 transition-all`}
      >
        <span className="text-gray-600 text-2xl">+</span>
      </div>
    );
  }

  return (
    <div
      onClick={onClick}
      className={`${s.w} ${s.h} flex-shrink-0 rounded-lg cursor-pointer hover:scale-105 transition-all overflow-hidden`}
      style={{
        border: '2px solid #5b21b6',
        filter: 'drop-shadow(0 4px 10px rgba(0,0,0,0.5))',
      }}
    >
      {/* Rich card back — deep navy with mandala pattern */}
      <div className="w-full h-full flex items-center justify-center relative" style={{ background: 'linear-gradient(135deg, #0f0e1a 0%, #1a1040 50%, #0f0e1a 100%)' }}>
        <svg viewBox="0 0 80 120" className="absolute inset-0 w-full h-full opacity-90">
          {/* Outer border */}
          <rect x="3" y="3" width="74" height="114" rx="4" fill="none" stroke="#7c3aed" strokeWidth="1.5"/>
          <rect x="6" y="6" width="68" height="108" rx="3" fill="none" stroke="#5b21b6" strokeWidth="0.8"/>
          {/* Centre mandala */}
          <circle cx="40" cy="60" r="28" fill="none" stroke="#7c3aed" strokeWidth="0.8"/>
          <circle cx="40" cy="60" r="20" fill="none" stroke="#6d28d9" strokeWidth="1"/>
          <circle cx="40" cy="60" r="12" fill="none" stroke="#7c3aed" strokeWidth="0.8"/>
          <circle cx="40" cy="60" r="5" fill="#7c3aed" opacity="0.6"/>
          {/* 8 petals */}
          {[0,45,90,135,180,225,270,315].map((a,i) => {
            const r = a*Math.PI/180;
            const x1 = 40+12*Math.sin(r), y1 = 60-12*Math.cos(r);
            const x2 = 40+24*Math.sin(r), y2 = 60-24*Math.cos(r);
            return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#7c3aed" strokeWidth="1" opacity="0.7"/>;
          })}
          {/* Corner stars */}
          {[[14,18],[66,18],[14,102],[66,102]].map(([cx,cy],i) => (
            <g key={i}>
              <path d={`M${cx} ${cy-6} L${cx+1.5} ${cy-2} L${cx+5} ${cy-2} L${cx+2.5} ${cy+1} L${cx+3.5} ${cy+5} L${cx} ${cy+3} L${cx-3.5} ${cy+5} L${cx-2.5} ${cy+1} L${cx-5} ${cy-2} L${cx-1.5} ${cy-2}Z`} fill="#7c3aed" opacity="0.7"/>
            </g>
          ))}
          {/* Outer diamond ring */}
          <path d="M40 34 L58 52 L40 86 L22 52Z" fill="none" stroke="#5b21b6" strokeWidth="0.8" opacity="0.5"/>
          {/* Celtic knot lines */}
          <path d="M18 30 Q30 42 40 30 Q50 42 62 30" fill="none" stroke="#7c3aed" strokeWidth="0.7" opacity="0.5"/>
          <path d="M18 90 Q30 78 40 90 Q50 78 62 90" fill="none" stroke="#7c3aed" strokeWidth="0.7" opacity="0.5"/>
        </svg>
        {/* Shine overlay */}
        <div className="absolute inset-0 rounded-md" style={{ background: 'linear-gradient(145deg, rgba(255,255,255,0.04) 0%, transparent 60%)' }}/>
      </div>
    </div>
  );
}

export default function TarotPage({ onNavigate, onShowAuth, sharedNumerology }: TarotPageProps) {
  const [step, setStep] = useState<Step>('intention');
  const [selectedSpread, setSelectedSpread] = useState<SpreadTemplate | null>(null);
  const [drawnCards, setDrawnCards] = useState<Array<{ cardId: number; reversed: boolean } | null>>([]);
  const [cardPickerOpen, setCardPickerOpen] = useState<number | null>(null);
  const [cardSearch, setCardSearch] = useState('');
  const [question, setQuestion] = useState('');
  const [tone, setTone] = useState<ToneType>('empowering');
  const [numerologyContext, setNumerologyContext] = useState({
    name: sharedNumerology?.name || '',
    lifePath: sharedNumerology?.lifePath || '',
    expression: sharedNumerology?.expression || '',
    soulUrge: sharedNumerology?.soulUrge || '',
    personalYear: sharedNumerology?.personalYear || '',
    birthday: sharedNumerology?.birthday || '',
  });
  const [chartAutoFilled, setChartAutoFilled] = useState(!!(sharedNumerology?.lifePath || sharedNumerology?.name));
  const [reading, setReading] = useState<TarotReadingResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const [readerMode, setReaderMode] = useState(false);
  const [practitionerNotes, setPractitionerNotes] = useState('');

  const selectSpread = (spread: SpreadTemplate) => {
    setSelectedSpread(spread);
    setDrawnCards(new Array(spread.cardCount).fill(null));
    setStep('draw');
  };

  const proceedToSpreads = () => {
    if (!question.trim()) return;
    setStep('spread');
  };

  const randomDraw = useCallback(() => {
    if (!selectedSpread) return;
    const shuffled = [...ALL_CARDS].sort(() => Math.random() - 0.5);
    const drawn = shuffled.slice(0, selectedSpread.cardCount).map(c => ({
      cardId: c.id,
      reversed: Math.random() > 0.7
    }));
    setDrawnCards(drawn);
  }, [selectedSpread]);

  const setCardAtPosition = (posIdx: number, cardId: number, reversed: boolean) => {
    setDrawnCards(prev => {
      const next = [...prev];
      next[posIdx] = { cardId, reversed };
      return next;
    });
    setCardPickerOpen(null);
    setCardSearch('');
  };

  const toggleReversed = (posIdx: number) => {
    setDrawnCards(prev => {
      const next = [...prev];
      if (next[posIdx]) next[posIdx] = { ...next[posIdx]!, reversed: !next[posIdx]!.reversed };
      return next;
    });
  };

  const allDrawn = drawnCards.length > 0 && drawnCards.every(c => c !== null);

  const handleGenerateReading = () => {
    if (!selectedSpread || !allDrawn || !question.trim()) return;
    setLoading(true);
    setError('');
    setReading(null);

    // Small timeout so the loading state renders before computation
    setTimeout(() => {
      try {
        const numCtx: Record<string, string | number | undefined> = {
          name: numerologyContext.name || undefined,
          lifePath: numerologyContext.lifePath || undefined,
          expression: numerologyContext.expression || undefined,
          soulUrge: numerologyContext.soulUrge || undefined,
          personalYear: numerologyContext.personalYear ? parseInt(numerologyContext.personalYear) : undefined,
          birthday: numerologyContext.birthday || undefined,
        };

        const result = nativeGenerateReading({
          question,
          spread: selectedSpread,
          drawnCards,
          numerologyContext: numCtx,
          tone,
        });

        setReading(result);
        setStep('reading');
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : 'Failed to generate reading. Please try again.');
      } finally {
        setLoading(false);
      }
    }, 400);
  };

  const reset = () => {
    setStep('intention');
    setSelectedSpread(null);
    setDrawnCards([]);
    setQuestion('');
    setReading(null);
    setError('');
    setPractitionerNotes('');
    setChartAutoFilled(false);
    setNumerologyContext({ name: '', lifePath: '', expression: '', soulUrge: '', personalYear: '', birthday: '' });
  };

  const copyReading = async () => {
    if (!reading) return;
    const text = `TAROT READING — ${selectedSpread?.name}\n\nQuestion: ${question}\n\n${reading.overallTheme}\n\n${reading.narrative}\n\n${reading.actionableGuidance}`;
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const filteredCards = ALL_CARDS.filter(c =>
    !cardSearch || c.name.toLowerCase().includes(cardSearch.toLowerCase()) ||
    c.keywords.some(k => k.includes(cardSearch.toLowerCase()))
  );

  const usedCardIds = drawnCards.filter(Boolean).map(d => d!.cardId);

  return (
    <div className="min-h-screen bg-slate-900">
      <SiteNavigation onNavigate={onNavigate} onShowAuth={onShowAuth} currentPage="tarot" />

      {/* ─── HERO ─── */}
      <section className="pt-24 pb-12 px-4 sm:px-6 relative overflow-hidden">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(ellipse at 20% 50%, rgba(139,92,246,0.08) 0%, transparent 50%), radial-gradient(ellipse at 80% 30%, rgba(59,130,246,0.10) 0%, transparent 50%)`
        }} />
        <div className="relative max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 text-blue-300 px-5 py-2 rounded-full mb-5 text-sm font-medium">
            <Sparkles className="w-4 h-4" />
            AI-Powered Tarot — Numerology Integrated
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
            Tarot + Numerology
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400">
              The Complete Reading
            </span>
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-2">
            Choose a spread, draw your cards, add your client's numerology core — and let AI generate a cohesive, deeply contextual reading that weaves both traditions together.
          </p>
        </div>
      </section>

      {/* ─── PROGRESS BAR ─── */}
      <div className="sticky top-16 z-40 bg-slate-900/95 backdrop-blur border-b border-white/10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-1 sm:gap-3">
            {(['intention', 'spread', 'draw', 'reading'] as Step[]).map((s, i) => {
              const stepLabels: Record<Step, string> = { intention: 'Intention', spread: 'Spread', draw: 'Cards', reading: 'Reading' };
              const stepIdx = ['intention', 'spread', 'draw', 'reading'].indexOf(step);
              const isActive = step === s;
              const isDone = i < stepIdx;
              return (
                <div key={s} className="flex items-center gap-1 sm:gap-2">
                  <div className={`flex items-center gap-1.5 px-2 sm:px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                    isActive ? 'bg-blue-600 text-white' : isDone ? 'text-emerald-400' : 'text-gray-500'
                  }`}>
                    <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs ${
                      isActive ? 'bg-white/20' : isDone ? 'bg-emerald-500/20' : 'bg-white/5'
                    }`}>{i + 1}</span>
                    <span className="hidden sm:inline">{stepLabels[s]}</span>
                  </div>
                  {i < 3 && <ChevronRight className="w-3 h-3 text-gray-600 flex-shrink-0" />}
                </div>
              );
            })}
          </div>
          <button onClick={reset} className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-300 transition-colors">
            <RotateCcw className="w-3.5 h-3.5" /> Start over
          </button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">

        {/* ─── STEP 1: SET INTENTION ─── */}
        {step === 'intention' && (
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-white mb-2">Set the Intention</h2>
            <p className="text-gray-400 mb-8">Begin by framing the client's question. This grounds the entire reading and ensures every card speaks directly to their situation.</p>

            {/* Question */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-white mb-2">
                Client's Question or Intention <span className="text-red-400">*</span>
              </label>
              <textarea
                rows={4}
                value={question}
                onChange={e => setQuestion(e.target.value)}
                placeholder="e.g. Should I accept this new business offer? / What does my relationship path look like for the next 6 months? / What energy should I focus on this year?"
                className="w-full bg-slate-800 border border-white/10 focus:border-blue-500/40 focus:ring-1 focus:ring-blue-500/20 rounded-xl px-4 py-3 text-white placeholder-gray-500 outline-none transition-colors resize-none text-sm"
                autoFocus
              />
              <p className="text-gray-600 text-xs mt-1.5">The more specific and honest the question, the more meaningful the reading.</p>
            </div>

            {/* Tone */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-white mb-2">Reading Tone</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {TONE_OPTIONS.map(t => (
                  <button
                    key={t.value}
                    onClick={() => setTone(t.value)}
                    className={`text-left p-3 rounded-xl border text-sm transition-all ${
                      tone === t.value
                        ? 'bg-blue-600/20 border-blue-500/50 text-white'
                        : 'bg-slate-800/60 border-white/10 text-gray-400 hover:border-white/20 hover:text-white'
                    }`}
                  >
                    <p className="font-semibold mb-0.5">{t.label}</p>
                    <p className="text-xs opacity-70">{t.desc}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Reader Mode toggle */}
            <div className="flex items-center justify-between p-4 bg-slate-800/60 border border-white/10 rounded-xl mb-6">
              <div>
                <p className="text-white font-medium text-sm">Reader Mode</p>
                <p className="text-gray-500 text-xs">AI provides guidance — you add personal insights. Space for practitioner notes included in output.</p>
              </div>
              <button
                onClick={() => setReaderMode(!readerMode)}
                className={`relative w-11 h-6 rounded-full transition-colors ${readerMode ? 'bg-blue-600' : 'bg-slate-600'}`}
              >
                <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${readerMode ? 'translate-x-5' : 'translate-x-0.5'}`} />
              </button>
            </div>

            {/* Numerology context */}
            <div className="bg-slate-800/40 border border-white/10 rounded-2xl p-6 mb-8">
              <div className="flex items-center gap-2 mb-4">
                <Hash className="w-5 h-5 text-cyan-400" />
                <h3 className="text-white font-semibold">Numerology Integration</h3>
                {chartAutoFilled ? (
                  <span className="text-xs font-semibold text-emerald-300 bg-emerald-500/15 border border-emerald-500/25 px-2 py-0.5 rounded-full">Pre-filled from Core Chart</span>
                ) : (
                  <span className="text-xs text-gray-500 bg-slate-700 px-2 py-0.5 rounded-full">Optional but powerful</span>
                )}
              </div>
              {chartAutoFilled ? (
                <p className="text-emerald-400/80 text-xs mb-4">Core numbers from the calculator have been pre-loaded. Edit any field if needed.</p>
              ) : (
                <p className="text-gray-500 text-xs mb-4">Adding core numerology numbers lets the engine draw precise bridges between the cards and your client's numerological profile.</p>
              )}
              <div className="grid sm:grid-cols-2 gap-3">
                {[
                  { key: 'name', label: 'Client Name', placeholder: 'e.g. Priya Sharma' },
                  { key: 'lifePath', label: 'Life Path Number', placeholder: 'e.g. 7 or 11/2' },
                  { key: 'expression', label: 'Expression Number', placeholder: 'e.g. 3' },
                  { key: 'soulUrge', label: 'Soul Urge Number', placeholder: 'e.g. 9' },
                  { key: 'personalYear', label: 'Personal Year (2025/26)', placeholder: 'e.g. 5' },
                  { key: 'birthday', label: 'Birthday Number', placeholder: 'e.g. 4' },
                ].map(field => (
                  <div key={field.key}>
                    <label className="block text-xs font-medium text-gray-400 mb-1">{field.label}</label>
                    <input
                      type="text"
                      value={numerologyContext[field.key as keyof typeof numerologyContext]}
                      onChange={e => setNumerologyContext(p => ({ ...p, [field.key]: e.target.value }))}
                      placeholder={field.placeholder}
                      className="w-full bg-slate-900/60 border border-white/10 focus:border-blue-500/30 rounded-lg px-3 py-2 text-white placeholder-gray-600 text-sm outline-none transition-colors"
                    />
                  </div>
                ))}
              </div>
              {!chartAutoFilled && (
                <button
                  onClick={() => onNavigate('calculator')}
                  className="mt-4 flex items-center gap-1.5 text-xs text-cyan-400 hover:text-cyan-300 transition-colors"
                >
                  <Zap className="w-3.5 h-3.5" /> Calculate client's numerology first in Core Chart
                </button>
              )}
            </div>

            <div className="flex justify-end">
              <button
                onClick={proceedToSpreads}
                disabled={!question.trim()}
                className="flex items-center gap-2 px-7 py-3.5 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold rounded-xl disabled:opacity-40 disabled:cursor-not-allowed hover:from-blue-500 hover:to-cyan-500 transition-all shadow-lg shadow-blue-500/20"
              >
                Choose a Spread <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {/* ─── STEP 2: SPREAD SELECTION ─── */}
        {step === 'spread' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-white mb-1">Choose Your Spread</h2>
                <p className="text-gray-400 text-sm">Select the spread that best matches your client's question.</p>
              </div>
              <button onClick={() => setStep('intention')} className="text-xs text-gray-500 hover:text-gray-300 transition-colors flex items-center gap-1">
                <RefreshCw className="w-3 h-3" /> Edit intention
              </button>
            </div>
            {question && (
              <div className="mb-6 p-4 bg-slate-800/60 border border-white/10 rounded-xl flex items-start gap-3">
                <Star className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs text-gray-500 font-medium uppercase tracking-wider mb-1">Intention Set</p>
                  <p className="text-white text-sm italic">"{question}"</p>
                </div>
              </div>
            )}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {SPREAD_TEMPLATES.map(spread => {
                const catColors: Record<string, string> = {
                  general: 'bg-blue-500/10 text-blue-300 border-blue-500/20',
                  relationship: 'bg-rose-500/10 text-rose-300 border-rose-500/20',
                  career: 'bg-amber-500/10 text-amber-300 border-amber-500/20',
                  spiritual: 'bg-cyan-500/10 text-cyan-300 border-cyan-500/20',
                  numerology: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20',
                };
                return (
                  <button
                    key={spread.id}
                    onClick={() => selectSpread(spread)}
                    className="group text-left bg-slate-800/60 hover:bg-slate-800 border border-white/10 hover:border-white/25 rounded-2xl p-6 transition-all hover:shadow-xl hover:-translate-y-0.5"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-600/30 to-cyan-600/20 border border-blue-500/20 rounded-xl flex items-center justify-center text-xl font-bold text-blue-300">
                        {spread.icon}
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${catColors[spread.category]}`}>
                          {spread.category}
                        </span>
                        <span className="text-xs text-gray-500 bg-slate-700 px-2 py-0.5 rounded-full">
                          {spread.cardCount} {spread.cardCount === 1 ? 'card' : 'cards'}
                        </span>
                      </div>
                    </div>
                    <h3 className="text-white font-bold text-lg mb-2 group-hover:text-blue-300 transition-colors">{spread.name}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed mb-4">{spread.description}</p>
                    <div className="flex items-center gap-1 text-blue-400 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                      Select spread <ChevronRight className="w-4 h-4" />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* ─── STEP 3: DRAW CARDS ─── */}
        {step === 'draw' && selectedSpread && (
          <div>
            {question && (
              <div className="mb-5 p-3 bg-slate-800/40 border border-white/8 rounded-xl flex items-start gap-2.5">
                <Star className="w-3.5 h-3.5 text-blue-400 mt-0.5 flex-shrink-0" />
                <p className="text-gray-400 text-xs italic">"{question}"</p>
              </div>
            )}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-white mb-1">{selectedSpread.name}</h2>
                <p className="text-gray-400">{selectedSpread.cardCount === 1 ? 'Select 1 card' : `Select ${selectedSpread.cardCount} cards for your spread`}</p>
              </div>
              <button
                onClick={randomDraw}
                className="flex items-center gap-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 border border-white/10 text-white text-sm font-medium rounded-xl transition-colors"
              >
                <Shuffle className="w-4 h-4" /> Digital Draw
              </button>
            </div>

            {/* Card positions */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
              {selectedSpread.positions.map((pos, i) => {
                const drawn = drawnCards[i];
                const card = drawn ? ALL_CARDS.find(c => c.id === drawn.cardId) : null;
                return (
                  <div key={pos.id} className="bg-slate-800/60 border border-white/10 rounded-2xl p-5">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <p className="text-white font-semibold">{pos.label}</p>
                        <p className="text-gray-500 text-xs mt-0.5">{pos.description}</p>
                        {pos.numerologyLink && (
                          <span className="inline-flex items-center gap-1 mt-1 text-[10px] text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 px-1.5 py-0.5 rounded-full">
                            <Hash className="w-2.5 h-2.5" /> {pos.numerologyLink}
                          </span>
                        )}
                      </div>
                      <span className="text-xs text-gray-600 bg-slate-700 px-2 py-0.5 rounded-full">{i + 1}</span>
                    </div>

                    {card ? (
                      <div className="flex items-center gap-4">
                        <CardFlip card={card} reversed={drawn!.reversed} size="sm" />
                        <div className="flex-1 min-w-0">
                          <p className="text-white font-medium text-sm">{card.name}</p>
                          <p className="text-gray-500 text-xs capitalize">{card.arcana === 'major' ? 'Major Arcana' : `${card.suit} — Minor`}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <button
                              onClick={() => toggleReversed(i)}
                              className={`text-xs px-2 py-0.5 rounded-full border transition-colors ${
                                drawn!.reversed
                                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                                  : 'bg-slate-700 text-gray-400 border-white/10 hover:border-white/20'
                              }`}
                            >
                              {drawn!.reversed ? 'Reversed' : 'Upright'}
                            </button>
                            <button
                              onClick={() => { setCardPickerOpen(i); setCardSearch(''); }}
                              className="text-xs text-blue-400 hover:text-blue-300 transition-colors"
                            >
                              Change
                            </button>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <button
                        onClick={() => { setCardPickerOpen(i); setCardSearch(''); }}
                        className="w-full flex items-center gap-3 p-3 bg-slate-900/50 hover:bg-slate-900 border border-dashed border-white/15 hover:border-white/30 rounded-xl transition-colors"
                      >
                        <CardBack size="sm" empty />
                        <span className="text-gray-500 text-sm">Click to select card</span>
                      </button>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Card picker modal */}
            {cardPickerOpen !== null && (
              <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-end sm:items-center justify-center p-4">
                <div className="bg-slate-800 border border-white/10 rounded-2xl w-full max-w-2xl max-h-[80vh] flex flex-col">
                  <div className="p-5 border-b border-white/10 flex items-center justify-between">
                    <h3 className="text-white font-bold">Select Card for "{selectedSpread.positions[cardPickerOpen].label}"</h3>
                    <button onClick={() => setCardPickerOpen(null)} className="text-gray-400 hover:text-white text-2xl leading-none">&times;</button>
                  </div>
                  <div className="p-4 border-b border-white/5">
                    <input
                      type="text"
                      placeholder="Search cards..."
                      value={cardSearch}
                      onChange={e => setCardSearch(e.target.value)}
                      className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder-gray-500 text-sm outline-none focus:border-blue-500/40"
                      autoFocus
                    />
                  </div>
                  <div className="overflow-y-auto p-4 grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {filteredCards.map(card => {
                      const alreadyUsed = usedCardIds.includes(card.id) && drawnCards[cardPickerOpen]?.cardId !== card.id;
                      return (
                        <div key={card.id} className="flex gap-2">
                          <button
                            onClick={() => !alreadyUsed && setCardAtPosition(cardPickerOpen, card.id, false)}
                            disabled={alreadyUsed}
                            className={`flex-1 flex items-center gap-2 p-2 rounded-xl text-left transition-colors ${
                              alreadyUsed ? 'opacity-30 cursor-not-allowed' : 'hover:bg-slate-700 border border-transparent hover:border-white/10'
                            }`}
                          >
                            <span className="text-xl flex-shrink-0">{card.emoji}</span>
                            <div className="min-w-0">
                              <p className="text-white text-xs font-medium truncate">{card.name}</p>
                              <p className="text-gray-500 text-[10px] capitalize">{card.suit || 'Major'}</p>
                            </div>
                          </button>
                          <button
                            onClick={() => !alreadyUsed && setCardAtPosition(cardPickerOpen, card.id, true)}
                            disabled={alreadyUsed}
                            className={`px-2 rounded-xl text-[10px] font-bold transition-colors flex-shrink-0 ${
                              alreadyUsed ? 'opacity-30 cursor-not-allowed' : 'text-amber-400 hover:bg-amber-500/10'
                            }`}
                            title="Add reversed"
                          >
                            ↕
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {error && (
              <div className="mb-4 p-4 bg-red-900/30 border border-red-500/30 rounded-xl text-red-300 text-sm">
                {error}
              </div>
            )}

            <div className="flex items-center justify-between">
              <button
                onClick={() => setStep('spread')}
                className="px-5 py-3 bg-slate-700 hover:bg-slate-600 text-white font-medium rounded-xl transition-colors"
              >
                Back to Spreads
              </button>
              <button
                onClick={handleGenerateReading}
                disabled={!allDrawn || loading}
                className="flex items-center gap-2 px-7 py-3.5 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold rounded-xl disabled:opacity-40 disabled:cursor-not-allowed hover:from-blue-500 hover:to-cyan-500 transition-all shadow-lg shadow-blue-500/20"
              >
                {loading ? (
                  <><RefreshCw className="w-5 h-5 animate-spin" /> Generating Reading…</>
                ) : (
                  <><Brain className="w-5 h-5" /> Generate Reading</>
                )}
              </button>
            </div>
          </div>
        )}


        {/* ─── STEP 4: READING OUTPUT ─── */}
        {step === 'reading' && reading && selectedSpread && (
          <div className="max-w-3xl mx-auto">
            {/* Header */}
            <div className="flex items-start justify-between gap-4 mb-8">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="w-5 h-5 text-blue-400" />
                  <span className="text-blue-300 text-sm font-medium uppercase tracking-wider">AI Reading Complete</span>
                </div>
                <h2 className="text-2xl font-bold text-white">{selectedSpread.name}</h2>
                <p className="text-gray-400 text-sm mt-1 italic">"{question}"</p>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <button
                  onClick={copyReading}
                  className="flex items-center gap-1.5 px-3 py-2 bg-slate-700 hover:bg-slate-600 text-gray-300 text-sm rounded-xl transition-colors"
                >
                  {copied ? <><Check className="w-4 h-4 text-emerald-400" /> Copied</> : <><Copy className="w-4 h-4" /> Copy</>}
                </button>
                <button
                  onClick={() => setStep('draw')}
                  className="flex items-center gap-1.5 px-3 py-2 bg-slate-700 hover:bg-slate-600 text-gray-300 text-sm rounded-xl transition-colors"
                >
                  <RefreshCw className="w-4 h-4" /> Regenerate
                </button>
              </div>
            </div>

            {/* Cards drawn summary */}
            <div className="flex flex-wrap gap-3 mb-8 p-4 bg-slate-800/40 border border-white/8 rounded-2xl">
              {drawnCards.map((drawn, i) => {
                const card = ALL_CARDS.find(c => c.id === drawn!.cardId)!;
                const pos = selectedSpread.positions[i];
                return (
                  <div key={i} className="flex flex-col items-center gap-1.5">
                    <CardFlip card={card} reversed={drawn!.reversed} size="sm" />
                    <p className="text-[10px] text-gray-500 text-center max-w-[68px] leading-tight">{pos.label}</p>
                  </div>
                );
              })}
            </div>

            {/* Yes/No Verdict — shown prominently for yes-no spreads */}
            {reading.yesNoAnswer && (
              <div className={`rounded-2xl p-6 mb-6 border ${
                reading.yesNoAnswer.verdictColor === 'emerald'
                  ? 'bg-emerald-950/50 border-emerald-500/30'
                  : reading.yesNoAnswer.verdictColor === 'rose'
                  ? 'bg-rose-950/50 border-rose-500/30'
                  : 'bg-amber-950/50 border-amber-500/30'
              }`}>
                <div className="text-center mb-4">
                  <div className={`inline-flex items-center justify-center w-24 h-24 rounded-full text-4xl font-black mb-3 ${
                    reading.yesNoAnswer.verdictColor === 'emerald'
                      ? 'bg-emerald-500/20 text-emerald-300 border-2 border-emerald-500/40'
                      : reading.yesNoAnswer.verdictColor === 'rose'
                      ? 'bg-rose-500/20 text-rose-300 border-2 border-rose-500/40'
                      : 'bg-amber-500/20 text-amber-300 border-2 border-amber-500/40'
                  }`}>
                    {reading.yesNoAnswer.verdict === 'YES' ? 'YES' : reading.yesNoAnswer.verdict === 'NO' ? 'NO' : '?'}
                  </div>
                  <p className={`text-lg font-semibold mb-1 ${
                    reading.yesNoAnswer.verdictColor === 'emerald' ? 'text-emerald-300'
                    : reading.yesNoAnswer.verdictColor === 'rose' ? 'text-rose-300' : 'text-amber-300'
                  }`}>{reading.yesNoAnswer.verdict === 'CONDITIONAL' ? 'Conditional' : reading.yesNoAnswer.verdict}</p>
                  <p className="text-gray-300 text-sm leading-relaxed max-w-lg mx-auto">{reading.yesNoAnswer.brief}</p>
                </div>
                {reading.yesNoAnswer.condition && (
                  <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Condition</p>
                    <p className="text-amber-200 text-sm leading-relaxed">{reading.yesNoAnswer.condition}</p>
                  </div>
                )}
              </div>
            )}

            {/* Overall Theme */}
            <div className="bg-gradient-to-br from-blue-950/60 to-slate-900/60 border border-blue-500/20 rounded-2xl p-6 mb-6">
              <div className="flex items-center gap-2 mb-3">
                <Star className="w-5 h-5 text-blue-400 fill-blue-400" />
                <h3 className="text-white font-bold">{reading.yesNoAnswer ? 'Oracle Context' : 'Overall Theme'}</h3>
              </div>
              <p className="text-gray-200 leading-relaxed">{reading.overallTheme}</p>
            </div>

            {/* Card Breakdowns */}
            <div className="space-y-4 mb-6">
              <h3 className="text-white font-bold text-lg">Card by Card</h3>
              {reading.cardBreakdowns?.map((cb, i) => {
                const drawnCard = drawnCards[i];
                const card = drawnCard ? ALL_CARDS.find(c => c.id === drawnCard.cardId) : null;
                return (
                  <div key={i} className="bg-slate-800/60 border border-white/10 rounded-2xl p-5">
                    <div className="flex items-start gap-4">
                      {card && <CardFlip card={card} reversed={drawnCard!.reversed} size="sm" />}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap mb-2">
                          <span className="text-gray-400 text-xs uppercase tracking-wider font-semibold">{cb.positionLabel}</span>
                          <span className="text-white font-bold">{cb.cardName}</span>
                          {cb.reversed && (
                            <span className="text-xs bg-amber-500/15 text-amber-300 border border-amber-500/20 px-2 py-0.5 rounded-full">Reversed</span>
                          )}
                        </div>
                        <p className="text-gray-300 text-sm leading-relaxed mb-2">{cb.interpretation}</p>
                        {cb.numerologyBridge && (
                          <div className="flex items-start gap-2 bg-cyan-500/8 border border-cyan-500/15 rounded-lg p-3">
                            <Hash className="w-3.5 h-3.5 text-cyan-400 mt-0.5 flex-shrink-0" />
                            <p className="text-cyan-300 text-xs leading-relaxed">{cb.numerologyBridge}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Narrative */}
            <div className="bg-slate-800/40 border border-white/10 rounded-2xl p-7 mb-6">
              <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
                <Brain className="w-5 h-5 text-blue-400" />
                Full Narrative Reading
              </h3>
              <div className="text-gray-300 leading-[1.9] whitespace-pre-line">{reading.narrative}</div>
            </div>

            {/* Numerology Integration */}
            {reading.numerologyIntegration && (
              <div className="bg-cyan-950/40 border border-cyan-500/20 rounded-2xl p-6 mb-6">
                <h3 className="text-white font-bold mb-3 flex items-center gap-2">
                  <Hash className="w-5 h-5 text-cyan-400" />
                  Numerology Integration
                </h3>
                <p className="text-cyan-100/80 leading-relaxed">{reading.numerologyIntegration}</p>
              </div>
            )}

            {/* Actionable Guidance */}
            <div className="bg-emerald-950/40 border border-emerald-500/20 rounded-2xl p-6 mb-6">
              <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                <Zap className="w-5 h-5 text-emerald-400" />
                Actionable Guidance
              </h3>
              <p className="text-gray-200 leading-[1.9] whitespace-pre-line">{reading.actionableGuidance}</p>
            </div>

            {/* Practitioner Notes */}
            {readerMode && (
              <div className="bg-slate-800/40 border border-white/10 rounded-2xl p-6 mb-6">
                <h3 className="text-white font-bold mb-3 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-amber-400" />
                  Practitioner Notes
                  <span className="text-xs text-gray-500 font-normal">— Add your personal insights</span>
                </h3>
                <textarea
                  rows={5}
                  value={practitionerNotes}
                  onChange={e => setPractitionerNotes(e.target.value)}
                  placeholder="Your personal observations, intuitive impressions, or additional guidance for the client..."
                  className="w-full bg-slate-900/60 border border-white/10 focus:border-amber-500/30 rounded-xl px-4 py-3 text-white placeholder-gray-600 text-sm outline-none resize-none transition-colors"
                />
              </div>
            )}

            {/* Generated at */}
            <p className="text-gray-600 text-xs text-center mb-8">
              Reading generated {new Date(reading.generatedAt).toLocaleString()} · NumberTeller AI Tarot Engine
            </p>

            {/* New reading CTA */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={reset}
                className="flex items-center justify-center gap-2 px-7 py-3.5 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold rounded-xl hover:from-blue-500 hover:to-cyan-500 transition-all shadow-lg"
              >
                <Sparkles className="w-5 h-5" /> New Reading
              </button>
              <button
                onClick={() => onNavigate('calculator')}
                className="flex items-center justify-center gap-2 px-7 py-3.5 bg-slate-700 hover:bg-slate-600 text-white font-semibold rounded-xl transition-colors"
              >
                <Hash className="w-5 h-5" /> Core Numerology Chart
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ─── FEATURE HIGHLIGHTS (shown on spread step) ─── */}
      {step === 'spread' && (
        <section className="py-16 bg-slate-800/30 border-t border-white/5 px-4 sm:px-6 mt-8">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold text-white text-center mb-8">How It Works</h2>
            <div className="grid sm:grid-cols-3 gap-6">
              {[
                { icon: Shuffle, title: 'Draw Your Cards', desc: 'Use digital shuffle for a random draw, or manually select cards from a physical deck you\'re working with.', color: 'text-blue-400' },
                { icon: Hash, title: 'Add Numerology Context', desc: 'Enter your client\'s core numbers — Life Path, Expression, Soul Urge, Personal Year — for a fully integrated reading.', color: 'text-cyan-400' },
                { icon: Brain, title: 'AI Generates the Reading', desc: 'Our AI weaves the cards and numerology together into a cohesive narrative with actionable guidance.', color: 'text-emerald-400' },
              ].map((f, i) => (
                <div key={i} className="bg-slate-800/60 border border-white/10 rounded-2xl p-6 text-center">
                  <div className="w-12 h-12 bg-slate-700/60 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <f.icon className={`w-6 h-6 ${f.color}`} />
                  </div>
                  <h3 className="text-white font-bold mb-2">{f.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <SiteFooter onNavigate={onNavigate} onShowAuth={onShowAuth} />
    </div>
  );
}
