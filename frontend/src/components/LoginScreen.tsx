import { useState } from 'react';
import { Shield, Mail, Lock, LogIn, Crown, Stethoscope, HeartPulse, ArrowRight } from 'lucide-react';
import { useApp } from '@/store';
import type { Role } from '@/types';
import { ROLE_LABELS } from '@/types';

const DEMO_USERS: { role: Role; nombre: string; email: string; icon: typeof Crown; color: string }[] = [
  { role: 'admin', nombre: 'Diego Pérez', email: 'admin@guardiansalud.app', icon: Crown, color: 'amber' },
  { role: 'medico', nombre: 'Dr. Luis Ramírez', email: 'medico@guardiansalud.app', icon: Stethoscope, color: 'brand' },
  { role: 'enfermero', nombre: 'Ana Torres', email: 'enfermero@guardiansalud.app', icon: HeartPulse, color: 'emerald' },
];

export function LoginScreen() {
  const { login } = useApp();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!email || !password) {
      setError('Por favor complete todos los campos.');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      const demo = DEMO_USERS.find((d) => d.email === email);
      if (demo) {
        login(demo.role, demo.nombre, demo.email);
      } else {
        login('admin', email.split('@')[0] || 'Usuario', email);
      }
      setLoading(false);
    }, 500);
  };

  const quickLogin = (demo: (typeof DEMO_USERS)[number]) => {
    setEmail(demo.email);
    setPassword('demo1234');
    setError('');
    setLoading(true);
    setTimeout(() => {
      login(demo.role, demo.nombre, demo.email);
      setLoading(false);
    }, 400);
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-slate-100 via-brand-50 to-slate-100 px-4 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      {/* Decorative background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-40 -top-40 h-96 w-96 rounded-full bg-brand-200/30 blur-3xl dark:bg-brand-900/20" />
        <div className="absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-emerald-200/30 blur-3xl dark:bg-emerald-900/20" />
      </div>

      <div className="relative z-10 w-full max-w-md animate-fade-in">
        {/* Logo */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 text-white shadow-lg">
            <Shield size={32} />
          </div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100">GuardiánSalud</h1>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Gestión Operativa y Adherencia de Medicamentos
          </p>
        </div>

        {/* Login card */}
        <div className="card p-6 sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="label-base">Correo electrónico</label>
              <div className="relative">
                <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="usuario@guardiansalud.app"
                  className="input-base pl-10"
                />
              </div>
            </div>
            <div>
              <label className="label-base">Contraseña</label>
              <div className="relative">
                <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="input-base pl-10"
                />
              </div>
            </div>

            {error && (
              <p className="text-sm font-medium text-red-600 dark:text-red-400">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full py-3 text-base"
            >
              <LogIn size={18} /> {loading ? 'Iniciando...' : 'Iniciar Sesión'}
            </button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center gap-3">
            <div className="h-px flex-1 bg-slate-200 dark:bg-slate-700" />
            <span className="text-xs font-medium uppercase tracking-wide text-slate-400">
              Acceso Rápido Demo
            </span>            <div className="h-px flex-1 bg-slate-200 dark:bg-slate-700" />
          </div>

          {/* Demo role selectors */}
          <div className="space-y-2.5">
            {DEMO_USERS.map((demo) => {
              const Icon = demo.icon;
              const colorClasses: Record<string, string> = {
                amber: 'border-amber-300 bg-amber-50 hover:bg-amber-100 dark:border-amber-800 dark:bg-amber-900/20 dark:hover:bg-amber-900/30',
                brand: 'border-brand-300 bg-brand-50 hover:bg-brand-100 dark:border-brand-800 dark:bg-brand-900/20 dark:hover:bg-brand-900/30',
                emerald: 'border-emerald-300 bg-emerald-50 hover:bg-emerald-100 dark:border-emerald-800 dark:bg-emerald-900/20 dark:hover:bg-emerald-900/30',
              };
              const iconColor: Record<string, string> = {
                amber: 'text-amber-600 dark:text-amber-400',
                brand: 'text-brand-600 dark:text-brand-400',
                emerald: 'text-emerald-600 dark:text-emerald-400',
              };
              return (
                <button
                  key={demo.role}
                  onClick={() => quickLogin(demo)}
                  disabled={loading}
                  className={`flex w-full items-center gap-3 rounded-xl border px-4 py-3 text-left transition disabled:opacity-50 ${colorClasses[demo.color]}`}
                >
                  <Icon size={20} className={iconColor[demo.color]} />
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                      {ROLE_LABELS[demo.role]}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {demo.nombre}
                    </p>
                  </div>
                  <ArrowRight size={16} className="text-slate-400" />
                </button>
              );
            })}
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-slate-400 dark:text-slate-500">
          Sistema demostrativo · Los datos se guardan localmente en este dispositivo
        </p>
      </div>
    </div>
  );
}
