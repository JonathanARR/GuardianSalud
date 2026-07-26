import { useState, useMemo } from 'react';
import { BookOpen, Filter, CheckCircle2, XCircle } from 'lucide-react';
import { useApp } from '@/store';
import { SectionTitle, Field, Select, Badge, EmptyState } from '@/components/ui';

export function TabBitacora() {
  const { bitacora, residentes, medicamentos, personal } = useApp();
  const [filtroFecha, setFiltroFecha] = useState('');
  const [filtroResidente, setFiltroResidente] = useState('');
  const [filtroCuidador, setFiltroCuidador] = useState('');

  const filtered = useMemo(() => {
    return bitacora.filter((b) => {
      if (filtroFecha && b.fecha !== filtroFecha) return false;
      if (filtroResidente) {
        const r = residentes.find((x) => x.id === b.residenteId);
        if (!r || r.apodo !== filtroResidente) return false;
      }
      if (filtroCuidador) {
        const p = personal.find((x) => x.id === b.cuidadorId);
        if (!p || p.nombre !== filtroCuidador) return false;
      }
      return true;
    });
  }, [bitacora, filtroFecha, filtroResidente, filtroCuidador, residentes, personal]);

  const getResidente = (id: string) => residentes.find((r) => r.id === id);
  const getMed = (id: string) => medicamentos.find((m) => m.id === id);
  const getPersonal = (id: string) => personal.find((p) => p.id === id);

  return (
    <div className="animate-fade-in">
      <SectionTitle icon={<BookOpen size={20} />} title="Bitácora de Auditoría" subtitle="Historial completo de dosis aplicadas y omitidas" />

      {/* Filters */}
      <div className="card mb-6 p-5">
        <div className="mb-4 flex items-center gap-2">
          <Filter size={16} className="text-slate-500" />
          <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-200">Filtros</h3>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <Field label="Fecha">
            <input
              type="date"
              value={filtroFecha}
              onChange={(e) => setFiltroFecha(e.target.value)}
              className="input-base"
            />
          </Field>
          <Field label="Residente">
            <Select
              value={filtroResidente}
              onChange={setFiltroResidente}
              options={residentes.map((r) => r.apodo)}
              placeholder="Todos..."
            />
          </Field>
          <Field label="Cuidador Firmante">
            <Select
              value={filtroCuidador}
              onChange={setFiltroCuidador}
              options={personal.map((p) => p.nombre)}
              placeholder="Todos..."
            />
          </Field>
        </div>
        {(filtroFecha || filtroResidente || filtroCuidador) && (
          <button
            onClick={() => { setFiltroFecha(''); setFiltroResidente(''); setFiltroCuidador(''); }}
            className="mt-3 text-xs font-medium text-brand-600 hover:underline dark:text-brand-400"
          >
            Limpiar filtros
          </button>
        )}
      </div>

      {/* Table */}
      <div className="card overflow-hidden">
        <div className="border-b border-slate-200 px-5 py-3 dark:border-slate-700">
          <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-200">
            Registros ({filtered.length})
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-left text-xs uppercase tracking-wide text-slate-500 dark:border-slate-700 dark:bg-slate-800/50 dark:text-slate-400">
                <th className="px-5 py-3 font-semibold">Fecha</th>
                <th className="px-5 py-3 font-semibold">Hora</th>
                <th className="px-5 py-3 font-semibold">Residente</th>
                <th className="px-5 py-3 font-semibold">Medicamento</th>
                <th className="px-5 py-3 font-semibold">Cuidador</th>
                <th className="px-5 py-3 font-semibold">Estado</th>
                <th className="px-5 py-3 font-semibold">Nota</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700/50">
              {filtered.map((b) => (
                <tr key={b.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                  <td className="px-5 py-3 text-slate-600 dark:text-slate-300">{b.fecha}</td>
                  <td className="px-5 py-3 text-slate-600 dark:text-slate-300">{b.hora}</td>
                  <td className="px-5 py-3 font-medium text-slate-800 dark:text-slate-100">{getResidente(b.residenteId)?.apodo ?? '—'}</td>
                  <td className="px-5 py-3 text-slate-600 dark:text-slate-300">{getMed(b.medicamentoId)?.nombre ?? '—'}</td>
                  <td className="px-5 py-3 text-slate-600 dark:text-slate-300">{getPersonal(b.cuidadorId)?.nombre ?? '—'}</td>
                  <td className="px-5 py-3">
                    {b.estado === 'aplicada' ? (
                      <Badge color="green"><CheckCircle2 size={12} /> Aplicada</Badge>
                    ) : (
                      <Badge color="red"><XCircle size={12} /> Omitida</Badge>
                    )}
                  </td>
                  <td className="px-5 py-3 text-xs text-slate-500 dark:text-slate-400">{b.nota ?? '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && <EmptyState message="No hay registros que coincidan con los filtros" />}
        </div>
      </div>
    </div>
  );
}
