import { Controller, Get, Req } from '@nestjs/common';
import type { LoginPayload } from 'src/auth/login/interface/login.interface';
import { SessionService } from './session.service';

type RequestWithUser = { user: LoginPayload };

@Controller('auth')
export class SessionController {
  constructor(private readonly sessionService: SessionService) {}

  @Get('session')
  getSession(@Req() req: RequestWithUser) {
    return this.sessionService.getSession(req.user);
  }
}
