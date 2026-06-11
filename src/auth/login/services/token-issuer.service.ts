import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import type { LoginPayload } from '../interface/login.interface';
import { refreshJwtSecret } from '../login-cookie.util';

export type RefreshTokenPayload = LoginPayload & { typ: 'refresh' };

export interface IssuedTokens {
  accessToken: string;
  refreshToken: string;
}

function isRefreshPayload(v: unknown): v is RefreshTokenPayload {
  if (v == null || typeof v !== 'object') {
    return false;
  }
  const o = v as Record<string, unknown>;
  return (
    o.typ === 'refresh' &&
    typeof o.id_usuario_credencial === 'number' &&
    typeof o.username === 'string' &&
    typeof o.id_usuario === 'number'
  );
}

@Injectable()
export class TokenIssuerService {
  constructor(private readonly jwtService: JwtService) {}

  private refreshExpiresSec(): number {
    return parseInt(
      process.env.JWT_REFRESH_EXPIRES_SEC ?? String(7 * 24 * 60 * 60),
      10,
    );
  }

  async issueForUser(payload: LoginPayload): Promise<IssuedTokens> {
    const accessToken = await this.jwtService.signAsync(payload);
    const refreshPayload: RefreshTokenPayload = { ...payload, typ: 'refresh' };
    const refreshToken = await this.jwtService.signAsync(refreshPayload, {
      secret: refreshJwtSecret(),
      expiresIn: this.refreshExpiresSec(),
    });
    return { accessToken, refreshToken };
  }

  async verifyRefreshAndIssueAccess(
    refreshToken: string,
  ): Promise<{ payload: LoginPayload; tokens: IssuedTokens }> {
    let decoded: unknown;
    try {
      decoded = await this.jwtService.verifyAsync(refreshToken, {
        secret: refreshJwtSecret(),
      });
    } catch {
      throw new UnauthorizedException('Refresh token inválido o expirado');
    }

    if (!isRefreshPayload(decoded)) {
      throw new UnauthorizedException('Token no válido para renovación');
    }

    const payload: LoginPayload = {
      
      username: decoded.username,
      id_usuario: decoded.id_usuario,
    };

    const tokens = await this.issueForUser(payload);
    return { payload, tokens };
  }
}
