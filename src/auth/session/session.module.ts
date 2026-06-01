import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioCredencialesEntity } from 'src/modules/usuarios/entity/usuario-credenciales.entity';
import { UsuariosEntity } from 'src/modules/usuarios/entity/usuarios.entity';
import { PermisoEntity } from 'src/modules/rbac/entity/permiso.entity';
import { RolPermisoEntity } from 'src/modules/rbac/entity/rol-permiso.entity';
import { UsuarioRolEntity } from 'src/modules/rbac/entity/usuario-rol.entity';
import { MenuEntity } from 'src/modules/rbac/entity/menu.entity';
import { PadreMenuEntity } from 'src/modules/rbac/entity/padre_menu.entity';
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
      PermisoEntity,
      RolPermisoEntity,
      UsuarioRolEntity,
      MenuEntity,
      PadreMenuEntity,
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
