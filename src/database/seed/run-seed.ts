import 'dotenv/config';
import { hash } from 'bcrypt';
import { createSeedDataSource } from './data-source.seed';
import {
  SEED_PASSWORD_PLAIN,
  citas,
  clientes,
  credenciales,
  horariosAtencion,
  menuItems,
  padresMenu,
  negocios,
  permisos,
  rolPermisoCodigos,
  roles,
  tiposNegocio,
  tiposUsuario,
  usuarios,
} from './seed.data';
import { TipoNegocioEntity } from '../../modules/negocio/entity/tipo-negocio.entity';
import { NegocioEntity } from '../../modules/negocio/entity/negocio.entity';
import { TipoUsuariosEntity } from '../../modules/usuarios/entity/tipo-usuarios.entity';
import { UsuariosEntity } from '../../modules/usuarios/entity/usuarios.entity';
import { UsuarioCredencialesEntity } from '../../modules/usuarios/entity/usuario-credenciales.entity';
import { PermisoEntity } from '../../modules/rbac/entity/permiso.entity';
import { RolEntity } from '../../modules/rbac/entity/rol.entity';
import { RolPermisoEntity } from '../../modules/rbac/entity/rol-permiso.entity';
import { MenuEntity } from '../../modules/rbac/entity/menu.entity';
import { PadreMenuEntity } from '../../modules/rbac/entity/padre_menu.entity';
import { UsuarioRolEntity } from '../../modules/rbac/entity/usuario-rol.entity';
import { ClienteEntity } from '../../modules/clientes/cliente/entity/cliente.entity';
import { HorarioAtencionEntity } from '../../modules/horario_atencion/entity/horario_atencion.entity';
import { CitasEntity } from '../../modules/citas/entity/citas.entity';

function assertSafeToRun(): void {
  if (
    process.env.NODE_ENV === 'production' &&
    process.env.SEED_FORCE !== 'true'
  ) {
    throw new Error(
      'Semilla bloqueada en producción. Usa SEED_FORCE=true solo si estás seguro.',
    );
  }
}

const SEED_TABLES_ORDER = [
  'pagos',
  'plan_permiso',
  'negocio_plan',
  'plan',
  'citas',
  'conversacion_wsp',
  'bloqueos_horario',
  'horarios_atencion',
  'usuario_rol',
  'rol_permiso',
  'menu',
  'padre_menu',
  'usuario_credenciales',
  'users',
  'usuarios',
  'negocio',
  'tipo_negocio',
  'tipo_usuarios',
  'clientes',
  'permiso',
  'rol',
];

async function clearTables(ds: Awaited<ReturnType<typeof createSeedDataSource>>): Promise<void> {
  const rows: { tablename: string }[] = await ds.query(
    `SELECT tablename FROM pg_tables
     WHERE schemaname = 'public' AND tablename = ANY($1)`,
    [SEED_TABLES_ORDER],
  );
  const existing = SEED_TABLES_ORDER.filter((t) =>
    rows.some((r) => r.tablename === t),
  );
  if (existing.length === 0) {
    console.log('No hay tablas que vaciar.');
    return;
  }
  await ds.query(
    `TRUNCATE TABLE ${existing.join(', ')} RESTART IDENTITY CASCADE`,
  );
  console.log(`Tablas vaciadas: ${existing.join(', ')}`);
}

