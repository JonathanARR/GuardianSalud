import { useState } from 'react';
import { CalendarDays, Save, Clock, MapPin, User } from 'lucide-react';
import { useApp } from '@/store';
import { SectionTitle, Field, TextInput, Select, Badge, EmptyState } from '@/components/ui';
import { TURNOS } from '@/data';
import type { TurnoTipo } from '@/types';

const TURNO_HORARIOS: Record<TurnoTipo, string> = {
  Matutino: '06:00 - 14:00',
  Vespertino: '14:00 - 22:00',
  Nocturno: '22:00 - 06:00',
  Planta: '24 hrs (rotación)',
};

export function TabTurnos() {
  const { personal, asignaciones, addAsignacion } = useApp();
  const [form, setForm] = useState({
    personalId: '',
    turno: '',
    zona: '',
    fecha: new Date().toISOString().slice(0, 10),
  });
  const [saved, setSaved] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.personalId || !form.turno || !form.zona) return;
    addAsignacion({
      personalId: form.personalId,
      turno: form.turno as TurnoTipo,
      zona: form.zona,
      fecha: form.fecha,
    });
    setForm({ ...form, personalId: '', turno: '', zona: '' });
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const getPersonal = (id: string) => personal.find((p) => p.id === id);

  return (
    <div className="animate-fade-in">
      <SectionTitle icon={<CalendarDays size={20} />} title="Cuidadores y Turnos" subtitle="Asignación de personal a turnos y zonas de cobertura" />

      <form onSubmit={handleSubmit} className="card mb-6 p-5">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Field label="Colaborador">
            <Select
              value={form.personalId}
              onChange={(v) => setForm({ ...form, personalId: v })}
              options={personal.map((p) => p.nombre)}
              placeholder="Seleccionar..."
            />
          </Field>
          <Field label="Turno">
            <Select
              value={form.turno}
              onChange={(v) => setForm({ ...form, turno: v })}
              options={TURNOS}
              placeholder="Seleccionar..."
            />
          </Field>
          <Field label="Zona / Muebles">
            <TextInput
              value={form.zona}
              onChange={(e) => setForm({ ...form, zona: e.target.value })}
              placeholder="ej. Muebles 10-14"
            />
          </Field>
          <Field label="Fecha">
            <TextInput
              type="date"
              value={form.fecha}
              onChange={(e) => setForm({ ...form, fecha: e.target.value })}
            />
          </Field>
        </div>
        <div className="mt-5 flex flex-wrap items-center gap-3">
          <button type="submit" className="btn-primary">
            <Save size={16} /> Asignar Turno
          </button>
          {saved && (
            <span className="animate-fade-in text-sm font-medium text-emerald-600 dark:text-emerald-400">
              ✓ Turno asignado correctamente
            </span>
          )}
        </div>
      </form>

      {/* Active shift board */}
      <div className="mb-4 flex items-center gap-2">
        <h3 className="text-sm font-bold text-slate-700 dark:text-slate-200">Plantilla Activa del Día</h3>
        <Badge color="blue">{form.fecha || new Date().toISOString().slice(0, 10)}</Badge>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {TURNOS.map((turno) => {
          const asigns = asignaciones.filter((a) => a.turno === turno);
          return (
            <div key={turno} className="card p-4">
              <div className="mb-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Clock size={16} className="text-brand-600 dark:text-brand-400" />
                  <span className="text-sm font-bold text-slate-800 dark:text-slate-100">{turno}</span>
                </div>
                <span className="text-xs text-slate-500 dark:text-slate-400">{TURNO_HORARIOS[turno]}</span>
              </div>
              <div className="space-y-2">
                {asigns.length === 0 ? (
                  <p className="text-xs text-slate-400">Sin personal asignado</p>
                ) : (
                  asigns.map((a) => {
                    const p = getPersonal(a.personalId);
                    return (
                      <div key={a.id} className="rounded-lg bg-slate-50 p-3 dark:bg-slate-800/50">
                        <div className="flex items-center gap-2">
                          <User size={14} className="text-slate-500" />
                          <span className="text-sm font-medium text-slate-700 dark:text-slate-200">{p?.nombre ?? '—'}</span>
                        </div>
                        <div className="mt-1 flex items-center gap-2 pl-6">
                          <MapPin size={12} className="text-slate-400" />
                          <span className="text-xs text-slate-500 dark:text-slate-400">{a.zona}</span>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          );
        })}
      </div>

      {asignaciones.length === 0 && <EmptyState message="No hay turnos asignados" />}
    </div>
  );
}
