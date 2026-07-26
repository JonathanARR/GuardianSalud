import { useState } from 'react';
import { Pill, Users, Stethoscope, Save, ScanLine, AlertTriangle, Plus, X } from 'lucide-react';
import { useApp } from '@/store';
import {
  SectionTitle,
  Field,
  TextInput,
  Select,
  Badge,
  StockBadge,
  EmptyState,
  KiroNote,
} from '@/components/ui';
import {
  PRESENTACIONES,
  VIAS,
  CONDICIONES,
  DIETAS,
  ROLES,
  TURNOS,
  ESPECIALIDADES_DISPONIBLES,
} from '@/data';
import type { SubTabRegistros, Presentacion, ViaAdmin } from '@/types';

const SUBTABS: { id: SubTabRegistros; label: string; icon: typeof Pill }[] = [
  { id: 'medicamentos', label: 'Medicamentos / Insumos', icon: Pill },
  { id: 'residentes', label: 'Residentes / Pacientes', icon: Users },
  { id: 'personal', label: 'Personal / Cuidadores', icon: Stethoscope },
];

export function TabRegistros() {
  const [subtab, setSubtab] = useState<SubTabRegistros>('medicamentos');
  return (
    <div className="animate-fade-in">
      {/* Subtab bar */}
      <div className="mb-6 flex flex-wrap items-center gap-2">
        {SUBTABS.map((s) => {
          const Icon = s.icon;
          return (
            <button
              key={s.id}
              onClick={() => setSubtab(s.id)}
              className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition ${
                subtab === s.id
                  ? 'bg-brand-600 text-white shadow-md'
                  : 'bg-white text-slate-600 ring-1 ring-slate-200 hover:bg-slate-50 dark:bg-slate-800 dark:text-slate-300 dark:ring-slate-700 dark:hover:bg-slate-700'
              }`}
            >
              <Icon size={16} />
              {s.label}
            </button>
          );
        })}
      </div>

      {subtab === 'medicamentos' && <MedicamentosPanel />}
      {subtab === 'residentes' && <ResidentesPanel />}
      {subtab === 'personal' && <PersonalPanel />}
    </div>
  );
}

/* =================== MEDICAMENTOS =================== */

function MedicamentosPanel() {
  const { medicamentos, addMedicamento } = useApp();
  const [form, setForm] = useState({
    nombre: '',
    formula: '',
    concentracion: '',
    presentacion: '' as Presentacion | '',
    via: '' as ViaAdmin | '',
    stock: '',
  });
  const [saved, setSaved] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.nombre || !form.formula || !form.presentacion || !form.via) return;
    addMedicamento({
      nombre: form.nombre,
      formula: form.formula,
      concentracion: form.concentracion,
      presentacion: form.presentacion as Presentacion,
      via: form.via as ViaAdmin,
      stock: Number(form.stock) || 0,
    });
    setForm({ nombre: '', formula: '', concentracion: '', presentacion: '', via: '', stock: '' });
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div>
      <SectionTitle icon={<Pill size={20} />} title="Medicamentos / Insumos" subtitle="Catálogo de medicamentos y control de stock" />

      <form onSubmit={handleSubmit} className="card mb-6 p-5">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Field label="Nombre Comercial">
            <TextInput
              value={form.nombre}
              onChange={(e) => setForm({ ...form, nombre: e.target.value })}
              placeholder="ej. Insulina NPH"
            />
          </Field>
          <Field label="Fórmula / Principio Activo">
            <TextInput
              value={form.formula}
              onChange={(e) => setForm({ ...form, formula: e.target.value })}
              placeholder="ej. Acetaminofén"
            />
          </Field>
          <Field label="Concentración / Miligramos">
            <TextInput
              value={form.concentracion}
              onChange={(e) => setForm({ ...form, concentracion: e.target.value })}
              placeholder="ej. 500 mg"
            />
          </Field>
          <Field label="Presentación">
            <Select
              value={form.presentacion}
              onChange={(v) => setForm({ ...form, presentacion: v as Presentacion })}
              options={PRESENTACIONES}
              placeholder="Seleccionar..."
            />
          </Field>
          <Field label="Vía de Administración">
            <Select
              value={form.via}
              onChange={(v) => setForm({ ...form, via: v as ViaAdmin })}
              options={VIAS}
              placeholder="Seleccionar..."
            />
          </Field>
          <Field label="Stock Actual">
            <TextInput
              type="number"
              min={0}
              value={form.stock}
              onChange={(e) => setForm({ ...form, stock: e.target.value })}
              placeholder="0"
            />
          </Field>
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-3">
          <button type="submit" className="btn-primary">
            <Save size={16} /> Guardar Medicamento
          </button>
          <button type="button" className="btn-ghost">
            <ScanLine size={16} /> Escanear Caja con OCR / IA
          </button>
          {saved && (
            <span className="animate-fade-in text-sm font-medium text-emerald-600 dark:text-emerald-400">
              ✓ Medicamento guardado correctamente
            </span>
          )}
        </div>
      </form>

      {/* Catalog table */}
      <div className="card overflow-hidden">
        <div className="border-b border-slate-200 px-5 py-3 dark:border-slate-700">
          <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-200">
            Catálogo Guardado ({medicamentos.length})
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-left text-xs uppercase tracking-wide text-slate-500 dark:border-slate-700 dark:bg-slate-800/50 dark:text-slate-400">
                <th className="px-5 py-3 font-semibold">Nombre</th>
                <th className="px-5 py-3 font-semibold">Fórmula</th>
                <th className="px-5 py-3 font-semibold">Concentración</th>
                <th className="px-5 py-3 font-semibold">Presentación</th>
                <th className="px-5 py-3 font-semibold">Vía</th>
                <th className="px-5 py-3 font-semibold">Estado Stock</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700/50">
              {medicamentos.map((m) => (
                <tr key={m.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                  <td className="px-5 py-3 font-medium text-slate-800 dark:text-slate-100">{m.nombre}</td>
                  <td className="px-5 py-3 text-slate-600 dark:text-slate-300">{m.formula}</td>
                  <td className="px-5 py-3 text-slate-600 dark:text-slate-300">{m.concentracion}</td>
                  <td className="px-5 py-3 text-slate-600 dark:text-slate-300">{m.presentacion}</td>
                  <td className="px-5 py-3 text-slate-600 dark:text-slate-300">{m.via}</td>
                  <td className="px-5 py-3"><StockBadge stock={m.stock} /></td>
                </tr>
              ))}
            </tbody>
          </table>
          {medicamentos.length === 0 && <EmptyState message="No hay medicamentos registrados" />}
        </div>
      </div>
    </div>
  );
}

/* =================== RESIDENTES =================== */

function ResidentesPanel() {
  const { residentes, addResidente } = useApp();
  const [form, setForm] = useState({
    apodo: '',
    habitacion: '',
    habitacionCustom: '',
    condicion: '',
    condicionCustom: '',
    dieta: '',
    dietaCustom: '',
    alergias: '',
    cuidados: '',
  });
  const [saved, setSaved] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.apodo) return;
    addResidente({
      apodo: form.apodo,
      habitacion: form.habitacion === 'Otro' ? form.habitacionCustom : form.habitacion,
      condicion: form.condicion === 'Otro / Especificar' ? form.condicionCustom : form.condicion,
      dieta: form.dieta === 'Otro / Especificar' ? form.dietaCustom : form.dieta,
      alergias: form.alergias,
      cuidados: form.cuidados,
    });
    setForm({
      apodo: '', habitacion: '', habitacionCustom: '', condicion: '', condicionCustom: '',
      dieta: '', dietaCustom: '', alergias: '', cuidados: '',
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div>
      <SectionTitle icon={<Users size={20} />} title="Residentes / Pacientes" subtitle="Registro operativo de residentes del asilo" />

      <form onSubmit={handleSubmit} className="card mb-6 p-5">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Field label="Identificador / Apodo">
            <TextInput
              value={form.apodo}
              onChange={(e) => setForm({ ...form, apodo: e.target.value })}
              placeholder="ej. Abuelo Beto o RES-012"
            />
          </Field>
          <Field label="Ubicación / Habitación">
            <Select
              value={form.habitacion}
              onChange={(v) => setForm({ ...form, habitacion: v })}
              options={['Mueble 12 - Cama A', 'Mueble 08 - Cama B', 'Mueble 05 - Cama A', 'Mueble 03 - Cama C', 'Otro']}
              placeholder="Seleccionar..."
            />
          </Field>
          {form.habitacion === 'Otro' && (
            <Field label="Especificar Habitación">
              <TextInput
                value={form.habitacionCustom}
                onChange={(e) => setForm({ ...form, habitacionCustom: e.target.value })}
                placeholder="ej. Mueble 07 - Cama D"
              />
            </Field>
          )}
          <Field label="Condición / Padecimiento">
            <Select
              value={form.condicion}
              onChange={(v) => setForm({ ...form, condicion: v })}
              options={CONDICIONES}
              placeholder="Seleccionar..."
            />
          </Field>
          {form.condicion === 'Otro / Especificar' && (
            <Field label="Especificar Condición">
              <TextInput
                value={form.condicionCustom}
                onChange={(e) => setForm({ ...form, condicionCustom: e.target.value })}
                placeholder="ej. EPOC moderado"
              />
            </Field>
          )}
          <Field label="Dieta y Nutrición">
            <Select
              value={form.dieta}
              onChange={(v) => setForm({ ...form, dieta: v })}
              options={DIETAS}
              placeholder="Seleccionar..."
            />
          </Field>
          {form.dieta === 'Otro / Especificar' && (
            <Field label="Especificar Dieta">
              <TextInput
                value={form.dietaCustom}
                onChange={(e) => setForm({ ...form, dietaCustom: e.target.value })}
                placeholder="ej. Vegetariana blanda"
              />
            </Field>
          )}
          <Field label="Cuidados Especiales / Alertas">
            <TextInput
              value={form.cuidados}
              onChange={(e) => setForm({ ...form, cuidados: e.target.value })}
              placeholder="ej. Movilidad reducida"
            />
          </Field>
        </div>

        {/* Critical allergy section */}
        <div className="mt-4 rounded-xl border-2 border-red-300 bg-red-50 p-4 dark:border-red-800 dark:bg-red-900/20">
          <div className="mb-2 flex items-center gap-2">
            <AlertTriangle size={18} className="text-red-600 dark:text-red-400" />
            <h4 className="text-sm font-bold text-red-700 dark:text-red-300">
              Alergias Médicas y Medicamentos NO Suministrar / Prohibidos
            </h4>
          </div>
          <TextInput
            value={form.alergias}
            onChange={(e) => setForm({ ...form, alergias: e.target.value })}
            placeholder="ej. Alérgico a Penicilina, AINEs"
            className="border-red-300 bg-white dark:border-red-800 dark:bg-slate-900"
          />
          <div className="mt-2">
            <KiroNote>
              ⚠️ Kiro AI usará esta información para bloquear asignaciones de riesgo. Esta información es crítica para la seguridad del residente.
            </KiroNote>
          </div>
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-3">
          <button type="submit" className="btn-primary">
            <Save size={16} /> Registrar Residente
          </button>
          {saved && (
            <span className="animate-fade-in text-sm font-medium text-emerald-600 dark:text-emerald-400">
              ✓ Residente registrado correctamente
            </span>
          )}
        </div>
      </form>

      {/* Table */}
      <div className="card overflow-hidden">
        <div className="border-b border-slate-200 px-5 py-3 dark:border-slate-700">
          <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-200">
            Listado de Residentes ({residentes.length})
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-left text-xs uppercase tracking-wide text-slate-500 dark:border-slate-700 dark:bg-slate-800/50 dark:text-slate-400">
                <th className="px-5 py-3 font-semibold">Apodo / ID</th>
                <th className="px-5 py-3 font-semibold">Habitación</th>
                <th className="px-5 py-3 font-semibold">Condición</th>
                <th className="px-5 py-3 font-semibold">Dieta</th>
                <th className="px-5 py-3 font-semibold">Alergias / Contraindicaciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700/50">
              {residentes.map((r) => (
                <tr key={r.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                  <td className="px-5 py-3 font-medium text-slate-800 dark:text-slate-100">{r.apodo}</td>
                  <td className="px-5 py-3 text-slate-600 dark:text-slate-300">{r.habitacion}</td>
                  <td className="px-5 py-3 text-slate-600 dark:text-slate-300">{r.condicion}</td>
                  <td className="px-5 py-3 text-slate-600 dark:text-slate-300">{r.dieta}</td>
                  <td className="px-5 py-3">
                    {r.alergias && r.alergias.toLowerCase() !== 'ninguna conocida' ? (
                      <Badge color="red">{r.alergias}</Badge>
                    ) : (
                      <Badge color="green">Sin alergias</Badge>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {residentes.length === 0 && <EmptyState message="No hay residentes registrados" />}
        </div>
      </div>
    </div>
  );
}

/* =================== PERSONAL =================== */

function PersonalPanel() {
  const { personal, addPersonal } = useApp();
  const [form, setForm] = useState({
    nombre: '',
    rol: '' as string,
    especialidades: [] as string[],
    turnoPref: '' as string,
  });
  const [saved, setSaved] = useState(false);

  const toggleEsp = (esp: string) => {
    setForm((f) => ({
      ...f,
      especialidades: f.especialidades.includes(esp)
        ? f.especialidades.filter((x) => x !== esp)
        : [...f.especialidades, esp],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.nombre || !form.rol || !form.turnoPref) return;
    addPersonal({
      nombre: form.nombre,
      rol: form.rol as any,
      especialidades: form.especialidades,
      turnoPref: form.turnoPref as any,
    });
    setForm({ nombre: '', rol: '', especialidades: [], turnoPref: '' });
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div>
      <SectionTitle icon={<Stethoscope size={20} />} title="Personal / Cuidadores" subtitle="Registro de colaboradores y competencias" />

      <form onSubmit={handleSubmit} className="card mb-6 p-5">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Field label="Nombre Completo">
            <TextInput
              value={form.nombre}
              onChange={(e) => setForm({ ...form, nombre: e.target.value })}
              placeholder="ej. Diego Pérez"
            />
          </Field>
          <Field label="Rol / Puesto">
            <Select
              value={form.rol}
              onChange={(v) => setForm({ ...form, rol: v })}
              options={ROLES}
              placeholder="Seleccionar..."
            />
          </Field>
          <Field label="Turno Preferente">
            <Select
              value={form.turnoPref}
              onChange={(v) => setForm({ ...form, turnoPref: v })}
              options={TURNOS}
              placeholder="Seleccionar..."
            />
          </Field>
        </div>

        <div className="mt-4">
          <label className="label-base">Especialidades / Competencias</label>
          <div className="flex flex-wrap gap-2">
            {ESPECIALIDADES_DISPONIBLES.map((esp) => {
              const active = form.especialidades.includes(esp);
              return (
                <button
                  key={esp}
                  type="button"
                  onClick={() => toggleEsp(esp)}
                  className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition ${
                    active
                      ? 'bg-brand-600 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-300 dark:hover:bg-slate-600'
                  }`}
                >
                  {active ? <X size={12} /> : <Plus size={12} />}
                  {esp}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-3">
          <button type="submit" className="btn-primary">
            <Save size={16} /> Guardar Colaborador
          </button>
          {saved && (
            <span className="animate-fade-in text-sm font-medium text-emerald-600 dark:text-emerald-400">
              ✓ Colaborador guardado correctamente
            </span>
          )}
        </div>
      </form>

      {/* Table */}
      <div className="card overflow-hidden">
        <div className="border-b border-slate-200 px-5 py-3 dark:border-slate-700">
          <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-200">
            Colaboradores Registrados ({personal.length})
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-left text-xs uppercase tracking-wide text-slate-500 dark:border-slate-700 dark:bg-slate-800/50 dark:text-slate-400">
                <th className="px-5 py-3 font-semibold">Nombre</th>
                <th className="px-5 py-3 font-semibold">Rol</th>
                <th className="px-5 py-3 font-semibold">Especialidades</th>
                <th className="px-5 py-3 font-semibold">Turno</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700/50">
              {personal.map((p) => (
                <tr key={p.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                  <td className="px-5 py-3 font-medium text-slate-800 dark:text-slate-100">{p.nombre}</td>
                  <td className="px-5 py-3"><Badge color="blue">{p.rol}</Badge></td>
                  <td className="px-5 py-3">
                    <div className="flex flex-wrap gap-1">
                      {p.especialidades.map((e) => (
                        <Badge key={e} color="slate">{e}</Badge>
                      ))}
                      {p.especialidades.length === 0 && <span className="text-xs text-slate-400">—</span>}
                    </div>
                  </td>
                  <td className="px-5 py-3"><Badge color="green">{p.turnoPref}</Badge></td>
                </tr>
              ))}
            </tbody>
          </table>
          {personal.length === 0 && <EmptyState message="No hay colaboradores registrados" />}
        </div>
      </div>
    </div>
  );
}
