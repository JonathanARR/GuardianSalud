export type Theme = 'light' | 'dark';

export type MainTab = 'registros' | 'turnos' | 'dosis' | 'agenda' | 'bitacora';

export type Role = 'admin' | 'medico' | 'enfermero';

export interface AuthUser {
  nombre: string;
  email: string;
  role: Role;
}

export const ROLE_LABELS: Record<Role, string> = {
  admin: 'Administrador',
  medico: 'Médico',
  enfermero: 'Enfermero / Cuidador',
};

export const ROLE_TABS: Record<Role, MainTab[]> = {
  admin: ['registros', 'turnos', 'dosis', 'agenda', 'bitacora'],
  medico: ['turnos', 'dosis', 'bitacora'],
  enfermero: ['agenda'],
};

export type SubTabRegistros = 'medicamentos' | 'residentes' | 'personal';

export type Presentacion = 'Caja' | 'Frasco' | 'Blíster' | 'Ampolleta' | 'Jarabe';
export type ViaAdmin = 'Oral' | 'Subcutánea/Intramuscular' | 'Tópica' | 'Oftálmica' | 'Inhalada';

export interface Medicamento {
  id: string;
  nombre: string;
  formula: string;
  concentracion: string;
  presentacion: Presentacion;
  via: ViaAdmin;
  stock: number;
  createdAt: string;
}

export interface Residente {
  id: string;
  apodo: string;
  habitacion: string;
  condicion: string;
  dieta: string;
  alergias: string;
  cuidados: string;
  createdAt: string;
}

export type RolPersonal = 'Enfermero(a)' | 'Cuidador(a)' | 'Médico' | 'Auxiliar';
export type TurnoTipo = 'Matutino' | 'Vespertino' | 'Nocturno' | 'Planta';

export interface Personal {
  id: string;
  nombre: string;
  rol: RolPersonal;
  especialidades: string[];
  turnoPref: TurnoTipo;
  createdAt: string;
}

export interface AsignacionTurno {
  id: string;
  personalId: string;
  turno: TurnoTipo;
  zona: string;
  fecha: string;
}

export type EstadoDosis = 'pendiente' | 'aplicada' | 'no-aplicada';

export interface Dosis {
  id: string;
  residenteId: string;
  medicamentoId: string;
  frecuencia: string;
  horaInicio: string;
  cuidadorId: string;
  altaCriticidad: boolean;
  estado: EstadoDosis;
  horaAplicada?: string;
  aplicadaPor?: string;
  motivoOmision?: string;
  createdAt: string;
}

export interface BitacoraEntry {
  id: string;
  fecha: string;
  residenteId: string;
  medicamentoId: string;
  cuidadorId: string;
  estado: EstadoDosis;
  hora: string;
  nota?: string;
}
