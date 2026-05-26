import { Injectable } from '@nestjs/common';
import type { Request, Response } from 'express';
import { refreshCookieMaxAgeMs, refreshCookieName } from '../login-cookie.util';

@Injectable()
export class RefreshCookieService {
  set(res: Response, refreshToken: string): void {
    res.cookie(refreshCookieName(), refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/api/auth',
      maxAge: refreshCookieMaxAgeMs(),
    });
  }

  read(req: Request): string | undefined {
    const cookies = req.cookies as Record<string, unknown> | undefined;
    const raw = cookies?.[refreshCookieName()];
    return typeof raw === 'string' && raw !== '' ? raw : undefined;
  }
}
