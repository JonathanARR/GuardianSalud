import { Shield, LogOut } from 'lucide-react';
import { useApp } from '@/store';
import { ThemeSwitcher } from './ThemeSwitcher';
import type { MainTab } from '@/types';

const TAB_LABELS: Record<MainTab, string> = {
  registros: 'Registros Base',
  turnos: 'Cuidadores y Turnos',
  dosis: 'Asignar Dosis',
  agenda: 'Agenda de Turno',
  bitacora: 'Bitácora',
};

export function Header() {
  const { activeTab, setActiveTab, user, logout, allowedTabs } = useApp();

  if (!user) return null;

  const initials = user.nombre
    .split(' ')
    .map((n) => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  const showNav = allowedTabs.length > 1;

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur-md dark:border-slate-700 dark:bg-slate-900/90">
      <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-4 px-4 py-3 lg:px-6">
        {/* Logo */}
        <div className="flex items-center gap-2.5">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 text-white shadow-md">
            <Shield size={22} />
          </div>
          <div className="leading-tight">
            <h1 className="text-base font-bold text-slate-800 dark:text-slate-100">
              GuardiánSalud
            </h1>
            <p className="hidden text-[11px] text-slate-500 dark:text-slate-400 sm:block">
              Gestión de Medicación
            </p>
          </div>
        </div>

        {/* Center nav - only shown if more than one tab allowed */}
        {showNav && (
          <nav className="hidden items-center gap-1 rounded-2xl bg-slate-100 p-1 dark:bg-slate-800 lg:flex">
            {allowedTabs.map((tabId) => (
              <button
                key={tabId}
                onClick={() => setActiveTab(tabId)}
                className={`rounded-xl px-3 py-2 text-sm font-medium transition-all ${
                  activeTab === tabId
                    ? 'bg-white text-brand-700 shadow-sm dark:bg-slate-700 dark:text-brand-300'
                    : 'text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200'
                }`}
              >
                {TAB_LABELS[tabId]}
              </button>
            ))}
          </nav>
        )}

        {/* Right */}
        <div className="flex items-center gap-3">
          {/* User chip */}
          <div className="hidden items-center gap-2.5 rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5 dark:border-slate-700 dark:bg-slate-800 md:flex">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-100 text-sm font-bold text-brand-700 dark:bg-brand-900/50 dark:text-brand-300">
              {initials}
            </div>
            <div className="leading-tight">
              <p className="text-xs font-semibold text-slate-700 dark:text-slate-200">
                {user.nombre}
              </p>
            </div>
          </div>

          <ThemeSwitcher />

          {/* Logout */}
          <button
            onClick={logout}
            className="inline-flex items-center gap-1.5 rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-red-50 hover:text-red-600 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-red-900/20 dark:hover:text-red-400"
          >
            <LogOut size={16} />
            <span className="hidden sm:inline">Cerrar Sesión</span>
          </button>
        </div>
      </div>

      {/* Mobile nav - only if more than one tab */}
      {showNav && (
        <nav className="flex items-center gap-1 overflow-x-auto px-3 pb-2 lg:hidden">
          {allowedTabs.map((tabId) => (
            <button
              key={tabId}
              onClick={() => setActiveTab(tabId)}
              className={`whitespace-nowrap rounded-lg px-3 py-1.5 text-xs font-medium transition ${
                activeTab === tabId
                  ? 'bg-brand-600 text-white'
                  : 'bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400'
              }`}
            >
              {TAB_LABELS[tabId]}
            </button>
          ))}
        </nav>
      )}
    </header>
  );
}
