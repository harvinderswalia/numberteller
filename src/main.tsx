import { ViteReactSSG, Head } from 'vite-react-ssg';
import './index.css';

// Layouts
import MarketingLayout from './components/layout/MarketingLayout';

// Marketing pages
import HomePage from './pages/Home';
import FeaturesHubPage from './pages/FeaturesHub';
import CoreChartFeaturePage from './pages/features/CoreChart';
import LoShuGridFeaturePage from './pages/features/LoShuGrid';
import NameCorrectionFeaturePage from './pages/features/NameCorrection';
import CompatibilityFeaturePage from './pages/features/Compatibility';
import TransitChartFeaturePage from './pages/features/TransitChart';
import KarmicLessonsFeaturePage from './pages/features/KarmicLessons';
import HouseCarMobileFeaturePage from './pages/features/HouseCarMobile';
import BusinessNumerologyFeaturePage from './pages/features/BusinessNumerology';
import AITarotFeaturePage from './pages/features/AITarot';
import PdfReportsFeaturePage from './pages/features/PdfReports';
import OverEnergyAnalysisPage from './pages/features/OverEnergyAnalysis';
import RemediesPage from './pages/features/Remedies';
import PersonalYearForecastPage from './pages/features/PersonalYearForecast';
import SavedClientChartsPage from './pages/features/SavedClientCharts';
import HarmonyAnalysisPage from './pages/features/HarmonyAnalysis';
import AINumerologyPage from './pages/features/AINumerology';
import PricingPage from './pages/Pricing';
import SampleReportPage from './pages/SampleReport';
import DemoPage from './pages/Demo';
import AboutPage from './pages/About';
import ContactPage from './pages/Contact';
import LegalMarkdownPage from './pages/LegalMarkdownPage';
import NumerologistsPage from './pages/for/Numerologists';
import VedicAstrologersPage from './pages/for/VedicAstrologers';
import LifeCoachesPage from './pages/for/LifeCoaches';
import CompareManualPage from './pages/compare/ManualCalculation';
import CompareDecozPage from './pages/compare/Decoz';
import LoShuGridCalculatorPage from './pages/LoShuGridCalculator';
import LearnHubPage from './pages/LearnHub';
import LearnArticlePage from './pages/LearnArticlePage';
import { getAllLearnDocs } from './utils/contentLoader';
import { captureFirstTouch } from './utils/firstTouch';
import NotFoundPage from './pages/NotFound';

// Client-only app wrapper
import { lazy, Suspense } from 'react';
const AppEntryLazy = lazy(() => import('./app/AppEntry'));

function ClientOnly({ children }: { children: React.ReactNode }) {
  if (typeof window === 'undefined') return null;
  return <>{children}</>;
}

function AppOutlet() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-slate-900 flex items-center justify-center">
          <div className="text-white text-xl">Loading...</div>
        </div>
      }
    >
      <AppEntryLazy />
    </Suspense>
  );
}

export const routes = [
  {
    path: '/',
    element: <MarketingLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'features', element: <FeaturesHubPage /> },
      { path: 'features/core-chart', element: <CoreChartFeaturePage /> },
      { path: 'features/lo-shu-grid', element: <LoShuGridFeaturePage /> },
      { path: 'features/name-correction', element: <NameCorrectionFeaturePage /> },
      { path: 'features/compatibility', element: <CompatibilityFeaturePage /> },
      { path: 'features/transit-chart', element: <TransitChartFeaturePage /> },
      { path: 'features/karmic-lessons', element: <KarmicLessonsFeaturePage /> },
      { path: 'features/house-car-mobile', element: <HouseCarMobileFeaturePage /> },
      { path: 'features/business-numerology', element: <BusinessNumerologyFeaturePage /> },
      { path: 'features/ai-tarot', element: <AITarotFeaturePage /> },
      { path: 'features/pdf-reports', element: <PdfReportsFeaturePage /> },
      { path: 'features/over-energy-analysis', element: <OverEnergyAnalysisPage /> },
      { path: 'features/remedies', element: <RemediesPage /> },
      { path: 'features/personal-year-forecast', element: <PersonalYearForecastPage /> },
      { path: 'features/saved-client-charts', element: <SavedClientChartsPage /> },
      { path: 'features/harmony-analysis', element: <HarmonyAnalysisPage /> },
      { path: 'features/ai-numerology', element: <AINumerologyPage /> },
      { path: 'pricing', element: <PricingPage /> },
      { path: 'sample-report', element: <SampleReportPage /> },
      { path: 'demo', element: <DemoPage /> },
      { path: 'for/numerologists', element: <NumerologistsPage /> },
      { path: 'for/vedic-astrologers', element: <VedicAstrologersPage /> },
      { path: 'for/life-coaches', element: <LifeCoachesPage /> },
      { path: 'compare/manual-calculation', element: <CompareManualPage /> },
      { path: 'compare/decoz-numerology-software', element: <CompareDecozPage /> },
      { path: 'lo-shu-grid-calculator', element: <LoShuGridCalculatorPage /> },
      { path: 'learn', element: <LearnHubPage /> },
      { path: 'learn/:slug', element: <LearnArticlePage />, getStaticPaths: () => getAllLearnDocs().map((d) => `/learn/${d.slug}`) },
      { path: 'about', element: <AboutPage /> },
      { path: 'contact', element: <ContactPage /> },
      { path: 'terms', element: <LegalMarkdownPage slug="terms-of-use" path="/terms" breadcrumbName="Terms" /> },
      { path: 'privacy', element: <LegalMarkdownPage slug="privacy-policy" path="/privacy" breadcrumbName="Privacy" /> },
      { path: 'billing-policy', element: <LegalMarkdownPage slug="billing-policy" path="/billing-policy" breadcrumbName="Billing" /> },
      { path: '404', element: <NotFoundPage /> },
    ],
  },
  {
    path: '/app',
    element: (
      <>
        <Head>
          <meta name="robots" content="noindex, nofollow" />
        </Head>
        <ClientOnly>
          <AppOutlet />
        </ClientOnly>
      </>
    ),
  },
  {
    path: '/app/*',
    element: (
      <>
        <Head>
          <meta name="robots" content="noindex, nofollow" />
        </Head>
        <ClientOnly>
          <AppOutlet />
        </ClientOnly>
      </>
    ),
  },
];

if (typeof window !== 'undefined') {
  captureFirstTouch();
}

export const createRoot = ViteReactSSG({
  routes,
});
