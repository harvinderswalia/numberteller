import { useState, useEffect, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import SuperAdminPortal from '../components/SuperAdminPortal';
import Dashboard from '../components/Dashboard';
import TarotPage from '../components/TarotPage';
import CalculatorForm from '../components/CalculatorForm';
import ResultsDisplay from '../components/ResultsDisplay';
import CompatibilityCalculator from '../components/CompatibilityCalculator';
import HouseNumberCalculator from '../components/HouseNumberCalculator';
import SavedCharts from '../components/SavedCharts';
import SubscriptionModal from '../components/SubscriptionModal';
import AuthModal from '../components/AuthModal';
import LoShuGridCalculator from '../components/LoShuGridCalculator';
import LoShuGridResults from '../components/LoShuGridResults';
import NameCorrectionTool from '../components/NameCorrectionTool';
import BusinessNumerologyPage from '../components/BusinessNumerologyPage';
import FeatureGuard from '../components/FeatureGuard';
import TrialBanner from '../components/TrialBanner';
import SetupForm from '../components/SetupForm';
import ActivationRequestForm from '../components/ActivationRequestForm';
import AuthModalWrapper from './AuthModalWrapper';
import { exportToPDF } from '../utils/pdfExport';
import { useAuth } from '../contexts/AuthContext';
import { usePlanContext } from '../contexts/PlanContext';
import { calculateLoShuGrid, LoShuGridData } from '../utils/loShuGrid';

export interface SharedNumerologyContext {
  name?: string;
  lifePath?: string;
  expression?: string;
  soulUrge?: string;
  personalYear?: string;
  birthday?: string;
}

export default function AppShell() {
  const navigate = useNavigate();
  const location = useLocation();

  const [calculationResults, setCalculationResults] = useState<any>(null);
  const [loShuResults, setLoShuResults] = useState<LoShuGridData | null>(null);
  const [sharedNumerology, setSharedNumerology] = useState<SharedNumerologyContext | null>(null);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'signin' | 'signup'>('signup');
  const { loading: authLoading, user } = useAuth();
  const { planId, setupComplete, loading: planLoading, trialActive } = usePlanContext();

  const handleNavigate = useCallback(
    (page: string) => {
      const routeMap: Record<string, string> = {
        home: '/',
        dashboard: '/app',
        calculator: '/app/tools/core-chart',
        results: '/app/tools/core-chart',
        compatibility: '/app/tools/compatibility',
        house: '/app/tools/house-number',
        saved: '/app/charts',
        loshu: '/app/tools/lo-shu-grid',
        'loshu-results': '/app/tools/lo-shu-grid',
        'name-correction': '/app/tools/name-correction',
        tarot: '/app/tools/ai-tarot',
        business: '/app/tools/business-numerology',
        setup: '/app/setup',
        activate: '/app/activate',
        pricing: '/pricing',
        features: '/features',
        about: '/about',
        contact: '/contact',
        terms: '/terms',
        privacy: '/privacy',
        billing: '/billing-policy',
        resources: '/learn',
      };
      const route = routeMap[page] || '/app';
      navigate(route);
      window.scrollTo(0, 0);
    },
    [navigate]
  );

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
    navigate('/app/tools/core-chart');
  };

  const handleExportPDF = () => {
    if (calculationResults) exportToPDF(calculationResults, planId);
  };

  const handleLoadChart = (chartData: any) => {
    const restored = chartData
      ? {
          ...chartData,
          birthDate: chartData.birthDate
            ? new Date(chartData.birthDate)
            : chartData.birthDate,
        }
      : chartData;

    if (restored?.birthDate && restored?.gender && restored?.fullName !== undefined) {
      const iso =
        restored.birthDate instanceof Date
          ? restored.birthDate.toISOString().split('T')[0]
          : String(restored.birthDate).split('T')[0];
      restored.loshuGrid = calculateLoShuGrid(restored.fullName || '', iso, restored.gender);
    }

    setCalculationResults(restored);
    if (restored) setSharedNumerology(extractNumerology(restored));
    navigate('/app/tools/core-chart');
  };

  const handleLoShuCalculate = (data: {
    name: string;
    dateOfBirth: string;
    gender: string;
  }) => {
    const results = calculateLoShuGrid(data.name, data.dateOfBirth, data.gender);
    setLoShuResults(results);
    navigate('/app/tools/lo-shu-grid');
  };

  const handleShowAuth = () => {
    setAuthModalMode('signup');
    setShowAuthModal(true);
  };
  const handleShowSignIn = () => {
    setAuthModalMode('signin');
    setShowAuthModal(true);
  };

  const sharedProps = { onNavigate: handleNavigate, onShowAuth: handleShowAuth };
  const numerologyTools = { ...sharedProps, sharedNumerology };

  // Redirect logic
  useEffect(() => {
    if (authLoading || (user && planLoading)) return;
    if (!user) return;

    if (!setupComplete && !location.pathname.includes('/app/setup') && !location.pathname.includes('/app/activate')) {
      navigate('/app/setup');
    } else if (planId === 'free') {
      if (trialActive && (location.pathname.includes('/app/setup') || location.pathname.includes('/app/activate'))) {
        navigate('/app');
      }
    } else {
      if (location.pathname.includes('/app/setup') || location.pathname.includes('/app/activate')) {
        navigate('/app');
      }
    }
  }, [authLoading, planLoading, user, setupComplete, planId, trialActive, location.pathname, navigate]);

  if (authLoading || (user && planLoading)) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  // Route the app pages
  const path = location.pathname;

  // Super admin
  if (path === '/sa/port') {
    return <SuperAdminPortal />;
  }

  // Auth pages
  if (path === '/app/login') {
    return (
      <AuthModalWrapper
        isOpen={true}
        onClose={() => navigate('/')}
        initialMode="signin"
        onNavigate={handleNavigate}
      />
    );
  }
  if (path === '/app/signup') {
    return (
      <AuthModalWrapper
        isOpen={true}
        onClose={() => navigate('/')}
        initialMode="signup"
        onNavigate={handleNavigate}
      />
    );
  }

  // Setup
  if (path === '/app/setup') {
    return <SetupForm onNavigate={handleNavigate} onComplete={() => navigate('/app/activate')} />;
  }

  // Activate
  if (path === '/app/activate') {
    return <ActivationRequestForm onNavigate={handleNavigate} />;
  }

  // Dashboard
  if (path === '/app' || path === '/app/') {
    return (
      <>
        <TrialBanner onUpgrade={() => setShowUpgradeModal(true)} />
        <Dashboard
          onNavigate={handleNavigate}
          onShowUpgrade={() => setShowUpgradeModal(true)}
          onLoadChart={handleLoadChart}
        />
        <SubscriptionModal
          isOpen={showUpgradeModal}
          onClose={() => setShowUpgradeModal(false)}
          onNavigate={handleNavigate}
          onShowAuth={handleShowAuth}
        />
      </>
    );
  }

  // Saved charts
  if (path === '/app/charts') {
    return (
      <>
        <TrialBanner onUpgrade={() => setShowUpgradeModal(true)} />
        <SavedCharts onNavigate={handleNavigate} onLoadChart={handleLoadChart} />
      </>
    );
  }

  // Core chart
  if (path === '/app/tools/core-chart') {
    return (
      <>
        <TrialBanner onUpgrade={() => setShowUpgradeModal(true)} />
        {calculationResults ? (
          <ResultsDisplay
            results={calculationResults}
            onNavigate={handleNavigate}
            onExportPDF={handleExportPDF}
            onNavigateToTarot={() => navigate('/app/tools/ai-tarot')}
          />
        ) : (
          <CalculatorForm onNavigate={handleNavigate} onCalculate={handleCalculate} />
        )}
      </>
    );
  }

  // Lo Shu
  if (path === '/app/tools/lo-shu-grid') {
    return (
      <>
        <TrialBanner onUpgrade={() => setShowUpgradeModal(true)} />
        {loShuResults ? (
          <LoShuGridResults results={loShuResults} onNavigate={handleNavigate} />
        ) : (
          <LoShuGridCalculator onNavigate={handleNavigate} onCalculate={handleLoShuCalculate} />
        )}
      </>
    );
  }

  // Compatibility
  if (path === '/app/tools/compatibility') {
    return (
      <>
        <TrialBanner onUpgrade={() => setShowUpgradeModal(true)} />
        <CompatibilityCalculator onNavigate={handleNavigate} />
      </>
    );
  }

  // House number
  if (path === '/app/tools/house-number') {
    return (
      <>
        <TrialBanner onUpgrade={() => setShowUpgradeModal(true)} />
        <HouseNumberCalculator onNavigate={handleNavigate} />
      </>
    );
  }

  // Name correction
  if (path === '/app/tools/name-correction') {
    return (
      <>
        <TrialBanner onUpgrade={() => setShowUpgradeModal(true)} />
        <FeatureGuard
          feature="name-correction-full"
          featureLabel="AI Name Correction"
          featureDescription="Intelligent name variants aligned to your client's desired outcomes using BD, LP, EX & SU harmony scoring. Requires a Platinum plan subscription."
          onNavigate={handleNavigate}
          onShowAuth={handleShowAuth}
        >
          <NameCorrectionTool onBack={() => navigate(user ? '/app' : '/')} />
        </FeatureGuard>
      </>
    );
  }

  // Business
  if (path === '/app/tools/business-numerology') {
    return (
      <>
        <TrialBanner onUpgrade={() => setShowUpgradeModal(true)} />
        <FeatureGuard
          feature="business-full"
          featureLabel="Business Numerology"
          featureDescription="Full company profile analysis, ideal business number matching, partner compatibility, and brand name suggestions. Requires a Platinum plan subscription."
          onNavigate={handleNavigate}
          onShowAuth={handleShowAuth}
        >
          <BusinessNumerologyPage {...sharedProps} onShowSignIn={handleShowSignIn} />
        </FeatureGuard>
      </>
    );
  }

  // Tarot
  if (path === '/app/tools/ai-tarot') {
    return (
      <>
        <TrialBanner onUpgrade={() => setShowUpgradeModal(true)} />
        <FeatureGuard
          feature="tarot"
          featureLabel="AI Tarot Reading"
          featureDescription="Numerology-integrated tarot spreads with AI-generated narratives. Requires a Platinum plan subscription."
          onNavigate={handleNavigate}
          onShowAuth={handleShowAuth}
        >
          <TarotPage {...numerologyTools} onShowSignIn={handleShowSignIn} />
        </FeatureGuard>
      </>
    );
  }

  // Default fallback
  return (
    <>
      <TrialBanner onUpgrade={() => setShowUpgradeModal(true)} />
      <Dashboard
        onNavigate={handleNavigate}
        onShowUpgrade={() => setShowUpgradeModal(true)}
        onLoadChart={handleLoadChart}
      />
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
