import { AuthProvider } from '../contexts/AuthContext';
import { PlanProvider } from '../contexts/PlanContext';
import AppShell from './AppShell';

export default function AppEntry() {
  return (
    <AuthProvider>
      <PlanProvider>
        <AppShell />
      </PlanProvider>
    </AuthProvider>
  );
}
