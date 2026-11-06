import { Outlet } from 'react-router-dom';
import MarketingHeader from '../marketing/MarketingHeader';
import MarketingFooter from '../marketing/MarketingFooter';

export default function MarketingLayout() {
  return (
    <div className="min-h-screen bg-slate-900 flex flex-col">
      <MarketingHeader />
      <main className="flex-1 pt-16">
        <Outlet />
      </main>
      <MarketingFooter />
    </div>
  );
}
