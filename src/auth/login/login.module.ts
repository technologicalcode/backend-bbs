import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth.module';
import { LoginController } from './login.controller';
import { LoginService } from './login.service';
import { UserEntity } from 'src/auth/user/entity/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), AuthModule],
  controllers: [LoginController],
  providers: [LoginService],
})
export class LoginModule {}
