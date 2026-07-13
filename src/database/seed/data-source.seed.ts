import 'dotenv/config';
import { DataSource } from 'typeorm';
import { UsuarioCredencialesEntity } from '../../modules/usuarios/entity/usuario-credenciales.entity';
import { UsuariosEntity } from '../../modules/usuarios/entity/usuarios.entity';
import { TipoUsuariosEntity } from '../../modules/usuarios/entity/tipo-usuarios.entity';
import { NegocioEntity } from '../../modules/negocio/entity/negocio.entity';
import { TipoNegocioEntity } from '../../modules/negocio/entity/tipo-negocio.entity';
import { ClienteEntity } from '../../modules/clientes/cliente/entity/cliente.entity';
import { RolEntity } from '../../modules/rbac/entity/rol.entity';
import { PermisoEntity } from '../../modules/rbac/entity/permiso.entity';
import { RolPermisoEntity } from '../../modules/rbac/entity/rol-permiso.entity';
import { UsuarioRolEntity } from '../../modules/rbac/entity/usuario-rol.entity';
import { MenuEntity } from '../../modules/rbac/entity/menu.entity';
import { PadreMenuEntity } from '../../modules/rbac/entity/padre_menu.entity';
import { HorarioAtencionEntity } from '../../modules/horario_atencion/entity/horario_atencion.entity';
import { BloqueosHorarioEntity } from '../../modules/horario_atencion/entity/bloqueos_horario.entity';
import { CitasEntity } from '../../modules/citas/entity/citas.entity';
import { ConversacionEntity } from '../../modules/chat/entity/conversacion.entity';
import { PlanEntity } from '../../modules/plan/entity/plan.entity';
import { NegocioPlanEntity } from '../../modules/plan/entity/negocio_plan.entity';
import { PlanPermisoEntity } from '../../modules/plan/entity/plan_permiso.entity';
import { PagosEntity } from '../../modules/plan/entity/pagos.entity';
import { ServiciosEntity } from '../../modules/servicio_negocio/entity/servicios.entity';
import { ServicioNegocioEntity } from '../../modules/servicio_negocio/entity/servicio_negocio.entity';

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
      RolEntity,
      PermisoEntity,
      RolPermisoEntity,
      UsuarioRolEntity,
      PadreMenuEntity,
      MenuEntity,
      ClienteEntity,
      ConversacionEntity,
      HorarioAtencionEntity,
      BloqueosHorarioEntity,
      CitasEntity,
      PlanEntity,
      NegocioPlanEntity,
      PlanPermisoEntity,
      PagosEntity,
      ServiciosEntity,
      ServicioNegocioEntity,
    ],
    synchronize: false,
  });
}
