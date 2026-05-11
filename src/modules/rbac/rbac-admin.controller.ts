import { Body, Controller, Post } from '@nestjs/common';
import { RbacAdminService } from './rbac-admin.service';
import { CreateRolDto } from './dto/create-rol.dto';
import { CreatePermisoDto } from './dto/create-permiso.dto';
import { CreateRolPermisoDto } from './dto/create-rol-permiso.dto';
import { CreateUsuarioRolDto } from './dto/create-usuario-rol.dto';
import { CreateMenuDto } from './dto/create-menu.dto';
import { Public } from 'src/auth/decorators/public.decorator';

@Public()
@Controller('admin/rbac')
export class RbacAdminController {
  constructor(private readonly rbacAdmin: RbacAdminService) {}

  @Post('roles')
  createRol(@Body() dto: CreateRolDto) {
    return this.rbacAdmin.createRol(dto);
  }

  @Post('permisos')
  createPermiso(@Body() dto: CreatePermisoDto) {
    return this.rbacAdmin.createPermiso(dto);
  }

  @Post('rol-permisos')
  createRolPermiso(@Body() dto: CreateRolPermisoDto) {
    return this.rbacAdmin.createRolPermiso(dto);
  }

  @Post('usuario-roles')
  createUsuarioRol(@Body() dto: CreateUsuarioRolDto) {
    return this.rbacAdmin.createUsuarioRol(dto);
  }

  @Post('menu')
  createMenu(@Body() dto: CreateMenuDto) {
    return this.rbacAdmin.createMenu(dto);
  }
}
