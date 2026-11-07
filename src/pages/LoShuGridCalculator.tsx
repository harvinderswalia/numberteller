import { useState } from 'react';
import { Link } from 'react-router-dom';
import Seo from '../components/seo/Seo';
import Breadcrumbs from '../components/marketing/Breadcrumbs';
import CTABand from '../components/marketing/CTABand';
import { webPageSchema, breadcrumbSchema } from '../components/seo/schema';
import { calculateLoShuGrid, type LoShuGridData } from '../utils/loShuGrid';
import { Calendar, ArrowRight, AlertCircle } from 'lucide-react';

const GRID_POSITIONS: Record<number, [number, number]> = {
  4: [0, 0], 9: [0, 1], 2: [0, 2],
  3: [1, 0], 5: [1, 1], 7: [1, 2],
  8: [2, 0], 1: [2, 1], 6: [2, 2],
};

function formatCell(count: number | null): string {
  if (count === null || count === 0) return '';
  return String(count);
}

function EmptyGrid() {
  return (
    <div className="grid grid-cols-3 gap-1 max-w-xs mx-auto">
      {Array.from({ length: 9 }).map((_, i) => {
        const num = [4, 9, 2, 3, 5, 7, 8, 1, 6][i];
        return (
          <div
            key={i}
            className="aspect-square flex flex-col items-center justify-center bg-slate-800/40 border border-white/10 rounded-lg"
          >
            <span className="text-xs text-gray-600 absolute mt-[-3rem] ml-[3rem]">{num}</span>
            <span className="text-transparent text-2xl font-bold">·</span>
          </div>
        );
      })}
    </div>
  );
}

