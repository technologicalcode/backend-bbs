import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/auth/user/entity/user.entity';
import { PermisoEntity } from 'src/modules/rbac/entity/permiso.entity';
import { RolPermisoEntity } from 'src/modules/rbac/entity/rol-permiso.entity';
import { UsuarioRolEntity } from 'src/modules/rbac/entity/usuario-rol.entity';
import { MenuItemEntity } from 'src/modules/rbac/entity/menu-item.entity';
import { SessionController } from './session.controller';
import { SessionService } from './session.service';
import { SessionUserService } from './services/session-user.service';
import { SessionAuthorizationService } from './services/session-authorization.service';
import { SessionMenuService } from './services/session-menu.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserEntity,
      PermisoEntity,
      RolPermisoEntity,
      UsuarioRolEntity,
      MenuItemEntity,
    ]),
  ],
  controllers: [SessionController],
  providers: [
    SessionService,
    SessionUserService,
    SessionAuthorizationService,
    SessionMenuService,
  ],
})
export class SessionModule {}
