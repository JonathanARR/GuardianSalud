import { Sun, Moon } from 'lucide-react';
import { useApp } from '@/store';

export function ThemeSwitcher() {
  const { theme, toggleTheme } = useApp();
  const isDark = theme === 'dark';
  return (
    <button
      onClick={toggleTheme}
      aria-label="Cambiar tema"
      className="relative inline-flex h-9 w-16 items-center rounded-full border border-slate-300 bg-slate-200 transition dark:border-slate-600 dark:bg-slate-700"
    >
      <span
        className={`absolute flex h-7 w-7 items-center justify-center rounded-full shadow-sm transition-all duration-300 ${
          isDark
            ? 'left-8 bg-slate-900 text-brand-300'
            : 'left-1 bg-white text-amber-500'
        }`}
      >
        {isDark ? <Moon size={16} /> : <Sun size={16} />}
      </span>
      <Sun
        size={14}
        className={`absolute left-2.5 text-amber-500 transition-opacity ${isDark ? 'opacity-30' : 'opacity-100'}`}
      />
      <Moon
        size={14}
        className={`absolute right-2.5 text-brand-300 transition-opacity ${isDark ? 'opacity-100' : 'opacity-30'}`}
      />
    </button>
  );
}
