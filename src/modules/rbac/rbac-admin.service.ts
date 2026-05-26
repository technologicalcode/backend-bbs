import { Injectable } from '@nestjs/common';
import { ApiResponse } from 'src/core/interface/api-response';
import { CreateRolDto } from './dto/create-rol.dto';
import { CreatePermisoDto } from './dto/create-permiso.dto';
import { CreateRolPermisoDto } from './dto/create-rol-permiso.dto';
import { CreateUsuarioRolDto } from './dto/create-usuario-rol.dto';
import { CreateMenuDto } from './dto/create-menu.dto';
import { MenuAdminService } from './services/menu-admin.service';
import { PermisoAdminService } from './services/permiso-admin.service';
import { RolAdminService } from './services/rol-admin.service';
import { RolPermisoAdminService } from './services/rol-permiso-admin.service';
import { UsuarioRolAdminService } from './services/usuario-rol-admin.service';

/**
 * Fachada de administración RBAC: delega en servicios con una sola responsabilidad.
 */
@Injectable()
export class RbacAdminService {
  constructor(
    private readonly rolAdmin: RolAdminService,
    private readonly permisoAdmin: PermisoAdminService,
    private readonly rolPermisoAdmin: RolPermisoAdminService,
    private readonly usuarioRolAdmin: UsuarioRolAdminService,
    private readonly menuAdmin: MenuAdminService,
  ) {}

  createRol(dto: CreateRolDto): Promise<ApiResponse> {
    return this.rolAdmin.createRol(dto);
  }

  createPermiso(dto: CreatePermisoDto): Promise<ApiResponse> {
    return this.permisoAdmin.createPermiso(dto);
  }

  createRolPermiso(dto: CreateRolPermisoDto): Promise<ApiResponse> {
    return this.rolPermisoAdmin.createRolPermiso(dto);
  }

  createUsuarioRol(dto: CreateUsuarioRolDto): Promise<ApiResponse> {
    return this.usuarioRolAdmin.createUsuarioRol(dto);
  }

  createMenu(dto: CreateMenuDto): Promise<ApiResponse> {
    return this.menuAdmin.createMenu(dto);
  }
}
