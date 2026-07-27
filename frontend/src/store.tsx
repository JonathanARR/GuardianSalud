import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from 'react';
import type {
  Theme,
  MainTab,
  Medicamento,
  Residente,
  Personal,
  AsignacionTurno,
  Dosis,
  BitacoraEntry,
  AuthUser,
  Role,
} from './types';
import { ROLE_TABS } from './types';
import {
  seedMedicamentos,
  seedResidentes,
  seedPersonal,
  seedAsignaciones,
  seedDosis,
  seedBitacora,
} from './data';

interface AppState {
  theme: Theme;
  toggleTheme: () => void;
  activeTab: MainTab;
  setActiveTab: (t: MainTab) => void;

  user: AuthUser | null;
  login: (role: Role, nombre: string, email: string) => void;
  logout: () => void;
  allowedTabs: MainTab[];

  medicamentos: Medicamento[];
  addMedicamento: (m: Omit<Medicamento, 'id' | 'createdAt'>) => void;
  residentes: Residente[];
  addResidente: (r: Omit<Residente, 'id' | 'createdAt'>) => void;
  personal: Personal[];
  addPersonal: (p: Omit<Personal, 'id' | 'createdAt'>) => void;

  asignaciones: AsignacionTurno[];
  addAsignacion: (a: Omit<AsignacionTurno, 'id'>) => void;

  dosis: Dosis[];
  addDosis: (d: Omit<Dosis, 'id' | 'createdAt' | 'estado'>) => void;
  aplicarDosis: (id: string, aplicadaPor: string) => void;
  noAplicarDosis: (id: string, motivo: string) => void;

  bitacora: BitacoraEntry[];
}

const AppContext = createContext<AppState | null>(null);

let idCounter = 1000;
const genId = (prefix: string) => `${prefix}-${++idCounter}`;

const STORAGE_KEY = 'guardiansalud_session';
const THEME_KEY = 'guardiansalud_theme';

export function AppProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window === 'undefined') return 'light';
    return (localStorage.getItem(THEME_KEY) as Theme) || 'light';
  });
  const [activeTab, setActiveTab] = useState<MainTab>('registros');
  const [user, setUser] = useState<AuthUser | null>(() => {
    if (typeof window === 'undefined') return null;
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? (JSON.parse(saved) as AuthUser) : null;
    } catch {
      return null;
    }
  });

  const allowedTabs = user ? ROLE_TABS[user.role] : ROLE_TABS.admin;

  const [medicamentos, setMedicamentos] = useState<Medicamento[]>(seedMedicamentos);
  const [residentes, setResidentes] = useState<Residente[]>(seedResidentes);
  const [personal, setPersonal] = useState<Personal[]>(seedPersonal);
  const [asignaciones, setAsignaciones] = useState<AsignacionTurno[]>(seedAsignaciones);
  const [dosis, setDosis] = useState<Dosis[]>(seedDosis);
  const [bitacora, setBitacora] = useState<BitacoraEntry[]>(seedBitacora);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') root.classList.add('dark');
    else root.classList.remove('dark');
    localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === 'light' ? 'dark' : 'light'));

  const login = (role: Role, nombre: string, email: string) => {
    const newUser: AuthUser = { nombre, email, role };
    setUser(newUser);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newUser));
    setActiveTab(ROLE_TABS[role][0]);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(STORAGE_KEY);
    setActiveTab('registros');
  };

  const addMedicamento: AppState['addMedicamento'] = (m) => {
    setMedicamentos((prev) => [
      { ...m, id: genId('med'), createdAt: new Date().toISOString() },
      ...prev,
    ]);
  };

  const addResidente: AppState['addResidente'] = (r) => {
    setResidentes((prev) => [
      { ...r, id: genId('res'), createdAt: new Date().toISOString() },
      ...prev,
    ]);
  };

  const addPersonal: AppState['addPersonal'] = (p) => {
    setPersonal((prev) => [
      { ...p, id: genId('per'), createdAt: new Date().toISOString() },
      ...prev,
    ]);
  };

  const addAsignacion: AppState['addAsignacion'] = (a) => {
    setAsignaciones((prev) => [{ ...a, id: genId('asg') }, ...prev]);
  };

  const addDosis: AppState['addDosis'] = (d) => {
    setDosis((prev) => [
      {
        ...d,
        id: genId('dos'),
        estado: 'pendiente',
        createdAt: new Date().toISOString(),
      },
      ...prev,
    ]);
  };

  const pushBitacora = (entry: Omit<BitacoraEntry, 'id'>) => {
    setBitacora((prev) => [{ ...entry, id: genId('bit') }, ...prev]);
  };

  const aplicarDosis: AppState['aplicarDosis'] = (id, aplicadaPor) => {
    const now = new Date();
    const hora = now.toTimeString().slice(0, 5);
    const fecha = now.toISOString().slice(0, 10);
    setDosis((prev) =>
      prev.map((d) =>
        d.id === id
          ? { ...d, estado: 'aplicada', horaAplicada: hora, aplicadaPor }
          : d
      )
    );
    const d = dosis.find((x) => x.id === id);
    if (d) {
      pushBitacora({
        fecha,
        residenteId: d.residenteId,
        medicamentoId: d.medicamentoId,
        cuidadorId: d.cuidadorId,
        estado: 'aplicada',
        hora,
      });
    }
  };

  const noAplicarDosis: AppState['noAplicarDosis'] = (id, motivo) => {
    const now = new Date();
    const hora = now.toTimeString().slice(0, 5);
    const fecha = now.toISOString().slice(0, 10);
    setDosis((prev) =>
      prev.map((d) =>
        d.id === id
          ? { ...d, estado: 'no-aplicada', motivoOmision: motivo }
          : d
      )
    );
    const d = dosis.find((x) => x.id === id);
    if (d) {
      pushBitacora({
        fecha,
        residenteId: d.residenteId,
        medicamentoId: d.medicamentoId,
        cuidadorId: d.cuidadorId,
        estado: 'no-aplicada',
        hora,
        nota: motivo,
      });
    }
  };

  const value: AppState = {
    theme,
    toggleTheme,
    activeTab,
    setActiveTab,
    user,
    login,
    logout,
    allowedTabs,
    medicamentos,
    addMedicamento,
    residentes,
    addResidente,
    personal,
    addPersonal,
    asignaciones,
    addAsignacion,
    dosis,
    addDosis,
    aplicarDosis,
    noAplicarDosis,
    bitacora,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
