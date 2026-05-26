import 'dotenv/config';
import { hash } from 'bcrypt';
import { createSeedDataSource } from './data-source.seed';
import {
  SEED_PASSWORD_PLAIN,
  barberos,
  barbershops,
  citas,
  clientes,
  horariosAtencion,
  menuItems,
  permisos,
  rolPermisoCodigos,
  roles,
  users,
} from './seed.data';
import { BarbershopEntity } from '../../modules/barbershop/entity/barbershop.entity';
import { BarberoEntity } from '../../modules/barbero/entity/barbero.entity';
import { PermisoEntity } from '../../modules/rbac/entity/permiso.entity';
import { RolEntity } from '../../modules/rbac/entity/rol.entity';
import { RolPermisoEntity } from '../../modules/rbac/entity/rol-permiso.entity';
import { MenuItemEntity } from '../../modules/rbac/entity/menu-item.entity';
import { UserEntity } from '../../auth/user/entity/user.entity';
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

async function clearTables(): Promise<void> {
  const ds = createSeedDataSource();
  await ds.initialize();
  try {
    await ds.query(`
      TRUNCATE TABLE
        citas,
        horarios_atencion,
        usuario_rol,
        rol_permiso,
        menu,
        users,
        clientes,
        barbero,
        permiso,
        rol,
        barbershop
      RESTART IDENTITY CASCADE
    `);
    console.log('Tablas vaciadas (RESTART IDENTITY).');
  } finally {
    await ds.destroy();
  }
}

async function runSeed(): Promise<void> {
  assertSafeToRun();

  if (process.env.SEED_CLEAR !== 'false') {
    await clearTables();
  }

  const dataSource = createSeedDataSource();
  await dataSource.initialize();

  try {
    const passwordHash = await hash(SEED_PASSWORD_PLAIN, 10);

    const bbsRepo = dataSource.getRepository(BarbershopEntity);
    const savedBbs = await bbsRepo.save(bbsRepo.create(barbershops));
    console.log(`Barbershop: ${savedBbs.length} registro(s)`);

    const bbRepo = dataSource.getRepository(BarberoEntity);
    const savedBb = await bbRepo.save(bbRepo.create(barberos));
    console.log(`Barberos: ${savedBb.length} registro(s)`);

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

    const menuRepo = dataSource.getRepository(MenuItemEntity);
    const menuRows = menuItems.map((m) => {
      const permiso = m.permisoCodigo
        ? (permisoByCodigo.get(m.permisoCodigo) ?? null)
        : null;
      return menuRepo.create({
        orden: m.orden,
        nombre: m.nombre,
        icono: m.icono,
        path: m.path,
        permiso,
        padre: null,
      });
    });
    await menuRepo.save(menuRows);
    console.log(`Menú: ${menuRows.length} registro(s)`);

    const userRepo = dataSource.getRepository(UserEntity);
    const usuarioRolRepo = dataSource.getRepository(UsuarioRolEntity);
    for (const u of users) {
      const user = await userRepo.save(
        userRepo.create({
          username: u.username,
          password: passwordHash,
          id_bb: u.id_bb,
        }),
      );
      const rol = rolByCodigo.get(u.rolCodigo);
      if (rol) {
        await usuarioRolRepo.save(
          usuarioRolRepo.create({ usuario: user, rol }),
        );
      }
    }
    console.log(
      `Usuarios: ${users.length} (contraseña: ${SEED_PASSWORD_PLAIN})`,
    );

    const clienteRepo = dataSource.getRepository(ClienteEntity);
    await clienteRepo.save(clienteRepo.create(clientes));
    console.log(`Clientes: ${clientes.length} registro(s)`);

    const horarioRepo = dataSource.getRepository(HorarioAtencionEntity);
    const horarioRows = horariosAtencion.map((h) =>
      horarioRepo.create({
        ...h,
        fecha: new Date(h.fecha),
        horas_ausencia_inicio: h.horas_ausencia_inicio,
        horas_ausencia_fin: h.horas_ausencia_fin,
      }),
    );
    await horarioRepo.save(horarioRows);
    console.log(`Horarios atención: ${horarioRows.length} registro(s)`);

    const citaRepo = dataSource.getRepository(CitasEntity);
    const citaRows = citas.map((c) =>
      citaRepo.create({
        ...c,
        fecha_cita: new Date(c.fecha_cita),
      }),
    );
    await citaRepo.save(citaRows);
    console.log(`Citas: ${citaRows.length} registro(s)`);

    console.log('\nSemilla completada.');
    console.log('Login de prueba: admin / barbero1 / barbero2');
    console.log(`Contraseña: ${SEED_PASSWORD_PLAIN}`);
  } finally {
    await dataSource.destroy();
  }
}

runSeed().catch((err: unknown) => {
  console.error('Error en semilla:', err);
  process.exit(1);
});
