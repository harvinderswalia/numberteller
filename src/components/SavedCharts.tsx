import { useState, useEffect } from 'react';
import { Save, Trash2, Calendar, ArrowLeft, User } from 'lucide-react';
import { getSavedCharts, deleteChart, SavedChart } from '../utils/savedCharts';
import { useAuth } from '../contexts/AuthContext';

interface SavedChartsProps {
  onNavigate: (page: string) => void;
  onLoadChart: (chartData: any) => void;
}

export default function SavedCharts({ onNavigate, onLoadChart }: SavedChartsProps) {
  const [charts, setCharts] = useState<SavedChart[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    loadCharts();
  }, []);

  const loadCharts = async () => {
    setLoading(true);
    const savedCharts = await getSavedCharts();
    setCharts(savedCharts);
    setLoading(false);
  };

  const handleDelete = async (chartId: string) => {
    if (!confirm('Are you sure you want to delete this chart?')) return;

    setDeleting(chartId);
    const result = await deleteChart(chartId);

    if (result.success) {
      setCharts(charts.filter(c => c.id !== chartId));
    } else {
      alert(result.error || 'Failed to delete chart');
    }
    setDeleting(null);
  };

  const handleLoad = (chart: SavedChart) => {
    onLoadChart(chart.chart_data);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4">
      <div className="max-w-6xl mx-auto">
        <button
          onClick={() => onNavigate('home')}
          className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Home
        </button>

        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 shadow-2xl p-8">
          <div className="flex items-center gap-3 mb-6">
            <Save className="w-8 h-8 text-amber-400" />
            <h1 className="text-3xl font-bold text-white">Saved Charts</h1>
            <span className="text-slate-400 text-sm">({charts.length}/10)</span>
          </div>

          {!user ? (
            <div className="text-center py-12">
              <User className="w-16 h-16 text-slate-600 mx-auto mb-4" />
              <p className="text-slate-400 text-lg mb-2">Sign in to view saved charts</p>
              <p className="text-slate-500 text-sm">Create an account to save and access your numerology charts</p>
            </div>
          ) : loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-slate-700 border-t-amber-500"></div>
              <p className="text-slate-400 mt-4">Loading saved charts...</p>
            </div>
          ) : charts.length === 0 ? (
            <div className="text-center py-12">
              <Save className="w-16 h-16 text-slate-600 mx-auto mb-4" />
              <p className="text-slate-400 text-lg mb-2">No saved charts yet</p>
              <p className="text-slate-500 text-sm">Calculate a chart and save it for quick access later</p>
              <button
                onClick={() => onNavigate('calculator')}
                className="mt-6 px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-600 text-white font-semibold rounded-lg hover:from-amber-600 hover:to-orange-700 transition-all duration-200"
              >
                Create New Chart
              </button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-4">
              {charts.map((chart) => (
                <div
                  key={chart.id}
                  className="bg-slate-900/50 rounded-lg p-5 border border-slate-700/50 hover:border-amber-500/50 transition-all duration-200 group"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-white mb-1 group-hover:text-amber-400 transition-colors">
                        {chart.name}
                      </h3>
                      <div className="flex items-center gap-2 text-sm text-slate-400">
                        <Calendar className="w-4 h-4" />
                        {formatDate(chart.created_at)}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mt-4">
                    <button
                      onClick={() => handleLoad(chart)}
                      className="flex-1 px-4 py-2 bg-amber-500/20 text-amber-400 rounded-lg hover:bg-amber-500/30 transition-colors font-medium"
                    >
                      Load Chart
                    </button>
                    <button
                      onClick={() => handleDelete(chart.id)}
                      disabled={deleting === chart.id}
                      className="px-4 py-2 bg-rose-500/20 text-rose-400 rounded-lg hover:bg-rose-500/30 transition-colors disabled:opacity-50"
                    >
                      {deleting === chart.id ? (
                        <div className="w-5 h-5 border-2 border-rose-400 border-t-transparent rounded-full animate-spin"></div>
                      ) : (
                        <Trash2 className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
