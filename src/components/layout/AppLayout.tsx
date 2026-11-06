import { Outlet } from 'react-router-dom';
import Seo from '../seo/Seo';

export default function AppLayout() {
  return (
    <div className="min-h-screen bg-slate-900">
      <Seo
        title="NumberTeller App"
        description="Numerology calculation tools for practitioners."
        path="/app"
        noindex
      />
      <Outlet />
    </div>
  );
}
