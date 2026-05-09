import { Body, Controller, Post } from '@nestjs/common';
import { Public } from 'src/auth/decorators/public.decorator';
import { LoginService } from './login.service';
import { LoginDto } from './dto/login.dto';

@Public()
@Controller('auth/login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Post()
  login(@Body() credentials: LoginDto) {
    return this.loginService.login(credentials);
  }
}
