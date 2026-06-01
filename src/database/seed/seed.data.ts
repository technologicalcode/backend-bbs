/** Contraseña de todos los usuarios de prueba */
export const SEED_PASSWORD_PLAIN = 'Test1234!';

export const tiposNegocio = [
  { key: 'barberia', descripcion: 'Barbería' },
  { key: 'spa', descripcion: 'Spa y bienestar' },
  { key: 'estetica', descripcion: 'Centro de estética' },
];

export const negocios = [
  {
    key: 'bbs-centro',
    descripcion: 'BBS Barbería Centro',
    ruc: '20123456789',
    direccion: 'Av. Principal 123, Lima',
    telefono: '999111222',
    correo: 'centro@bbs.local',
    tipoNegocioKey: 'barberia',
    encargadoKey: 'admin',
  },
  {
    key: 'bbs-norte',
    descripcion: 'BBS Barbería Norte',
    ruc: '20987654321',
    direccion: 'Jr. Los Olivos 456',
    telefono: '988777666',
    correo: 'norte@bbs.local',
    tipoNegocioKey: 'barberia',
    encargadoKey: 'recepcion-norte',
  },
  {
    key: 'spa-relax',
    descripcion: 'Spa Relax BBS',
    ruc: '20444555666',
    direccion: 'Calle Las Flores 78',
    telefono: '955444333',
    correo: 'spa@bbs.local',
    tipoNegocioKey: 'spa',
    encargadoKey: 'admin-spa',
  },
];

export const tiposUsuario = [
  { key: 'admin', descripcion: 'Administrador' },
  { key: 'barbero', descripcion: 'Barbero / especialista' },
  { key: 'recepcion', descripcion: 'Recepción' },
];

export const usuarios = [
  {
    key: 'admin',
    nombre: 'Ana',
    apellido: 'Ríos',
    email: 'admin@bbs.local',
    telefono: '900000001',
    tipoUsuarioKey: 'admin',
    negocioKey: 'bbs-centro',
  },
  {
    key: 'barbero1',
    nombre: 'Carlos',
    apellido: 'Mendoza',
    email: 'carlos.mendoza@bbs.local',
    telefono: '900000002',
    tipoUsuarioKey: 'barbero',
    negocioKey: 'bbs-centro',
  },
  {
    key: 'barbero2',
    nombre: 'Luis',
    apellido: 'Torres',
    email: 'luis.torres@bbs.local',
    telefono: '900000003',
    tipoUsuarioKey: 'barbero',
    negocioKey: 'bbs-centro',
  },
  {
    key: 'recepcion-norte',
    nombre: 'Patricia',
    apellido: 'Vega',
    email: 'recepcion.norte@bbs.local',
    telefono: '900000004',
    tipoUsuarioKey: 'recepcion',
    negocioKey: 'bbs-norte',
  },
  {
    key: 'barbero-norte',
    nombre: 'Miguel',
    apellido: 'Soto',
    email: 'miguel.soto@bbs.local',
    telefono: '900000005',
    tipoUsuarioKey: 'barbero',
    negocioKey: 'bbs-norte',
  },
  {
    key: 'admin-spa',
    nombre: 'Laura',
    apellido: 'Campos',
    email: 'laura.campos@bbs.local',
    telefono: '900000006',
    tipoUsuarioKey: 'admin',
    negocioKey: 'spa-relax',
  },
];

/** Credenciales de acceso (login) vinculadas a `usuarios` por `usuarioKey` */
export const credenciales = [
  { username: 'admin', usuarioKey: 'admin', rolCodigo: 'ADMIN' },
  { username: 'barbero1', usuarioKey: 'barbero1', rolCodigo: 'BB' },
  { username: 'barbero2', usuarioKey: 'barbero2', rolCodigo: 'BB' },
  { username: 'recepcion.norte', usuarioKey: 'recepcion-norte', rolCodigo: 'BB' },
  { username: 'miguel.soto', usuarioKey: 'barbero-norte', rolCodigo: 'BB' },
  { username: 'admin.spa', usuarioKey: 'admin-spa', rolCodigo: 'ADMIN' },
];

