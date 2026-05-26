/** Contraseña de todos los usuarios de prueba */
export const SEED_PASSWORD_PLAIN = 'Test1234!';

export const barbershops = [
  {
    razon_social: 'Barbería BBS Centro',
    ubicacion: 'Av. Principal 123',
    ruc: '20123456789',
    cel_contacto: '999111222',
    correo: 'centro@bbs.local',
  },
];

export const barberos = [
  {
    nombre: 'Carlos',
    apellido: 'Mendoza',
    dni: '12345678',
    alias: 'carlos_cut',
    id_bbs: 1,
  },
  {
    nombre: 'Luis',
    apellido: 'Torres',
    dni: '87654321',
    alias: 'luis_fade',
    id_bbs: 1,
  },
];

export const permisos = [
  { codigo: 'RESERVAS_VER', nombre: 'Ver reservas' },
  { codigo: 'RESERVAS_EDITAR', nombre: 'Editar reservas' },
  { codigo: 'CLIENTES_VER', nombre: 'Ver clientes' },
  { codigo: 'CLIENTES_EDITAR', nombre: 'Editar clientes' },
  { codigo: 'DASHBOARD_VER', nombre: 'Ver dashboard' },
  { codigo: 'ALL', nombre: 'Acceso total' },
];

export const roles = [
  { codigo: 'ADMIN', nombre: 'Administrador' },
  { codigo: 'BB', nombre: 'Barbero' },
];

/** Códigos de permiso por rol */
export const rolPermisoCodigos: Record<string, string[]> = {
  ADMIN: ['ALL'],
  BB: [
    'RESERVAS_VER',
    'RESERVAS_EDITAR',
    'CLIENTES_VER',
    'CLIENTES_EDITAR',
    'DASHBOARD_VER',
  ],
};

export const menuItems = [
  {
    orden: 1,
    nombre: 'Dashboard',
    icono: 'dashboard',
    path: '/dashboard',
    permisoCodigo: 'DASHBOARD_VER',
    padreNombre: null as string | null,
  },
  {
    orden: 2,
    nombre: 'Reservas',
    icono: 'file',
    path: '/reservas',
    permisoCodigo: 'RESERVAS_VER',
    padreNombre: null,
  },
];

export const users = [
  { username: 'admin', id_bb: 1, rolCodigo: 'ADMIN' },
  { username: 'barbero1', id_bb: 1, rolCodigo: 'BB' },
  { username: 'barbero2', id_bb: 2, rolCodigo: 'BB' },
];

export const clientes = [
  {
    nombres: 'Juan',
    apellido: 'Pérez',
    telefono: '987654321',
    num_documento: '44556677',
    estado_cl: 1,
  },
  {
    nombres: 'María',
    apellido: 'García',
    telefono: '912345678',
    num_documento: '77889900',
    estado_cl: 1,
  },
];

export const horariosAtencion = [
  {
    id_bb: 1,
    fecha: '2026-05-20',
    hora_inicio: '09:00:00',
    hora_fin: '18:00:00',
    horas_ausencia_inicio: '13:00:00',
    horas_ausencia_fin: '14:00:00',
    tiempo_proceso: '00:30:00',
    estado_ha: 1,
  },
  {
    id_bb: 2,
    fecha: '2026-05-20',
    hora_inicio: '10:00:00',
    hora_fin: '14:00:00',
    horas_ausencia_inicio: null,
    horas_ausencia_fin: null,
    tiempo_proceso: '00:30:00',
    estado_ha: 1,
  },
];

/** Citas de ejemplo (algunas disponibles, una ocupada con cliente) */
export const citas = [
  {
    id_bb: 1,
    id_cliente: null,
    fecha_cita: '2026-05-20',
    hora_cita_inicio: '09:00:00',
    hora_cita_fin: '09:30:00',
    estado_cita: 1,
  },
  {
    id_bb: 1,
    id_cliente: null,
    fecha_cita: '2026-05-20',
    hora_cita_inicio: '09:30:00',
    hora_cita_fin: '10:00:00',
    estado_cita: 1,
  },
  {
    id_bb: 1,
    id_cliente: 1,
    fecha_cita: '2026-05-20',
    hora_cita_inicio: '10:00:00',
    hora_cita_fin: '10:30:00',
    estado_cita: 2,
  },
  {
    id_bb: 2,
    id_cliente: null,
    fecha_cita: '2026-05-20',
    hora_cita_inicio: '10:00:00',
    hora_cita_fin: '10:30:00',
    estado_cita: 1,
  },
];
