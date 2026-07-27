import type { ReactNode } from 'react';
import { ChevronDown } from 'lucide-react';

export function SectionTitle({
  icon,
  title,
  subtitle,
}: {
  icon: ReactNode;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="mb-5 flex items-center gap-3">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-100 text-brand-700 dark:bg-brand-900/40 dark:text-brand-300">
        {icon}
      </div>
      <div>
        <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100">{title}</h2>
        {subtitle && (
          <p className="text-sm text-slate-500 dark:text-slate-400">{subtitle}</p>
        )}
      </div>
    </div>
  );
}

export function Field({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label className="label-base">{label}</label>
      {children}
    </div>
  );
}

export function TextInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={`input-base ${props.className ?? ''}`} />;
}

export function Select({
  value,
  onChange,
  options,
  placeholder,
}: {
  value: string;
  onChange: (v: string) => void;
  options: string[];
  placeholder?: string;
}) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="input-base appearance-none pr-9"
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
      <ChevronDown
        size={16}
        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
      />
    </div>
  );
}

export function Badge({
  children,
  color = 'slate',
}: {
  children: ReactNode;
  color?: 'slate' | 'green' | 'red' | 'amber' | 'blue';
}) {
  const colors: Record<string, string> = {
    slate: 'bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300',
    green: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300',
    red: 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300',
    amber: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300',
    blue: 'bg-brand-100 text-brand-700 dark:bg-brand-900/40 dark:text-brand-300',
  };
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium ${colors[color]}`}
    >
      {children}
    </span>
  );
}

export function StockBadge({ stock }: { stock: number }) {
  if (stock <= 5) {
    return <Badge color="red">Stock Bajo ({stock})</Badge>;
  }
  if (stock <= 15) {
    return <Badge color="amber">Stock Limitado ({stock})</Badge>;
  }
  return <Badge color="green">Suficiente ({stock})</Badge>;
}

export function EmptyState({ message }: { message: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-10 text-center">
      <p className="text-sm text-slate-400 dark:text-slate-500">{message}</p>
    </div>
  );
}

export function KiroNote({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-start gap-2 rounded-xl border border-brand-200 bg-brand-50 px-3 py-2 text-xs text-brand-700 dark:border-brand-800 dark:bg-brand-900/30 dark:text-brand-300">
      <span className="mt-0.5 shrink-0">🤖</span>
      <p className="leading-relaxed">{children}</p>
    </div>
  );
}
