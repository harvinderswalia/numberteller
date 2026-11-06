import AuthModal from '../components/AuthModal';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  initialMode: 'signin' | 'signup';
  onNavigate: (page: string) => void;
}

export default function AuthModalWrapper({
  isOpen,
  onClose,
  initialMode,
  onNavigate,
}: Props) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center px-4">
      <AuthModal
        isOpen={isOpen}
        onClose={onClose}
        onNavigate={onNavigate}
        initialMode={initialMode}
      />
    </div>
  );
}
