import { Injectable } from '@nestjs/common';
import type { AuthApiResponse } from 'src/auth/interface/auth-api-response';
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

  async getSession(payload: LoginPayload): Promise<AuthApiResponse<SessionData>> {
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
