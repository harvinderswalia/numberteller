import { useState } from 'react';
import LandingPage from './components/LandingPage';
import TarotPage from './components/TarotPage';
import FeaturesPage from './components/FeaturesPage';
import PricingPage from './components/PricingPage';
import AboutPage from './components/AboutPage';
import ContactPage from './components/ContactPage';
import ResourcesPage from './components/ResourcesPage';
import TermsPage from './components/TermsPage';
import PrivacyPage from './components/PrivacyPage';
import BillingPage from './components/BillingPage';
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
import BusinessNumerologyPage from './components/BusinessNumerologyPage';
import { exportToPDF } from './utils/pdfExport';
import { useAuth } from './contexts/AuthContext';
import { calculateLoShuGrid, LoShuGridData } from './utils/loShuGrid';

export type Page =
  | 'home' | 'features' | 'pricing' | 'about' | 'contact' | 'resources'
  | 'terms' | 'privacy' | 'billing'
  | 'calculator' | 'results' | 'compatibility' | 'house'
  | 'saved' | 'loshu' | 'loshu-results' | 'name-correction' | 'tarot' | 'business';

// Shared numerology context that flows between the calculator and Tarot tool
export interface SharedNumerologyContext {
  name?: string;
  lifePath?: string;
  expression?: string;
  soulUrge?: string;
  personalYear?: string;
  birthday?: string;
}

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [calculationResults, setCalculationResults] = useState<any>(null);
  const [loShuResults, setLoShuResults] = useState<LoShuGridData | null>(null);
  const [sharedNumerology, setSharedNumerology] = useState<SharedNumerologyContext | null>(null);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const { loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  const handleNavigate = (page: string) => {
    setCurrentPage(page as Page);
    window.scrollTo(0, 0);
  };

  const handleShowAuth = () => setShowAuthModal(true);

  const extractNumerology = (results: any): SharedNumerologyContext => ({
    name: results?.fullName || '',
    lifePath: String(results?.coreNumbers?.lifePath ?? ''),
    expression: String(results?.coreNumbers?.expression ?? ''),
    soulUrge: String(results?.coreNumbers?.soulUrge ?? ''),
    personalYear: String(results?.personalYear ?? ''),
    birthday: String(results?.coreNumbers?.birthday ?? ''),
  });

  const handleCalculate = (results: any) => {
    setCalculationResults(results);
    if (results) setSharedNumerology(extractNumerology(results));
    setCurrentPage('results');
  };

  const handleExportPDF = () => {
    if (calculationResults) exportToPDF(calculationResults);
  };

  const handleLoadChart = (chartData: any) => {
    setCalculationResults(chartData);
    if (chartData) setSharedNumerology(extractNumerology(chartData));
    setCurrentPage('results');
  };

  const handleLoShuCalculate = (data: { name: string; dateOfBirth: string; gender: string }) => {
    const results = calculateLoShuGrid(data.name, data.dateOfBirth, data.gender);
    setLoShuResults(results);
    setCurrentPage('loshu-results');
  };

  const sharedProps = { onNavigate: handleNavigate, onShowAuth: handleShowAuth };
  const numerologyTools = { ...sharedProps, sharedNumerology };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <LandingPage {...sharedProps} />;
      case 'features':
        return <FeaturesPage {...sharedProps} />;
      case 'pricing':
        return <PricingPage {...sharedProps} />;
      case 'about':
        return <AboutPage {...sharedProps} />;
      case 'contact':
        return <ContactPage {...sharedProps} />;
      case 'resources':
        return <ResourcesPage {...sharedProps} />;
      case 'terms':
        return <TermsPage {...sharedProps} />;
      case 'privacy':
        return <PrivacyPage {...sharedProps} />;
      case 'billing':
        return <BillingPage {...sharedProps} />;
      case 'tarot':
        return <TarotPage {...numerologyTools} />;
      case 'calculator':
        return (
          <CalculatorForm
            onNavigate={handleNavigate}
            onCalculate={handleCalculate}
            onShowUpgrade={() => setShowUpgradeModal(true)}
          />
        );
      case 'results':
        return calculationResults ? (
          <ResultsDisplay
            results={calculationResults}
            onNavigate={handleNavigate}
            onExportPDF={handleExportPDF}
            onNavigateToTarot={() => { handleNavigate('tarot'); }}
          />
        ) : (
          <LandingPage {...sharedProps} />
        );
      case 'compatibility':
        return (
          <CompatibilityCalculator
            onNavigate={handleNavigate}
            onShowUpgrade={() => setShowUpgradeModal(true)}
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
      case 'business':
        return <BusinessNumerologyPage {...sharedProps} />;
      default:
        return <LandingPage {...sharedProps} />;
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
