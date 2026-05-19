import { useState } from 'react';
import { Calendar, Download } from 'lucide-react';
import { generateTransitChart, TransitYear } from '../utils/transitCalculations';

interface TransitChartProps {
  fullName: string;
  birthDate: Date;
  lifePath: number;
}

export default function TransitChart({ fullName, birthDate, lifePath }: TransitChartProps) {
  const [maxAge, setMaxAge] = useState(100);
  const transitData = generateTransitChart(fullName, birthDate, lifePath, maxAge);

  const exportToCSV = () => {
    const headers = ['Age', 'Transits', 'Essence', 'Personal Year', 'Universal Year', 'Year', 'Period', 'Challenge'];
    const rows = transitData.map(row => [
      row.age,
      row.transits,
      row.essence,
      row.personalYear,
      row.universalYear,
      row.year,
      row.period,
      row.challenge
    ]);

    const csv = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `transit-chart-${fullName.replace(/\s+/g, '-').toLowerCase()}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Calendar className="w-6 h-6 text-amber-400" />
          <h3 className="text-2xl font-bold text-white">Transit Chart (Ages 0-{maxAge})</h3>
        </div>
        <button
          onClick={exportToCSV}
          className="flex items-center gap-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors text-sm"
        >
          <Download className="w-4 h-4" />
          Export CSV
        </button>
      </div>

      <div className="bg-slate-900/50 rounded-lg border border-slate-700/50 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gradient-to-r from-purple-900/50 to-purple-800/50 sticky top-0">
              <tr>
                <th className="px-4 py-3 text-left font-semibold text-purple-200 border-r border-purple-700/30">Age</th>
                <th className="px-4 py-3 text-left font-semibold text-purple-200 border-r border-purple-700/30">Transits</th>
                <th className="px-4 py-3 text-center font-semibold text-purple-200 border-r border-purple-700/30">Essence</th>
                <th className="px-4 py-3 text-center font-semibold text-purple-200 border-r border-purple-700/30">Personal Year</th>
                <th className="px-4 py-3 text-center font-semibold text-purple-200 border-r border-purple-700/30">Universal Year</th>
                <th className="px-4 py-3 text-center font-semibold text-purple-200 border-r border-purple-700/30">Year</th>
                <th className="px-4 py-3 text-center font-semibold text-purple-200 border-r border-purple-700/30">Period</th>
                <th className="px-4 py-3 text-center font-semibold text-purple-200">Challenge</th>
              </tr>
            </thead>
            <tbody>
              {transitData.map((row, index) => (
                <tr
                  key={index}
                  className={`${
                    index % 2 === 0 ? 'bg-purple-900/20' : 'bg-purple-800/20'
                  } hover:bg-purple-700/30 transition-colors border-b border-purple-900/20`}
                >
                  <td className="px-4 py-2 text-white font-medium border-r border-purple-900/20">{row.age}</td>
                  <td className="px-4 py-2 text-purple-200 border-r border-purple-900/20 font-mono text-xs">{row.transits}</td>
                  <td className="px-4 py-2 text-center text-amber-300 font-semibold border-r border-purple-900/20">{row.essence}</td>
                  <td className="px-4 py-2 text-center text-cyan-300 font-semibold border-r border-purple-900/20">{row.personalYear}</td>
                  <td className="px-4 py-2 text-center text-cyan-300 font-semibold border-r border-purple-900/20">{row.universalYear}</td>
                  <td className="px-4 py-2 text-center text-purple-200 border-r border-purple-900/20">{row.year}</td>
                  <td className="px-4 py-2 text-center text-emerald-300 font-semibold border-r border-purple-900/20">{row.period}</td>
                  <td className="px-4 py-2 text-center text-rose-300 font-semibold">{row.challenge}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700/50">
        <h4 className="text-sm font-semibold text-purple-300 mb-2">Column Guide:</h4>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-xs text-slate-400">
          <div><span className="text-purple-200 font-semibold">Transits:</span> Active letters from name</div>
          <div><span className="text-amber-300 font-semibold">Essence:</span> Sum of transit letter values</div>
          <div><span className="text-cyan-300 font-semibold">Personal Year:</span> Your yearly cycle</div>
          <div><span className="text-cyan-300 font-semibold">Universal Year:</span> Global yearly energy</div>
          <div><span className="text-emerald-300 font-semibold">Period:</span> Life period phase</div>
          <div><span className="text-rose-300 font-semibold">Challenge:</span> Lessons to overcome</div>
        </div>
      </div>
    </div>
  );
}
