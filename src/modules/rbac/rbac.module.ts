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
  providers: [RbacAdminService],
  exports: [TypeOrmModule],
})
export class RbacModule {}
