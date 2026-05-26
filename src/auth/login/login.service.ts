import { Injectable, UnauthorizedException } from '@nestjs/common';
import type { Request, Response } from 'express';
import { ApiResponse } from 'src/core/interface/api-response';
import type { LoginDto } from './dto/login.dto';
import type { LoginResponseData } from './interface/login.interface';
import { AuthCredentialsService } from './services/auth-credentials.service';
import { RefreshCookieService } from './services/refresh-cookie.service';
import { TokenIssuerService } from './services/token-issuer.service';

@Injectable()
export class LoginService {
  constructor(
    private readonly credentials: AuthCredentialsService,
    private readonly tokenIssuer: TokenIssuerService,
    private readonly refreshCookie: RefreshCookieService,
  ) {}

  async login(
    credentials: LoginDto,
    res: Response,
  ): Promise<ApiResponse<LoginResponseData>> {
    const payload = await this.credentials.validate(credentials);
    const tokens = await this.tokenIssuer.issueForUser(payload);
    this.refreshCookie.set(res, tokens.refreshToken);

    return {
      status: true,
      message: 'Login correcto',
      data: {
        access_token: tokens.accessToken,
        user: payload,
      },
    };
  }

  async refresh(
    req: Request,
    res: Response,
  ): Promise<ApiResponse<LoginResponseData>> {
    const refreshToken = this.refreshCookie.read(req);
    if (refreshToken == null) {
      throw new UnauthorizedException('Refresh token no encontrado');
    }

    const { payload, tokens } =
      await this.tokenIssuer.verifyRefreshAndIssueAccess(refreshToken);
    this.refreshCookie.set(res, tokens.refreshToken);

    return {
      status: true,
      message: 'Token renovado',
      data: {
        access_token: tokens.accessToken,
        user: payload,
      },
    };
  }
}
