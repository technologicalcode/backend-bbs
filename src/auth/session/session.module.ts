import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BarberoEntity } from 'src/modules/barbero/entity/barbero.entity';
import { UsuarioCredencialesEntity } from 'src/modules/usuarios/entity/usuario-credenciales.entity';
import { UsuariosEntity } from 'src/modules/usuarios/entity/usuarios.entity';
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
      UsuarioCredencialesEntity,
      UsuariosEntity,
      BarberoEntity,
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