async function runSeed(): Promise<void> {
  assertSafeToRun();

  const dataSource = createSeedDataSource();
  await dataSource.initialize();

  if (process.env.SEED_CLEAR !== 'false') {
    await clearTables(dataSource);
  }

  await dataSource.synchronize();
  console.log('Esquema sincronizado.');

  try {
    const passwordHash = await hash(SEED_PASSWORD_PLAIN, 10);

    const tipoNegocioRepo = dataSource.getRepository(TipoNegocioEntity);
    const savedTiposNegocio = await tipoNegocioRepo.save(
      tipoNegocioRepo.create(
        tiposNegocio.map((t) => ({ descripcion: t.descripcion })),
      ),
    );
    const tipoNegocioByKey = new Map(
      tiposNegocio.map((t, i) => [t.key, savedTiposNegocio[i]]),
    );
    console.log(`Tipos de negocio: ${savedTiposNegocio.length} registro(s)`);

    const negocioRepo = dataSource.getRepository(NegocioEntity);
    const savedNegocios: NegocioEntity[] = [];
    for (const n of negocios) {
      const tipo = tipoNegocioByKey.get(n.tipoNegocioKey);
      if (!tipo) continue;
      savedNegocios.push(
        await negocioRepo.save(
          negocioRepo.create({
            descripcion: n.descripcion,
            ruc: n.ruc,
            direccion: n.direccion,
            telefono: n.telefono,
            correo: n.correo,
            id_tipo_negocio: tipo.id_tipo_negocio,
            encargado_negocio: 1,
          }),
        ),
      );
    }
    const negocioByKey = new Map(
      negocios.map((n, i) => [n.key, savedNegocios[i]]),
    );
    console.log(`Negocios: ${savedNegocios.length} registro(s)`);

    const tipoUsuarioRepo = dataSource.getRepository(TipoUsuariosEntity);
    const savedTiposUsuario = await tipoUsuarioRepo.save(
      tipoUsuarioRepo.create(
        tiposUsuario.map((t) => ({ descripcion: t.descripcion })),
      ),
    );
    const tipoUsuarioByKey = new Map(
      tiposUsuario.map((t, i) => [t.key, savedTiposUsuario[i]]),
    );
    console.log(`Tipos de usuario: ${savedTiposUsuario.length} registro(s)`);

    const usuariosRepo = dataSource.getRepository(UsuariosEntity);
    const usuarioByKey = new Map<string, UsuariosEntity>();
    for (const u of usuarios) {
      const tipo = tipoUsuarioByKey.get(u.tipoUsuarioKey);
      const negocio = negocioByKey.get(u.negocioKey);
      if (!tipo || !negocio) continue;
      const saved = await usuariosRepo.save(
        usuariosRepo.create({
          nombre: u.nombre,
          apellido: u.apellido,
          email: u.email,
          telefono: u.telefono,
          tipo_usuario: tipo,
          negocio,
        }),
      );
      usuarioByKey.set(u.key, saved);
    }
    console.log(`Usuarios: ${usuarioByKey.size} registro(s)`);

    for (const n of negocios) {
      const negocio = negocioByKey.get(n.key);
      const encargado = usuarioByKey.get(n.encargadoKey);
      if (!negocio || !encargado) continue;
      negocio.encargado_negocio = encargado.id_usuario;
      await negocioRepo.save(negocio);
    }
    console.log('Encargados de negocio actualizados.');

    const permisoRepo = dataSource.getRepository(PermisoEntity);
    const savedPermisos = await permisoRepo.save(permisoRepo.create(permisos));
    const permisoByCodigo = new Map(savedPermisos.map((p) => [p.codigo, p]));
    console.log(`Permisos: ${savedPermisos.length} registro(s)`);

    const rolRepo = dataSource.getRepository(RolEntity);
    const savedRoles = await rolRepo.save(rolRepo.create(roles));
    const rolByCodigo = new Map(savedRoles.map((r) => [r.codigo, r]));
    console.log(`Roles: ${savedRoles.length} registro(s)`);

    const rolPermisoRepo = dataSource.getRepository(RolPermisoEntity);
    const rolPermisoRows: RolPermisoEntity[] = [];
    for (const [rolCodigo, codigos] of Object.entries(rolPermisoCodigos)) {
      const rol = rolByCodigo.get(rolCodigo);
      if (!rol) continue;
      for (const codigo of codigos) {
        const permiso = permisoByCodigo.get(codigo);
        if (!permiso) continue;
        rolPermisoRows.push(rolPermisoRepo.create({ rol, permiso }));
      }
    }
    await rolPermisoRepo.save(rolPermisoRows);
    console.log(`Rol-permiso: ${rolPermisoRows.length} registro(s)`);

    const padreMenuRepo = dataSource.getRepository(PadreMenuEntity);
    const savedPadresMenu = await padreMenuRepo.save(
      padreMenuRepo.create(
        padresMenu.map((p) => ({ descripcion: p.descripcion })),
      ),
    );
    const padreMenuByKey = new Map(
      padresMenu.map((p, i) => [p.key, savedPadresMenu[i]]),
    );
    console.log(`Padres menú: ${savedPadresMenu.length} registro(s)`);

    const menuRepo = dataSource.getRepository(MenuEntity);
    const menuRows = menuItems.flatMap((m) => {
      const padre_menu = padreMenuByKey.get(m.padreMenuKey);
      if (!padre_menu) return [];
      const permiso = m.permisoCodigo
        ? (permisoByCodigo.get(m.permisoCodigo) ?? null)
        : null;
      return [
        menuRepo.create({
          descripcion: m.descripcion,
          orden: m.orden,
          icono: m.icono,
          path: m.path,
          permiso,
          padre_menu,
        }),
      ];
    });
    await menuRepo.save(menuRows);
    console.log(`Menú: ${menuRows.length} registro(s)`);

    const credencialesRepo = dataSource.getRepository(UsuarioCredencialesEntity);
    const usuarioRolRepo = dataSource.getRepository(UsuarioRolEntity);

    for (const c of credenciales) {
      const usuario = usuarioByKey.get(c.usuarioKey);
      if (!usuario) {
        console.warn(
          `Credencial ${c.username}: usuario "${c.usuarioKey}" no encontrado`,
        );
        continue;
      }
      await credencialesRepo.save(
        credencialesRepo.create({
          username: c.username,
          password_hash: passwordHash,
          id_usuario: usuario.id_usuario,
        }),
      );
      const rol = rolByCodigo.get(c.rolCodigo);
      if (rol) {
        const dup = await usuarioRolRepo.findOne({
          where: {
            usuario: { id_usuario: usuario.id_usuario },
            rol: { id_rol: rol.id_rol },
          },
        });
        if (!dup) {
          await usuarioRolRepo.save(
            usuarioRolRepo.create({ usuario, rol }),
          );
        }
      }
    }
    console.log(
      `Credenciales: ${credenciales.length} (contraseña: ${SEED_PASSWORD_PLAIN})`,
    );

    const clienteRepo = dataSource.getRepository(ClienteEntity);
    await clienteRepo.save(clienteRepo.create(clientes));
    console.log(`Clientes: ${clientes.length} registro(s)`);

    const horarioRepo = dataSource.getRepository(HorarioAtencionEntity);
    const horarioRows = horariosAtencion.flatMap((h) => {
      const usuario = usuarioByKey.get(h.usuarioKey);
      if (!usuario) return [];
      return [
        horarioRepo.create({
          id_usuario: usuario.id_usuario,
          fecha: new Date(h.fecha),
          hora_inicio: h.hora_inicio,
          hora_fin: h.hora_fin,
          horas_ausencia_inicio: h.horas_ausencia_inicio,
          horas_ausencia_fin: h.horas_ausencia_fin,
          tiempo_proceso: h.tiempo_proceso,
          estado_ha: h.estado_ha,
        }),
      ];
    });
    await horarioRepo.save(horarioRows);
    console.log(`Horarios atención: ${horarioRows.length} registro(s)`);

    const citaRepo = dataSource.getRepository(CitasEntity);
    const citaRows = citas.flatMap((c) => {
      const usuario = usuarioByKey.get(c.usuarioKey);
      if (!usuario) return [];
      return [
        citaRepo.create({
          id_usuario: usuario.id_usuario,
          id_cliente: c.id_cliente,
          fecha_cita: new Date(c.fecha_cita),
          hora_cita_inicio: c.hora_cita_inicio,
          hora_cita_fin: c.hora_cita_fin,
          estado_cita: c.estado_cita,
        }),
      ];
    });
    await citaRepo.save(citaRows);
    console.log(`Citas: ${citaRows.length} registro(s)`);

    console.log('\nSemilla completada.');
    console.log('Logins de prueba:');
    for (const c of credenciales) {
      console.log(`  - ${c.username} (${c.rolCodigo})`);
    }
    console.log(`Contraseña: ${SEED_PASSWORD_PLAIN}`);
  } finally {
    await dataSource.destroy();
  }
}

runSeed().catch((err: unknown) => {
  console.error('Error en semilla:', err);
  process.exit(1);
});
