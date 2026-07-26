import { useState, useMemo } from 'react';
import { Syringe, Save, AlertTriangle, ShieldAlert, Clock, User } from 'lucide-react';
import { useApp } from '@/store';
import { SectionTitle, Field, TextInput, Select, Badge, KiroNote } from '@/components/ui';
import { FRECUENCIAS } from '@/data';

export function TabDosis() {
  const { residentes, medicamentos, personal, dosis, addDosis } = useApp();
  const [form, setForm] = useState({
    residenteId: '',
    medicamentoId: '',
    frecuencia: '',
    horaInicio: '08:00',
    cuidadorId: '',
    altaCriticidad: false,
  });
  const [saved, setSaved] = useState(false);

  const residente = residentes.find((r) => r.id === form.residenteId || r.apodo === form.residenteId);
  const medicamento = medicamentos.find((m) => m.id === form.medicamentoId || m.nombre === form.medicamentoId);

  // Kiro AI allergy check
  const allergyBlock = useMemo(() => {
    if (!residente || !medicamento) return null;
    const alergias = residente.alergias.toLowerCase();
    if (!alergias || alergias.includes('ninguna')) return null;
    const formula = medicamento.formula.toLowerCase();
    const nombre = medicamento.nombre.toLowerCase();
    const alergiasList = alergias.split(/[,;]\s*/).map((a) => a.trim()).filter(Boolean);
    const match = alergiasList.find((a) => {
      const al = a.toLowerCase();
      return formula.includes(al) || nombre.includes(al) || al.includes(formula) || al.includes(nombre);
    });
    return match ? { alergia: match } : null;
  }, [residente, medicamento]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.residenteId || !form.medicamentoId || !form.frecuencia || !form.cuidadorId) return;
    if (allergyBlock) return; // blocked
    const resId = residente?.id ?? form.residenteId;
    const medId = medicamento?.id ?? form.medicamentoId;
    const cuiId = personal.find((p) => p.nombre === form.cuidadorId)?.id ?? form.cuidadorId;
    addDosis({
      residenteId: resId,
      medicamentoId: medId,
      frecuencia: form.frecuencia,
      horaInicio: form.horaInicio,
      cuidadorId: cuiId,
      altaCriticidad: form.altaCriticidad,
    });
    setForm({ residenteId: '', medicamentoId: '', frecuencia: '', horaInicio: '08:00', cuidadorId: '', altaCriticidad: false });
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="animate-fade-in">
      <SectionTitle icon={<Syringe size={20} />} title="Asignar Dosis" subtitle="Vinculación de medicamentos con residentes con validación de Kiro AI" />

      <form onSubmit={handleSubmit} className="card mb-6 p-5">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Field label="Residente">
            <Select
              value={form.residenteId}
              onChange={(v) => setForm({ ...form, residenteId: v })}
              options={residentes.map((r) => r.apodo)}
              placeholder="Seleccionar residente..."
            />
          </Field>
          <Field label="Medicamento">
            <Select
              value={form.medicamentoId}
              onChange={(v) => setForm({ ...form, medicamentoId: v })}
              options={medicamentos.map((m) => m.nombre)}
              placeholder="Seleccionar medicamento..."
            />
          </Field>
          <Field label="Frecuencia">
            <Select
              value={form.frecuencia}
              onChange={(v) => setForm({ ...form, frecuencia: v })}
              options={FRECUENCIAS}
              placeholder="Seleccionar..."
            />
          </Field>
          <Field label="Hora de Inicio">
            <TextInput
              type="time"
              value={form.horaInicio}
              onChange={(e) => setForm({ ...form, horaInicio: e.target.value })}
            />
          </Field>
          <Field label="Cuidador Responsable">
            <Select
              value={form.cuidadorId}
              onChange={(v) => setForm({ ...form, cuidadorId: v })}
              options={personal.map((p) => p.nombre)}
              placeholder="Seleccionar..."
            />
          </Field>
        </div>

        {/* Resident allergy info */}
        {residente && residente.alergias && !residente.alergias.toLowerCase().includes('ninguna') && (
          <div className="mt-4 flex items-start gap-2 rounded-xl border border-amber-300 bg-amber-50 px-4 py-3 dark:border-amber-800 dark:bg-amber-900/20">
            <AlertTriangle size={18} className="mt-0.5 shrink-0 text-amber-600 dark:text-amber-400" />
            <div>
              <p className="text-sm font-semibold text-amber-700 dark:text-amber-300">
                Alergias registradas: {residente.alergias}
              </p>
              <p className="text-xs text-amber-600 dark:text-amber-400">
                Kiro AI validará la seguridad de esta asignación automáticamente.
              </p>
            </div>
          </div>
        )}

        {/* Kiro AI block alert */}
        {allergyBlock && (
          <div className="mt-4 animate-fade-in rounded-xl border-2 border-red-400 bg-red-50 p-4 dark:border-red-700 dark:bg-red-900/30">
            <div className="flex items-start gap-3">
              <ShieldAlert size={24} className="shrink-0 text-red-600 dark:text-red-400" />
              <div>
                <h4 className="text-sm font-bold text-red-700 dark:text-red-300">
                  🚫 ASIGNACIÓN NO PERMITIDA
                </h4>
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                  El residente es alérgico a este componente. Kiro AI ha bloqueado esta asignación por seguridad.
                </p>
                <p className="mt-1 text-xs text-red-500 dark:text-red-400">
                  Coinidencia detectada: <strong>{allergyBlock.alergia}</strong>
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Criticality toggle */}
        <div className="mt-4">
          <button
            type="button"
            onClick={() => setForm({ ...form, altaCriticidad: !form.altaCriticidad })}
            className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition ${
              form.altaCriticidad
                ? 'bg-red-100 text-red-700 ring-2 ring-red-300 dark:bg-red-900/30 dark:text-red-300 dark:ring-red-700'
                : 'bg-slate-100 text-slate-600 ring-1 ring-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:ring-slate-700'
            }`}
          >
            <span className={`h-3 w-3 rounded-full ${form.altaCriticidad ? 'bg-red-500' : 'bg-slate-400'}`} />
            Alta Criticidad (Requiere confirmación obligatoria)
          </button>
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-3">
          <button
            type="submit"
            disabled={!!allergyBlock}
            className="btn-primary"
          >
            <Save size={16} /> Guardar y Programar Dosis
          </button>
          {allergyBlock && (
            <span className="text-sm font-medium text-red-600 dark:text-red-400">
              Asignación bloqueada por Kiro AI
            </span>
          )}
          {saved && (
            <span className="animate-fade-in text-sm font-medium text-emerald-600 dark:text-emerald-400">
              ✓ Dosis programada correctamente
            </span>
          )}
        </div>
      </form>

      {/* Recent doses */}
      <div className="card overflow-hidden">
        <div className="border-b border-slate-200 px-5 py-3 dark:border-slate-700">
          <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-200">Dosis Programadas Recientemente</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-left text-xs uppercase tracking-wide text-slate-500 dark:border-slate-700 dark:bg-slate-800/50 dark:text-slate-400">
                <th className="px-5 py-3 font-semibold">Residente</th>
                <th className="px-5 py-3 font-semibold">Medicamento</th>
                <th className="px-5 py-3 font-semibold">Frecuencia</th>
                <th className="px-5 py-3 font-semibold">Inicio</th>
                <th className="px-5 py-3 font-semibold">Cuidador</th>
                <th className="px-5 py-3 font-semibold">Criticidad</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700/50">
              {dosis.slice(0, 8).map((d) => {
                const r = residentes.find((x) => x.id === d.residenteId);
                const m = medicamentos.find((x) => x.id === d.medicamentoId);
                const p = personal.find((x) => x.id === d.cuidadorId);
                return (
                  <tr key={d.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                    <td className="px-5 py-3 font-medium text-slate-800 dark:text-slate-100">{r?.apodo ?? '—'}</td>
                    <td className="px-5 py-3 text-slate-600 dark:text-slate-300">{m?.nombre ?? '—'}</td>
                    <td className="px-5 py-3 text-slate-600 dark:text-slate-300">{d.frecuencia}</td>
                    <td className="px-5 py-3 text-slate-600 dark:text-slate-300">{d.horaInicio}</td>
                    <td className="px-5 py-3 text-slate-600 dark:text-slate-300">{p?.nombre ?? '—'}</td>
                    <td className="px-5 py-3">
                      {d.altaCriticidad ? <Badge color="red">Alta</Badge> : <Badge color="slate">Normal</Badge>}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
