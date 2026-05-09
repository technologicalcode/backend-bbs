import { Body, Controller, Post } from '@nestjs/common';
import { Public } from 'src/auth/decorators/public.decorator';
import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';

@Public()

@Controller('auth/users')
export class UserController {
  constructor(private readonly userSrv: UserService) {}

  @Post('create')
  createUser(@Body() user: UserDto) {
    return this.userSrv.createUser(user);
  }
}
