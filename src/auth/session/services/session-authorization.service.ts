import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import type { RolEntity } from 'src/modules/rbac/entity/rol.entity';
import { PermisoEntity } from 'src/modules/rbac/entity/permiso.entity';
import { RolPermisoEntity } from 'src/modules/rbac/entity/rol-permiso.entity';
import { UsuarioRolEntity } from 'src/modules/rbac/entity/usuario-rol.entity';
import type { SessionPermisoDto, SessionRolDto } from '../session.interface';

const ALL_CODIGO = 'ALL';

@Injectable()
export class SessionAuthorizationService {
  constructor(
    @InjectRepository(PermisoEntity)
    private readonly permisoRepo: Repository<PermisoEntity>,
    @InjectRepository(RolPermisoEntity)
    private readonly rolPermisoRepo: Repository<RolPermisoEntity>,
    @InjectRepository(UsuarioRolEntity)
    private readonly usuarioRolRepo: Repository<UsuarioRolEntity>,
  ) {}

  async resolveRolesAndPermisos(idUser: number): Promise<{
    roles: SessionRolDto[];
    permisos: SessionPermisoDto[];
    allowedPermisoIds: Set<number>;
  }> {
    const usuarioRoles = await this.usuarioRolRepo.find({
      where: { usuario: { id_usuario_credencial: idUser } },
      relations: ['rol'],
    });

    const rolMap = new Map<number, RolEntity>();
    for (const ur of usuarioRoles) {
      if (ur.rol) {
        rolMap.set(ur.rol.id_rol, ur.rol);
      }
    }
    const roles = [...rolMap.values()];
    const roleIds = roles.map((r) => r.id_rol);

    let permisosEntities: PermisoEntity[] = [];
    if (roleIds.length > 0) {
      const rps = await this.rolPermisoRepo.find({
        where: { rol: { id_rol: In(roleIds) } },
        relations: ['permiso'],
      });
      const pMap = new Map<number, PermisoEntity>();
      for (const rp of rps) {
        if (rp.permiso) {
          pMap.set(rp.permiso.id_permiso, rp.permiso);
        }
      }
      permisosEntities = [...pMap.values()];
    }

    const hasAll = permisosEntities.some(
      (p) => p.codigo.trim().toUpperCase() === ALL_CODIGO,
    );
    if (hasAll) {
      permisosEntities = await this.permisoRepo.find({
        order: { codigo: 'ASC' },
      });
    }

    const rolesDto: SessionRolDto[] = roles.map((r) => ({
      id_rol: r.id_rol,
      codigo: r.codigo,
      nombre: r.nombre,
    }));

    const permisosDto: SessionPermisoDto[] = permisosEntities.map((p) => ({
      id_permiso: p.id_permiso,
      codigo: p.codigo,
      nombre: p.nombre,
    }));

    const allowedPermisoIds = new Set(
      permisosEntities.map((p) => p.id_permiso),
    );

    return { roles: rolesDto, permisos: permisosDto, allowedPermisoIds };
  }
}
