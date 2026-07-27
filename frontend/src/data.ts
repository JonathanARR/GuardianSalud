import type {
  Medicamento,
  Residente,
  Personal,
  AsignacionTurno,
  Dosis,
  BitacoraEntry,
  Presentacion,
  ViaAdmin,
  TurnoTipo,
} from './types';

export const seedMedicamentos: Medicamento[] = [
  {
    id: 'med-1',
    nombre: 'Insulina NPH',
    formula: 'Insulina isofana',
    concentracion: '100 UI/mL',
    presentacion: 'Frasco',
    via: 'Subcutánea/Intramuscular',
    stock: 12,
    createdAt: '2026-07-20T08:00:00Z',
  },
  {
    id: 'med-2',
    nombre: 'Paracetamol',
    formula: 'Acetaminofén',
    concentracion: '500 mg',
    presentacion: 'Blíster',
    via: 'Oral',
    stock: 48,
    createdAt: '2026-07-20T08:05:00Z',
  },
  {
    id: 'med-3',
    nombre: 'Losartán',
    formula: 'Losartán potásico',
    concentracion: '50 mg',
    presentacion: 'Caja',
    via: 'Oral',
    stock: 6,
    createdAt: '2026-07-20T08:10:00Z',
  },
  {
    id: 'med-4',
    nombre: 'Amoxicilina',
    formula: 'Amoxicilina',
    concentracion: '500 mg',
    presentacion: 'Caja',
    via: 'Oral',
    stock: 20,
    createdAt: '2026-07-21T09:00:00Z',
  },
  {
    id: 'med-5',
    nombre: 'Gotas Oftálmicas Lubricantes',
    formula: 'Hipromelosa',
    concentracion: '0.5%',
    presentacion: 'Frasco',
    via: 'Oftálmica',
    stock: 3,
    createdAt: '2026-07-21T09:30:00Z',
  },
];

export const seedResidentes: Residente[] = [
  {
    id: 'res-1',
    apodo: 'Abuelo Beto',
    habitacion: 'Mueble 12 - Cama A',
    condicion: 'Diabetes Tipo 2 + Hipertensión',
    dieta: 'Diabética/Hiposódica',
    alergias: 'Penicilina, AINEs',
    cuidados: 'Movilidad reducida, requiere asistencia para deambular',
    createdAt: '2026-07-19T07:00:00Z',
  },
  {
    id: 'res-2',
    apodo: 'Doña Carmen',
    habitacion: 'Mueble 08 - Cama B',
    condicion: 'Glaucoma bilateral',
    dieta: 'Blanda',
    alergias: 'Sulfas',
    cuidados: 'Requiere gotas oftálmicas cada 8 hrs',
    createdAt: '2026-07-19T07:30:00Z',
  },
  {
    id: 'res-3',
    apodo: 'Don Julio',
    habitacion: 'Mueble 05 - Cama A',
    condicion: 'Hipertensión arterial',
    dieta: 'Sólida regular',
    alergias: 'Ninguna conocida',
    cuidados: 'Independiente, camina solo',
    createdAt: '2026-07-19T08:00:00Z',
  },
  {
    id: 'res-4',
    apodo: 'RES-014',
    habitacion: 'Mueble 03 - Cama C',
    condicion: 'Post-operatorio de cadera',
    dieta: 'Blanda',
    alergias: 'Ibuprofeno, Dipirona',
    cuidados: 'Reposo absoluto, cambio de posición cada 2 hrs',
    createdAt: '2026-07-22T10:00:00Z',
  },
];

export const seedPersonal: Personal[] = [
  {
    id: 'per-1',
    nombre: 'Diego Pérez',
    rol: 'Enfermero(a)',
    especialidades: ['Inyectología', 'Paciente Crítico'],
    turnoPref: 'Matutino',
    createdAt: '2026-07-18T07:00:00Z',
  },
  {
    id: 'per-2',
    nombre: 'Ana Torres',
    rol: 'Cuidador(a)',
    especialidades: ['Toma de Signos Vitales'],
    turnoPref: 'Vespertino',
    createdAt: '2026-07-18T07:30:00Z',
  },
  {
    id: 'per-3',
    nombre: 'Dr. Luis Ramírez',
    rol: 'Médico',
    especialidades: ['Paciente Crítico', 'Inyectología'],
    turnoPref: 'Planta',
    createdAt: '2026-07-18T08:00:00Z',
  },
  {
    id: 'per-4',
    nombre: 'María Gómez',
    rol: 'Auxiliar',
    especialidades: ['Toma de Signos Vitales'],
    turnoPref: 'Nocturno',
    createdAt: '2026-07-18T08:30:00Z',
  },
];

export const seedAsignaciones: AsignacionTurno[] = [
  { id: 'asg-1', personalId: 'per-1', turno: 'Matutino', zona: 'Muebles 10-14', fecha: '2026-07-24' },
  { id: 'asg-2', personalId: 'per-2', turno: 'Vespertino', zona: 'Muebles 05-09', fecha: '2026-07-24' },
  { id: 'asg-3', personalId: 'per-4', turno: 'Nocturno', zona: 'Muebles 01-14', fecha: '2026-07-24' },
  { id: 'asg-4', personalId: 'per-3', turno: 'Planta', zona: 'Toda la planta', fecha: '2026-07-24' },
];

