import { useState, useEffect } from 'react';
import SuperAdminPortal from './components/SuperAdminPortal';
import Dashboard from './components/Dashboard';
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
import FeatureGuard from './components/FeatureGuard';
import TrialBanner from './components/TrialBanner';
import SetupForm from './components/SetupForm';
import ActivationRequestForm from './components/ActivationRequestForm';
import { exportToPDF } from './utils/pdfExport';
import { useAuth } from './contexts/AuthContext';
import { usePlanContext } from './contexts/PlanContext';
import { calculateLoShuGrid, LoShuGridData } from './utils/loShuGrid';

export type Page =
  | 'home' | 'dashboard' | 'features' | 'pricing' | 'about' | 'contact' | 'resources'
  | 'terms' | 'privacy' | 'billing' | 'setup' | 'activate'
  | 'calculator' | 'results' | 'compatibility' | 'house'
  | 'saved' | 'loshu' | 'loshu-results' | 'name-correction' | 'tarot' | 'business'
  | 'admin';

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
  const isAdminPath = typeof window !== 'undefined' && window.location.pathname === '/sa/port';

  // Initialise page from history state so refresh/direct links work
  const getInitialPage = (): Page => {
    if (isAdminPath) return 'admin';
    const state = window.history.state?.page as Page | undefined;
    return state ?? 'home';
  };

  const [currentPage, setCurrentPage] = useState<Page>(getInitialPage);
  const planSystemLaunch = new Date('2026-08-13T11:32:08Z');
  const [calculationResults, setCalculationResults] = useState<any>(null);
  const [loShuResults, setLoShuResults] = useState<LoShuGridData | null>(null);
  const [sharedNumerology, setSharedNumerology] = useState<SharedNumerologyContext | null>(null);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'signin' | 'signup'>('signup');
  const { loading: authLoading, user } = useAuth();
  const { planId, setupComplete, trialActive, loading: planLoading } = usePlanContext();

  // Seed initial history entry so popstate works from first page
  useEffect(() => {
    if (!window.history.state?.page) {
      window.history.replaceState({ page: currentPage }, '', window.location.pathname);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Listen for browser back/forward
  useEffect(() => {
    const onPop = (e: PopStateEvent) => {
      const page = (e.state?.page as Page) ?? 'home';
      setCurrentPage(page);
      window.scrollTo(0, 0);
    };
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  // Route logged-out users away from auth-protected pages
  useEffect(() => {
    const protectedPages: Page[] = ['dashboard', 'saved', 'billing', 'setup', 'activate'];
    if (!authLoading && !user && protectedPages.includes(currentPage)) {
      setCurrentPage('home');
      window.history.replaceState({ page: 'home' }, '', window.location.pathname);
    }
  }, [loading, user, currentPage]);

  // Only accounts created after the new plan rollout use the setup gate.
  // Wait for plan data to load so we don't redirect based on default 'free' state.
  useEffect(() => {
    const isNewAccount = user ? new Date(user.created_at) >= planSystemLaunch : false;
    if (!authLoading && !planLoading && user && isNewAccount && !setupComplete && !isAdminPath && currentPage !== 'setup' && currentPage !== 'activate') {
      setCurrentPage('setup');
      window.history.replaceState({ page: 'setup' }, '', window.location.pathname);
    }
  }, [authLoading, planLoading, user, setupComplete, isAdminPath, currentPage]);

  // Trial expired gate: if user's trial has ended and no paid plan, redirect to activation.
  // Only applies to accounts created after the new plan rollout.
  // Wait for plan data so planId/trialActive reflect the real DB state.
  useEffect(() => {
    const isNewAccount = user ? new Date(user.created_at) >= planSystemLaunch : false;
    if (!authLoading && !planLoading && user && isNewAccount && setupComplete && !trialActive && planId === 'free' && !isAdminPath
        && currentPage !== 'activate' && currentPage !== 'pricing' && currentPage !== 'home'
        && currentPage !== 'features' && currentPage !== 'about' && currentPage !== 'contact'
        && currentPage !== 'resources' && currentPage !== 'terms' && currentPage !== 'privacy') {
      setCurrentPage('activate');
      window.history.replaceState({ page: 'activate' }, '', window.location.pathname);
    }
  }, [authLoading, planLoading, user, setupComplete, trialActive, planId, isAdminPath, currentPage]);

  if (authLoading || (user && planLoading)) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  const handleNavigate = (page: string) => {
    window.history.pushState({ page }, '', window.location.pathname);
    setCurrentPage(page as Page);
    window.scrollTo(0, 0);
  };

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
    window.history.pushState({ page: 'results' }, '', window.location.pathname);
    setCurrentPage('results');
  };

  const handleExportPDF = () => {
    if (calculationResults) exportToPDF(calculationResults, planId);
  };

  const handleLoadChart = (chartData: any) => {
    // birthDate is serialised as a string in JSON — restore it to a Date object
    const restored = chartData
      ? { ...chartData, birthDate: chartData.birthDate ? new Date(chartData.birthDate) : chartData.birthDate }
      : chartData;

    // Re-compute loshuGrid using the correct engine (handles old saved charts with name-based grid)
    if (restored?.birthDate && restored?.gender && restored?.fullName !== undefined) {
      const iso = restored.birthDate instanceof Date
        ? restored.birthDate.toISOString().split('T')[0]
        : String(restored.birthDate).split('T')[0];
      restored.loshuGrid = calculateLoShuGrid(restored.fullName || '', iso, restored.gender);
    }

    setCalculationResults(restored);
    if (restored) setSharedNumerology(extractNumerology(restored));
    window.history.pushState({ page: 'results' }, '', window.location.pathname);
    setCurrentPage('results');
  };

  const handleLoShuCalculate = (data: { name: string; dateOfBirth: string; gender: string }) => {
    const results = calculateLoShuGrid(data.name, data.dateOfBirth, data.gender);
    setLoShuResults(results);
    window.history.pushState({ page: 'loshu-results' }, '', window.location.pathname);
    setCurrentPage('loshu-results');
  };

  const handleShowAuth = () => { setAuthModalMode('signup'); setShowAuthModal(true); };
  const handleShowSignIn = () => { setAuthModalMode('signin'); setShowAuthModal(true); };
  const sharedProps = { onNavigate: handleNavigate, onShowAuth: handleShowAuth };
  const numerologyTools = { ...sharedProps, sharedNumerology };

  const renderPage = () => {
    switch (currentPage) {
      case 'admin':
        return <SuperAdminPortal />;
      case 'setup':
        return (
          <SetupForm
            onNavigate={handleNavigate}
            onComplete={() => { setCurrentPage('dashboard'); window.history.replaceState({ page: 'dashboard' }, '', window.location.pathname); }}
          />
        );
      case 'activate':
        return <ActivationRequestForm onNavigate={handleNavigate} />;
      case 'dashboard':
        return (
          <Dashboard
            onNavigate={handleNavigate}
            onShowUpgrade={() => setShowUpgradeModal(true)}
            onLoadChart={handleLoadChart}
          />
        );
      case 'home':
        return <LandingPage {...sharedProps} onShowSignIn={handleShowSignIn} />;
      case 'features':
        return <FeaturesPage {...sharedProps} onShowSignIn={handleShowSignIn} />;
      case 'pricing':
        return <PricingPage {...sharedProps} onShowSignIn={handleShowSignIn} />;
      case 'about':
        return <AboutPage {...sharedProps} onShowSignIn={handleShowSignIn} />;
      case 'contact':
        return <ContactPage {...sharedProps} onShowSignIn={handleShowSignIn} />;
      case 'resources':
        return <ResourcesPage {...sharedProps} onShowSignIn={handleShowSignIn} />;
      case 'terms':
        return <TermsPage {...sharedProps} onShowSignIn={handleShowSignIn} />;
      case 'privacy':
        return <PrivacyPage {...sharedProps} onShowSignIn={handleShowSignIn} />;
      case 'billing':
        return <BillingPage {...sharedProps} onShowSignIn={handleShowSignIn} />;
      case 'tarot':
        return (
          <FeatureGuard
            feature="tarot"
            featureLabel="AI Tarot Reading"
            featureDescription="Numerology-integrated tarot spreads with AI-generated narratives. Requires a Platinum plan subscription."
            onNavigate={handleNavigate}
            onShowAuth={handleShowAuth}
          >
            <TarotPage {...numerologyTools} onShowSignIn={handleShowSignIn} />
          </FeatureGuard>
        );
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
          user ? <Dashboard onNavigate={handleNavigate} onShowUpgrade={() => setShowUpgradeModal(true)} onLoadChart={handleLoadChart} /> : <LandingPage {...sharedProps} />
        );
      case 'compatibility':
        return (
          <CompatibilityCalculator
            onNavigate={handleNavigate}
            onShowUpgrade={() => setShowUpgradeModal(true)}
          />
        );
      case 'house':
        return <HouseNumberCalculator onNavigate={handleNavigate} onShowUpgrade={() => setShowUpgradeModal(true)} />;
      case 'saved':
        return <SavedCharts onNavigate={handleNavigate} onLoadChart={handleLoadChart} />;
      case 'loshu':
        return <LoShuGridCalculator onNavigate={handleNavigate} onCalculate={handleLoShuCalculate} onShowUpgrade={() => setShowUpgradeModal(true)} />;
      case 'loshu-results':
        return loShuResults ? (
          <LoShuGridResults results={loShuResults} onNavigate={handleNavigate} />
        ) : (
          <LoShuGridCalculator onNavigate={handleNavigate} onCalculate={handleLoShuCalculate} onShowUpgrade={() => setShowUpgradeModal(true)} />
        );
      case 'name-correction':
        return (
          <FeatureGuard
            feature="name-correction-full"
            featureLabel="AI Name Correction"
            featureDescription="Intelligent name variants aligned to your client's desired outcomes using BD, LP, EX & SU harmony scoring. Requires a Platinum plan subscription."
            onNavigate={handleNavigate}
            onShowAuth={handleShowAuth}
          >
            <NameCorrectionTool onBack={() => setCurrentPage(user ? 'dashboard' : 'home')} />
          </FeatureGuard>
        );
      case 'business':
        return (
          <FeatureGuard
            feature="business-full"
            featureLabel="Business Numerology"
            featureDescription="Full company profile analysis, ideal business number matching, partner compatibility, and brand name suggestions. Requires a Platinum plan subscription."
            onNavigate={handleNavigate}
            onShowAuth={handleShowAuth}
          >
            <BusinessNumerologyPage {...sharedProps} onShowSignIn={handleShowSignIn} />
          </FeatureGuard>
        );
      default:
        return <LandingPage {...sharedProps} />;
    }
  };

  return (
    <>
      {!isAdminPath && <TrialBanner onUpgrade={() => setShowUpgradeModal(true)} />}
      {renderPage()}
      <SubscriptionModal
        isOpen={showUpgradeModal}
        onClose={() => setShowUpgradeModal(false)}
        onNavigate={handleNavigate}
        onShowAuth={handleShowAuth}
      />
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onNavigate={handleNavigate}
        initialMode={authModalMode}
      />
    </>
  );
}

export default App;
