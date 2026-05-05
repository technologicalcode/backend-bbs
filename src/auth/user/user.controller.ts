import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userSrv: UserService) {}

  @Post('create')
  createUser(@Body() user: UserDto) {
    return this.userSrv.createUser(user);
  }
}
