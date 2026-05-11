import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import type { Request, Response } from 'express';
import { Public } from 'src/auth/decorators/public.decorator';
import { LoginService } from './login.service';
import { LoginDto } from './dto/login.dto';

@Public()
@Controller('auth/login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Post()
  login(
    @Body() credentials: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.loginService.login(credentials, res);
  }

  @Post('refresh')
  refresh(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    return this.loginService.refresh(req, res);
  }
}
