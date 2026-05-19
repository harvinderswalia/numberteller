import { useState } from 'react';
import NewHomepage from './components/NewHomepage';
import CalculatorForm from './components/CalculatorForm';
import ResultsDisplay from './components/ResultsDisplay';
import CompatibilityCalculator from './components/CompatibilityCalculator';
import HouseNumberCalculator from './components/HouseNumberCalculator';
import SavedCharts from './components/SavedCharts';
import SubscriptionModal from './components/SubscriptionModal';
import AuthModal from './components/AuthModal';
import LoShuGridCalculator from './components/LoShuGridCalculator';
import LoShuGridResults from './components/LoShuGridResults';
import NameCorrectionTool from './components/NameCorrectionTool';
import { exportToPDF } from './utils/pdfExport';
import { useAuth } from './contexts/AuthContext';
import { LogOut, User } from 'lucide-react';
import { calculateLoShuGrid, LoShuGridData } from './utils/loShuGrid';

type Page = 'home' | 'calculator' | 'results' | 'compatibility' | 'house' | 'saved' | 'loshu' | 'loshu-results' | 'name-correction';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [calculationResults, setCalculationResults] = useState<any>(null);
  const [loShuResults, setLoShuResults] = useState<LoShuGridData | null>(null);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const { user, signOut, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  const handleNavigate = (page: string) => {
    setCurrentPage(page as Page);
  };

  const handleCalculate = (results: any) => {
    setCalculationResults(results);
    setCurrentPage('results');
  };

  const handleExportPDF = () => {
    if (calculationResults) {
      exportToPDF(calculationResults);
    }
  };

  const handleShowUpgrade = () => {
    setShowUpgradeModal(true);
  };

  const handleLoadChart = (chartData: any) => {
    setCalculationResults(chartData);
    setCurrentPage('results');
  };

  const handleLoShuCalculate = (data: { name: string; dateOfBirth: string; gender: string }) => {
    console.log('Calculate Lo Shu Grid called with:', data);
    const results = calculateLoShuGrid(data.name, data.dateOfBirth, data.gender);
    console.log('Lo Shu Results:', results);
    setLoShuResults(results);
    setCurrentPage('loshu-results');
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <NewHomepage onNavigate={handleNavigate} onShowAuth={() => setShowAuthModal(true)} onBack={() => setCurrentPage('home')} />;
      case 'calculator':
        return (
          <CalculatorForm
            onNavigate={handleNavigate}
            onCalculate={handleCalculate}
            onShowUpgrade={handleShowUpgrade}
          />
        );
      case 'results':
        return calculationResults ? (
          <ResultsDisplay
            results={calculationResults}
            onNavigate={handleNavigate}
            onExportPDF={handleExportPDF}
          />
        ) : (
          <NewHomepage onNavigate={handleNavigate} onShowAuth={() => setShowAuthModal(true)} onBack={() => setCurrentPage('home')} />
        );
      case 'compatibility':
        return (
          <CompatibilityCalculator
            onNavigate={handleNavigate}
            onShowUpgrade={handleShowUpgrade}
          />
        );
      case 'house':
        return <HouseNumberCalculator onNavigate={handleNavigate} />;
      case 'saved':
        return <SavedCharts onNavigate={handleNavigate} onLoadChart={handleLoadChart} />;
      case 'loshu':
        return <LoShuGridCalculator onNavigate={handleNavigate} onCalculate={handleLoShuCalculate} />;
      case 'loshu-results':
        return loShuResults ? (
          <LoShuGridResults results={loShuResults} onNavigate={handleNavigate} />
        ) : (
          <LoShuGridCalculator onNavigate={handleNavigate} onCalculate={handleLoShuCalculate} />
        );
      case 'name-correction':
        return <NameCorrectionTool onBack={() => setCurrentPage('home')} />;
      default:
        return <NewHomepage onNavigate={handleNavigate} onShowAuth={() => setShowAuthModal(true)} onBack={() => setCurrentPage('home')} />;
    }
  };

  return (
    <>
      {renderPage()}

      <SubscriptionModal
        isOpen={showUpgradeModal}
        onClose={() => setShowUpgradeModal(false)}
      />

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
      />
    </>
  );
}

export default App;
