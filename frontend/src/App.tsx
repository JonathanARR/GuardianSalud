import { AppProvider, useApp } from '@/store';
import { Header } from '@/components/Header';
import { LoginScreen } from '@/components/LoginScreen';
import { TabRegistros } from '@/components/TabRegistros';
import { TabTurnos } from '@/components/TabTurnos';
import { TabDosis } from '@/components/TabDosis';
import { TabAgenda } from '@/components/TabAgenda';
import { TabBitacora } from '@/components/TabBitacora';
import type { MainTab } from '@/types';

const TAB_COMPONENTS: Record<MainTab, () => JSX.Element> = {
  registros: TabRegistros,
  turnos: TabTurnos,
  dosis: TabDosis,
  agenda: TabAgenda,
  bitacora: TabBitacora,
};

function AppContent() {
  const { user, activeTab, allowedTabs } = useApp();

  if (!user) {
    return <LoginScreen />;
  }

  const ActiveTab = TAB_COMPONENTS[activeTab] ?? TAB_COMPONENTS[allowedTabs[0]];

  return (
    <div className="min-h-screen bg-slate-100 transition-colors duration-300 dark:bg-slate-900">
      <Header />
      <main className="mx-auto max-w-[1400px] px-4 py-6 lg:px-6">
        <ActiveTab />
      </main>
    </div>
  );
}

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;
