import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../../auth/user/entity/user.entity';
import { RolEntity } from './entity/rol.entity';
import { PermisoEntity } from './entity/permiso.entity';
import { RolPermisoEntity } from './entity/rol-permiso.entity';
import { UsuarioRolEntity } from './entity/usuario-rol.entity';
import { MenuItemEntity } from './entity/menu-item.entity';
import { RbacAdminService } from './rbac-admin.service';
import { RbacAdminController } from './rbac-admin.controller';
import { RolAdminService } from './services/rol-admin.service';
import { PermisoAdminService } from './services/permiso-admin.service';
import { RolPermisoAdminService } from './services/rol-permiso-admin.service';
import { UsuarioRolAdminService } from './services/usuario-rol-admin.service';
import { MenuAdminService } from './services/menu-admin.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      RolEntity,
      PermisoEntity,
      RolPermisoEntity,
      UsuarioRolEntity,
      MenuItemEntity,
      UserEntity,
    ]),
  ],
  controllers: [RbacAdminController],
  providers: [
    RbacAdminService,
    RolAdminService,
    PermisoAdminService,
    RolPermisoAdminService,
    UsuarioRolAdminService,
    MenuAdminService,
  ],
  exports: [TypeOrmModule],
})
export class RbacModule {}