export const permisos = [
  { codigo: 'RESERVAS_VER', descripcion: 'Ver reservas', modulo: 'reservas' },
  { codigo: 'RESERVAS_EDITAR', descripcion: 'Editar reservas', modulo: 'reservas' },
  { codigo: 'CLIENTES_VER', descripcion: 'Ver clientes', modulo: 'clientes' },
  { codigo: 'CLIENTES_EDITAR', descripcion: 'Editar clientes', modulo: 'clientes' },
  { codigo: 'DASHBOARD_VER', descripcion: 'Ver dashboard', modulo: 'dashboard' },
  { codigo: 'ALL', descripcion: 'Acceso total', modulo: 'sistema' },
];

export const roles = [
  { codigo: 'ADMIN', descripcion: 'Administrador' },
  { codigo: 'BB', descripcion: 'Barbero' },
];

export const padresMenu = [
  { key: 'principal', descripcion: 'Principal' },
  { key: 'operaciones', descripcion: 'Operaciones' },
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
    padreMenuKey: 'principal',
    orden: 1,
    descripcion: 'Dashboard',
    icono: 'dashboard',
    path: '/dashboard',
    permisoCodigo: 'DASHBOARD_VER',
  },
  {
    padreMenuKey: 'operaciones',
    orden: 1,
    descripcion: 'Reservas',
    icono: 'file',
    path: '/reservas',
    permisoCodigo: 'RESERVAS_VER',
  },
  {
    padreMenuKey: 'operaciones',
    orden: 2,
    descripcion: 'Clientes',
    icono: 'users',
    path: '/clientes',
    permisoCodigo: 'CLIENTES_VER',
  },
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
  {
    nombres: 'Pedro',
    apellido: 'López',
    telefono: '956781234',
    num_documento: '33445566',
    estado_cl: 1,
  },
];

export const horariosAtencion = [
  {
    usuarioKey: 'barbero1',
    fecha: '2026-05-20',
    hora_inicio: '09:00:00',
    hora_fin: '18:00:00',
    horas_ausencia_inicio: '13:00:00',
    horas_ausencia_fin: '14:00:00',
    tiempo_proceso: '00:30:00',
    estado_ha: 1,
  },
  {
    usuarioKey: 'barbero2',
    fecha: '2026-05-20',
    hora_inicio: '10:00:00',
    hora_fin: '14:00:00',
    horas_ausencia_inicio: null,
    horas_ausencia_fin: null,
    tiempo_proceso: '00:30:00',
    estado_ha: 1,
  },
  {
    usuarioKey: 'barbero-norte',
    fecha: '2026-05-21',
    hora_inicio: '11:00:00',
    hora_fin: '19:00:00',
    horas_ausencia_inicio: '14:00:00',
    horas_ausencia_fin: '15:00:00',
    tiempo_proceso: '00:45:00',
    estado_ha: 1,
  },
];

/** Citas de ejemplo (algunas disponibles, una ocupada con cliente) */
export const citas = [
  {
    usuarioKey: 'barbero1',
    id_cliente: null,
    fecha_cita: '2026-05-20',
    hora_cita_inicio: '09:00:00',
    hora_cita_fin: '09:30:00',
    estado_cita: 1,
  },
  {
    usuarioKey: 'barbero1',
    id_cliente: null,
    fecha_cita: '2026-05-20',
    hora_cita_inicio: '09:30:00',
    hora_cita_fin: '10:00:00',
    estado_cita: 1,
  },
  {
    usuarioKey: 'barbero1',
    id_cliente: 1,
    fecha_cita: '2026-05-20',
    hora_cita_inicio: '10:00:00',
    hora_cita_fin: '10:30:00',
    estado_cita: 2,
  },
  {
    usuarioKey: 'barbero2',
    id_cliente: null,
    fecha_cita: '2026-05-20',
    hora_cita_inicio: '10:00:00',
    hora_cita_fin: '10:30:00',
    estado_cita: 1,
  },
  {
    usuarioKey: 'barbero-norte',
    id_cliente: 2,
    fecha_cita: '2026-05-21',
    hora_cita_inicio: '11:00:00',
    hora_cita_fin: '11:45:00',
    estado_cita: 2,
  },
];
