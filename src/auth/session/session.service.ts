import { Injectable } from '@nestjs/common';
import { ApiResponse } from 'src/core/interface/api-response';
import type { LoginPayload } from 'src/auth/login/interface/login.interface';
import type { SessionData } from './session.interface';
import { SessionAuthorizationService } from './services/session-authorization.service';
import { SessionMenuService } from './services/session-menu.service';
import { SessionUserService } from './services/session-user.service';

@Injectable()
export class SessionService {
  constructor(
    private readonly sessionUser: SessionUserService,
    private readonly sessionAuthorization: SessionAuthorizationService,
    private readonly sessionMenu: SessionMenuService,
  ) {}

  async getSession(payload: LoginPayload): Promise<ApiResponse<SessionData>> {
    const user = await this.sessionUser.loadUser(payload.username);
    const { roles, permisos, allowedPermisoIds } =
      await this.sessionAuthorization.resolveRolesAndPermisos(
        payload.id_usuario,
      );
    const menu = await this.sessionMenu.buildMenuForPermisos(allowedPermisoIds);

    return {
      status: true,
      message: 'Sesión',
      data: { user, roles, permisos, menu },
    };
  }
}
