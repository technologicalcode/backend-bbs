import { Controller, Get } from '@nestjs/common';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import type { LoginPayload } from 'src/auth/login/interface/login.interface';
import { SessionService } from './session.service';

@Controller('auth')
export class SessionController {
  constructor(private readonly sessionService: SessionService) {}

  @Get('session')
  getSession(@CurrentUser() user: LoginPayload) {
    return this.sessionService.getSession(user);
  }
}
