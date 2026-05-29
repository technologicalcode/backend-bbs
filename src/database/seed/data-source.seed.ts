import 'dotenv/config';
import { DataSource } from 'typeorm';
import { UsuarioCredencialesEntity } from '../../modules/usuarios/entity/usuario-credenciales.entity';
import { UsuariosEntity } from '../../modules/usuarios/entity/usuarios.entity';
import { TipoUsuariosEntity } from '../../modules/usuarios/entity/tipo-usuarios.entity';
import { NegocioEntity } from '../../modules/negocio/entity/negocio.entity';
import { TipoNegocioEntity } from '../../modules/negocio/tipo-negocio/entity/tipo-negocio.entity';
import { ClienteEntity } from '../../modules/clientes/cliente/entity/cliente.entity';
import { RolEntity } from '../../modules/rbac/entity/rol.entity';
import { PermisoEntity } from '../../modules/rbac/entity/permiso.entity';
import { RolPermisoEntity } from '../../modules/rbac/entity/rol-permiso.entity';
import { UsuarioRolEntity } from '../../modules/rbac/entity/usuario-rol.entity';
import { MenuItemEntity } from '../../modules/rbac/entity/menu-item.entity';
import { HorarioAtencionEntity } from '../../modules/horario_atencion/entity/horario_atencion.entity';
import { CitasEntity } from '../../modules/citas/entity/citas.entity';

const LOCAL_DATABASE_URL = 'postgresql://postgres:postgres@127.0.0.1:5432/bbs';

export function createSeedDataSource(): DataSource {
  const url =
    process.env.DATABASE_URL?.trim() ||
    (process.env.NODE_ENV !== 'production' ? LOCAL_DATABASE_URL : '');

  if (!url) {
    throw new Error('DATABASE_URL es obligatoria para ejecutar la semilla.');
  }

  return new DataSource({
    type: 'postgres',
    url,
    entities: [
      TipoNegocioEntity,
      NegocioEntity,
      TipoUsuariosEntity,
      UsuariosEntity,
      UsuarioCredencialesEntity,
      ClienteEntity,
      RolEntity,
      PermisoEntity,
      RolPermisoEntity,
      UsuarioRolEntity,
      MenuItemEntity,
      HorarioAtencionEntity,
      CitasEntity,
    ],
    synchronize: false,
  });
}
