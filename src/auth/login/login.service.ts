import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import type { Request, Response } from 'express';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/auth/user/entity/user.entity';
import { LoginDto } from './dto/login.dto';
import { LoginPayload } from './interface/login.interface';
import { ApiResponse } from 'src/core/interface/api-response';
import {
  refreshCookieMaxAgeMs,
  refreshCookieName,
  refreshJwtSecret,
} from './login-cookie.util';

type RefreshTokenPayload = LoginPayload & { typ: 'refresh' };

function isRefreshPayload(v: unknown): v is RefreshTokenPayload {
  if (v == null || typeof v !== 'object') {
    return false;
  }
  const o = v as Record<string, unknown>;
  return (
    o.typ === 'refresh' &&
    typeof o.id_user === 'number' &&
    typeof o.username === 'string' &&
    typeof o.id_bb === 'number'
  );
}

@Injectable()
export class LoginService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly jwtService: JwtService,
  ) {}

  private setRefreshCookie(res: Response, refreshToken: string): void {
    const name = refreshCookieName();
    res.cookie(name, refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/api/auth',
      maxAge: refreshCookieMaxAgeMs(),
    });
  }

  async login(credentials: LoginDto, res: Response): Promise<ApiResponse> {
    const user = await this.userRepository.findOne({
      where: { username: credentials.username },
    });

    if (!user) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const isPasswordValid = await compare(credentials.password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const payload: LoginPayload = {
      id_user: user.id_user,
      username: user.username,
      id_bb: user.id_bb,
    };

    const accessToken = await this.jwtService.signAsync(payload);

    const refreshPayload: RefreshTokenPayload = {
      ...payload,
      typ: 'refresh',
    };
    const refreshExpiresSec = parseInt(
      process.env.JWT_REFRESH_EXPIRES_SEC ?? String(7 * 24 * 60 * 60),
      10,
    );
    const refreshToken = await this.jwtService.signAsync(refreshPayload, {
      secret: refreshJwtSecret(),
      expiresIn: refreshExpiresSec,
    });

    this.setRefreshCookie(res, refreshToken);

    return {
      status: true,
      message: 'Login correcto',
      data: {
        access_token: accessToken,
        user: payload,
      },
    };
  }

  async refresh(req: Request, res: Response): Promise<ApiResponse> {
    const cookies = req.cookies as Record<string, unknown> | undefined;
    const rawCookie = cookies?.[refreshCookieName()];
    const token = typeof rawCookie === 'string' ? rawCookie : undefined;
    if (token == null || token === '') {
      throw new UnauthorizedException('Refresh token no encontrado');
    }

    let decoded: unknown;
    try {
      decoded = (await this.jwtService.verifyAsync(token, {
        secret: refreshJwtSecret(),
      })) as unknown;
    } catch {
      throw new UnauthorizedException('Refresh token inválido o expirado');
    }

    if (!isRefreshPayload(decoded)) {
      throw new UnauthorizedException('Token no válido para renovación');
    }

    const payload: LoginPayload = {
      id_user: decoded.id_user,
      username: decoded.username,
      id_bb: decoded.id_bb,
    };

    const accessToken = await this.jwtService.signAsync(payload);

    const refreshPayload: RefreshTokenPayload = {
      ...payload,
      typ: 'refresh',
    };
    const refreshExpiresSec = parseInt(
      process.env.JWT_REFRESH_EXPIRES_SEC ?? String(7 * 24 * 60 * 60),
      10,
    );
    const newRefresh = await this.jwtService.signAsync(refreshPayload, {
      secret: refreshJwtSecret(),
      expiresIn: refreshExpiresSec,
    });
    this.setRefreshCookie(res, newRefresh);

    return {
      status: true,
      message: 'Token renovado',
      data: {
        access_token: accessToken,
        user: payload,
      },
    };
  }
}
