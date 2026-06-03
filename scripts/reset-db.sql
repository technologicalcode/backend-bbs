-- Vacía tablas de desarrollo (orden: hijos antes que padres vía CASCADE)
TRUNCATE TABLE
  pagos,
  plan_permiso,
  negocio_plan,
  plan,
  citas,
  conversacion_wsp,
  bloqueos_horario,
  horarios_atencion,
  usuario_rol,
  rol_permiso,
  menu,
  padre_menu,
  usuario_credenciales,
  usuarios,
  negocio,
  tipo_negocio,
  tipo_usuarios,
  clientes,
  permiso,
  rol
RESTART IDENTITY CASCADE;

-- Columnas legacy de horarios_atencion (si aún existen)
ALTER TABLE horarios_atencion DROP COLUMN IF EXISTS horas_ausencia_inicio;
ALTER TABLE horarios_atencion DROP COLUMN IF EXISTS horas_ausencia_fin;
ALTER TABLE horarios_atencion DROP COLUMN IF EXISTS tiempo_proceso;
