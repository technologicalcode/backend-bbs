import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { ApiResponse } from 'src/core/interface/api-response';
import { UserEntity } from 'src/auth/user/entity/user.entity';
import type { RolEntity } from 'src/modules/rbac/entity/rol.entity';
import { PermisoEntity } from 'src/modules/rbac/entity/permiso.entity';
import { RolPermisoEntity } from 'src/modules/rbac/entity/rol-permiso.entity';
import { UsuarioRolEntity } from 'src/modules/rbac/entity/usuario-rol.entity';
import { MenuItemEntity } from 'src/modules/rbac/entity/menu-item.entity';
import type { LoginPayload } from 'src/auth/login/interface/login.interface';
import type {
  SessionData,
  SessionMenuNode,
  SessionPermisoDto,
  SessionRolDto,
  SessionUserDto,
} from './session.interface';

const ALL_CODIGO = 'ALL';

@Injectable()
export class SessionService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
    @InjectRepository(PermisoEntity)
    private readonly permisoRepo: Repository<PermisoEntity>,
    @InjectRepository(RolPermisoEntity)
    private readonly rolPermisoRepo: Repository<RolPermisoEntity>,
    @InjectRepository(UsuarioRolEntity)
    private readonly usuarioRolRepo: Repository<UsuarioRolEntity>,
    @InjectRepository(MenuItemEntity)
    private readonly menuRepo: Repository<MenuItemEntity>,
  ) {}

  async getSession(payload: LoginPayload): Promise<ApiResponse> {
    const user = await this.userRepo.findOne({
      where: { id_user: payload.id_user },
      select: ['id_user', 'username', 'id_bb'],
    });
    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }

    const usuarioRoles = await this.usuarioRolRepo.find({
      where: { usuario: { id_user: payload.id_user } },
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

    const allowedPermisoIds = new Set(
      permisosEntities.map((p) => p.id_permiso),
    );

    const allMenus = await this.menuRepo.find({
      relations: ['padre', 'permiso'],
      order: { orden: 'ASC' },
    });

    const filteredMenus = allMenus.filter((m) => {
      if (m.permiso == null) {
        return true;
      }
      return allowedPermisoIds.has(m.permiso.id_permiso);
    });

    const menu = this.buildMenuTree(filteredMenus);

    const data: SessionData = {
      user: this.toUserDto(user),
      roles: roles.map((r) => this.toRolDto(r)),
      permisos: permisosEntities.map((p) => this.toPermisoDto(p)),
      menu,
    };

    return {
      status: true,
      message: 'Sesión',
      data,
    };
  }

  private toUserDto(u: UserEntity): SessionUserDto {
    return {
      id_user: u.id_user,
      username: u.username,
      id_bb: u.id_bb,
    };
  }

  private toRolDto(r: RolEntity): SessionRolDto {
    return {
      id_rol: r.id_rol,
      codigo: r.codigo,
      nombre: r.nombre,
    };
  }

  private toPermisoDto(p: PermisoEntity): SessionPermisoDto {
    return {
      id_permiso: p.id_permiso,
      codigo: p.codigo,
      nombre: p.nombre,
    };
  }

  private buildMenuTree(items: MenuItemEntity[]): SessionMenuNode[] {
    const idSet = new Set(items.map((i) => i.id_menu));
    const roots = items.filter((m) => {
      if (m.padre == null) {
        return true;
      }
      return !idSet.has(m.padre.id_menu);
    });
    roots.sort((a, b) => a.orden - b.orden);
    return roots.map((r) => this.menuNode(r, items));
  }

  private menuNode(m: MenuItemEntity, all: MenuItemEntity[]): SessionMenuNode {
    const hijos = all
      .filter((x) => x.padre?.id_menu === m.id_menu)
      .sort((a, b) => a.orden - b.orden)
      .map((c) => this.menuNode(c, all));
    return {
      id_menu: m.id_menu,
      orden: m.orden,
      nombre: m.nombre,
      icono: m.icono,
      path: m.path,
      id_permiso: m.permiso?.id_permiso ?? null,
      hijos,
    };
  }
}