export const seedDosis: Dosis[] = [
  {
    id: 'dos-1',
    residenteId: 'res-1',
    medicamentoId: 'med-1',
    frecuencia: 'Cada 12 hrs',
    horaInicio: '07:00',
    cuidadorId: 'per-1',
    altaCriticidad: true,
    estado: 'pendiente',
    createdAt: '2026-07-24T06:00:00Z',
  },
  {
    id: 'dos-2',
    residenteId: 'res-1',
    medicamentoId: 'med-3',
    frecuencia: 'Cada 24 hrs',
    horaInicio: '08:00',
    cuidadorId: 'per-1',
    altaCriticidad: false,
    estado: 'aplicada',
    horaAplicada: '08:05',
    aplicadaPor: 'Diego Pérez',
    createdAt: '2026-07-24T06:30:00Z',
  },
  {
    id: 'dos-3',
    residenteId: 'res-2',
    medicamentoId: 'med-5',
    frecuencia: 'Cada 8 hrs',
    horaInicio: '07:30',
    cuidadorId: 'per-1',
    altaCriticidad: false,
    estado: 'pendiente',
    createdAt: '2026-07-24T06:45:00Z',
  },
  {
    id: 'dos-4',
    residenteId: 'res-3',
    medicamentoId: 'med-3',
    frecuencia: 'Cada 24 hrs',
    horaInicio: '08:00',
    cuidadorId: 'per-1',
    altaCriticidad: false,
    estado: 'aplicada',
    horaAplicada: '08:12',
    aplicadaPor: 'Diego Pérez',
    createdAt: '2026-07-24T07:00:00Z',
  },
  {
    id: 'dos-5',
    residenteId: 'res-4',
    medicamentoId: 'med-2',
    frecuencia: 'Cada 8 hrs',
    horaInicio: '09:00',
    cuidadorId: 'per-1',
    altaCriticidad: false,
    estado: 'pendiente',
    createdAt: '2026-07-24T07:15:00Z',
  },
];

export const seedBitacora: BitacoraEntry[] = [
  {
    id: 'bit-1',
    fecha: '2026-07-24',
    residenteId: 'res-1',
    medicamentoId: 'med-3',
    cuidadorId: 'per-1',
    estado: 'aplicada',
    hora: '08:05',
    nota: 'Tensión arterial 130/85 mmHg',
  },
  {
    id: 'bit-2',
    fecha: '2026-07-24',
    residenteId: 'res-3',
    medicamentoId: 'med-3',
    cuidadorId: 'per-1',
    estado: 'aplicada',
    hora: '08:12',
  },
  {
    id: 'bit-3',
    fecha: '2026-07-23',
    residenteId: 'res-2',
    medicamentoId: 'med-5',
    cuidadorId: 'per-2',
    estado: 'no-aplicada',
    hora: '19:30',
    nota: 'Residente dormido, se reprogramó para 22:00',
  },
  {
    id: 'bit-4',
    fecha: '2026-07-23',
    residenteId: 'res-1',
    medicamentoId: 'med-1',
    cuidadorId: 'per-1',
    estado: 'aplicada',
    hora: '07:02',
    nota: 'Glucemia capilar 145 mg/dL pre-dosis',
  },
  {
    id: 'bit-5',
    fecha: '2026-07-23',
    residenteId: 'res-4',
    medicamentoId: 'med-2',
    cuidadorId: 'per-4',
    estado: 'aplicada',
    hora: '23:00',
  },
];

export const CONDICIONES = [
  'Diabetes Tipo 2',
  'Hipertensión arterial',
  'Glaucoma bilateral',
  'Post-operatorio de cadera',
  'Enfermedad cardiovascular',
  'Demencia senil',
  'Otro / Especificar',
];

export const DIETAS = [
  'Sólida regular',
  'Blanda',
  'Diabética/Hiposódica',
  'Líquida completa',
  'Sonda enteral',
  'Otro / Especificar',
];

export const ROLES: Personal['rol'][] = ['Enfermero(a)', 'Cuidador(a)', 'Médico', 'Auxiliar'];
export const TURNOS: TurnoTipo[] = ['Matutino', 'Vespertino', 'Nocturno', 'Planta'];
export const ESPECIALIDADES_DISPONIBLES = [
  'Inyectología',
  'Toma de Signos Vitales',
  'Paciente Crítico',
  'Curaciones',
  'Reanimación',
];

export const PRESENTACIONES: Presentacion[] = ['Caja', 'Frasco', 'Blíster', 'Ampolleta', 'Jarabe'];
export const VIAS: ViaAdmin[] = ['Oral', 'Subcutánea/Intramuscular', 'Tópica', 'Oftálmica', 'Inhalada'];

export const FRECUENCIAS = ['Cada 4 hrs', 'Cada 6 hrs', 'Cada 8 hrs', 'Cada 12 hrs', 'Cada 24 hrs', 'Única dosis'];