function ResultGrid({ data }: { data: LoShuGridData }) {
  const labels: Record<number, string> = { 4: '4', 9: '9', 2: '2', 3: '3', 5: '5', 7: '7', 8: '8', 1: '1', 6: '6' };
  const order = [4, 9, 2, 3, 5, 7, 8, 1, 6];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-3 gap-2 max-w-sm mx-auto">
        {order.map((num) => {
          const count = data.numberCounts[num] || 0;
          return (
            <div
              key={num}
              className="aspect-square flex flex-col items-center justify-center bg-slate-800/60 border border-white/15 rounded-xl relative"
            >
              <span className="absolute top-1 right-2 text-[10px] text-gray-600 font-mono">{labels[num]}</span>
              <span className={`text-2xl sm:text-3xl font-bold ${count > 1 ? 'text-amber-400' : 'text-white'}`}>
                {count > 0 ? formatCell(count) : ''}
              </span>
            </div>
          );
        })}
      </div>

      {data.missingNumbers.length > 0 && (
        <div className="bg-slate-800/40 border border-white/10 rounded-xl p-4">
          <h3 className="text-sm font-semibold text-gray-300 mb-2">Missing numbers</h3>
          <div className="flex flex-wrap gap-2">
            {data.missingNumbers.map((n) => (
              <span key={n} className="px-3 py-1 bg-rose-500/10 border border-rose-500/20 rounded-lg text-sm text-rose-300 font-medium">
                {n}
              </span>
            ))}
          </div>
        </div>
      )}

      {data.repeatingNumbers.length > 0 && (
        <div className="bg-slate-800/40 border border-white/10 rounded-xl p-4">
          <h3 className="text-sm font-semibold text-gray-300 mb-2">Repeated numbers</h3>
          <div className="flex flex-wrap gap-2">
            {data.repeatingNumbers.map((r) => (
              <span key={r.number} className="px-3 py-1 bg-amber-500/10 border border-amber-500/20 rounded-lg text-sm text-amber-300 font-medium">
                {r.number} (×{r.count})
              </span>
            ))}
          </div>
        </div>
      )}

      {data.arrows.present.length > 0 && (
        <div className="bg-emerald-500/5 border border-emerald-500/15 rounded-xl p-4">
          <h3 className="text-sm font-semibold text-emerald-300 mb-2">Arrows of strength</h3>
          <ul className="space-y-1">
            {data.arrows.present.map((a) => (
              <li key={a} className="text-sm text-gray-300">{a}</li>
            ))}
          </ul>
        </div>
      )}

      {data.arrows.missing.length > 0 && (
        <div className="bg-slate-800/40 border border-white/10 rounded-xl p-4">
          <h3 className="text-sm font-semibold text-gray-400 mb-2">Missing arrows</h3>
          <ul className="space-y-1">
            {data.arrows.missing.map((a) => (
              <li key={a} className="text-sm text-gray-500">{a}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default function LoShuGridCalculator() {
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [result, setResult] = useState<LoShuGridData | null>(null);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const d = parseInt(day, 10);
    const m = parseInt(month, 10);
    const y = parseInt(year, 10);

    if (!d || !m || !y) {
      setError('Please enter a valid date of birth.');
      return;
    }
    if (d < 1 || d > 31 || m < 1 || m > 12 || y < 1800 || y > 2100) {
      setError('Please enter a valid date of birth.');
      return;
    }

    const dob = `${y}-${String(m).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
    const data = calculateLoShuGrid('', dob, gender);
    setResult(data);
  };

  return (
    <>
      <Seo
        title="Lo Shu Grid Calculator — Free Online Chart | NumberTeller"
        description="Free Lo Shu grid calculator: enter a date of birth to see the 3×3 Lo Shu chart with missing and repeated numbers, then build client reports in NumberTeller."
        path="/lo-shu-grid-calculator"
        jsonLd={[webPageSchema(), breadcrumbSchema([{ name: 'Lo Shu Grid Calculator', path: '/lo-shu-grid-calculator' }])]}
      />

      <section className="py-20 bg-slate-900">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <Breadcrumbs items={[{ name: 'Lo Shu Grid Calculator', path: '/lo-shu-grid-calculator' }]} />

          <h1 className="text-4xl sm:text-5xl font-bold text-white mt-8 mb-5">
            Lo Shu Grid Calculator
          </h1>
          <p className="text-lg text-gray-400 mb-10">
            Enter a date of birth to plot its Lo Shu grid: each digit is placed
            in its box of the 3×3 square, so you can see which numbers repeat
            and which are missing.
          </p>

          <div className="bg-slate-800/60 border border-white/10 rounded-2xl p-6 sm:p-8 mb-10">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Date of birth
                </label>
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <input
                      type="number"
                      value={day}
                      onChange={(e) => setDay(e.target.value)}
                      placeholder="Day"
                      min={1}
                      max={31}
                      required
                      className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30 transition-all text-sm"
                    />
                    <span className="block text-xs text-gray-600 mt-1">Day</span>
                  </div>
                  <div>
                    <input
                      type="number"
                      value={month}
                      onChange={(e) => setMonth(e.target.value)}
                      placeholder="Month"
                      min={1}
                      max={12}
                      required
                      className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30 transition-all text-sm"
                    />
                    <span className="block text-xs text-gray-600 mt-1">Month</span>
                  </div>
                  <div>
                    <input
                      type="number"
                      value={year}
                      onChange={(e) => setYear(e.target.value)}
                      placeholder="Year"
                      min={1800}
                      max={2100}
                      required
                      className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30 transition-all text-sm"
                    />
                    <span className="block text-xs text-gray-600 mt-1">Year</span>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Gender <span className="text-gray-600">(for Kua number)</span>
                </label>
                <div className="flex gap-3">
                  {(['male', 'female'] as const).map((g) => (
                    <button
                      key={g}
                      type="button"
                      onClick={() => setGender(g)}
                      className={`px-5 py-2.5 rounded-xl text-sm font-medium capitalize transition-all ${
                        gender === g
                          ? 'bg-blue-600 text-white border border-blue-500'
                          : 'bg-slate-800 text-gray-400 border border-slate-700 hover:border-white/20'
                      }`}
                    >
                      {g}
                    </button>
                  ))}
                </div>
              </div>

              {error && (
                <div className="flex items-start gap-2.5 p-3.5 bg-rose-500/10 border border-rose-500/30 rounded-xl">
                  <AlertCircle className="w-4 h-4 text-rose-400 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-rose-300">{error}</p>
                </div>
              )}

              <button
                type="submit"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-bold rounded-xl transition-all shadow-lg shadow-blue-500/20"
              >
                <Calendar className="w-5 h-5" />
                Plot Lo Shu grid
              </button>
            </form>

            <p className="text-xs text-gray-600 mt-5">
              Calculation runs in your browser. The date is not stored or sent
              anywhere.
            </p>
          </div>

          {result ? (
            <ResultGrid data={result} />
          ) : (
            <EmptyGrid />
          )}

          <div className="mt-10 flex flex-col sm:flex-row gap-3 text-sm">
            <Link to="/learn/lo-shu-grid-guide" className="inline-flex items-center gap-1.5 text-cyan-400 hover:text-cyan-300 transition-colors">
              How to read a Lo Shu grid <ArrowRight className="w-4 h-4" />
            </Link>
            <span className="text-gray-700 hidden sm:inline">·</span>
            <Link to="/learn/lo-shu-grid-zeros-and-repeats" className="inline-flex items-center gap-1.5 text-cyan-400 hover:text-cyan-300 transition-colors">
              Zeros and repeated digits <ArrowRight className="w-4 h-4" />
            </Link>
            <span className="text-gray-700 hidden sm:inline">·</span>
            <Link to="/features/lo-shu-grid" className="inline-flex items-center gap-1.5 text-cyan-400 hover:text-cyan-300 transition-colors">
              Lo Shu grid in NumberTeller <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      <CTABand />
    </>
  );
}
